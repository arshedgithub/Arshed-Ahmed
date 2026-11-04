import type { Viewport } from "next";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SiteFooter } from "@/components/sections/site-footer";
import { LocaleScript } from "@/components/seo/locale-script";
import { ThemeScript } from "@/components/seo/theme-script";
import { BottomNav } from "@/components/ui/bottom-nav";
import { SiteHeader } from "@/components/ui/site-header";
import { catalog } from "@/i18n/messages";
import { localeDirection, type Locale } from "@/i18n/routing";
import { THEME_COLORS } from "@/lib/site";

export const siteViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
  ],
  colorScheme: "dark light",
};

/** The <html> document shared by both root layouts and the global 404. */
export function SiteDocument({
  locale,
  fontClassName,
  redirectToSavedLocale = true,
  children,
}: {
  locale: Locale;
  fontClassName: string;
  /** Off on the global 404: it has no locale of its own, so it can't be "the wrong one". */
  redirectToSavedLocale?: boolean;
  children: ReactNode;
}) {
  const t = useTranslations("common");
  const { common } = catalog(locale);
  return (
    <html
      lang={locale}
      dir={localeDirection(locale)}
      data-theme="dark"
      suppressHydrationWarning
      className={`${fontClassName} antialiased`}
    >
      <head>
        <ThemeScript />
        {redirectToSavedLocale && <LocaleScript locale={locale} />}
      </head>
      <body className="flex min-h-dvh flex-col pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        <a
          href="#main"
          className="sr-only z-50 rounded-lg bg-accent-solid px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider locale={locale} messages={{ common }} timeZone="UTC">
          <MotionProvider>
            <SiteHeader />
            <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
              {children}
            </main>
            <SiteFooter />
            <BottomNav />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
