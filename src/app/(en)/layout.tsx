import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SiteDocument, siteViewport } from "@/components/site-document";
import { catalog } from "@/i18n/messages";
import { latinFontClassName } from "@/lib/fonts-en";
import { site } from "@/lib/site";
import "../globals.css";

const { meta } = catalog("en");

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: meta.title,
    template: `%s | ${site.name}`,
  },
  description: meta.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: meta.title,
    description: meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport = siteViewport;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  setRequestLocale("en");
  return (
    <SiteDocument locale="en" fontClassName={latinFontClassName}>
      {children}
    </SiteDocument>
  );
}
