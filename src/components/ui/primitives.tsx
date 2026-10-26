import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-line bg-canvas/60 px-2.5 py-1 text-xs font-medium text-fg/90",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Availability badge. Colours live in globals.css (--avail-*), 7:1+ text contrast in both themes. */
export function StatusChip({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2.5 rounded-full border border-[var(--avail-border)] bg-[var(--avail-bg)] px-3.5 py-2 text-[13px] leading-5 font-semibold text-[var(--avail-fg)] min-[340px]:text-sm">
      <span className="avail-dot relative size-2 shrink-0 rounded-full bg-[var(--avail-dot)]" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  action,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4 md:mb-10">
      <div>
        {eyebrow && <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>}
        <h2 id={id} className="text-2xl font-semibold tracking-tight md:text-3xl">
          {title}
        </h2>
        {description && <p className="mt-2 max-w-prose text-muted">{description}</p>}
      </div>
      {action}
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
    <section id={id} aria-labelledby={labelledBy} className={cn("py-16 md:py-24 lg:py-28", className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}
