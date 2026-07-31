import "server-only";

import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { getDatabase } from "./sqlite";

export const ADMIN_COOKIE = "ynjoy_admin_session";
const SESSION_DAYS = 7;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function verifyAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === "production" ? "" : "admin123");
  if (!expected) throw new Error("ADMIN_PASSWORD is not configured.");
  const actualBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

export function createAdminSession() {
  const token = randomBytes(32).toString("base64url");
  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const db = getDatabase();
  db.prepare("DELETE FROM admin_sessions WHERE expires_at <= ?").run(createdAt.toISOString());
  db.prepare("INSERT INTO admin_sessions (token_hash, expires_at, created_at) VALUES (?, ?, ?)").run(hashToken(token), expiresAt.toISOString(), createdAt.toISOString());
  return { token, expiresAt };
}

export function isAdminSession(token?: string) {
  if (!token) return false;
  const row = getDatabase().prepare("SELECT expires_at FROM admin_sessions WHERE token_hash = ?").get(hashToken(token)) as { expires_at: string } | undefined;
  return Boolean(row && new Date(row.expires_at).getTime() > Date.now());
}

export function removeAdminSession(token?: string) {
  if (token) getDatabase().prepare("DELETE FROM admin_sessions WHERE token_hash = ?").run(hashToken(token));
}
