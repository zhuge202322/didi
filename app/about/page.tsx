import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Factory, Handshake, SearchCheck, Truck } from "lucide-react";
import { getSectionImages } from "../../lib/content-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | YnJoy Energy",
  description: "Jiaxing Easyon Technology provides renewable energy sourcing, supplier coordination, quality inspection, logistics and after-sales support.",
};

export default function AboutPage() {
  const hero = getSectionImages("about", "hero")[0];
  const gallery = getSectionImages("shared", "workshop");
  return (
    <main className="renewal-about-page">
      <section className="renewal-about-hero">
        <Image src={hero?.imagePath || "/new-site/about-background.png"} alt={hero?.altText || "YnJoy renewable energy project team"} fill priority sizes="100vw" />
        <div className="renewal-shell"><div><span>ABOUT US</span><h1>A dependable sourcing partner for global renewable energy projects.</h1><p>Professional communication, coordinated manufacturing resources and clear export support from Jiaxing, China.</p></div></div>
      </section>

      <section className="renewal-story">
        <div className="renewal-shell renewal-story-grid">
          <div><span>Jiaxing Easyon Technology Co., Ltd.</span><h2>Integrated products. One accountable workflow.</h2></div>
          <div><p>We are a China-based export and sourcing company specializing in integrated renewable energy solutions. Through our trusted manufacturing network, we provide high-quality solar panels, inverters, lithium batteries, energy storage systems and related accessories to customers worldwide.</p><p>Working closely with experienced manufacturing partners in China, we combine reliable production resources with professional international trade services. From product selection and supplier coordination to quality inspection, logistics and after-sales support, we help customers simplify procurement and reduce sourcing risks.</p><p>Our manufacturing partners are equipped with advanced production facilities, strict quality management systems and comprehensive testing procedures, helping products meet international quality standards and customer expectations.</p></div>
        </div>
      </section>

      <section className="renewal-values">
        <div className="renewal-shell"><div className="renewal-section-head"><span>HOW WE WORK</span><h2>Support across the sourcing cycle.</h2></div><div className="renewal-value-grid"><article><SearchCheck /><h3>Product selection</h3><p>Match the application, destination and budget to an appropriate product and model shortlist.</p></article><article><Factory /><h3>Supplier coordination</h3><p>Align specifications, accessories, production and packing across trusted manufacturing partners.</p></article><article><Check /><h3>Quality inspection</h3><p>Confirm model identity, agreed checks and shipment preparation before dispatch.</p></article><article><Truck /><h3>Logistics support</h3><p>Coordinate export packing, documents and shipment planning with the order.</p></article></div></div>
      </section>

      <section className="renewal-gallery"><div className="renewal-shell renewal-about-gallery">{gallery.map((image) => <figure key={image.id}><Image src={image.imagePath} alt={image.altText || image.label} fill sizes="(max-width: 700px) 100vw, 50vw" /></figure>)}</div></section>

      <section className="renewal-mission"><div className="renewal-shell"><Handshake /><div><span>OUR MISSION</span><h2>Make sourcing renewable energy products from China easier, more efficient and more reliable.</h2></div><Link className="renewal-button" href="/#contact">Start a conversation <ArrowRight size={18} /></Link></div></section>
    </main>
  );
}
