import { setRequestLocale } from "next-intl/server";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { SiteDocument, siteViewport } from "@/components/site-document";
import { rootMetadata } from "@/lib/metadata";
import "../../globals.css";

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  // Arabic and Latin subsets of the same face, so tech names inside Arabic text match it optically.
  // Preload is off: next/font would preload every weight, and the regular weight is requested first anyway.
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
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
