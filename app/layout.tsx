import type { Metadata } from "next";
import "./globals.css";
import { RevealManager } from "./components/reveal-manager";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { getCategories, getContacts, getSiteSettings, getSocialLinks } from "../lib/content-store";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  const settings = getSiteSettings();
  return { title: `${settings.site_name} | Renewable Energy Solutions`, description: "Hybrid solar inverters, solar pump inverters and LiFePO4 battery solutions with sourcing and export support from Jiaxing, China." };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = getSiteSettings();
  const categories = getCategories();
  const contacts = getContacts();
  const socialLinks = getSocialLinks();
  return (
    <html lang="en">
      <body>
        <SiteHeader settings={settings} categories={categories} />
        <RevealManager />
        {children}
        <SiteFooter settings={settings} categories={categories} contacts={contacts} socialLinks={socialLinks} />
      </body>
    </html>
  );
}
