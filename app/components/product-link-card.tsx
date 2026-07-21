import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProductFamily } from "../catalog-data";

export function ProductLinkCard({ product, index }: { product: ProductFamily; index: number }) {
  return (
    <Link className="product-index-card reveal" href={`/products/${product.slug}`}>
      <div className={`product-index-media ${product.imageClass}`}>
        <Image src={product.image} alt={product.title} fill priority={index === 2} sizes="(max-width: 720px) 100vw, 50vw" />
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="product-index-copy">
        <span>{product.category}</span>
        <div><h2>{product.shortTitle}</h2><ArrowRight /></div>
        <strong>{product.range}</strong>
        <p>{product.summary}</p>
      </div>
    </Link>
  );
}
