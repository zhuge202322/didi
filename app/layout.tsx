import type { Metadata } from "next";
import "./globals.css";
import { RevealManager } from "./components/reveal-manager";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

export const metadata: Metadata = {
  title: "Yujie Energy Systems | Industrial Solar, Drives & Storage",
  description: "International B2B supply for solar inverters, pump drives, industrial motor control, LiFePO4 storage and complete ESS projects.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <RevealManager />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
