import { getProducts, getSectionImages, getSiteSettings, getContacts } from "../lib/content-store";
import { HomePageClient } from "./components/home-page-client";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const products = getProducts();
  const settings = getSiteSettings();
  const contacts = getContacts();
  const hero = getSectionImages("home", "hero");
  const about = getSectionImages("home", "about")[0];
  const factory = getSectionImages("shared", "workshop");
  const featured = [products[0], products.find((product) => product.category === "pump"), products.find((product) => product.category === "battery")].filter((product): product is (typeof products)[number] => Boolean(product));
  return <HomePageClient banners={hero} aboutImage={about} factoryImages={factory} featured={featured} products={products} inquiryEmail={settings.inquiry_email} contacts={contacts} />;
}
