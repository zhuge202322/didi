import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { getProduct, products } from "../../catalog-data";
import { ProductLinkCard } from "../../components/product-link-card";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  return product ? { title: `${product.name} | YnJoy Energy`, description: product.summary } : {};
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const related = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 2);

  return (
    <main className="renewal-detail-page">
      <section className="renewal-detail-hero">
        <div className="renewal-shell renewal-detail-hero-grid">
          <div className="renewal-detail-copy">
            <Link className="renewal-back" href={`/products#${product.category}`}><ArrowLeft size={17} /> {product.categoryLabel}</Link>
            <span>{product.range}</span>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <div className="renewal-detail-features">{product.features.map((feature) => <div key={feature}><Check size={18} />{feature}</div>)}</div>
            <Link className="renewal-button" href={`/#contact`}>Request a quotation <ArrowRight size={18} /></Link>
          </div>
          <div className="renewal-detail-image"><Image src={product.image} alt={product.name} fill priority sizes="(max-width: 900px) 100vw, 48vw" /></div>
        </div>
      </section>

      <section className="renewal-spec-section">
        <div className="renewal-shell renewal-spec-layout">
          <div className="renewal-spec-heading"><span>TECHNICAL DATA</span><h2>Core specifications</h2><p>Values are transcribed from the product documents supplied for this website.</p></div>
          <dl className="renewal-spec-list">{product.specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </div>
        {product.modelTable && <div className="renewal-shell renewal-model-table"><h2>Selected documented models</h2><div><table><thead><tr>{product.modelTable.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{product.modelTable.rows.map((row) => <tr key={row.join("-")}>{row.map((cell, index) => <td key={`${cell}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div></div>}
      </section>

      <section className="renewal-related">
        <div className="renewal-shell"><div className="renewal-section-head renewal-head-row"><div><span>MORE IN THIS FAMILY</span><h2>Compare nearby options.</h2></div><Link className="renewal-text-link" href="/products">All products <ArrowRight size={18} /></Link></div><div className="renewal-product-grid is-two">{related.map((item) => <ProductLinkCard product={item} key={item.slug} />)}</div></div>
      </section>
    </main>
  );
}
