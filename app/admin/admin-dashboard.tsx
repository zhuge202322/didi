"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { Boxes, Building2, ExternalLink, FileImage, Gauge, ImageIcon, LogOut, MenuSquare, Package, Pencil, Plus, Save, Settings, Share2, Trash2, Upload, X } from "lucide-react";
import type { CategoryRecord, ContactRecord, ProductRecord, SectionImageRecord, SiteSettings, SocialLinkRecord } from "../../lib/content-store";

type Bootstrap = { settings: SiteSettings; categories: CategoryRecord[]; products: ProductRecord[]; contacts: ContactRecord[]; socialLinks: SocialLinkRecord[]; sectionImages: SectionImageRecord[] };
type Tab = "overview" | "settings" | "categories" | "products" | "contacts" | "social-links" | "section-images";
type Resource = Exclude<Tab, "overview" | "settings">;
type EditorState = { resource: Resource; record?: Record<string, unknown> } | null;

const tabs: Array<{ id: Tab; label: string; icon: typeof Gauge }> = [
  { id: "overview", label: "Overview", icon: Gauge }, { id: "settings", label: "Brand & site", icon: Settings }, { id: "categories", label: "Categories", icon: Boxes }, { id: "products", label: "Products", icon: Package }, { id: "contacts", label: "Contacts", icon: Building2 }, { id: "social-links", label: "Social links", icon: Share2 }, { id: "section-images", label: "Page images", icon: FileImage },
];

const tabInfo: Record<Tab, { title: string; description: string }> = {
  overview: { title: "Website overview", description: "A live summary of editable website content." }, settings: { title: "Brand and website", description: "Update the public website name, logo and inquiry destination." }, categories: { title: "Product categories", description: "Organize the product catalog and mega menu." }, products: { title: "Products", description: "Create and maintain product pages, specifications and images." }, contacts: { title: "Customer-service contacts", description: "Manage office contact details shown on the website." }, "social-links": { title: "Social media links", description: "Control the social destinations shown in the footer." }, "section-images": { title: "Page section images", description: "Replace hero, workshop and other section images without changing code." },
};

function ImageField({ label, value, onChange, wide = true }: { label: string; value: string; onChange: (value: string) => void; wide?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  async function upload(file?: File) {
    if (!file) return; setUploading(true);
    try {
      const form = new FormData(); form.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await response.json() as { path?: string; error?: string };
      if (!response.ok || !data.path) throw new Error(data.error || "Upload failed.");
      onChange(data.path);
    } catch (error) { window.alert(error instanceof Error ? error.message : "Upload failed."); } finally { setUploading(false); }
  }
  return <label className={`admin-field${wide ? " is-wide" : ""}`}>{label}<div className="admin-upload-field"><input value={value} onChange={(event) => onChange(event.target.value)} placeholder="/uploads/... or /new-site/..." /><input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => upload(event.target.files?.[0])} /><button className="admin-secondary" type="button" onClick={() => inputRef.current?.click()} disabled={uploading}><Upload size={15} />{uploading ? "Uploading" : "Upload"}</button>{value ? <span className="admin-upload-preview"><Image src={value} alt="Current image preview" width={150} height={90} unoptimized /></span> : null}</div></label>;
}

function SettingsPanel({ data, save }: { data: SiteSettings; save: (input: Record<string, unknown>) => Promise<void> }) {
  const [form, setForm] = useState(data); const [saving, setSaving] = useState(false);
  const field = (key: keyof SiteSettings, value: string) => setForm((current) => ({ ...current, [key]: value }));
  return <form className="admin-panel admin-settings" onSubmit={async (event) => { event.preventDefault(); setSaving(true); await save(form); setSaving(false); }}><div className="admin-form-grid"><label className="admin-field">Website name<input value={form.site_name} onChange={(event) => field("site_name", event.target.value)} required /></label><label className="admin-field">Tagline<input value={form.site_tagline} onChange={(event) => field("site_tagline", event.target.value)} /></label><label className="admin-field is-wide">Inquiry email<input type="email" value={form.inquiry_email} onChange={(event) => field("inquiry_email", event.target.value)} required /></label><ImageField label="Company logo" value={form.logo_path} onChange={(value) => field("logo_path", value)} /></div><div className="admin-form-actions"><button className="admin-primary" type="submit" disabled={saving}><Save size={16} />{saving ? "Saving..." : "Save changes"}</button></div></form>;
}

function EditorModal({ editor, categories, close, submit }: { editor: NonNullable<EditorState>; categories: CategoryRecord[]; close: () => void; submit: (resource: Resource, data: Record<string, unknown>, editing: boolean) => Promise<void> }) {
  const editing = Boolean(editor.record);
  const initial = useMemo(() => {
    const source = editor.record || {};
    if (editor.resource === "products") return { ...source, specsText: Array.isArray(source.specs) ? (source.specs as Array<[string,string]>).map((row) => row.join(" | ")).join("\n") : "", featuresText: Array.isArray(source.features) ? (source.features as string[]).join("\n") : "", modelTableText: source.modelTable ? JSON.stringify(source.modelTable, null, 2) : "", category: source.category || categories[0]?.id || "", categoryLabel: source.categoryLabel || categories[0]?.title || "" };
    return { sortOrder: 0, ...source };
  }, [categories, editor.record, editor.resource]);
  const [form, setForm] = useState<Record<string, unknown>>(initial); const [saving, setSaving] = useState(false); const [error, setError] = useState("");
  const set = (key: string, value: unknown) => setForm((current) => ({ ...current, [key]: value }));
  const input = (label: string, key: string, required = false, type = "text", wide = false, disabled = false) => <label className={`admin-field${wide ? " is-wide" : ""}`}>{label}<input type={type} value={String(form[key] ?? "")} onChange={(event) => set(key, event.target.value)} required={required} disabled={disabled} /></label>;
  const area = (label: string, key: string, wide = true, rows = 4) => <label className={`admin-field${wide ? " is-wide" : ""}`}>{label}<textarea rows={rows} value={String(form[key] ?? "")} onChange={(event) => set(key, event.target.value)} /></label>;
  let fields: React.ReactNode;
  if (editor.resource === "categories") fields = <>{input("Category ID (URL key)","id",true,"text",false,editing)}{input("Title","title",true)}{input("Subtitle","subtitle",false,"text",true)}{area("Description","description")}<ImageField label="Category image" value={String(form.image || "")} onChange={(value) => set("image",value)} />{input("Sort order","sortOrder",false,"number")}</>;
  else if (editor.resource === "products") fields = <>{input("URL slug","slug",true)}<label className="admin-field">Category<select value={String(form.category || "")} onChange={(event) => { const category = categories.find((item) => item.id === event.target.value); setForm((current) => ({ ...current, category: event.target.value, categoryLabel: category?.title || "" })); }} required>{categories.map((category) => <option value={category.id} key={category.id}>{category.title}</option>)}</select></label>{input("Product name","name",true,"text",true)}{input("Short name","shortName",true)}{input("Range / capacity","range")}{area("Card summary","summary")}{area("Full description","description")}<ImageField label="Product image" value={String(form.image || "")} onChange={(value) => set("image",value)} />{area("Specifications (one per line: Label | Value)","specsText",true,7)}{area("Features (one per line)","featuresText",true,6)}{area("Model table JSON (optional)","modelTableText",true,7)}{input("Sort order","sortOrder",false,"number")}</>;
  else if (editor.resource === "contacts") fields = <>{input("Office / contact label","label",true,"text",true)}{input("Email","email",false,"email")}{input("Phone display","phone")}{input("WhatsApp number","whatsapp")}{input("Sort order","sortOrder",false,"number")}</>;
  else if (editor.resource === "social-links") fields = <>{input("Platform","platform",true)}{input("Display label","label",true)}{input("URL","url",true,"url",true)}{input("Sort order","sortOrder",false,"number")}</>;
  else fields = <>{input("Page key","pageKey",true)}{input("Section key","sectionKey",true)}{input("Image label","label",true,"text",true)}<ImageField label="Section image" value={String(form.imagePath || "")} onChange={(value) => set("imagePath",value)} />{input("Alternative text","altText",false,"text",true)}{input("Sort order","sortOrder",false,"number")}</>;
  async function save(event: React.FormEvent) {
    event.preventDefault(); setSaving(true); setError("");
    try {
      const payload = { ...form };
      if (editor.resource === "products") {
        payload.specs = String(form.specsText || "").split("\n").map((line) => line.trim()).filter(Boolean).map((line) => { const divider = line.indexOf("|"); return divider < 0 ? [line, ""] : [line.slice(0,divider).trim(), line.slice(divider + 1).trim()]; });
        payload.features = String(form.featuresText || "").split("\n").map((line) => line.trim()).filter(Boolean);
        const table = String(form.modelTableText || "").trim(); payload.modelTable = table ? JSON.parse(table) : null;
      }
      await submit(editor.resource,payload,editing); close();
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to save."); } finally { setSaving(false); }
  }
  return <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><form className="admin-modal" onSubmit={save}><div className="admin-modal-head"><h2>{editing ? "Edit" : "Add"} {tabInfo[editor.resource].title.toLowerCase()}</h2><button className="admin-icon-button" type="button" onClick={close} aria-label="Close"><X /></button></div><div className="admin-modal-body">{error ? <div className="admin-alert">{error}</div> : null}<div className="admin-form-grid">{fields}</div><div className="admin-form-actions"><button className="admin-secondary" type="button" onClick={close}>Cancel</button><button className="admin-primary" type="submit" disabled={saving}><Save size={16} />{saving ? "Saving..." : "Save"}</button></div></div></form></div>;
}

function ResourceTable({ resource, data, edit, remove }: { resource: Resource; data: Bootstrap; edit: (record?: Record<string, unknown>) => void; remove: (id: string | number) => void }) {
  const rows = resource === "categories" ? data.categories : resource === "products" ? data.products : resource === "contacts" ? data.contacts : resource === "social-links" ? data.socialLinks : data.sectionImages;
  if (!rows.length) return <div className="admin-panel admin-empty">No items yet. Use Add to create the first one.</div>;
  return <div className="admin-panel admin-table-wrap"><table className="admin-table"><thead><tr><th>Item</th><th>Details</th><th>Order</th><th aria-label="Actions" /></tr></thead><tbody>{rows.map((raw) => {
    const row = raw as unknown as Record<string, unknown>; const id = resource === "categories" ? String(row.id) : Number(row.id);
    const title = resource === "categories" ? String(row.title) : resource === "products" ? String(row.name) : resource === "contacts" ? String(row.label) : resource === "social-links" ? String(row.label) : String(row.label);
    const image = resource === "categories" ? String(row.image || "") : resource === "products" ? String(row.image || "") : resource === "section-images" ? String(row.imagePath || "") : "";
    const meta = resource === "categories" ? String(row.id) : resource === "products" ? String(row.slug) : resource === "contacts" ? String(row.email || row.phone || "") : resource === "social-links" ? String(row.platform) : `${String(row.pageKey)} / ${String(row.sectionKey)}`;
    const detail = resource === "products" ? String(row.categoryLabel) : resource === "contacts" ? String(row.phone || row.whatsapp || "") : resource === "social-links" ? String(row.url) : resource === "section-images" ? String(row.imagePath) : String(row.subtitle || "");
    return <tr key={`${resource}-${id}`}><td><div style={{ display: "flex", alignItems: "center", gap: 12 }}>{image ? <span className="admin-table-image"><Image src={image} alt="" width={58} height={46} unoptimized /></span> : null}<span><span className="admin-row-title">{title}</span><span className="admin-row-meta">{meta}</span></span></div></td><td>{detail}</td><td>{String(row.sortOrder ?? 0)}</td><td><div className="admin-actions"><button className="admin-icon-button" type="button" onClick={() => edit(row)} aria-label={`Edit ${title}`} title="Edit"><Pencil size={16} /></button><button className="admin-icon-button is-danger" type="button" onClick={() => remove(id)} aria-label={`Delete ${title}`} title="Delete"><Trash2 size={16} /></button></div></td></tr>;
  })}</tbody></table></div>;
}

export function AdminDashboard({ initialData }: { initialData: Bootstrap }) {
  const [active, setActive] = useState<Tab>("overview"); const [data,setData] = useState(initialData); const [editor,setEditor] = useState<EditorState>(null); const [toast,setToast] = useState("");
  function notify(message: string) { setToast(message); window.setTimeout(() => setToast(""), 2800); }
  async function request(resource: string, method: "POST" | "PUT", body: Record<string, unknown>) {
    const response = await fetch(`/api/admin/content/${resource}`, { method, headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    const result = await response.json() as { data?: Bootstrap; error?: string };
    if (!response.ok || !result.data) throw new Error(result.error || "Unable to save content.");
    setData(result.data); notify("Changes saved and published.");
  }
  async function remove(resource: Resource, id: string | number) {
    if (!window.confirm("Delete this item? This cannot be undone.")) return;
    const response = await fetch(`/api/admin/content/${resource}?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    const result = await response.json() as { data?: Bootstrap; error?: string };
    if (!response.ok || !result.data) return window.alert(result.error || "Unable to delete content.");
    setData(result.data); notify("Item deleted.");
  }
  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); window.location.href = "/admin/login"; }
  const info = tabInfo[active];
  return <main className="admin-root"><aside className="admin-sidebar"><div className="admin-logo"><Image src={data.settings.logo_path} alt={data.settings.site_name} width={86} height={34} unoptimized /><span>ADMIN</span></div><nav className="admin-nav" aria-label="Admin navigation">{tabs.map((tab) => { const Icon = tab.icon; return <button type="button" className={active === tab.id ? "is-active" : ""} onClick={() => setActive(tab.id)} key={tab.id} title={tab.label}><Icon size={18} /><span>{tab.label}</span></button>; })}</nav><div className="admin-sidebar-footer"><Link href="/" target="_blank"><ExternalLink size={17} /><span>View website</span></Link><button type="button" onClick={logout}><LogOut size={17} /><span>Sign out</span></button></div></aside><section className="admin-main"><div className="admin-main-inner"><header className="admin-page-head"><div><h1>{info.title}</h1><p>{info.description}</p></div>{active !== "overview" && active !== "settings" ? <button className="admin-primary" type="button" onClick={() => setEditor({ resource: active })}><Plus size={17} />Add item</button> : null}</header>{active === "overview" ? <><div className="admin-stat-grid"><article className="admin-panel admin-stat"><span>Categories</span><strong>{data.categories.length}</strong><small>Catalog groups</small></article><article className="admin-panel admin-stat"><span>Products</span><strong>{data.products.length}</strong><small>Published product pages</small></article><article className="admin-panel admin-stat"><span>Contacts</span><strong>{data.contacts.length}</strong><small>Customer-service offices</small></article><article className="admin-panel admin-stat"><span>Page images</span><strong>{data.sectionImages.length}</strong><small>Managed visual slots</small></article></div><article className="admin-panel admin-overview-note"><h2>SQLite content storage is active</h2><p>Changes made here are written immediately to the local SQLite database and are visible on the public website without rebuilding. Back up the database file and uploaded image folder together when moving or maintaining the VPS.</p></article></> : active === "settings" ? <SettingsPanel data={data.settings} save={(input) => request("settings","PUT",input)} /> : <ResourceTable resource={active} data={data} edit={(record) => setEditor({ resource: active, record })} remove={(id) => remove(active,id)} />}</div></section>{editor ? <EditorModal editor={editor} categories={data.categories} close={() => setEditor(null)} submit={(resource,body,editing) => request(resource,editing ? "PUT" : "POST",body)} /> : null}{toast ? <div className="admin-toast" role="status">{toast}</div> : null}</main>;
}
