import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { formatMonth, type ProjectStatus } from "@/lib/content";
import { SHOW_TODO, isTodo } from "@/lib/todo";
import { cn } from "@/lib/utils";

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-chip border border-line px-2 py-0.5 text-xs leading-5 font-medium text-fg-2",
        className,
      )}
    >
      {/* Isolates tech names ("Softsora (Pvt) Ltd") so their punctuation stays put inside Arabic text. */}
      <bdi>{children}</bdi>
    </span>
  );
}

/**
 * A placeholder for a fact Arshed still has to supply (see lib/todo.ts). Visible as a dashed amber marker in
 * development, absent from production builds.
 */
export function TodoMark({ children, className }: { children: ReactNode; className?: string }) {
  if (!SHOW_TODO) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-chip border border-dashed border-dev px-1.5 font-mono text-xs leading-5 text-dev",
        className,
      )}
      dir="ltr"
    >
      {children}
    </span>
  );
}

/** Renders text, or a TodoMark when the text is a placeholder. */
export function Known({ value, children }: { value: string; children?: (v: string) => ReactNode }) {
  if (isTodo(value)) return <TodoMark>{value}</TodoMark>;
  return <>{children ? children(value) : value}</>;
}

const statusStyles = {
  live: "text-live bg-live-soft",
  dev: "text-dev bg-dev-soft",
  client: "text-neutral bg-neutral-soft",
  prototype: "text-neutral bg-neutral-soft",
} as const;

/**
 * Honest status pill: green only for products confirmed live, amber for in development, grey otherwise.
 * The dot pulses only for live products.
 */
export function StatusPill({ status }: { status: ProjectStatus }) {
  const t = useTranslations("status");
  const locale = useLocale();
  if (status.kind === "TODO_STATUS") return <TodoMark>TODO_STATUS</TodoMark>;
  // Launch date as "YYYY-MM" in site.ts, shown as "Mar 2027" / "مارس 2027".
  const kindLabel =
    status.kind === "dev" && status.date && !isTodo(status.date)
      ? t("devDate", { date: formatMonth(status.date, locale) })
      : t(status.kind);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs leading-4 font-medium",
        statusStyles[status.kind],
      )}
    >
      <span
        aria-hidden="true"
        className={cn("relative size-1.5 shrink-0 rounded-full bg-current", status.kind === "live" && "pulse-dot")}
      />
      <span className="text-fg">
        {status.label && (
          <>
            <bdi>{status.label}</bdi>
            <span aria-hidden="true"> · </span>
          </>
        )}
        <span className={status.kind === "live" ? "font-semibold" : undefined}>{kindLabel}</span>
      </span>
      {status.kind === "dev" && status.date && isTodo(status.date) && <TodoMark>{status.date}</TodoMark>}
    </span>
  );
}

/** Mono kicker + title (+ optional description). The heading is the section's accessible name. */
export function SectionHeading({
  id,
  kicker,
  title,
  description,
  className,
}: {
  id: string;
  kicker?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 max-w-2xl md:mb-12", className)}>
      {kicker && <p className="kicker mb-3">{kicker}</p>}
      <h2 id={id} className="text-title font-semibold">
        {title}
      </h2>
      {description && <p className="mt-3 text-pretty text-muted md:text-lg">{description}</p>}
    </div>
  );
}

export function Section({
  id,
  labelledBy,
  className,
  children,
}: {
  id: string;
  labelledBy: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("border-t border-line py-16 md:py-24", className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}
