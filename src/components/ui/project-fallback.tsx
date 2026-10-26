import type { Project } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Chip } from "./primitives";

/**
 * Shown in place of a project image until a real screenshot exists. Text-only by design,
 * so it reads as intentional rather than as a missing image.
 */
export function ProjectFallback({
  project,
  variant,
  className,
}: {
  project: Project;
  variant: "card" | "hero";
  className?: string;
}) {
  const stack = project.stack.flatMap((g) => g.items);
  const shown = variant === "card" ? stack.slice(0, 3) : stack.slice(0, 6);
  return (
    <div
      className={cn(
        "project-pattern relative flex aspect-[16/10] flex-col justify-end overflow-hidden rounded-xl border border-line bg-canvas shadow-card",
        variant === "card" ? "p-4" : "p-6 md:p-8",
        className,
      )}
    >
      <p className={cn("font-semibold tracking-tight", variant === "card" ? "text-lg" : "text-sm text-accent")}>
        {project.title} {variant === "card" && <span className="text-accent">{project.titleAccent}</span>}
      </p>
      {variant === "hero" && (
        <p className="mt-2 max-w-md text-lg leading-snug font-semibold md:text-xl">{project.outcome}</p>
      )}
      <ul className={cn("flex flex-wrap gap-1.5", variant === "card" ? "mt-3" : "mt-4")} aria-label={`${project.title} stack`}>
        {shown.map((item) => (
          <li key={item}>
            <Chip>{item}</Chip>
          </li>
        ))}
      </ul>
    </div>
  );
}
