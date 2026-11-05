import { useTranslations } from "next-intl";
import { LocaleLink } from "@/i18n/link";
import { cn } from "@/lib/utils";

/**
 * "monogram-mobile": AA monogram below md (the hero already shows the full name there), full name from md.
 * "full": always the full name.
 */
export function Logo({ variant = "full" }: { variant?: "full" | "monogram-mobile" }) {
  const t = useTranslations("common");
  const mono = variant === "monogram-mobile";
  return (
    <LocaleLink
      href="/"
      aria-label={mono ? t("logoHome", { name: t("name") }) : undefined}
      className="inline-flex min-h-11 items-center text-base font-semibold tracking-tight"
    >
      {mono && (
        <span
          aria-hidden="true"
          className="inline-flex size-9 items-center justify-center rounded-lg border border-line-strong text-sm font-bold md:hidden"
        >
          A<span className="text-accent">A</span>
        </span>
      )}
      <span className={cn(mono && "hidden md:inline")} aria-hidden={mono || undefined}>
        {t("firstName")}&nbsp;<span className="text-accent">{t("lastName")}</span>
      </span>
    </LocaleLink>
  );
}
