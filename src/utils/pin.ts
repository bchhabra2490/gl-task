import crypto from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(crypto.scrypt);

// Stored as hex strings for portability.
const SALT_BYTES = 16; // 128-bit salt
const KEY_LEN = 64; // 512-bit derived key

export function generatePinSalt(): string {
  return crypto.randomBytes(SALT_BYTES).toString("hex");
}

export async function hashPin(pin: string, salt: string): Promise<string> {
  const derivedKey = (await scryptAsync(pin, salt, KEY_LEN)) as Buffer;
  return derivedKey.toString("hex");
}

export async function verifyPin(pin: string, salt: string, expectedHashHex: string): Promise<boolean> {
  const actualHashHex = await hashPin(pin, salt);

  // timingSafeEqual requires equal-length buffers.
  const a = Buffer.from(actualHashHex, "hex");
  const b = Buffer.from(expectedHashHex, "hex");
  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}

