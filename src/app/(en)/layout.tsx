import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SiteDocument, siteViewport } from "@/components/site-document";
import { latinFontClassName } from "@/lib/fonts-en";
import { site } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Full-Stack Software Engineer in the UAE`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: `${site.name} | Full-Stack Software Engineer in the UAE`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Full-Stack Software Engineer in the UAE`,
    description: site.description,
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
