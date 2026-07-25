import Link from "next/link";
import { Facebook, Linkedin, Mail, MessageCircle, Music2 } from "lucide-react";
import { Brand } from "./brand";

const companyQuery = encodeURIComponent("Jiaxing Easyon Technology Co., Ltd.");

export function SiteFooter() {
  return (
    <footer className="renewal-footer">
      <div className="renewal-shell renewal-footer-grid">
        <div className="renewal-footer-brand"><Brand /><p>Integrated renewable energy sourcing and export support from Jiaxing, China.</p></div>
        <div><span>PRODUCTS</span><Link href="/products#hybrid">Hybrid Solar Inverter</Link><Link href="/products#pump">Solar Pump Inverter</Link><Link href="/products#battery">LiFePO4 Battery</Link></div>
        <div><span>COMPANY</span><Link href="/about">About Us</Link><Link href="/#factory">Our Network</Link><Link href="/#contact">Contact Us</Link></div>
        <div className="renewal-footer-contact"><span>CONTACT</span><a href="mailto:fangdan0328@gmail.com"><Mail size={16} /> fangdan0328@gmail.com</a><a href="https://wa.me/8613735536084" target="_blank" rel="noreferrer"><MessageCircle size={16} /> +86 137 3553 6084</a></div>
      </div>
      <div className="renewal-shell renewal-footer-bottom">
        <span>© 2026 Jiaxing Easyon Technology Co., Ltd.</span>
        <div className="renewal-socials" aria-label="Social media">
          <a href={`https://www.facebook.com/search/top?q=${companyQuery}`} target="_blank" rel="noreferrer" aria-label="Find us on Facebook"><Facebook /></a>
          <a href={`https://www.tiktok.com/search?q=${companyQuery}`} target="_blank" rel="noreferrer" aria-label="Find us on TikTok"><Music2 /></a>
          <a href="https://wa.me/8613735536084" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle /></a>
          <a href={`https://www.linkedin.com/search/results/companies/?keywords=${companyQuery}`} target="_blank" rel="noreferrer" aria-label="Find us on LinkedIn"><Linkedin /></a>
        </div>
      </div>
    </footer>
  );
}
