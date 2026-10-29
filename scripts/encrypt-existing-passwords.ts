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
// read, so a password edited mid-run is left for the next run. Rows that look
// encrypted but do not decrypt with this key are never touched; the script
// reports them and exits non-zero (usually a sign of the wrong key).
// Output is counts only, never passwords.
import { createClient } from "@supabase/supabase-js";

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
	const unknown = args.filter((a) => a !== "--dry-run");
	if (unknown.length > 0) {
		fail(`unknown argument(s): ${unknown.join(" ")}`);
	}
	const dryRun = args.includes("--dry-run");

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
		encrypted: 0,
		changedDuringRun: 0,
		empty: 0,
		undecryptable: 0,
	};

	// Page by id so rows updated during the run do not shift the window.
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
			break;
		}
		lastId = rows[rows.length - 1].id;

		for (const row of rows) {
			counts.total++;
			if (typeof row.password !== "string" || row.password === "") {
				counts.empty++;
				continue;
			}
			if (isEncrypted(row.password)) {
				try {
					decryptPassword(row.password, row.userId, key);
					counts.alreadyEncrypted++;
				} catch {
					counts.undecryptable++;
				}
				continue;
			}

			counts.toEncrypt++;
			if (dryRun) {
				continue;
			}

			const enc = encryptPassword(row.password, row.userId, key);
			if (decryptPassword(enc, row.userId, key) !== row.password) {
				fail("self-check failed after encrypting a row; stopping");
			}
			const { data: updated, error: upErr } = await db
				.from("passwords")
				.update({ password: enc })
				.eq("id", row.id)
				.eq("password", row.password)
				.select("id");
			if (upErr) {
				fail(`updating a row: ${upErr.message}`);
			}
			if (updated && updated.length === 1) {
				counts.encrypted++;
			} else {
				counts.changedDuringRun++;
			}
		}
	}

	console.log(dryRun ? "dry run (nothing written)" : "done");
	for (const [k, v] of Object.entries(counts)) {
		if (dryRun && (k === "encrypted" || k === "changedDuringRun")) {
			continue;
		}
		console.log(`  ${k}: ${v}`);
	}
	if (counts.undecryptable > 0) {
		console.error(
			`warning: ${counts.undecryptable} row(s) look encrypted but do not decrypt with this key; check ${KEY_ENV}`
		);
		process.exit(1);
	}
}

main().catch((e) => {
	fail(e?.message ?? String(e));
});
