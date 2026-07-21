import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Factory, Globe2, Handshake, SearchCheck, ShieldCheck, Truck } from "lucide-react";
import { PageHero } from "../components/page-hero";

export const metadata: Metadata = {
  title: "About Us | Yujie Energy Systems",
  description: "Learn how Jiaxing Yujie Intelligent Technology coordinates renewable energy sourcing, quality inspection, logistics and after-sales support for global B2B customers.",
};

const buyerRoles = ["Distributors and wholesalers", "EPC contractors", "Installers and system integrators", "OEM and machinery manufacturers", "Project developers", "Direct industrial buyers"];

export default function AboutPage() {
  return (
    <main className="inner-page">
      <PageHero
        index="ABOUT YUJIE / 02"
        title="A China-based renewable energy sourcing partner for global B2B buyers."
        copy="Jiaxing Yujie Intelligent Technology connects trusted manufacturing resources with professional international trade services."
        image="/products/factory-production.jpg"
        imageAlt="Renewable energy equipment production workshop"
        primary={{ label: "Discuss your project", href: "/contact" }}
        secondary={{ label: "Explore products", href: "/products" }}
      />

      <section className="about-intro-section">
        <div className="page-shell about-intro-layout">
          <div className="about-intro-title reveal"><span>JIAxing, CHINA</span><h2>Reliable products. Clear communication. One accountable export workflow.</h2></div>
          <div className="about-intro-copy reveal">
            <p>Jiaxing Yujie Intelligent Technology Co., Ltd. is a China-based export and sourcing company specializing in integrated renewable energy solutions.</p>
            <p>Through a trusted manufacturing network, we supply solar panels, inverters, lithium batteries, energy storage systems and related accessories to customers worldwide.</p>
          </div>
        </div>
      </section>

      <section className="about-network-section">
        <div className="page-shell about-network-layout">
          <div className="about-network-media reveal"><Image src="/products/factory-white-units.jpg" alt="Industrial power equipment prepared in a workshop" fill sizes="(max-width: 900px) 100vw, 48vw" /><span>MANUFACTURING NETWORK / CHINA</span></div>
          <div className="about-network-copy reveal"><span>HOW WE WORK</span><h2>Manufacturing resources connected to professional trade execution.</h2><p>We work closely with experienced manufacturing partners and combine production resources with product selection, supplier coordination, quality inspection, logistics and after-sales support.</p><div className="about-check-list"><div><Check />Simplified procurement</div><div><Check />Reduced sourcing risk</div><div><Check />Model-level document review</div><div><Check />Export packing coordination</div></div></div>
        </div>
      </section>

      <section className="company-values-section">
        <div className="page-shell">
          <div className="inner-section-heading reveal"><span>PARTNERSHIP PRINCIPLES</span><h2>Built for long-term B2B cooperation.</h2><p>Our company introduction defines four operating principles for every customer relationship.</p></div>
          <div className="company-values-grid">
            <article className="reveal"><ShieldCheck /><span>01</span><h3>Professionalism</h3><p>Clear product information, structured technical review and disciplined project follow-up.</p></article>
            <article className="reveal"><Handshake /><span>02</span><h3>Integrity</h3><p>Transparent communication about available documents, product scope and confirmation points.</p></article>
            <article className="reveal"><SearchCheck /><span>03</span><h3>Efficiency</h3><p>A single sourcing path from requirement and model shortlist to inspection and export preparation.</p></article>
            <article className="reveal"><Globe2 /><span>04</span><h3>Dependable service</h3><p>Responsive support for international buyers before, during and after the order process.</p></article>
          </div>
        </div>
      </section>

      <section className="buyer-role-section">
        <div className="page-shell buyer-role-layout">
          <div className="buyer-role-copy reveal"><span>WHO WE SUPPORT</span><h2>Commercial buyers with real technical and delivery requirements.</h2><p>Our model is designed for companies that need coordinated products, documents and export support rather than a generic online catalog.</p><Link className="button button-orange" href="/contact">Introduce your company <ArrowRight size={18} /></Link></div>
          <div className="buyer-role-list reveal">{buyerRoles.map((role, index) => <div key={role}><span>{String(index + 1).padStart(2, "0")}</span><strong>{role}</strong></div>)}</div>
        </div>
      </section>

      <section className="about-process-section">
        <div className="page-shell">
          <div className="inner-section-heading reveal"><span>ONE COORDINATED PROCESS</span><h2>From sourcing brief to global delivery.</h2><p>Every stage is organized around the selected model, required documents and the customer&apos;s destination.</p></div>
          <div className="about-process-grid">
            <article className="reveal"><span>01</span><SearchCheck /><h3>Product selection</h3><p>Translate the application and commercial brief into an appropriate supplier and model shortlist.</p></article>
            <article className="reveal"><span>02</span><Factory /><h3>Supplier coordination</h3><p>Align production resources, specifications, accessories and order requirements.</p></article>
            <article className="reveal"><span>03</span><ShieldCheck /><h3>Quality inspection</h3><p>Review model identity, testing, packing details and agreed inspection checkpoints.</p></article>
            <article className="reveal"><span>04</span><Truck /><h3>Logistics support</h3><p>Coordinate export packing, documents and shipment preparation with the order plan.</p></article>
          </div>
        </div>
      </section>

      <section className="factory-story-gallery">
        <div className="page-shell">
          <div className="factory-story-grid reveal">
            <figure><Image src="/products/factory-testing.jpg" alt="Factory electrical testing" fill sizes="50vw" /><figcaption>Electrical testing</figcaption></figure>
            <figure><Image src="/products/factory-packing.jpg" alt="Products prepared for export packing" fill sizes="25vw" /><figcaption>Export packing</figcaption></figure>
            <figure><Image src="/products/factory-loading.jpg" alt="Products loaded for export shipment" fill sizes="25vw" /><figcaption>Shipment preparation</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="inner-cta-section"><div className="page-shell inner-cta reveal"><div><span>OUR MISSION</span><h2>Make renewable energy sourcing from China easier, more efficient and more reliable.</h2></div><Link className="button button-orange" href="/contact">Start a conversation <ArrowRight size={18} /></Link></div></section>
    </main>
  );
}
