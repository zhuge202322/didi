import type { Metadata } from "next";
import { Check, Clock3, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { PageHero } from "../components/page-hero";
import { InquiryForm } from "../components/inquiry-form";

export const metadata: Metadata = {
  title: "Request a Quote | Yujie Energy Systems",
  description: "Send a product or project RFQ for solar inverters, pump drives, LiFePO4 batteries, solar modules and complete ESS supply.",
};

export default function ContactPage({ searchParams }: { searchParams?: { product?: string } }) {
  return (
    <main className="inner-page contact-page">
      <PageHero index="REQUEST FOR QUOTATION / 04" title="Send the application. We will build the technical shortlist." copy="Share the destination, product, model, quantity and operating conditions. The team will organize relevant specifications and available export documents for review." image="/products/factory-loading.jpg" imageAlt="Export shipment prepared for container loading" />

      <section className="contact-page-section">
        <div className="page-shell contact-page-layout">
          <div className="contact-sidebar reveal">
            <span>SALES & PROJECT SUPPORT</span>
            <h2>Useful details produce a faster quotation.</h2>
            <p>For an inverter, include load and battery data. For a drive, include motor and pump information. For a complete ESS, include the load profile and required autonomy.</p>
            <div className="contact-sidebar-promises">
              <div><Check /><span><strong>Model-level selection</strong>Shortlist based on the real application</span></div>
              <div><ShieldCheck /><span><strong>Document review</strong>Datasheets, reports and transport references</span></div>
              <div><Clock3 /><span><strong>Clear follow-up</strong>Open confirmation points listed before order</span></div>
            </div>
            <div className="contact-card-list">
              <a href="mailto:sales@yj-energy.com"><Mail /><div><span>Email</span><strong>sales@yj-energy.com</strong></div></a>
              <div><Phone /><div><span>Telephone</span><strong>+86 573 0000 0000</strong></div></div>
              <div><MapPin /><div><span>Location</span><strong>Jiaxing, Zhejiang, China</strong></div></div>
            </div>
          </div>
          <div className="rfq-panel contact-rfq-panel reveal"><InquiryForm defaultProduct={searchParams?.product || ""} /></div>
        </div>
      </section>
    </main>
  );
}
