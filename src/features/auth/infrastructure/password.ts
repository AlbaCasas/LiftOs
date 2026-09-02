import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCb);
const keyLength = 64;

export const hashPassword = async (password: string) => {
  const salt = randomBytes(16);
  const hash = (await scrypt(password, salt, keyLength)) as Buffer;
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
};

export const verifyPassword = async (password: string, stored: string) => {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  const salt = Buffer.from(saltHex, "hex");
  const expected = Buffer.from(hashHex, "hex");
  const actual = (await scrypt(password, salt, keyLength)) as Buffer;
  if (actual.length !== expected.length) return false;
  return timingSafeEqual(actual, expected);
};
