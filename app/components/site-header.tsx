"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Globe2, Menu, X } from "lucide-react";
import { Brand } from "./brand";

const navigation = [
  { label: "Home", href: "/", match: (path: string) => path === "/" },
  { label: "Products", href: "/products", match: (path: string) => path.startsWith("/products") },
  { label: "Solutions", href: "/#solutions", match: () => false },
  { label: "Quality", href: "/quality", match: (path: string) => path === "/quality" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const dropdowns: Record<string, Array<{ label: string; href: string; note: string }>> = {
    Products: [
      { label: "Hybrid inverters", href: "/products/syp-hybrid-inverters", note: "SYP + MEGA" },
      { label: "Solar pump drives", href: "/products/lx100-solar-pump-drives", note: "LX100 + 33PV" },
      { label: "Industrial drives", href: "/products/lx200-industrial-drives", note: "LX200" },
      { label: "LiFePO4 storage", href: "/products/lifepo4-battery-packs", note: "100-600Ah" },
      { label: "Solar modules", href: "/products/solar-modules", note: "Project sourcing" },
      { label: "ESS & accessories", href: "/products/ess-and-accessories", note: "Complete systems" },
    ],
    Solutions: [
      { label: "Residential ESS", href: "/products/ess-and-accessories", note: "PV + storage" },
      { label: "Solar pumping", href: "/products/lx100-solar-pump-drives", note: "Water control" },
      { label: "Industrial motor control", href: "/products/lx200-industrial-drives", note: "OEM projects" },
      { label: "View ecosystem", href: "/#solutions", note: "Four critical systems" },
    ],
    Company: [
      { label: "About Yujie", href: "/about", note: "Our approach" },
      { label: "Quality & documents", href: "/quality", note: "Inspection + files" },
      { label: "Request a quote", href: "/contact", note: "Project RFQ" },
    ],
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        <Link href="/" onClick={() => setMenuOpen(false)}><Brand /></Link>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
          {navigation.map((item) => {
            const children = dropdowns[item.label];
            return (
              <div className={`nav-item ${children ? "has-dropdown" : ""}`} key={item.label}>
                <Link className={item.match(pathname) ? "is-current" : ""} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}{children && <span className="nav-caret" aria-hidden="true" />}</Link>
                {children && <div className="nav-dropdown" role="menu">{children.map((child) => <Link href={child.href} role="menuitem" key={child.href} onClick={() => setMenuOpen(false)}><span>{child.label}</span><small>{child.note}</small></Link>)}</div>}
              </div>
            );
          })}
          <div className="nav-item has-dropdown nav-company-item">
            <Link className={pathname === "/about" || pathname === "/quality" || pathname === "/contact" ? "is-current" : ""} href="/about" onClick={() => setMenuOpen(false)}>Company<span className="nav-caret" aria-hidden="true" /></Link>
            <div className="nav-dropdown nav-dropdown-compact" role="menu">{dropdowns.Company.map((child) => <Link href={child.href} role="menuitem" key={child.href} onClick={() => setMenuOpen(false)}><span>{child.label}</span><small>{child.note}</small></Link>)}</div>
          </div>
        </nav>
        <div className="header-tools">
          <span className="language"><Globe2 size={17} /> EN</span>
          <Link className="header-cta" href="/contact">Request a quote <ArrowRight size={17} /></Link>
          <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
