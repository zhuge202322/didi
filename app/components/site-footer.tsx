import Link from "next/link";
import { Facebook, Globe2, Linkedin, Mail, MessageCircle, Music2, Phone } from "lucide-react";
import { Brand } from "./brand";
import type { CategoryRecord, ContactRecord, SiteSettings, SocialLinkRecord } from "../../lib/content-store";

const socialIcons = { facebook: Facebook, tiktok: Music2, whatsapp: MessageCircle, linkedin: Linkedin };

export function SiteFooter({ settings, categories, contacts, socialLinks }: { settings: SiteSettings; categories: CategoryRecord[]; contacts: ContactRecord[]; socialLinks: SocialLinkRecord[] }) {
  return (
    <footer className="renewal-footer">
      <div className="renewal-shell renewal-footer-grid">
        <div className="renewal-footer-brand"><Brand logoPath={settings.logo_path} siteName={settings.site_name} /><p>{settings.site_tagline.split(/\s+/).map((word) => <span key={word}>{word}</span>)}</p></div>
        <div><span>PRODUCTS</span>{categories.map((category) => <Link href={`/products#${category.id}`} key={category.id}>{category.title}</Link>)}</div>
        <div><span>COMPANY</span><Link href="/about">About Us</Link><Link href="/#factory">Our Workshop</Link><Link href="/#contact">Contact Us</Link></div>
        <div className="renewal-footer-contact">
          <span>CONTACT</span>
          {contacts.map((contact) => <div key={contact.id}><strong>{contact.label}</strong>{contact.email ? <a href={`mailto:${contact.email}`}><Mail size={16} /> {contact.email}</a> : null}{contact.phone ? <a href={`tel:${contact.phone.replace(/\s/g, "")}`}><Phone size={16} /> {contact.phone}</a> : null}</div>)}
        </div>
      </div>
      <div className="renewal-shell renewal-footer-bottom">
        <span>© 2026 {settings.site_name}</span>
        <div className="renewal-socials" aria-label="Social media">
          {socialLinks.map((link) => { const Icon = socialIcons[link.platform.toLowerCase() as keyof typeof socialIcons] || Globe2; return <a href={link.url} target="_blank" rel="noreferrer" aria-label={link.label} key={link.id}><Icon /></a>; })}
        </div>
      </div>
    </footer>
  );
}
