import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type PageHeroProps = {
  index: string;
  title: string;
  copy: string;
  image: string;
  imageAlt: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function PageHero({ index, title, copy, image, imageAlt, primary, secondary }: PageHeroProps) {
  return (
    <section className="inner-hero">
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" />
      <div className="inner-hero-scrim" />
      <div className="page-shell inner-hero-content">
        <span>{index}</span>
        <h1>{title}</h1>
        <p>{copy}</p>
        {(primary || secondary) && (
          <div className="inner-hero-actions">
            {primary && <Link className="button button-orange" href={primary.href}>{primary.label}<ArrowRight size={18} /></Link>}
            {secondary && <Link className="button button-ghost" href={secondary.href}>{secondary.label}<ArrowRight size={18} /></Link>}
          </div>
        )}
      </div>
    </section>
  );
}
