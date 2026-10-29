// One-off migration: encrypt every vault password still stored as plaintext.
//
//   node --env-file=.env.migrate scripts/encrypt-existing-passwords.ts --dry-run
//   node --env-file=.env.migrate scripts/encrypt-existing-passwords.ts
//
// Needs Node 22.18+ (runs TypeScript directly) and these env vars:
//   PAS_ENCRYPTION_KEY         the same key the app uses (32 bytes, base64)
//   NEXT_PUBLIC_SUPABASE_URL   the Supabase project URL
//   SUPABASE_SERVICE_ROLE_KEY  service role key (reads and updates every row)
//
// Safe to run more than once: rows already encrypted with this key are
// skipped. Each update only applies if the row still holds the plaintext it
// read, so a password edited mid-run is left for the next run.
//
// Wrong-key guards: a read-only first pass checks every row. If any row looks
// encrypted but does not decrypt with this key, nothing is written. If no row
// is encrypted yet, the key cannot be checked, so the script refuses to write
// unless --no-key-check is passed (save one password in the deployed app
// first instead). Output is counts only, never passwords.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import {
	decryptPassword,
	encryptPassword,
	isEncrypted,
	loadKey,
	KEY_ENV,
} from "../lib/vault-crypto.ts";

const PAGE = 500;

type Row = { id: string; userId: string; password: string | null };

function fail(msg: string): never
{
	console.error(`error: ${msg}`);
	process.exit(2);
}

async function main()
{
	const args = process.argv.slice(2);
	const unknown = args.filter((a) => a !== "--dry-run" && a !== "--no-key-check");
	if (unknown.length > 0) {
		fail(`unknown argument(s): ${unknown.join(" ")}`);
	}
	const dryRun = args.includes("--dry-run");
	const noKeyCheck = args.includes("--no-key-check");

	if (!process.env[KEY_ENV]) {
		fail(`${KEY_ENV} is not set; refusing to run`);
	}
	let key: Buffer;
	try {
		key = loadKey();
	} catch (e: any) {
		fail(e.message);
	}
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
	if (!url || !serviceKey) {
		fail("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");
	}

	const db = createClient(url, serviceKey, {
		auth: { persistSession: false, autoRefreshToken: false },
	});

	const counts = {
		total: 0,
		alreadyEncrypted: 0,
		toEncrypt: 0,
		empty: 0,
		undecryptable: 0,
	};

	// Pass 1, read only: classify every row before writing anything.
	await forEachRow(db, async (row) => {
		counts.total++;
		if (typeof row.password !== "string" || row.password === "") {
			counts.empty++;
		} else if (isEncrypted(row.password)) {
			try {
				decryptPassword(row.password, row.userId, key);
				counts.alreadyEncrypted++;
			} catch {
				counts.undecryptable++;
			}
		} else {
			counts.toEncrypt++;
		}
	});

	console.log(dryRun ? "dry run (nothing written)" : "preflight");
	for (const [k, v] of Object.entries(counts)) {
		console.log(`  ${k}: ${v}`);
	}
	if (counts.undecryptable > 0) {
		fail(
			`${counts.undecryptable} row(s) look encrypted but do not decrypt with this key; check ${KEY_ENV}. Nothing was written.`
		);
	}
	if (dryRun || counts.toEncrypt === 0) {
		return;
	}
	if (counts.alreadyEncrypted === 0 && !noKeyCheck) {
		fail(
			"no row is encrypted yet, so this key cannot be checked against the app's key. " +
				"Save one password in the deployed app first, or pass --no-key-check. Nothing was written."
		);
	}

	// Pass 2: encrypt plaintext rows. Each update only applies if the row
	// still holds the plaintext read here.
	let encrypted = 0;
	let changedDuringRun = 0;
	await forEachRow(db, async (row) => {
		if (
			typeof row.password !== "string" ||
			row.password === "" ||
			isEncrypted(row.password)
		) {
			return;
		}
		const enc = encryptPassword(row.password, row.userId, key);
		if (decryptPassword(enc, row.userId, key) !== row.password) {
			fail("self-check failed after encrypting a row; stopping");
		}
		const { data: updated, error } = await db
			.from("passwords")
			.update({ password: enc })
			.eq("id", row.id)
			.eq("password", row.password)
			.select("id");
		if (error) {
			fail(`updating a row: ${error.message}`);
		}
		if (updated && updated.length === 1) {
			encrypted++;
		} else {
			changedDuringRun++;
		}
	});

	console.log("done");
	console.log(`  encrypted: ${encrypted}`);
	console.log(`  changedDuringRun: ${changedDuringRun}`);
}

// Pages by id so rows updated during the run do not shift the window.
async function forEachRow(
	db: SupabaseClient,
	fn: (row: Row) => Promise<void>
)
{
	let lastId: string | null = null;
	for (;;) {
		let q = db
			.from("passwords")
			.select("id, userId, password")
			.order("id", { ascending: true })
			.limit(PAGE);
		if (lastId !== null) {
			q = q.gt("id", lastId);
		}
		const { data, error } = await q;
		if (error) {
			fail(`reading passwords: ${error.message}`);
		}
		const rows = (data ?? []) as Row[];
		if (rows.length === 0) {
			return;
		}
		lastId = rows[rows.length - 1].id;
		for (const row of rows) {
			await fn(row);
		}
	}
}

main().catch((e) => {
	fail(e?.message ?? String(e));
});
