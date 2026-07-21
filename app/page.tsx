"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  Download,
  Factory,
  FileCheck2,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { productCatalog } from "./catalog-data";
import { batteryModels, lx100Models, megaModels, sypModels } from "./product-data";

const heroSlides = [
  {
    image: "/products/factory-production.jpg",
    alt: "Industrial inverter production workshop",
    title: <>Industrial energy systems<br />engineered for <em>global projects.</em></>,
    copy: "Solar conversion, motor control and lithium storage equipment backed by model-level selection, inspection and export coordination.",
  },
  {
    image: "/assets/solar-field.jpg",
    alt: "Utility scale solar power installation",
    title: <>From solar generation<br />to <em>resilient storage.</em></>,
    copy: "A coordinated product portfolio for distributors, EPC contractors and industrial project teams operating across global markets.",
  },
  {
    image: "/products/factory-loading.jpg",
    alt: "Export products prepared for global shipment",
    title: <>Built, inspected and packed<br />for <em>global delivery.</em></>,
    copy: "One accountable sourcing partner from technical shortlist and document review through quality inspection, packing and container loading.",
  },
] as const;

const partnerTypes = [
  "DISTRIBUTION PARTNERS",
  "EPC CONTRACTORS",
  "SYSTEM INTEGRATORS",
  "OEM NETWORKS",
  "INDUSTRIAL PROJECTS",
  "ENERGY DEVELOPERS",
] as const;

function SectionHeading({ label, title, copy, align = "left" }: { label: string; title: string; copy: string; align?: "left" | "center" }) {
  return (
    <div className={`section-heading ${align === "center" ? "is-centered" : ""}`}>
      <span>{label}</span>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

function SpecRows({ rows }: { rows: Array<[string, string]> }) {
  return (
    <div className="spec-rows">
      {rows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
    </div>
  );
}

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [activeSyp, setActiveSyp] = useState(4);
  const [activeBattery, setActiveBattery] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  const syp = sypModels[activeSyp];
  const battery = batteryModels[activeBattery];

  useEffect(() => {
    if (heroPaused) return;
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % heroSlides.length), 5000);
    return () => window.clearInterval(timer);
  }, [heroPaused]);

  const changeSlide = (direction: number) => {
    setActiveSlide((current) => (current + direction + heroSlides.length) % heroSlides.length);
  };

  return (
    <main>
      <section
        className="hero-carousel"
        id="top"
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
        aria-roledescription="carousel"
        aria-label="Yujie industrial energy capabilities"
      >
        {heroSlides.map((slide, index) => (
          <div className={`hero-slide ${activeSlide === index ? "is-active" : ""}`} style={{ position: "absolute" }} aria-hidden={activeSlide !== index} key={slide.image}>
            <Image src={slide.image} alt={slide.alt} fill priority sizes="100vw" />
            <div className="hero-scrim" />
          </div>
        ))}
        <div className="hero-content">
          <div className="hero-copy" key={activeSlide}>
            <h1>{heroSlides[activeSlide].title}</h1>
            <p>{heroSlides[activeSlide].copy}</p>
            <div className="hero-actions">
              <a className="button button-orange" href="#contact">Start your RFQ <ArrowRight size={19} /></a>
              <a className="button button-ghost" href="#products">Explore products <ChevronRight size={19} /></a>
            </div>
          </div>
        </div>
        <div className="hero-controls">
          <div className="hero-dots" role="tablist" aria-label="Choose hero slide">
            {heroSlides.map((_, index) => (
              <button key={index} type="button" aria-label={`Show slide ${index + 1}`} aria-selected={activeSlide === index} onClick={() => setActiveSlide(index)}>
                <span className={activeSlide === index ? "is-active" : ""} />
              </button>
            ))}
          </div>
          <div className="hero-arrows">
            <button type="button" aria-label="Previous slide" onClick={() => changeSlide(-1)}><ArrowLeft /></button>
            <button type="button" aria-label="Next slide" onClick={() => changeSlide(1)}><ArrowRight /></button>
          </div>
        </div>
        <div className="hero-proof">
          <span><ShieldCheck /> Model-level specifications</span>
          <span><Factory /> Production & inspection visibility</span>
          <span><PackageCheck /> Export-ready coordination</span>
        </div>
      </section>

      <section className="intro-band">
        <div className="page-shell intro-layout reveal">
          <span className="intro-index">01</span>
          <h2>Industrial energy equipment selected around the application—not a generic catalog.</h2>
          <p>We connect real model data, compliance documents, quality control and export execution into one clear B2B procurement process.</p>
        </div>
      </section>

      <section className="feature-showcase" id="solutions">
        <div className="feature-showcase-layout page-shell">
          <div className="feature-sticky-title">
            <span>ENGINEERED PRODUCT ECOSYSTEM</span>
            <strong>One supply partner.<br />Four critical systems.</strong>
            <p>Match power conversion, motor control and storage hardware to one coordinated export project.</p>
            <div className="feature-range-rail" aria-label="Product range overview">
              <span><strong>1.5–16kW</strong>INVERTERS</span>
              <span><strong>2.2–200kW</strong>PUMP DRIVES</span>
              <span><strong>5.12–30.72kWh</strong>STORAGE</span>
              <span><strong>PV + ESS</strong>SYSTEMS</span>
            </div>
            <a href="#specifications">Review model-level data <ArrowRight size={17} /></a>
          </div>
          <div className="feature-story-rail">
            <article className="feature-story reveal">
              <span>01 / POWER CONVERSION</span>
              <h3>SYP and MEGA inverter platforms.</h3>
              <p>From compact 1.5kW off-grid installations to 16kW IP65 hybrid systems with parallel expansion and high-current charging.</p>
              <ul><li>Pure sine wave output</li><li>Wide MPPT operating windows</li><li>Lithium communication support</li></ul>
            </article>
            <article className="feature-story reveal">
              <span>02 / WATER & MOTOR CONTROL</span>
              <h3>Solar pump and industrial drive control.</h3>
              <p>LX100, 33PV and LX200 platforms cover solar pumping, hybrid AC/DC input and demanding industrial motor applications.</p>
              <ul><li>2.2–200kW listed range</li><li>23 LX100 configurations</li><li>Automatic MPPT tracking</li></ul>
            </article>
            <article className="feature-story reveal">
              <span>03 / LITHIUM STORAGE</span>
              <h3>Project-ready LiFePO4 battery packs.</h3>
              <p>Wheeled battery systems with integrated BMS, LCD interface and RS485, RS232 and CAN communications.</p>
              <ul><li>5.12–30.72kWh energy range</li><li>Grade A LiFePO4 cells</li><li>MSDS and transport documentation</li></ul>
            </article>
            <article className="feature-story reveal">
              <span>04 / COMPLETE ENERGY SYSTEMS</span>
              <h3>PV modules, ESS and balance of system.</h3>
              <p>Module selection, storage architecture, monitoring, protection, cabling and packing coordinated around the project brief.</p>
              <ul><li>Residential and commercial ESS</li><li>Accessories and monitoring</li><li>Project-based export packaging</li></ul>
            </article>
          </div>
        </div>
      </section>

      <section className="catalog-section" id="products">
        <div className="page-shell">
          <SectionHeading
            label="02 / PRODUCT CATALOG"
            title="Equipment built for real operating conditions."
            copy="Eight product families cover solar generation, power conversion, motor control, lithium storage and complete ESS supply."
          />
          <div className="catalog-grid">
            {productCatalog.map((product, index) => (
              <a className={`product-card reveal card-${index + 1}`} href={`/products/${product.slug}`} key={product.slug}>
                <div className={`product-card-media ${product.imageClass}`} style={{ position: "relative" }}>
                  <Image src={product.image} alt={`${product.shortTitle} product family`} fill priority={index === 2} sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                </div>
                <div className="product-card-copy">
                  <span>{product.code}</span>
                  <div><h3>{product.shortTitle}</h3><ArrowRight size={22} /></div>
                  <strong>{product.range}</strong>
                  <p>{product.summary}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="spec-library" id="specifications">
        <div className="page-shell">
          <SectionHeading
            label="03 / MODEL-LEVEL DATA"
            title="Select the exact model—not just the product family."
            copy="The specification library below is transcribed from the product PDFs supplied with this project. Original documents remain available for review."
          />

          <div className="selector-panel reveal">
            <div className="selector-tabs" role="tablist" aria-label="SYP inverter models">
              {sypModels.map((model, index) => (
                <button type="button" key={model.id} className={activeSyp === index ? "is-active" : ""} aria-selected={activeSyp === index} onClick={() => setActiveSyp(index)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>{model.label}
                </button>
              ))}
            </div>
            <div className="selected-product">
              <div className="selected-product-media">
                <Image key={syp.image} src={syp.image} alt={`${syp.name} hybrid inverter`} width={620} height={760} />
                <span>SYP SERIES</span>
              </div>
              <div className="selected-product-data">
                <div className="selected-product-head"><div><span>SELECTED MODEL</span><h3>{syp.name}</h3></div><a href="/downloads/syp-hybrid-inverter-catalog.pdf" target="_blank" rel="noreferrer"><Download size={18} /> Catalog PDF</a></div>
                <SpecRows rows={[
                  ["Rated output", syp.output],
                  ["Surge power", syp.surge],
                  ["Maximum PV input", syp.pvInput],
                  ["MPPT range", syp.mppt],
                  ["Battery voltage", syp.battery],
                  ["Maximum charging", syp.charge],
                  ["Efficiency", syp.efficiency],
                  ["Parallel operation", syp.parallel],
                  ["Communication", syp.interface],
                  ["Dimensions / weight", `${syp.dimensions} / ${syp.weight}`],
                ]} />
              </div>
            </div>
          </div>

          <div className="dual-spec-grid">
            <article className="mega-spec-card reveal" id="mega-specs">
              <div className="spec-card-head"><div><span>MEGA / IP65 HYBRID</span><h3>6kW and 16kW reference configurations</h3></div><a href="/downloads/mega-6-16kw-ip65.pdf" target="_blank" rel="noreferrer"><Download size={18} /> PDF</a></div>
              <div className="comparison-table">
                <div className="comparison-row is-head"><span>Parameter</span>{megaModels.map((model) => <strong key={model.name}>{model.name}</strong>)}</div>
                {([
                  ["Rated output", "output"],
                  ["Maximum PV input", "pvInput"],
                  ["MPPT architecture", "mppt"],
                  ["Maximum charging", "charge"],
                  ["Nominal current", "current"],
                  ["Dimensions", "dimensions"],
                  ["Net weight", "weight"],
                ] as const).map(([label, key]) => <div className="comparison-row" key={label}><span>{label}</span>{megaModels.map((model) => <strong key={model.name}>{model[key]}</strong>)}</div>)}
              </div>
            </article>

            <article className="battery-spec-card reveal" id="battery-specs">
              <div className="battery-tabs" role="tablist" aria-label="LiFePO4 battery models">
                {batteryModels.map((model, index) => <button type="button" key={model.name} className={activeBattery === index ? "is-active" : ""} aria-selected={activeBattery === index} onClick={() => setActiveBattery(index)}>{model.name}</button>)}
              </div>
              <div className="battery-selected">
                <Image key={battery.image} src={battery.image} alt={`${battery.name} LiFePO4 battery`} width={700} height={500} />
                <div><span>SELECTED BATTERY</span><h3>{battery.name}</h3><strong>{battery.energy}</strong><p>{battery.discharge} BMS discharge · {battery.grossWeight} gross weight · RS485 / RS232 / CAN</p></div>
              </div>
              <div className="battery-links"><a href="/downloads/fuyue-51-2v-280-300ah.pdf" target="_blank" rel="noreferrer"><Download size={17} /> 280 / 300Ah PDF</a><a href="/downloads/fuyue-51-2v-400-600ah.pdf" target="_blank" rel="noreferrer"><Download size={17} /> 400 / 460 / 600Ah PDF</a></div>
            </article>
          </div>

          <div className="lx-matrix reveal" id="lx-matrix">
            <div className="matrix-head"><div><span>LX100 / IEC 62109 TESTED FAMILY</span><h3>23 listed solar pump drive configurations</h3></div><a href="/downloads/lx100-iec62109-test-report.pdf" target="_blank" rel="noreferrer"><Download size={18} /> 65-page test report</a></div>
            <div className="matrix-grid">{lx100Models.map(([power, model]) => <div key={model}><strong>{power}</strong><span>{model}</span></div>)}</div>
          </div>
        </div>
      </section>

      <section className="quality-section" id="quality">
        <div className="partner-marquee" aria-label="Partner categories">
          <div className="marquee-track">{[...partnerTypes, ...partnerTypes].map((partner, index) => <span key={`${partner}-${index}`}>{partner}</span>)}</div>
        </div>
        <div className="page-shell quality-layout">
          <div className="quality-copy reveal">
            <span>04 / TRUST & DOCUMENTATION</span>
            <h2>Quality evidence that travels with the shipment.</h2>
            <p>Technical procurement depends on more than a product image. We organize specification files, test evidence, transport documents and inspection records around the selected model.</p>
            <a className="button button-orange" href="#contact">Request a document package <ArrowRight size={18} /></a>
          </div>
          <div className="certification-grid reveal">
            <article><BadgeCheck /><span>CE</span><strong>Compliance support</strong></article>
            <article><ShieldCheck /><span>IEC 62109</span><strong>Tested LX100 platform</strong></article>
            <article><FileCheck2 /><span>RoHS</span><strong>Documentation support</strong></article>
            <article><PackageCheck /><span>UN 3480 / 3481</span><strong>Battery transport references</strong></article>
            <article><FileCheck2 /><span>MSDS</span><strong>48V100Ah documented pack</strong></article>
            <article><Factory /><span>QC</span><strong>Pre-shipment inspection</strong></article>
          </div>
        </div>
        <div className="factory-gallery page-shell reveal">
          <figure className="factory-large" style={{ position: "relative" }}><Image src="/products/factory-testing.jpg" alt="Electrical testing in the factory" fill sizes="66vw" /><figcaption>Electrical testing</figcaption></figure>
          <figure style={{ position: "relative" }}><Image src="/products/factory-packing.jpg" alt="Export packing in the factory" fill sizes="34vw" /><figcaption>Export packing</figcaption></figure>
          <figure style={{ position: "relative" }}><Image src="/products/factory-loading.jpg" alt="Container loading for export" fill sizes="34vw" /><figcaption>Container loading</figcaption></figure>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="page-shell contact-layout">
          <div className="contact-copy reveal">
            <span>05 / REQUEST FOR QUOTATION</span>
            <h2>Send the application.<br />We&apos;ll build the shortlist.</h2>
            <p>Share the destination, operating conditions, target model or system requirement. Our team will organize the relevant specifications and export documents for review.</p>
            <div className="contact-promises">
              <div><Check /><span><strong>Technical response</strong>Model-level selection support</span></div>
              <div><Check /><span><strong>Document review</strong>Datasheets, reports and MSDS</span></div>
              <div><Check /><span><strong>Export coordination</strong>Inspection, packing and logistics</span></div>
            </div>
            <div className="contact-details">
              <a href="mailto:sales@yj-energy.com"><Mail /><span><strong>Email</strong>sales@yj-energy.com</span></a>
              <span><Phone /><span><strong>Telephone</strong>+86 573 0000 0000</span></span>
              <span><MapPin /><span><strong>Location</strong>Jiaxing, Zhejiang, China</span></span>
            </div>
          </div>

          <div className="rfq-panel reveal">
            {submitted ? (
              <div className="rfq-success" role="status"><span><Check /></span><h3>RFQ brief received.</h3><p>This frontend demonstration stores no data and sends no external message. Connect the form to your email or CRM before production launch.</p><button type="button" className="button button-navy" onClick={() => setSubmitted(false)}>Submit another request <ArrowRight size={18} /></button></div>
            ) : (
              <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
                <div className="form-heading"><span>PROJECT RFQ</span><h3>Tell us what you need.</h3></div>
                <div className="form-row">
                  <div className="form-field"><label htmlFor="rfq-name">Contact name *</label><input id="rfq-name" name="name" required autoComplete="name" placeholder="Your name" /></div>
                  <div className="form-field"><label htmlFor="rfq-email">Business email *</label><input id="rfq-email" name="email" required type="email" autoComplete="email" placeholder="name@company.com" /></div>
                </div>
                <div className="form-row">
                  <div className="form-field"><label htmlFor="rfq-country">Destination *</label><input id="rfq-country" name="country" required autoComplete="country-name" placeholder="Country / region" /></div>
                  <div className="form-field"><label htmlFor="rfq-product">Product family *</label><select id="rfq-product" name="product" required defaultValue=""><option value="" disabled>Select a product</option><option>SYP hybrid inverter</option><option>MEGA IP65 inverter</option><option>LX100 / 33PV pump drive</option><option>LX200 industrial drive</option><option>LiFePO4 battery</option><option>Complete solar / ESS system</option></select></div>
                </div>
                <div className="form-row">
                  <div className="form-field"><label htmlFor="rfq-model">Target model</label><input id="rfq-model" name="model" placeholder="e.g. SYP6.5KW-48V" /></div>
                  <div className="form-field"><label htmlFor="rfq-quantity">Quantity</label><input id="rfq-quantity" name="quantity" placeholder="Units / container plan" /></div>
                </div>
                <div className="form-field"><label htmlFor="rfq-message">Application & specifications *</label><textarea id="rfq-message" name="message" required rows={5} placeholder="Voltage, output, application, timeline and documentation requirements..." /></div>
                <div className="form-submit"><span><ShieldCheck /> Your project information stays confidential.</span><button className="button button-orange" type="submit">Send RFQ <Send size={18} /></button></div>
              </form>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
