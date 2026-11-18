import { ArrowDown, BadgeCheck, Download, MapPin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { SocialLinks } from "@/components/ui/social-links";
import { cvFor } from "@/lib/cv";

/**
 * 5-second test, in reading order: role + availability -> value (headline) -> proof (one number) -> where
 * (UAE-wide) -> one primary action. Work authorisation lives in Contact, not here. The portrait is a small avatar on phones so the headline and proof
 * sit above the fold at 375x667; from md it becomes the right-hand column (halo effect, first impression).
 */
export function Hero() {
  const t = useTranslations("hero");
  const common = useTranslations("common");
  const locale = useLocale();
  const cv = cvFor(locale);
  const facts = [{ key: "openTo", Icon: MapPin }] as const;

  return (
    <section id="top" aria-labelledby="hero-title" className="overflow-x-clip">
      <div className="container-page grid items-center gap-10 pt-5 pb-12 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:pt-12 md:pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-14 lg:pt-12 lg:pb-24">
        <div className="flex flex-col items-start">
          {/* Who: avatar (phones only) + name + availability. */}
          <div className="flex items-center gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-line-strong bg-[var(--photo-tile)] md:hidden">
              <Image
                src="/images/about-1x1.webp"
                alt=""
                width={96}
                height={96}
                sizes="48px"
                loading="eager"
                className="size-full object-cover object-top"
              />
            </div>
            <div>
              {/* The header already shows the name, so this line carries the professional identity. */}
              <p className="kicker text-fg">{common("jobTitle")}</p>
              <p className="flex items-center gap-2 text-sm text-muted">
                <span aria-hidden="true" className="pulse-dot relative size-1.5 shrink-0 rounded-full bg-live text-live" />
                {common("status")}
              </p>
            </div>
          </div>

          <h1 id="hero-title" className="mt-5 max-w-[23ch] text-display font-semibold md:mt-6 lg:max-w-[25ch]">
            {t("headline")}
          </h1>

          <p className="mt-4 max-w-[60ch] text-base text-pretty text-fg-2 md:mt-5 md:text-lg">{t("lede")}</p>

          {/* The single strongest number, labelled as evidence, right under the value proposition. */}
          <div className="mt-4 max-w-[60ch] border-s-2 border-accent ps-3 md:mt-5">
            <p className="kicker flex items-center gap-1.5 text-accent">
              <BadgeCheck size={14} aria-hidden="true" className="shrink-0" />
              {t("proofLabel")}
            </p>
            <p className="mt-1.5 text-sm font-medium text-pretty text-fg md:text-base">{t("proof")}</p>
          </div>

          {/* Availability and place are in the status line above; work authorisation is in Contact, not the hero. */}
          <ul aria-label={t("factsAria")} className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted md:mt-5">
            {facts.map(({ key, Icon }) => (
              <li key={key} className="inline-flex items-center gap-1.5">
                <Icon size={15} aria-hidden="true" className="shrink-0" />
                {t(key)}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex w-full flex-col gap-3 min-[400px]:w-auto min-[400px]:flex-row min-[400px]:flex-wrap md:mt-7">
            <ButtonLink href={cv.href} hrefLang={cv.lang} download>
              <Download size={16} aria-hidden="true" />
              {cv.lang === locale ? common("downloadCv") : common("downloadCvEnglish")}
            </ButtonLink>
            <ButtonLink href="/#work" variant="secondary">
              {t("viewWork")}
              <ArrowDown size={16} aria-hidden="true" />
            </ButtonLink>
          </div>

          <SocialLinks className="mt-6" ariaLabel={t("contactAria")} />
        </div>

        {/* Portrait column from md. Explicit size + priority: it is the LCP image on desktop. */}
        <div className="relative hidden md:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-line bg-[var(--photo-tile)]">
            <Image
              src="/images/hero-1x1.webp"
              alt={t("imageAlt")}
              width={1200}
              height={1200}
              preload
              // Last entry: phones hide this column, so their preload resolves to the smallest candidate.
              sizes="(min-width: 1024px) 384px, (min-width: 768px) 352px, 48px"
              className="photo-cutout absolute inset-x-0 bottom-0 h-[92%] w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
