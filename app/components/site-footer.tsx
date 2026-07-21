import Link from "next/link";
import { Brand } from "./brand";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-top">
        <div><Brand /><p>Industrial solar conversion, motor control and lithium storage supply for international B2B projects.</p></div>
        <div>
          <span>PRODUCTS</span>
          <Link href="/products/syp-hybrid-inverters">Hybrid inverters</Link>
          <Link href="/products/lx100-solar-pump-drives">Solar pump drives</Link>
          <Link href="/products/lifepo4-battery-packs">LiFePO4 batteries</Link>
          <Link href="/products/ess-and-accessories">Solar & ESS systems</Link>
        </div>
        <div>
          <span>DOCUMENTS</span>
          <a href="/downloads/syp-hybrid-inverter-catalog.pdf" target="_blank" rel="noreferrer">SYP catalog</a>
          <a href="/downloads/mega-6-16kw-ip65.pdf" target="_blank" rel="noreferrer">MEGA datasheet</a>
          <a href="/downloads/lx100-iec62109-test-report.pdf" target="_blank" rel="noreferrer">IEC test report</a>
          <a href="/downloads/fuyue-48v100ah-msds.pdf" target="_blank" rel="noreferrer">Battery MSDS</a>
        </div>
        <div>
          <span>COMPANY</span>
          <Link href="/about">About Yujie</Link>
          <Link href="/quality">Quality process</Link>
          <Link href="/contact">Request a quote</Link>
          <a href="mailto:sales@yj-energy.com">Contact sales</a>
        </div>
      </div>
      <div className="page-shell footer-bottom"><span>© 2026 Jiaxing Yujie Intelligent Technology Co., Ltd.</span><span>Professional · Reliable · Global</span></div>
    </footer>
  );
}
