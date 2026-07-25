"use client";

import { useState } from "react";
import { Check, Mail, Send } from "lucide-react";
import { products } from "../catalog-data";

export function InquiryForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  const [mailHref, setMailHref] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Product inquiry - ${data.get("product") || "Renewable energy project"}`;
    const body = [
      `Name: ${data.get("name") || ""}`,
      `Company: ${data.get("company") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Phone / WhatsApp: ${data.get("phone") || ""}`,
      `Country / region: ${data.get("country") || ""}`,
      `Product: ${data.get("product") || ""}`,
      `Quantity: ${data.get("quantity") || ""}`,
      `Requirements: ${data.get("message") || ""}`,
    ].join("\n");
    setMailHref(`mailto:fangdan0328@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  if (mailHref) {
    return (
      <div className="renewal-form-success" role="status">
        <span><Check /></span>
        <h3>Your inquiry is ready</h3>
        <p>Open your email application to send the prepared request to our team.</p>
        <a className="renewal-button" href={mailHref}><Mail size={18} /> Send by email</a>
        <button type="button" onClick={() => setMailHref("")}>Edit inquiry</button>
      </div>
    );
  }

  return (
    <form className="renewal-form" onSubmit={handleSubmit}>
      <div className="renewal-form-heading"><span>PRODUCT INQUIRY</span><h3>Tell us what you need.</h3></div>
      <div className="renewal-form-row">
        <label>Name *<input name="name" required autoComplete="name" placeholder="Your name" /></label>
        <label>Company *<input name="company" required autoComplete="organization" placeholder="Company name" /></label>
      </div>
      <div className="renewal-form-row">
        <label>Email *<input name="email" type="email" required autoComplete="email" placeholder="name@company.com" /></label>
        <label>Phone / WhatsApp<input name="phone" type="tel" autoComplete="tel" placeholder="Country code + number" /></label>
      </div>
      <div className="renewal-form-row">
        <label>Country / region *<input name="country" required autoComplete="country-name" placeholder="Destination market" /></label>
        <label>Product *<select name="product" required defaultValue={defaultProduct}><option value="" disabled>Select a product</option>{products.map((product) => <option value={product.name} key={product.slug}>{product.name}</option>)}</select></label>
      </div>
      <label>Quantity<input name="quantity" placeholder="Units or project volume" /></label>
      <label>Application and requirements *<textarea name="message" required rows={5} placeholder="Voltage, output, battery or pump data, quantity and any certification requirements..." /></label>
      <button className="renewal-button" type="submit">Prepare inquiry <Send size={18} /></button>
    </form>
  );
}
