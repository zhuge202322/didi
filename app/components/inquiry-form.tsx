"use client";

import { useState } from "react";
import { ArrowRight, Check, Mail, Send, ShieldCheck } from "lucide-react";
import { productCatalog } from "../catalog-data";

export function InquiryForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [mailHref, setMailHref] = useState("mailto:sales@yj-energy.com");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `RFQ - ${data.get("product") || "Energy project"} - ${data.get("company") || "New buyer"}`;
    const body = [
      `Contact: ${data.get("name") || ""}`,
      `Company: ${data.get("company") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Phone / WhatsApp: ${data.get("phone") || ""}`,
      `Country: ${data.get("country") || ""}`,
      `Buyer role: ${data.get("role") || ""}`,
      `Product: ${data.get("product") || ""}`,
      `Model: ${data.get("model") || ""}`,
      `Quantity: ${data.get("quantity") || ""}`,
      `Project details: ${data.get("message") || ""}`,
    ].join("\n");
    setMailHref(`mailto:sales@yj-energy.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rfq-success" role="status">
        <span><Check /></span>
        <h3>Your RFQ brief is ready.</h3>
        <p>Use the email button to send the prepared project brief to our sales team. No information has left your browser yet.</p>
        <div className="success-actions">
          <a className="button button-orange" href={mailHref}><Mail size={18} /> Email this RFQ</a>
          <button type="button" className="button button-navy" onClick={() => setSubmitted(false)}>Edit request <ArrowRight size={18} /></button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-heading"><span>PROJECT RFQ</span><h3>Tell us what you need.</h3><p>Fields marked * help us build an accurate technical shortlist.</p></div>
      <div className="form-row">
        <div className="form-field"><label htmlFor="contact-name">Contact name *</label><input id="contact-name" name="name" required autoComplete="name" placeholder="Your name" /></div>
        <div className="form-field"><label htmlFor="contact-company">Company *</label><input id="contact-company" name="company" required autoComplete="organization" placeholder="Company name" /></div>
      </div>
      <div className="form-row">
        <div className="form-field"><label htmlFor="contact-email">Business email *</label><input id="contact-email" name="email" required type="email" autoComplete="email" placeholder="name@company.com" /></div>
        <div className="form-field"><label htmlFor="contact-phone">Phone / WhatsApp</label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="Country code + number" /></div>
      </div>
      <div className="form-row">
        <div className="form-field"><label htmlFor="contact-country">Destination *</label><input id="contact-country" name="country" required autoComplete="country-name" placeholder="Country / region" /></div>
        <div className="form-field"><label htmlFor="contact-role">Buyer role *</label><select id="contact-role" name="role" required defaultValue=""><option value="" disabled>Select your role</option><option>Distributor / wholesaler</option><option>EPC contractor</option><option>Installer / system integrator</option><option>OEM / machinery manufacturer</option><option>Project developer</option><option>Direct project buyer</option></select></div>
      </div>
      <div className="form-row">
        <div className="form-field"><label htmlFor="contact-product">Product family *</label><select id="contact-product" name="product" required defaultValue={defaultProduct}><option value="" disabled>Select a product</option>{productCatalog.map((product) => <option value={product.shortTitle} key={product.slug}>{product.shortTitle}</option>)}</select></div>
        <div className="form-field"><label htmlFor="contact-model">Target model</label><input id="contact-model" name="model" placeholder="Model or power range" /></div>
      </div>
      <div className="form-row">
        <div className="form-field"><label htmlFor="contact-quantity">Quantity / annual demand</label><input id="contact-quantity" name="quantity" placeholder="Units, pallets or container plan" /></div>
        <div className="form-field"><label htmlFor="contact-timeline">Target timeline</label><input id="contact-timeline" name="timeline" placeholder="Sample / order date" /></div>
      </div>
      <div className="form-field"><label htmlFor="contact-message">Application & specifications *</label><textarea id="contact-message" name="message" required rows={6} placeholder="Voltage, output, load, motor or pump data, destination certification and documentation requirements..." /></div>
      <div className="form-submit"><span><ShieldCheck /> Your project data remains local until you choose to email it.</span><button className="button button-orange" type="submit">Prepare RFQ <Send size={18} /></button></div>
    </form>
  );
}
