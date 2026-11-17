import { Download } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { LocaleLink } from "@/i18n/link";
import { cvFor } from "@/lib/cv";
import { nav } from "@/lib/site";
import { buttonClasses } from "./button";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

/**
 * Sticky, compact header. Every breakpoint shows: name, language switcher and the CV.
 * Desktop adds the five nav links and the theme toggle; on phones those live in the menu sheet.
 */
export function SiteHeader() {
  const t = useTranslations("nav");
  const common = useTranslations("common");
  const locale = useLocale();
  const cv = cvFor(locale);
  // Honest label: on the Arabic page the CV is the English PDF until an Arabic one exists.
  const cvSuffix = cv.lang !== locale ? common("cvShortSuffixEnglish") : common("cvShortSuffix");
  return (
    <header data-site-header className="sticky top-0 z-40 border-b border-line bg-canvas">
      <div className="container-page flex h-14 items-center justify-between gap-2 md:h-16 md:gap-6">
        <Logo />

        <nav aria-label={t("primaryAria")} className="hidden lg:block">
          <ul className="flex items-center">
            {nav.map((item) => (
              <li key={item.key}>
                <LocaleLink
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-[var(--radius-control)] px-3 text-sm text-muted transition-colors hover:text-fg"
                >
                  {t(item.key)}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-0.5 md:gap-1">
          <LanguageSwitcher showIcon={false} className="px-2 md:px-2.5" />
          <ThemeToggle className="hidden lg:inline-flex" />
          <a
            href={cv.href}
            hrefLang={cv.lang}
            download
            className={buttonClasses("primary", "ms-1 gap-1.5", "sm")}
          >
            <Download size={16} aria-hidden="true" />
            {common("cvShort")}
            <span className="sr-only">{cvSuffix}</span>
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
