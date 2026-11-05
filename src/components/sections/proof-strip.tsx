import { useTranslations } from "next-intl";
import { CountUp } from "@/components/motion/count-up";
import { proof } from "@/lib/site";
import { cn } from "@/lib/utils";

// 2x2 grid on mobile, one row of four from md.
const cellBorders = [
  "border-e border-b md:border-b-0",
  "border-b md:border-b-0 md:border-e",
  "border-e",
  "",
];

export function ProofStrip() {
  const t = useTranslations("stats");
  return (
    <section aria-label={t("aria")} className="pb-4">
      <div className="container-page">
        <dl className="card grid grid-cols-2 md:grid-cols-4">
          {proof.map((item, i) => (
            <div
              key={item.key}
              className={cn("flex flex-col-reverse items-center gap-1 border-line px-3 py-5 text-center md:py-6", cellBorders[i])}
            >
              <dt className="text-xs text-muted md:text-sm">{t(item.key)}</dt>
              <dd className="text-2xl font-bold tracking-tight md:text-3xl">
                {"text" in item ? (
                  <span className="text-accent">{item.text}</span>
                ) : (
                  <CountUp value={item.value} suffix={item.suffix} />
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
