"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { Brand } from "./brand";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="renewal-header">
      <div className="renewal-shell renewal-header-inner">
        <Link href="/" onClick={() => setOpen(false)}><Brand /></Link>
        <nav className={open ? "renewal-nav is-open" : "renewal-nav"} aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link className={item.href === pathname || (item.href === "/products" && pathname.startsWith("/products")) ? "is-current" : ""} href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </nav>
        <div className="renewal-header-actions">
          <a className="renewal-whatsapp" href="https://wa.me/8613735536084" target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a>
          <button className="renewal-menu" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
    </header>
  );
}
