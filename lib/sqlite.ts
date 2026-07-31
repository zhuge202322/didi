import "server-only";

import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

declare global {
  // eslint-disable-next-line no-var
  var __ynjoySiteDb: DatabaseSync | undefined;
}

function databasePath() {
  return path.resolve(process.env.SITE_DB_PATH || path.join(process.cwd(), "data", "site.db"));
}

function createDatabase() {
  const file = databasePath();
  mkdirSync(path.dirname(file), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;");
  db.exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS product_categories (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      image TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      category_id TEXT NOT NULL,
      category_label TEXT NOT NULL,
      name TEXT NOT NULL,
      short_name TEXT NOT NULL DEFAULT '',
      range_text TEXT NOT NULL DEFAULT '',
      summary TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      image TEXT NOT NULL DEFAULT '',
      specs_json TEXT NOT NULL DEFAULT '[]',
      features_json TEXT NOT NULL DEFAULT '[]',
      model_table_json TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY(category_id) REFERENCES product_categories(id) ON UPDATE CASCADE ON DELETE RESTRICT
    );
    CREATE TABLE IF NOT EXISTS section_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page_key TEXT NOT NULL,
      section_key TEXT NOT NULL,
      label TEXT NOT NULL,
      image_path TEXT NOT NULL,
      alt_text TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(page_key, section_key, sort_order)
    );
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT NOT NULL,
      email TEXT NOT NULL DEFAULT '',
      phone TEXT NOT NULL DEFAULT '',
      whatsapp TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS social_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      platform TEXT NOT NULL,
      label TEXT NOT NULL,
      url TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS admin_sessions (
      token_hash TEXT PRIMARY KEY,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
  return db;
}

export function getDatabase() {
  if (!globalThis.__ynjoySiteDb) globalThis.__ynjoySiteDb = createDatabase();
  return globalThis.__ynjoySiteDb;
}
