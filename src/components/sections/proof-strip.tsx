import { useTranslations } from "next-intl";
import { proof } from "@/lib/site";

/**
 * Four defensible facts. Values are final text in the HTML (no count-up), so crawlers, screen readers,
 * print and reduced-motion visitors all read the real number.
 */
export function ProofStrip() {
  const t = useTranslations("proof");
  return (
    <section aria-label={t("aria")} className="border-t border-line">
      <div className="container-page">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {proof.map((item, i) => (
            <div
              key={item.key}
              className={[
                "flex flex-col-reverse justify-end gap-1.5 border-line py-6 md:py-8",
                // Hairline dividers: a 2x2 grid on phones and tablets, one row from lg.
                i % 2 === 0 ? "pe-4 max-lg:border-e" : "ps-4",
                i < 2 ? "max-lg:border-b" : "",
                "lg:px-6 lg:first:ps-0 lg:[&:not(:last-child)]:border-e",
              ].join(" ")}
            >
              <dt className="text-sm leading-snug text-muted">{t(item.key)}</dt>
              <dd className="font-mono text-3xl font-medium tracking-tight text-fg md:text-4xl">
                {/* Isolated LTR so "200+" never renders as "+200" on the Arabic page. */}
                <bdi dir="ltr">{item.value}</bdi>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
