import type { Viewport } from "next";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/sections/site-footer";
import { ThemeScript } from "@/components/seo/theme-script";
import { LocaleHint } from "@/components/ui/locale-hint";
import { SiteHeader } from "@/components/ui/site-header";
import { catalog } from "@/i18n/messages";
import { localeDirection, type Locale } from "@/i18n/routing";
import { THEME_COLORS, THEME_DEFAULT } from "@/lib/site";

// The page defaults to dark whatever the OS says, so the browser chrome starts dark too; ThemeScript corrects it
// before first paint when the visitor saved light.
export const siteViewport: Viewport = {
  themeColor: THEME_DEFAULT === "dark" ? THEME_COLORS.dark : [
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
  ],
  colorScheme: "dark light",
};

/** The <html> document shared by both root layouts and the global 404. */
export function SiteDocument({
  locale,
  fontClassName,
  showLocaleHint = true,
  children,
}: {
  locale: Locale;
  fontClassName: string;
  /** Off on the global 404: it has no locale of its own to be "the other one". */
  showLocaleHint?: boolean;
  children: ReactNode;
}) {
  const t = useTranslations("common");
  return (
    <html
      lang={locale}
      dir={localeDirection(locale)}
      data-theme="dark"
      suppressHydrationWarning
      className={`${fontClassName} antialiased`}
    >
      {/* eslint-disable-next-line @next/next/no-head-element -- this renders the root layouts' document. */}
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-control bg-accent-solid px-4 py-3 font-medium text-white focus:not-sr-only focus:fixed focus:start-3 focus:top-3"
        >
          {t("skipToContent")}
        </a>
        {/* No NextIntlClientProvider: client components get their strings as props, so the browser never
            downloads the message catalogs or the ICU formatter. */}
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        {showLocaleHint && <LocaleHint locale={locale} copy={{ en: catalog("en").localeHint, ar: catalog("ar").localeHint }} />}
      </body>
    </html>
  );
}
