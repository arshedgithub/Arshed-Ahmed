import { defineRouting } from "next-intl/routing";

/**
 * "/" is English and "/ar" is Arabic. There is no middleware: the static export cannot run one, so each
 * locale is its own route tree (src/app/(en) and src/app/(ar)/ar), and browsers are never redirected by language.
 */
export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

export const LOCALE_STORAGE_KEY = "locale";

export const localeDirection = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

/** Prefixes an internal path for a locale: localePath("ar", "/#work") is "/ar#work". */
export function localePath(locale: Locale, path: string) {
  if (locale === routing.defaultLocale) return path;
  if (path === "/") return `/${locale}`;
  return `/${locale}${path.startsWith("/#") ? path.slice(1) : path}`;
}

/** Inverse of localePath, for the locale-independent part of the current URL. */
export function stripLocale(pathname: string) {
  const stripped = pathname.replace(new RegExp(`^/(${routing.locales.join("|")})(?=/|$)`), "");
  return stripped || "/";
}
