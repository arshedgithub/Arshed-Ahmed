"use client";

import { Briefcase, House, Layers, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "top", label: "Home", href: "/#top", Icon: House },
  { id: "work", label: "Work", href: "/#work", Icon: Briefcase },
  { id: "skills", label: "Skills", href: "/#skills", Icon: Layers },
  { id: "contact", label: "Contact", href: "/#contact", Icon: Mail },
] as const;

/** Mobile-only tab bar. Highlights the section currently in view on the home page. */
export function BottomNav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    if (!onHome) return;
    const sections = tabs
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome]);

  const current = onHome ? active : "work";

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="mx-auto grid h-16 max-w-md grid-cols-4">
        {tabs.map(({ id, label, href, Icon }) => {
          const isActive = current === id;
          return (
            <li key={id}>
              <Link
                href={href}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "flex h-full flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors",
                  isActive ? "text-accent" : "text-muted hover:text-fg",
                )}
              >
                <Icon size={20} aria-hidden="true" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
