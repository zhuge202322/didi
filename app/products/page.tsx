import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, FileSearch, SlidersHorizontal, Truck } from "lucide-react";
import { PageHero } from "../components/page-hero";
import { ProductLinkCard } from "../components/product-link-card";
import { productCatalog } from "../catalog-data";

export const metadata: Metadata = {
  title: "Products | Yujie Energy Systems",
  description: "Explore hybrid inverters, solar pump drives, industrial drives, LiFePO4 batteries, solar modules and complete ESS supply for B2B projects.",
};

export default function ProductsPage() {
  return (
    <main className="inner-page">
      <PageHero
        index="PRODUCT CENTER / 01"
        title="Industrial energy equipment, organized for procurement."
        copy="Compare eight product families, review model-level data and move directly from technical shortlist to an export-ready RFQ."
        image="/assets/inverter-lineup.jpg"
        imageAlt="Industrial inverter product lineup"
        primary={{ label: "Start an RFQ", href: "/contact" }}
        secondary={{ label: "Review quality process", href: "/quality" }}
      />

      <section className="product-overview-rail" aria-label="Product center overview">
        <div className="page-shell">
          <div><strong>8</strong><span>Product families</span></div>
          <div><strong>37+</strong><span>Documented model configurations</span></div>
          <div><strong>2.2-200kW</strong><span>Solar pump drive range</span></div>
          <div><strong>5.12-30.72kWh</strong><span>Documented battery range</span></div>
        </div>
      </section>

      <section className="product-index-section">
        <div className="page-shell">
          <div className="inner-section-heading reveal">
            <span>COMPLETE PORTFOLIO</span>
            <h2>Select by application, then confirm the exact model.</h2>
            <p>Every detail page separates verified document data from project-specific items that require quotation confirmation.</p>
          </div>
          <div className="product-index-grid">
            {productCatalog.map((product, index) => <ProductLinkCard product={product} index={index} key={product.slug} />)}
          </div>
        </div>
      </section>

      <section className="selection-process-section">
        <div className="page-shell selection-process-layout">
          <div className="selection-process-title reveal">
            <span>TECHNICAL SELECTION</span>
            <h2>A shorter path from requirement to shipment.</h2>
            <p>Our role is to translate the application into a clean product shortlist, documentation package and export plan.</p>
          </div>
          <div className="selection-process-list reveal">
            <article><span>01</span><SlidersHorizontal /><div><h3>Define the operating brief</h3><p>Share voltage, load, motor or pump data, autonomy, destination and quantity.</p></div></article>
            <article><span>02</span><FileSearch /><div><h3>Review models and documents</h3><p>Compare the relevant specification rows, datasheets, test evidence and transport references.</p></div></article>
            <article><span>03</span><Check /><div><h3>Confirm the commercial scope</h3><p>Finalize model, accessories, packing, inspection checkpoints and order terms.</p></div></article>
            <article><span>04</span><Truck /><div><h3>Coordinate export delivery</h3><p>Align production follow-up, pre-shipment review, packing and logistics preparation.</p></div></article>
          </div>
        </div>
      </section>

      <section className="inner-cta-section">
        <div className="page-shell inner-cta reveal">
          <div><span>NEED A MODEL SHORTLIST?</span><h2>Send your application, destination and target quantity.</h2></div>
          <Link className="button button-orange" href="/contact">Build my RFQ <ArrowRight size={18} /></Link>
        </div>
      </section>
    </main>
  );
}
