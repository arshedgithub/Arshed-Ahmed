import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-accent-solid text-white hover:bg-accent-solid-hover border border-transparent",
  secondary:
    "border border-line-strong text-fg hover:border-accent hover:text-accent bg-transparent",
} as const;

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98]";

type Props = {
  href: string;
  variant?: keyof typeof variants;
  external?: boolean;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href">;

export function ButtonLink({ href, variant = "primary", external, className, children, ...rest }: Props) {
  const cls = cn(base, variants[variant], className);
  if (external || href.endsWith(".pdf")) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export const buttonClasses = (variant: keyof typeof variants = "primary", className?: string) =>
  cn(base, variants[variant], className);
