import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "../catalog-data";

export function ProductLinkCard({ product }: { product: Product }) {
  return (
    <Link className="renewal-product-card" href={`/products/${product.slug}`}>
      <div className="renewal-product-image">
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 760px) 100vw, 33vw" />
      </div>
      <div className="renewal-product-copy">
        <span>{product.categoryLabel}</span>
        <h3>{product.shortName}</h3>
        <strong>{product.range}</strong>
        <p>{product.summary}</p>
        <span className="renewal-text-link">View specifications <ArrowUpRight size={17} /></span>
      </div>
    </Link>
  );
}
