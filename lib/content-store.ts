import "server-only";

import { productCategories as seedCategories, products as seedProducts, type Product } from "../app/catalog-data";
import { getDatabase } from "./sqlite";

export type SiteSettings = {
  site_name: string;
  site_tagline: string;
  logo_path: string;
  inquiry_email: string;
};

export type CategoryRecord = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  sortOrder: number;
};

export type ContactRecord = { id: number; label: string; email: string; phone: string; whatsapp: string; sortOrder: number };
export type SocialLinkRecord = { id: number; platform: string; label: string; url: string; sortOrder: number };
export type SectionImageRecord = { id: number; pageKey: string; sectionKey: string; label: string; imagePath: string; altText: string; sortOrder: number };
export type ProductRecord = Product & { id: number; sortOrder: number };

const defaultSettings: SiteSettings = {
  site_name: "YnJoy Energy",
  site_tagline: "ENERGY NATURE FUTURE",
  logo_path: "/new-site/logo-mark.png",
  inquiry_email: "fangdan0328@gmail.com",
};

const categoryImages: Record<string, string> = {
  hybrid: "/new-site/hybrid-6-5kw.png",
  pump: "/new-site/pump-yj100.png",
  battery: "/new-site/battery-300ah.png",
};

const sectionImageSeeds = [
  ["home", "hero", "Clean energy solutions", "/hero/hero-clean-energy.png", "YnJoy clean energy solutions for homes, batteries and water pumping", 0],
  ["home", "hero", "Solar pump inverters", "/hero/hero-pump-inverters.png", "YnJoy solar pump inverters for irrigation and water systems", 1],
  ["home", "hero", "Home solar inverters", "/hero/hero-home-inverters.png", "YnJoy home solar inverters from 1.5kW to 12kW", 2],
  ["home", "hero", "Home energy storage", "/hero/hero-battery.png", "YnJoy LiFePO4 batteries for home energy storage", 3],
  ["home", "about", "About background", "/new-site/about-background.png", "YnJoy renewable energy project team", 0],
  ["about", "hero", "About hero", "/new-site/about-background.png", "YnJoy renewable energy project team", 0],
  ...Array.from({ length: 6 }, (_, index) => ["shared", "workshop", `Workshop image ${index + 1}`, `/new-site/factory-${index + 1}.png`, `Manufacturing and office environment ${index + 1}`, index]),
] as Array<[string, string, string, string, string, number]>;

function now() {
  return new Date().toISOString();
}

function safeJson<T>(value: unknown, fallback: T): T {
  try {
    return typeof value === "string" ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function initializeContent() {
  const db = getDatabase();
  const count = db.prepare("SELECT COUNT(*) AS count FROM product_categories").get() as { count: number };
  if (count.count > 0) return;
  const timestamp = now();
  db.exec("BEGIN IMMEDIATE");
  try {
    const setting = db.prepare("INSERT OR IGNORE INTO site_settings (key, value, updated_at) VALUES (?, ?, ?)");
    Object.entries(defaultSettings).forEach(([key, value]) => setting.run(key, value, timestamp));
    const category = db.prepare("INSERT INTO product_categories (id, title, subtitle, description, image, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    seedCategories.forEach((item, index) => category.run(item.id, item.title, item.subtitle, item.description, categoryImages[item.id] || "", index, timestamp, timestamp));
    const product = db.prepare("INSERT INTO products (slug, category_id, category_label, name, short_name, range_text, summary, description, image, specs_json, features_json, model_table_json, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    seedProducts.forEach((item, index) => product.run(item.slug, item.category, item.categoryLabel, item.name, item.shortName, item.range, item.summary, item.description, item.image, JSON.stringify(item.specs), JSON.stringify(item.features), item.modelTable ? JSON.stringify(item.modelTable) : null, index, timestamp, timestamp));
    const section = db.prepare("INSERT INTO section_images (page_key, section_key, label, image_path, alt_text, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    sectionImageSeeds.forEach((item) => section.run(...item, timestamp, timestamp));
    const contact = db.prepare("INSERT INTO contacts (label, email, phone, whatsapp, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)");
    contact.run("China Office", "fangdan0328@gmail.com", "+86 137 3553 6084", "+8613735536084", 0, timestamp, timestamp);
    contact.run("Middle East Office (Arabic Support)", "maxlee1021@gmail.com", "+86 198 8432 6307", "+8619884326307", 1, timestamp, timestamp);
    const social = db.prepare("INSERT INTO social_links (platform, label, url, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)");
    const query = encodeURIComponent("Jiaxing Easyon Technology Co., Ltd.");
    social.run("facebook", "Facebook", `https://www.facebook.com/search/top?q=${query}`, 0, timestamp, timestamp);
    social.run("tiktok", "TikTok", `https://www.tiktok.com/search?q=${query}`, 1, timestamp, timestamp);
    social.run("whatsapp", "WhatsApp", "https://wa.me/8613735536084", 2, timestamp, timestamp);
    social.run("linkedin", "LinkedIn", `https://www.linkedin.com/search/results/companies/?keywords=${query}`, 3, timestamp, timestamp);
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

function mapCategory(row: Record<string, unknown>): CategoryRecord {
  return { id: String(row.id), title: String(row.title), subtitle: String(row.subtitle), description: String(row.description), image: String(row.image), sortOrder: Number(row.sort_order) };
}

function mapProduct(row: Record<string, unknown>): ProductRecord {
  return {
    id: Number(row.id), slug: String(row.slug), category: String(row.category_id), categoryLabel: String(row.category_label), name: String(row.name), shortName: String(row.short_name), range: String(row.range_text), summary: String(row.summary), description: String(row.description), image: String(row.image),
    specs: safeJson<Array<[string, string]>>(row.specs_json, []), features: safeJson<string[]>(row.features_json, []), modelTable: row.model_table_json ? safeJson<Product["modelTable"]>(row.model_table_json, undefined) : undefined, sortOrder: Number(row.sort_order),
  };
}

export function getSiteSettings(): SiteSettings {
  initializeContent();
  const rows = getDatabase().prepare("SELECT key, value FROM site_settings").all() as Array<{ key: keyof SiteSettings; value: string }>;
  return rows.reduce((settings, row) => ({ ...settings, [row.key]: row.value }), { ...defaultSettings });
}

export function getCategories() {
  initializeContent();
  return (getDatabase().prepare("SELECT * FROM product_categories ORDER BY sort_order, title").all() as Array<Record<string, unknown>>).map(mapCategory);
}

export function getProducts() {
  initializeContent();
  return (getDatabase().prepare("SELECT * FROM products ORDER BY sort_order, name").all() as Array<Record<string, unknown>>).map(mapProduct);
}

export function getProductBySlug(slug: string) {
  initializeContent();
  const row = getDatabase().prepare("SELECT * FROM products WHERE slug = ?").get(slug) as Record<string, unknown> | undefined;
  return row ? mapProduct(row) : undefined;
}

export function getProductsForCategory(category: string) {
  return getProducts().filter((product) => product.category === category);
}

export function getContacts() {
  initializeContent();
  return (getDatabase().prepare("SELECT * FROM contacts ORDER BY sort_order, id").all() as Array<Record<string, unknown>>).map((row) => ({ id: Number(row.id), label: String(row.label), email: String(row.email), phone: String(row.phone), whatsapp: String(row.whatsapp), sortOrder: Number(row.sort_order) }));
}

export function getSocialLinks() {
  initializeContent();
  return (getDatabase().prepare("SELECT * FROM social_links ORDER BY sort_order, id").all() as Array<Record<string, unknown>>).map((row) => ({ id: Number(row.id), platform: String(row.platform), label: String(row.label), url: String(row.url), sortOrder: Number(row.sort_order) }));
}

export function getSectionImages(pageKey?: string, sectionKey?: string) {
  initializeContent();
  const rows = pageKey && sectionKey
    ? getDatabase().prepare("SELECT * FROM section_images WHERE page_key = ? AND section_key = ? ORDER BY sort_order, id").all(pageKey, sectionKey)
    : getDatabase().prepare("SELECT * FROM section_images ORDER BY page_key, section_key, sort_order, id").all();
  return (rows as Array<Record<string, unknown>>).map((row) => ({ id: Number(row.id), pageKey: String(row.page_key), sectionKey: String(row.section_key), label: String(row.label), imagePath: String(row.image_path), altText: String(row.alt_text), sortOrder: Number(row.sort_order) }));
}

export function getAdminBootstrap() {
  return { settings: getSiteSettings(), categories: getCategories(), products: getProducts(), contacts: getContacts(), socialLinks: getSocialLinks(), sectionImages: getSectionImages() };
}

type Input = Record<string, unknown>;
const textValue = (input: Input, key: string) => String(input[key] ?? "").trim();
const orderValue = (input: Input) => Number.isFinite(Number(input.sortOrder)) ? Number(input.sortOrder) : 0;

export function saveSettings(input: Input) {
  const allowed: Array<keyof SiteSettings> = ["site_name", "site_tagline", "logo_path", "inquiry_email"];
  const statement = getDatabase().prepare("INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at");
  const timestamp = now();
  allowed.forEach((key) => { if (input[key] !== undefined) statement.run(key, textValue(input, key), timestamp); });
  return getSiteSettings();
}

export function createResource(resource: string, input: Input) {
  const db = getDatabase(); const timestamp = now();
  if (resource === "categories") {
    const id = textValue(input, "id").toLowerCase().replace(/[^a-z0-9-]+/g, "-");
    if (!id || !textValue(input, "title")) throw new Error("Category ID and title are required.");
    db.prepare("INSERT INTO product_categories (id,title,subtitle,description,image,sort_order,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?)").run(id, textValue(input,"title"), textValue(input,"subtitle"), textValue(input,"description"), textValue(input,"image"), orderValue(input), timestamp, timestamp);
  } else if (resource === "products") {
    if (!textValue(input,"slug") || !textValue(input,"name") || !textValue(input,"category")) throw new Error("Slug, category and name are required.");
    db.prepare("INSERT INTO products (slug,category_id,category_label,name,short_name,range_text,summary,description,image,specs_json,features_json,model_table_json,sort_order,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)").run(textValue(input,"slug"),textValue(input,"category"),textValue(input,"categoryLabel"),textValue(input,"name"),textValue(input,"shortName"),textValue(input,"range"),textValue(input,"summary"),textValue(input,"description"),textValue(input,"image"),JSON.stringify(input.specs || []),JSON.stringify(input.features || []),input.modelTable ? JSON.stringify(input.modelTable) : null,orderValue(input),timestamp,timestamp);
  } else if (resource === "contacts") {
    db.prepare("INSERT INTO contacts (label,email,phone,whatsapp,sort_order,created_at,updated_at) VALUES (?,?,?,?,?,?,?)").run(textValue(input,"label"),textValue(input,"email"),textValue(input,"phone"),textValue(input,"whatsapp"),orderValue(input),timestamp,timestamp);
  } else if (resource === "social-links") {
    db.prepare("INSERT INTO social_links (platform,label,url,sort_order,created_at,updated_at) VALUES (?,?,?,?,?,?)").run(textValue(input,"platform"),textValue(input,"label"),textValue(input,"url"),orderValue(input),timestamp,timestamp);
  } else if (resource === "section-images") {
    db.prepare("INSERT INTO section_images (page_key,section_key,label,image_path,alt_text,sort_order,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?)").run(textValue(input,"pageKey"),textValue(input,"sectionKey"),textValue(input,"label"),textValue(input,"imagePath"),textValue(input,"altText"),orderValue(input),timestamp,timestamp);
  } else throw new Error("Unsupported resource.");
}

export function updateResource(resource: string, input: Input) {
  const db = getDatabase(); const timestamp = now(); const id = Number(input.id);
  if (resource === "categories") {
    const categoryId = textValue(input,"id");
    db.prepare("UPDATE product_categories SET title=?,subtitle=?,description=?,image=?,sort_order=?,updated_at=? WHERE id=?").run(textValue(input,"title"),textValue(input,"subtitle"),textValue(input,"description"),textValue(input,"image"),orderValue(input),timestamp,categoryId);
  } else if (resource === "products") {
    db.prepare("UPDATE products SET slug=?,category_id=?,category_label=?,name=?,short_name=?,range_text=?,summary=?,description=?,image=?,specs_json=?,features_json=?,model_table_json=?,sort_order=?,updated_at=? WHERE id=?").run(textValue(input,"slug"),textValue(input,"category"),textValue(input,"categoryLabel"),textValue(input,"name"),textValue(input,"shortName"),textValue(input,"range"),textValue(input,"summary"),textValue(input,"description"),textValue(input,"image"),JSON.stringify(input.specs || []),JSON.stringify(input.features || []),input.modelTable ? JSON.stringify(input.modelTable) : null,orderValue(input),timestamp,id);
  } else if (resource === "contacts") {
    db.prepare("UPDATE contacts SET label=?,email=?,phone=?,whatsapp=?,sort_order=?,updated_at=? WHERE id=?").run(textValue(input,"label"),textValue(input,"email"),textValue(input,"phone"),textValue(input,"whatsapp"),orderValue(input),timestamp,id);
  } else if (resource === "social-links") {
    db.prepare("UPDATE social_links SET platform=?,label=?,url=?,sort_order=?,updated_at=? WHERE id=?").run(textValue(input,"platform"),textValue(input,"label"),textValue(input,"url"),orderValue(input),timestamp,id);
  } else if (resource === "section-images") {
    db.prepare("UPDATE section_images SET page_key=?,section_key=?,label=?,image_path=?,alt_text=?,sort_order=?,updated_at=? WHERE id=?").run(textValue(input,"pageKey"),textValue(input,"sectionKey"),textValue(input,"label"),textValue(input,"imagePath"),textValue(input,"altText"),orderValue(input),timestamp,id);
  } else throw new Error("Unsupported resource.");
}

export function deleteResource(resource: string, identifier: string | number) {
  const db = getDatabase();
  const tables: Record<string, { table: string; key: string }> = {
    categories: { table: "product_categories", key: "id" }, products: { table: "products", key: "id" }, contacts: { table: "contacts", key: "id" }, "social-links": { table: "social_links", key: "id" }, "section-images": { table: "section_images", key: "id" },
  };
  const target = tables[resource];
  if (!target) throw new Error("Unsupported resource.");
  db.prepare(`DELETE FROM ${target.table} WHERE ${target.key} = ?`).run(identifier);
}
