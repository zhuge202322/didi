import type { Metadata } from "next";
import "./globals.css";
import { RevealManager } from "./components/reveal-manager";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

export const metadata: Metadata = {
  title: "YnJoy Energy | Renewable Energy Solutions",
  description: "Hybrid solar inverters, solar pump inverters and LiFePO4 battery solutions with sourcing and export support from Jiaxing, China.",
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
