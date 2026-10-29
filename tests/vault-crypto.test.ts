import { test } from "node:test";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";

import {
	decryptPassword,
	decryptRows,
	encryptPassword,
	isEncrypted,
	loadKey,
} from "../lib/vault-crypto.ts";

const key = randomBytes(32);
const user = "0b5c7f0e-0000-4000-8000-000000000001";

test("round trip", () => {
	for (const pw of ["hunter2", "", "ünïcødé 🔑", "x".repeat(5000)]) {
		const enc = encryptPassword(pw, user, key);
		assert.ok(enc.startsWith("v1:"));
		assert.ok(isEncrypted(enc));
		assert.ok(!enc.includes(pw) || pw === "");
		assert.equal(decryptPassword(enc, user, key), pw);
	}
});

test("random IV: same input encrypts differently", () => {
	assert.notEqual(encryptPassword("same", user, key), encryptPassword("same", user, key));
});

test("tampered ciphertext fails", () => {
	const enc = encryptPassword("hunter2", user, key);
	const [v, iv, tag, ct] = enc.split(":");
	const bytes = Buffer.from(ct, "base64");
	bytes[0] ^= 1;
	const tampered = [v, iv, tag, bytes.toString("base64")].join(":");
	assert.throws(() => decryptPassword(tampered, user, key));

	const tagBytes = Buffer.from(tag, "base64");
	tagBytes[0] ^= 1;
	assert.throws(() => decryptPassword([v, iv, tagBytes.toString("base64"), ct].join(":"), user, key));
});

test("ciphertext moved to another user's row fails", () => {
	const enc = encryptPassword("hunter2", user, key);
	assert.throws(() => decryptPassword(enc, "someone-else", key));
});

test("wrong key fails", () => {
	const enc = encryptPassword("hunter2", user, key);
	assert.throws(() => decryptPassword(enc, user, randomBytes(32)));
});

test("legacy plaintext still reads", () => {
	assert.equal(decryptPassword("plain-old-password", user, key), "plain-old-password");
	assert.equal(decryptPassword("v1:not-really", user, key), "v1:not-really");
	// no key needed for legacy rows
	assert.equal(decryptPassword("legacy", user), "legacy");
});

test("decryptRows handles mixed rows", () => {
	const rows = [
		{ id: "1", userId: user, password: encryptPassword("new", user, key) },
		{ id: "2", userId: user, password: "old" },
	];
	assert.deepEqual(
		decryptRows(rows, key).map((r) => r.password),
		["new", "old"]
	);
	assert.deepEqual(decryptRows(null, key), []);
});

test("key loading rejects missing or wrong-size keys", () => {
	assert.throws(() => loadKey(undefined), /not set/);
	assert.throws(() => loadKey(""), /not set/);
	assert.throws(() => loadKey(randomBytes(16).toString("base64")), /32 bytes/);
	assert.equal(loadKey(key.toString("base64")).length, 32);
});
