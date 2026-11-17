"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { THEME_COLORS } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Light/dark toggle. Both icons and labels are rendered and CSS picks one from data-theme, so server and client
 * markup always match. `withLabel` shows the target theme as text (mobile menu row).
 */
export function ThemeToggle({ className, withLabel = false }: { className?: string; withLabel?: boolean }) {
  const t = useTranslations("common");

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

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={withLabel ? undefined : t("toggleThemeLabel")}
      title={withLabel ? undefined : t("toggleThemeLabel")}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-[var(--radius-control)] text-muted transition-colors hover:bg-surface hover:text-fg",
        className,
      )}
    >
      <Sun size={18} aria-hidden="true" className="hidden dark:block" />
      <Moon size={18} aria-hidden="true" className="block dark:hidden" />
      {withLabel && (
        <>
          <span className="hidden dark:inline">{t("themeLight")}</span>
          <span className="inline dark:hidden">{t("themeDark")}</span>
        </>
      )}
    </button>
  );
}
