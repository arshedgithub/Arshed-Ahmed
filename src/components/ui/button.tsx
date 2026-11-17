import type { ComponentProps, ReactNode } from "react";
import { LocaleLink } from "@/i18n/link";
import { cn } from "@/lib/utils";

// One filled (primary) style per view: the Von Restorff effect only works if it is the only one.
const variants = {
  primary: "bg-accent-solid text-white hover:bg-accent-solid-hover border border-transparent",
  secondary: "border border-line-strong text-fg hover:border-fg/40 hover:bg-surface bg-transparent",
  ghost: "border border-transparent text-fg hover:bg-surface",
} as const;

const sizes = {
  md: "min-h-11 px-5 text-sm",
  sm: "min-h-11 px-3 text-sm md:min-h-10",
} as const;

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] font-medium whitespace-nowrap transition-[background-color,border-color,color] select-none";

export type ButtonVariant = keyof typeof variants;

export const buttonClasses = (variant: ButtonVariant = "primary", className?: string, size: keyof typeof sizes = "md") =>
  cn(base, sizes[size], variants[variant], className);

type Props = {
  href: string;
  variant?: ButtonVariant;
  size?: keyof typeof sizes;
  external?: boolean;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href">;

export function ButtonLink({ href, variant = "primary", size = "md", external, className, children, ...rest }: Props) {
  const cls = buttonClasses(variant, className, size);
  if (external || href.endsWith(".pdf") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <LocaleLink href={href} className={cls} {...rest}>
      {children}
    </LocaleLink>
  );
}
