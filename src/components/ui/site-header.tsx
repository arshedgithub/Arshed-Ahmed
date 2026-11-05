import { useLocale, useTranslations } from "next-intl";
import { LocaleLink } from "@/i18n/link";
import { cvFor } from "@/lib/cv";
import { nav } from "@/lib/site";
import { buttonClasses } from "./button";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const t = useTranslations("nav");
  const common = useTranslations("common");
  const cv = cvFor(useLocale());
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas">
      <div className="container-page relative flex h-14 items-center justify-between gap-4 md:h-16">
        <Logo variant="monogram-mobile" />

        <nav aria-label={t("primaryAria")} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.key}>
                <LocaleLink
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm whitespace-nowrap text-muted transition-colors hover:text-fg"
                >
                  {t(item.key)}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LanguageSwitcher className="hidden min-h-11 items-center rounded-lg px-2 text-sm text-muted transition-colors hover:text-fg md:inline-flex" />
          <a
            href={cv.href}
            hrefLang={cv.lang}
            download
            className={buttonClasses("secondary", "hidden min-h-9 px-3 text-xs md:inline-flex")}
          >
            {common("cvShort")}
            <span className="sr-only">{common("cvShortSuffix")}</span>
          </a>
          <MobileMenu cv={cv} />
        </div>
      </div>
    </header>
  );
}
