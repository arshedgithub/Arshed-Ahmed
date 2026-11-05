import { setRequestLocale } from "next-intl/server";
import { SiteDocument, siteViewport } from "@/components/site-document";
import { latinFontClassName } from "@/lib/fonts-en";
import { rootMetadata } from "@/lib/metadata";
import "../globals.css";

export const metadata = rootMetadata("en");

export const viewport = siteViewport;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  setRequestLocale("en");
  return (
    <SiteDocument locale="en" fontClassName={latinFontClassName}>
      {children}
    </SiteDocument>
  );
}
