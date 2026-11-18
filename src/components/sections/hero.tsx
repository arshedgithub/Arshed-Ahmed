import { ArrowDown, BadgeCheck, CalendarCheck, Download, MapPin, Plane } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { SocialLinks } from "@/components/ui/social-links";
import { cvFor } from "@/lib/cv";

/**
 * 5-second test, in reading order: who (name, role) -> value (headline) -> proof (one number) -> availability
 * (notice, visa, place) -> one primary action. The portrait is a small avatar on phones so the headline and proof
 * sit above the fold at 375x667; from md it becomes the right-hand column (halo effect, first impression).
 */
export function Hero() {
  const t = useTranslations("hero");
  const common = useTranslations("common");
  const locale = useLocale();
  const cv = cvFor(locale);
  const facts = [
    { key: "notice", Icon: CalendarCheck },
    { key: "visa", Icon: Plane },
    { key: "location", Icon: MapPin },
  ] as const;

  return (
    <section id="top" aria-labelledby="hero-title" className="overflow-x-clip">
      <div className="container-page grid items-center gap-10 pt-6 pb-12 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:pt-16 md:pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16 lg:pt-20 lg:pb-24">
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
              {/* The name repeats the header's on phones on purpose: the headline below already carries the role,
                  and the face + name pairing is what people remember. */}
              <p className="text-base font-semibold text-fg">{common("name")}</p>
              <p className="flex items-center gap-2 text-sm text-muted">
                <span aria-hidden="true" className="pulse-dot relative size-1.5 shrink-0 rounded-full bg-live text-live" />
                {common("status")}
              </p>
            </div>
          </div>

          <h1 id="hero-title" className="mt-6 max-w-[20ch] text-display font-semibold md:mt-8">
            {t("headline")}
          </h1>

          <p className="mt-4 max-w-[60ch] text-base text-pretty text-fg-2 md:mt-6 md:text-lg">{t("lede")}</p>

          {/* The single strongest number, anchored right under the value proposition. */}
          <p className="mt-5 flex max-w-[60ch] items-start gap-2.5 border-s-2 border-accent ps-3 text-sm font-medium text-pretty text-fg md:text-base">
            <BadgeCheck size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-accent max-md:hidden" />
            {t("proof")}
          </p>

          <ul aria-label={t("factsAria")} className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {facts.map(({ key, Icon }) => (
              <li key={key} className="inline-flex items-center gap-1.5">
                <Icon size={15} aria-hidden="true" className="shrink-0" />
                {t(key)}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex w-full flex-col gap-3 min-[400px]:w-auto min-[400px]:flex-row min-[400px]:flex-wrap md:mt-9">
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
              sizes="(min-width: 1024px) 416px, (min-width: 768px) 352px, 48px"
              className="photo-cutout absolute inset-x-0 bottom-0 h-[92%] w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
