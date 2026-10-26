"use client";

import { Moon, Sun } from "lucide-react";
import { THEME_COLORS } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((m) => {
      m.content = THEME_COLORS[next];
    });
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  // Both icons are rendered; CSS picks one from data-theme, so server and client markup always match.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-fg",
        className,
      )}
    >
      <Sun size={18} aria-hidden="true" className="hidden dark:block" />
      <Moon size={18} aria-hidden="true" className="block dark:hidden" />
    </button>
  );
}
