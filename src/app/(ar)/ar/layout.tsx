import { setRequestLocale } from "next-intl/server";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { SiteDocument, siteViewport } from "@/components/site-document";
import { rootMetadata } from "@/lib/metadata";
import "../../globals.css";

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  // Only the Arabic files are preloaded; the Latin face still loads on demand for tech names.
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = rootMetadata("ar");

export const viewport = siteViewport;

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  setRequestLocale("ar");
  return (
    <SiteDocument locale="ar" fontClassName={plexArabic.variable}>
      {children}
    </SiteDocument>
  );
}
