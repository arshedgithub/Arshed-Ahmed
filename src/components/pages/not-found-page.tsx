import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";

export function NotFoundPage() {
  const t = useTranslations("notFound");
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-start justify-center py-16">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 max-w-md text-muted">{t("description")}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href="/">{t("goHome")}</ButtonLink>
        <ButtonLink href="/#work" variant="secondary">
          {t("viewProjects")}
        </ButtonLink>
      </div>
    </section>
  );
}
