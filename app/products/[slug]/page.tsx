import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Download, FileCheck2, Send } from "lucide-react";
import { getProduct, productCatalog } from "../../catalog-data";
import { ProductLinkCard } from "../../components/product-link-card";

type ProductPageProps = { params: { slug: string } };

export function generateStaticParams() {
  return productCatalog.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: `${product.title} | Yujie Energy Systems`,
    description: `${product.summary} Review applications, technical data, available models and product documents.`,
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const currentIndex = productCatalog.findIndex((item) => item.slug === product.slug);
  const related = productCatalog.filter((item) => item.slug !== product.slug).slice(currentIndex % 2, currentIndex % 2 + 2);

  return (
    <main className="inner-page product-detail-page">
      <section className="product-detail-hero">
        <div className="page-shell product-detail-hero-layout">
          <div className="product-detail-copy">
            <div className="breadcrumbs"><Link href="/products"><ArrowLeft size={16} /> Products</Link><span>/</span><span>{product.shortTitle}</span></div>
            <span>{product.code}</span>
            <h1>{product.title}</h1>
            <strong>{product.range}</strong>
            <p>{product.summary}</p>
            <div className="product-detail-actions">
              <Link className="button button-orange" href={`/contact?product=${encodeURIComponent(product.shortTitle)}`}>Request a quote <Send size={18} /></Link>
              {product.downloads[0] && <a className="button button-ghost" href={product.downloads[0].href} target="_blank" rel="noreferrer">Download data <Download size={18} /></a>}
            </div>
          </div>
          <div className={`product-detail-media ${product.imageClass}`}>
            <Image src={product.image} alt={product.title} fill priority sizes="(max-width: 960px) 100vw, 46vw" />
            <span>YUJIE / PRODUCT {String(currentIndex + 1).padStart(2, "0")}</span>
          </div>
        </div>
      </section>

      <section className="detail-summary-rail">
        <div className="page-shell">
          {product.technicalRows.slice(0, 4).map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
        </div>
      </section>

      <section className="detail-overview-section">
        <div className="page-shell detail-overview-layout">
          <div className="detail-overview-copy reveal"><span>PRODUCT OVERVIEW</span><h2>Engineered around the operating brief.</h2><p>{product.description}</p></div>
          <div className="detail-highlights reveal">
            {product.highlights.map((highlight, index) => <div key={highlight}><span>{String(index + 1).padStart(2, "0")}</span><Check /><strong>{highlight}</strong></div>)}
          </div>
        </div>
      </section>

      <section className="detail-data-section">
        <div className="page-shell">
          <div className="inner-section-heading reveal"><span>TECHNICAL DATA</span><h2>Reference information for the RFQ stage.</h2><p>Values below come from supplied project documents or are explicitly marked as project-confirmed items.</p></div>
          <div className="detail-technical-grid reveal">
            {product.technicalRows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
          </div>

          {product.modelTable && (
            <div className="model-table-wrap reveal">
              <div className="model-table-heading"><span>AVAILABLE CONFIGURATIONS</span><strong>{product.modelTable.rows.length} documented rows</strong></div>
              <div className="model-table-scroll">
                <table>
                  <thead><tr>{product.modelTable.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
                  <tbody>{product.modelTable.rows.map((row) => <tr key={row.join("-")}>{row.map((cell, index) => <td key={`${cell}-${index}`}>{cell}</td>)}</tr>)}</tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="detail-application-section">
        <div className="page-shell detail-application-layout">
          <div className="detail-application-copy reveal"><span>APPLICATIONS</span><h2>Where this product family fits.</h2><p>Final configuration is confirmed after reviewing the site, load and destination-market requirements.</p></div>
          <div className="application-list reveal">{product.applications.map((application, index) => <div key={application}><span>{String(index + 1).padStart(2, "0")}</span><strong>{application}</strong></div>)}</div>
        </div>
      </section>

      <section className="detail-document-section">
        <div className="page-shell detail-document-layout">
          <div className="detail-document-title reveal"><span>DOCUMENT CENTER</span><h2>Review the available product files.</h2><p>Additional model or project documents can be requested with the RFQ.</p></div>
          <div className="document-list reveal">
            {product.downloads.length ? product.downloads.map((file) => <a href={file.href} target="_blank" rel="noreferrer" key={file.href}><FileCheck2 /><div><strong>{file.label}</strong><span>{file.note}</span></div><Download /></a>) : <div className="document-empty"><FileCheck2 /><div><strong>Model-specific document package</strong><span>Available after the technical shortlist is confirmed.</span></div><Link href="/contact">Request files <ArrowRight /></Link></div>}
          </div>
        </div>
      </section>

      <section className="related-products-section">
        <div className="page-shell">
          <div className="inner-section-heading reveal"><span>RELATED PRODUCTS</span><h2>Build the rest of the system.</h2><p>Continue with adjacent product families or send the complete application for coordinated selection.</p></div>
          <div className="related-products-grid">{related.map((item) => <ProductLinkCard product={item} index={productCatalog.indexOf(item)} key={item.slug} />)}</div>
        </div>
      </section>

      <section className="inner-cta-section">
        <div className="page-shell inner-cta reveal"><div><span>READY TO SPECIFY?</span><h2>Send the application and receive a model-level shortlist.</h2></div><Link className="button button-orange" href={`/contact?product=${encodeURIComponent(product.shortTitle)}`}>Request {product.shortTitle} <ArrowRight size={18} /></Link></div>
      </section>
    </main>
  );
}
