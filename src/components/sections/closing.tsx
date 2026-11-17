import { Download, Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { cvFor } from "@/lib/cv";
import { contactEmail } from "@/lib/site";

/** Peak-end: the page closes on its strongest proof and one clear action, right above the footer. */
export function Closing() {
  const t = useTranslations("closing");
  const common = useTranslations("common");
  const locale = useLocale();
  const cv = cvFor(locale);
  return (
    <section aria-labelledby="closing-title" className="border-t border-line bg-surface">
      <div className="container-page flex flex-col gap-8 py-14 md:flex-row md:items-end md:justify-between md:py-20">
        <div className="max-w-2xl">
          <h2 id="closing-title" className="text-title font-semibold">
            {t("proof")}
          </h2>
          <p className="mt-3 text-fg-2 md:text-lg">{t("cta")}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 min-[400px]:flex-row">
          <ButtonLink href={cv.href} hrefLang={cv.lang} download>
            <Download size={16} aria-hidden="true" />
            {cv.lang === locale ? common("downloadCv") : common("downloadCvEnglish")}
          </ButtonLink>
          <ButtonLink href={`mailto:${contactEmail}`} variant="secondary">
            <Mail size={16} aria-hidden="true" />
            {t("email")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
