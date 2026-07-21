import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Check, Download, FileCheck2, PackageCheck, SearchCheck, ShieldCheck } from "lucide-react";
import { PageHero } from "../components/page-hero";

export const metadata: Metadata = {
  title: "Quality & Documentation | Yujie Energy Systems",
  description: "Review Yujie's model verification, pre-shipment inspection, product documentation and export packing workflow.",
};

const documents = [
  { title: "SYP hybrid inverter catalog", note: "Nine model specification pages", href: "/downloads/syp-hybrid-inverter-catalog.pdf" },
  { title: "MEGA 6-16kW datasheet", note: "IP65 hybrid reference data", href: "/downloads/mega-6-16kw-ip65.pdf" },
  { title: "LX100 IEC 62109 report", note: "65-page family test report", href: "/downloads/lx100-iec62109-test-report.pdf" },
  { title: "LiFePO4 battery MSDS", note: "48V100Ah material safety reference", href: "/downloads/fuyue-48v100ah-msds.pdf" },
];

export default function QualityPage() {
  return (
    <main className="inner-page">
      <PageHero index="QUALITY / 03" title="Quality evidence organized around the selected model." copy="Technical procurement depends on verified specifications, available test evidence, inspection visibility and export-ready documentation." image="/products/factory-testing.jpg" imageAlt="Electrical testing during quality inspection" primary={{ label: "Request a document package", href: "/contact" }} secondary={{ label: "View products", href: "/products" }} />

      <section className="quality-principles-section">
        <div className="page-shell quality-principles-layout">
          <div className="quality-principles-title reveal"><span>QUALITY APPROACH</span><h2>Documents, inspection and packing connected to one order record.</h2><p>Availability varies by product and model. We identify what is supplied, what requires confirmation and what the destination market may require.</p></div>
          <div className="quality-principles-grid reveal">
            <article><SearchCheck /><span>01</span><h3>Model verification</h3><p>Match quotation, nameplate, specification row and ordered accessories.</p></article>
            <article><ShieldCheck /><span>02</span><h3>Test evidence review</h3><p>Organize available test reports, declarations and battery transport references.</p></article>
            <article><BadgeCheck /><span>03</span><h3>Inspection checkpoints</h3><p>Coordinate visual, quantity, configuration and packing review before shipment.</p></article>
            <article><PackageCheck /><span>04</span><h3>Export preparation</h3><p>Align labels, cartons, wooden cases and container planning with the order.</p></article>
          </div>
        </div>
      </section>

      <section className="inspection-band-section">
        <div className="page-shell inspection-band-layout">
          <div className="inspection-band-media reveal"><Image src="/products/factory-production.jpg" alt="Industrial production workshop" fill sizes="(max-width: 900px) 100vw, 55vw" /></div>
          <div className="inspection-band-copy reveal"><span>PRE-SHIPMENT REVIEW</span><h2>Confirm the product before it enters the export workflow.</h2><div className="inspection-checks"><div><Check />Model and quantity check</div><div><Check />Visible condition and accessories</div><div><Check />Agreed test or function records</div><div><Check />Packing marks and package count</div><div><Check />Photo and document collection</div></div></div>
        </div>
      </section>

      <section className="document-library-section">
        <div className="page-shell document-library-layout">
          <div className="document-library-title reveal"><span>DOCUMENT LIBRARY</span><h2>Source files available for technical review.</h2><p>These files were supplied with the current product materials. Request model-specific additions through an RFQ.</p></div>
          <div className="document-library-list reveal">{documents.map((document) => <a href={document.href} target="_blank" rel="noreferrer" key={document.href}><FileCheck2 /><div><strong>{document.title}</strong><span>{document.note}</span></div><Download /></a>)}</div>
        </div>
      </section>

      <section className="quality-gallery-section">
        <div className="page-shell quality-gallery-grid reveal">
          <figure><Image src="/products/factory-testing.jpg" alt="Electrical product testing" fill sizes="50vw" /><figcaption><span>01</span>Electrical testing</figcaption></figure>
          <figure><Image src="/products/factory-packing.jpg" alt="Export packing preparation" fill sizes="25vw" /><figcaption><span>02</span>Export packing</figcaption></figure>
          <figure><Image src="/products/factory-loading.jpg" alt="Container loading preparation" fill sizes="25vw" /><figcaption><span>03</span>Container loading</figcaption></figure>
        </div>
      </section>

      <section className="inner-cta-section"><div className="page-shell inner-cta reveal"><div><span>DOCUMENT-LED PROCUREMENT</span><h2>Tell us the model and destination market you need to review.</h2></div><Link className="button button-orange" href="/contact">Request the document set <ArrowRight size={18} /></Link></div></section>
    </main>
  );
}
