"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, Check, Mail, Phone } from "lucide-react";
import { products } from "./catalog-data";
import { InquiryForm } from "./components/inquiry-form";
import { ProductLinkCard } from "./components/product-link-card";

const banners = [
  { src: "/hero/hero-clean-energy.jpg", alt: "YnJoy clean energy solutions for homes, batteries and water pumping" },
  { src: "/hero/hero-home-inverters.png", alt: "YnJoy home solar inverters from 1.5kW to 12kW" },
  { src: "/hero/hero-pump-inverters.jpg", alt: "YnJoy solar pump inverters for irrigation and water systems" },
  { src: "/hero/hero-battery.png", alt: "YnJoy LiFePO4 batteries for home energy storage" },
];

const factoryImages = [1, 2, 3, 4, 5, 6].map((index) => ({ src: `/new-site/factory-${index}.png`, alt: `Manufacturing and office environment ${index}` }));
const featured = [products[0], products[3], products[6]];

export default function HomePage() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % banners.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!window.location.hash) return;
    const targetId = decodeURIComponent(window.location.hash.slice(1));
    const timeout = window.setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ block: "start" }), 120);
    return () => window.clearTimeout(timeout);
  }, []);

  const move = (amount: number) => setSlide((current) => (current + amount + banners.length) % banners.length);

  return (
    <main className="renewal-main">
      <section className="renewal-hero" aria-label="Featured renewable energy solutions">
        <div className="renewal-banner-stage" style={{ "--renewal-banner-image": `url(${banners[slide].src})` } as CSSProperties}>
          {banners.map((banner, index) => (
            <Image className={index === slide ? "is-active" : ""} src={banner.src} alt={banner.alt} fill priority={index === 0} sizes="100vw" key={banner.src} />
          ))}
        </div>
        <div className="renewal-hero-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous banner"><ArrowLeft /></button>
          <div>{banners.map((_, index) => <button className={index === slide ? "is-active" : ""} type="button" onClick={() => setSlide(index)} aria-label={`Show banner ${index + 1}`} key={index} />)}</div>
          <button type="button" onClick={() => move(1)} aria-label="Next banner"><ArrowRight /></button>
        </div>
      </section>

      <section className="renewal-about" id="about">
        <Image src="/new-site/about-background.png" alt="YnJoy renewable energy project team" fill sizes="100vw" />
        <div className="renewal-shell renewal-about-inner">
          <div className="renewal-about-copy">
            <span>ABOUT US</span>
            <h1>Reliable renewable energy sourcing, made simpler.</h1>
            <p>Jiaxing Easyon Technology Co., Ltd. is a China-based export and sourcing company specializing in integrated renewable energy solutions.</p>
            <p>Through our trusted manufacturing network, we provide solar inverters, lithium batteries, energy storage systems and related accessories to customers worldwide.</p>
            <div className="renewal-checks"><span><Check /> One-stop sourcing</span><span><Check /> OEM & ODM available</span><span><Check /> 2-year inverter warranty</span><span><Check /> Professional after-sales support</span></div>
            <Link className="renewal-text-link" href="/about">Learn more about us <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="renewal-factory" id="factory">
        <div className="renewal-shell renewal-section-head"><span>OUR WORKSHOP</span><h2>Production visibility from factory floor to export packing.</h2><p>Experienced manufacturing partners, clear quality checks and coordinated international trade support.</p></div>
        <div className="renewal-marquee" aria-label="Factory and office photo gallery">
          <div className="renewal-marquee-track">
            {[...factoryImages, ...factoryImages].map((image, index) => <figure key={`${image.src}-${index}`}><Image src={image.src} alt={index < factoryImages.length ? image.alt : ""} fill sizes="(max-width: 700px) 85vw, 42vw" /></figure>)}
          </div>
        </div>
      </section>

      <section className="renewal-featured" id="products">
        <div className="renewal-shell">
          <div className="renewal-section-head renewal-head-row"><div><span>POPULAR PRODUCTS</span><h2>Three focused product families.</h2></div><Link className="renewal-text-link" href="/products">View all products <ArrowRight size={18} /></Link></div>
          <div className="renewal-product-grid">{featured.map((product) => <ProductLinkCard product={product} key={product.slug} />)}</div>
        </div>
      </section>

      <section className="renewal-contact" id="contact">
        <div className="renewal-shell renewal-contact-grid">
          <div className="renewal-contact-copy">
            <span>CONTACT US</span>
            <h2>Let&apos;s build your next energy project.</h2>
            <p>Share the product, destination and key technical requirements. We will coordinate model selection, quotation and available documentation.</p>
            <div className="renewal-contact-list">
              <section className="renewal-office-block">
                <h3>China Office</h3>
                <a href="mailto:fangdan0328@gmail.com"><Mail /><div><span>Email</span><strong>fangdan0328@gmail.com</strong></div></a>
                <a href="tel:+8613735536084"><Phone /><div><span>Tel</span><strong>+86 137 3553 6084</strong></div></a>
              </section>
              <section className="renewal-office-block">
                <h3>Middle East Office <small>(Arabic Support)</small></h3>
                <a href="mailto:maxlee1021@gmail.com"><Mail /><div><span>Email</span><strong>maxlee1021@gmail.com</strong></div></a>
                <a href="tel:+8619884326307"><Phone /><div><span>Tel</span><strong>+86 198 8432 6307</strong></div></a>
              </section>
            </div>
          </div>
          <InquiryForm />
        </div>
      </section>
    </main>
  );
}
