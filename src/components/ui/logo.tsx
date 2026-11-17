import { useTranslations } from "next-intl";
import { LocaleLink } from "@/i18n/link";
import { cn } from "@/lib/utils";

/** The name as a wordmark, in the page's own script (no Latin monogram on the Arabic page). */
export function Logo({ className }: { className?: string }) {
  const t = useTranslations("common");
  return (
    <LocaleLink
      href="/"
      aria-label={t("logoHome", { name: t("name") })}
      className={cn("inline-flex min-h-11 items-center gap-2.5 text-[0.9375rem] font-semibold whitespace-nowrap", className)}
    >
      <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
      <span aria-hidden="true">{t("name")}</span>
    </LocaleLink>
  );
}
