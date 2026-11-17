"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { LOCALE_STORAGE_KEY, localeDirection, localePath, stripLocale, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** Each language is always named in its own script, on both pages. */
export const LANGUAGE_NAMES: Record<Locale, string> = { en: "English", ar: "العربية" };

/** The section under the middle of the viewport, or the URL's hash where the page has no sections. */
export function currentHash() {
  const middle = window.innerHeight / 2;
  const section = [...document.querySelectorAll<HTMLElement>("main section[id]")].find((el) => {
    const { top, bottom } = el.getBoundingClientRect();
    return top <= middle && bottom >= middle;
  });
  if (!section) return window.location.hash;
  return section.id === "top" ? "" : `#${section.id}`;
}

/** The locale-free path of the current page; 404 pages have no equivalent, so they map to the home page. */
export function equivalentPath(pathname: string) {
  const path = stripLocale(pathname);
  return /(^|\/)(_not-found|404)$/.test(path) ? "/" : path;
}

export function rememberLocale(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {}
}

/**
 * Link to the same page and section in the other language. A plain <a>: the locales are separate root layouts,
 * so this is a full page load either way. The explicit choice is remembered (LocaleHint uses it); nobody is ever
 * redirected automatically.
 */
export function LanguageSwitcher({ className, showIcon = true }: { className?: string; showIcon?: boolean }) {
  const t = useTranslations("nav");
  const target: Locale = useLocale() === "ar" ? "en" : "ar";
  const href = localePath(target, equivalentPath(usePathname()));

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    rememberLocale(target);
    e.currentTarget.href = href + currentHash();
  }

  return (
    <a
      href={href}
      hrefLang={target}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded-[var(--radius-control)] px-2.5 text-sm font-medium text-fg transition-colors hover:bg-surface",
        className,
      )}
    >
      {showIcon && <Languages size={16} aria-hidden="true" className="shrink-0 text-muted" />}
      {/* The accessible name starts with a sentence in the page's language and still contains the visible word. */}
      <span className="sr-only">{t("switchAria")}: </span>
      <span lang={target} dir={localeDirection(target)}>
        {LANGUAGE_NAMES[target]}
      </span>
    </a>
  );
}
