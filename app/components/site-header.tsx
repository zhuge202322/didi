"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import type { CategoryRecord, SiteSettings } from "../../lib/content-store";
import { Brand } from "./brand";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader({ settings, categories }: { settings: SiteSettings; categories: CategoryRecord[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="renewal-header">
      <div className="renewal-shell renewal-header-inner">
        <Link href="/" onClick={() => setOpen(false)}><Brand logoPath={settings.logo_path} siteName={settings.site_name} /></Link>
        <nav className={open ? "renewal-nav is-open" : "renewal-nav"} aria-label="Primary navigation">
          <Link className={pathname === "/" ? "renewal-nav-link is-current" : "renewal-nav-link"} href="/">Home</Link>
          <div className="renewal-products-nav">
            <Link className={pathname.startsWith("/products") ? "renewal-nav-link is-current" : "renewal-nav-link"} href="/products" aria-haspopup="true">Products <ChevronDown size={15} /></Link>
            <div className="renewal-mega-menu" aria-label="Product categories">
              <div className="renewal-shell renewal-mega-grid">
                {categories.map((category) => (
                  <Link className="renewal-mega-category" href={`/products#${category.id}`} key={category.id}>
                    <span className="renewal-mega-image"><Image src={category.image} alt={category.title} fill sizes="132px" /></span>
                    <span className="renewal-mega-copy"><strong>{category.title}</strong><small>{category.subtitle}</small></span>
                    <ArrowUpRight size={18} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {navigation.slice(1).map((item) => (
            <Link className={item.href === pathname ? "renewal-nav-link is-current" : "renewal-nav-link"} href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </nav>
        <div className="renewal-header-actions">
          <button className="renewal-menu" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
    </header>
  );
}
