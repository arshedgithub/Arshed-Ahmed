import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/logo";
import { SocialLinks } from "@/components/ui/social-links";
import { LocaleLink } from "@/i18n/link";
import { nav } from "@/lib/site";

/** Minimal: the same five links as the header (no dead ends), the contact icons, and the year. */
export function SiteFooter() {
  const t = useTranslations("footer");
  const common = useTranslations("common");
  const navT = useTranslations("nav");
  return (
    <footer id="site-footer" className="border-t border-line">
      <div className="container-page flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <Logo />
          <p className="text-sm text-muted">{common("locationLine")}</p>
        </div>
        <nav aria-label={navT("footerAria")}>
          <ul className="flex flex-wrap gap-x-1">
            {nav.map((item) => (
              <li key={item.key}>
                <LocaleLink href={item.href} className="inline-flex min-h-11 items-center px-2 text-sm text-muted hover:text-fg">
                  {navT(item.key)}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </nav>
        <SocialLinks />
      </div>
      <div className="border-t border-line">
        <div className="container-page flex items-center justify-between gap-4 py-4 text-xs text-muted">
          <span>{t("rights", { year: process.env.BUILD_YEAR ?? "", name: common("name") })}</span>
          <a href="#main" className="inline-flex min-h-11 items-center gap-1.5 hover:text-fg">
            {navT("backToTop")}
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
