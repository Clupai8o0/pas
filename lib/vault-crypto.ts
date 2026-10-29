// Encryption at rest for vault passwords (server only).
//
// Stored format: v1:<iv>:<tag>:<ciphertext>, each part base64.
// AES-256-GCM, a fresh random 12-byte IV per value, and the owner's userId as
// additional authenticated data, so a ciphertext copied onto another user's
// row fails to decrypt. The key comes from PAS_ENCRYPTION_KEY (32 bytes,
// base64). Values without the v1 shape are legacy plaintext rows and are
// returned unchanged until scripts/encrypt-existing-passwords.ts runs.
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const PREFIX = "v1";
const IV_BYTES = 12;
const TAG_BYTES = 16;
const B64 = "[A-Za-z0-9+/]+={0,2}";
const V1_PATTERN = new RegExp(`^${PREFIX}:(${B64}):(${B64}):(${B64}|)$`);

export const KEY_ENV = "PAS_ENCRYPTION_KEY";

export function loadKey(raw: string | undefined = process.env[KEY_ENV]): Buffer
{
	if (!raw) {
		throw new Error(`${KEY_ENV} is not set`);
	}
	const key = Buffer.from(raw, "base64");
	if (key.length !== 32) {
		throw new Error(`${KEY_ENV} must be 32 bytes, base64 encoded`);
	}
	return key;
}

function aad(userId: string): Buffer
{
	if (!userId) {
		throw new Error("userId is required to encrypt or decrypt a password");
	}
	return Buffer.from(`pas:passwords:${userId}`, "utf8");
}

// True when the value has the shape of an encrypted value. A legacy plaintext
// password can in theory have this shape too; the migration script checks by
// trying to decrypt.
export function isEncrypted(value: unknown): value is string
{
	if (typeof value !== "string") {
		return false;
	}
	const m = V1_PATTERN.exec(value);
	if (!m) {
		return false;
	}
	return (
		Buffer.from(m[1], "base64").length === IV_BYTES &&
		Buffer.from(m[2], "base64").length === TAG_BYTES
	);
}

export function encryptPassword(
	plaintext: string,
	userId: string,
	key: Buffer = loadKey()
): string
{
	if (typeof plaintext !== "string") {
		throw new Error("password must be a string");
	}
	const iv = randomBytes(IV_BYTES);
	const cipher = createCipheriv(ALGORITHM, key, iv);
	cipher.setAAD(aad(userId));
	const ct = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
	const tag = cipher.getAuthTag();
	return [PREFIX, iv.toString("base64"), tag.toString("base64"), ct.toString("base64")].join(":");
}

export function decryptPassword(
	stored: string,
	userId: string,
	key?: Buffer
): string
{
	if (!isEncrypted(stored)) {
		// Legacy plaintext row (written before encryption shipped).
		return stored;
	}
	const [, ivB64, tagB64, ctB64] = V1_PATTERN.exec(stored)!;
	const decipher = createDecipheriv(ALGORITHM, key ?? loadKey(), Buffer.from(ivB64, "base64"));
	decipher.setAAD(aad(userId));
	decipher.setAuthTag(Buffer.from(tagB64, "base64"));
	return Buffer.concat([
		decipher.update(Buffer.from(ctB64, "base64")),
		decipher.final(),
	]).toString("utf8");
}

// Decrypts the password field of rows read from the passwords table.
export function decryptRows<T extends { password?: unknown; userId: string }>(
	rows: T[] | null | undefined,
	key?: Buffer
): T[]
{
	return (rows ?? []).map((row) => {
		if (typeof row.password !== "string") {
			return row;
		}
		return { ...row, password: decryptPassword(row.password, row.userId, key) };
	});
}
