import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { getCategories, getProducts } from "../../lib/content-store";
import { ProductLinkCard } from "../components/product-link-card";

export const metadata: Metadata = {
  title: "Products | YnJoy Energy",
  description: "Hybrid solar inverters, solar pump inverters and high-capacity LiFePO4 batteries for global projects.",
};

export const dynamic = "force-dynamic";

export default function ProductsPage() {
  const productCategories = getCategories();
  const products = getProducts();
  return (
    <main className="renewal-products-page">
      <section className="renewal-products-hero">
        <div className="renewal-shell">
          <span>PRODUCT CATALOG</span>
          <h1>Three product families.<br />Nine clear choices.</h1>
          <p>Explore the supplied hybrid inverter, solar pump inverter and LiFePO4 battery models. Every product opens to a focused specification page.</p>
          <div className="renewal-category-nav">{productCategories.map((category) => <Link href={`#${category.id}`} key={category.id}>{category.title}<ArrowDown size={16} /></Link>)}</div>
        </div>
      </section>

      {productCategories.map((category, index) => (
        <section className="renewal-category-section" id={category.id} key={category.id}>
          <div className="renewal-shell">
            <div className="renewal-category-heading"><span>{String(index + 1).padStart(2, "0")}</span><div><p>{category.subtitle}</p><h2>{category.title}</h2></div><p>{category.description}</p></div>
            <div className="renewal-product-grid">{products.filter((product) => product.category === category.id).map((product) => <ProductLinkCard product={product} key={product.slug} />)}</div>
          </div>
        </section>
      ))}
    </main>
  );
}
