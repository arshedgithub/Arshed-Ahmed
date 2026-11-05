import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Locale } from "@/i18n/routing";
import { site } from "./site";

const ARABIC_CV = "/Arshed-Ahmed-CV-ar.pdf";

/** The CV for a locale. Arabic falls back to the English PDF until public/Arshed-Ahmed-CV-ar.pdf exists (checked at build time). */
export function cvFor(locale: Locale): { href: string; lang: Locale } {
  if (locale === "ar" && existsSync(join(process.cwd(), "public", ARABIC_CV))) {
    return { href: ARABIC_CV, lang: "ar" };
  }
  return { href: site.cvPath, lang: "en" };
}
