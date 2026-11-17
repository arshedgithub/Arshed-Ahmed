import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { NotFoundPage } from "@/components/pages/not-found-page";
import { SiteDocument, siteViewport } from "@/components/site-document";
import { site } from "@/lib/site";
import "./globals.css";

// With two root layouts there is no single layout to build a 404 from, so this one renders the whole document.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `Page not found | ${site.name}`,
  robots: { index: false },
};

export const viewport = siteViewport;

export default function GlobalNotFound() {
  setRequestLocale("en");
  return (
    // System font on purpose: importing next/font here would preload the Latin face on every route, Arabic included.
    <SiteDocument locale="en" fontClassName="" showLocaleHint={false}>
      <NotFoundPage />
    </SiteDocument>
  );
}
