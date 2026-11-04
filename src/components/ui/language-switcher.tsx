"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { LOCALE_STORAGE_KEY, localePath, stripLocale } from "@/i18n/routing";

/** The section under the middle of the viewport, or the URL's hash where the page has no sections. */
function currentHash() {
  const middle = window.innerHeight / 2;
  const section = [...document.querySelectorAll<HTMLElement>("main section[id]")].find((el) => {
    const { top, bottom } = el.getBoundingClientRect();
    return top <= middle && bottom >= middle;
  });
  if (!section) return window.location.hash;
  return section.id === "top" ? "" : `#${section.id}`;
}

/**
 * Link to the same page in the other language. A plain <a>: the locales are separate root layouts, so this
 * is a full page load either way. The choice is saved for LocaleScript, which applies it on the next visit.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const target = useLocale() === "ar" ? "en" : "ar";
  const href = localePath(target, stripLocale(usePathname()));

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, target);
    } catch {}
    e.currentTarget.href = href + currentHash();
  }

  return (
    <a href={href} hrefLang={target} lang={target} aria-label={t("switchName")} onClick={onClick} className={className}>
      {t("switchLabel")}
    </a>
  );
}
