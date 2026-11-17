"use client";

import { X } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import type { Messages } from "@/i18n/messages";
import { LOCALE_STORAGE_KEY, localeDirection, localePath, type Locale } from "@/i18n/routing";
import { buttonClasses } from "./button";
import { currentHash, equivalentPath } from "./language-switcher";

const DISMISSED_KEY = "locale-hint-dismissed";
const subscribeToNothing = () => () => {};

function savedLocale(): Locale | null {
  try {
    if (sessionStorage.getItem(DISMISSED_KEY)) return null;
    const s = localStorage.getItem(LOCALE_STORAGE_KEY);
    return s === "en" || s === "ar" ? s : null;
  } catch {
    return null;
  }
}

/**
 * Remembers the language a visitor picked with the switcher, without redirecting anyone: when a shared link opens
 * the other language, a small toast offers the equivalent page in the saved one. Fixed position, so it never
 * shifts layout; rendered only in the browser, so it is not in the prerendered HTML.
 */
export function LocaleHint({ copy }: { copy: Record<Locale, Messages["localeHint"]> }) {
  const locale = useLocale();
  const path = equivalentPath(usePathname());
  const saved = useSyncExternalStore(subscribeToNothing, savedLocale, () => null);
  const [dismissed, setDismissed] = useState(false);

  if (!saved || saved === locale || dismissed) return null;
  const text = copy[saved];

  function dismiss() {
    try {
      sessionStorage.setItem(DISMISSED_KEY, "1");
    } catch {}
    setDismissed(true);
  }

  return (
    <div
      role="region"
      aria-label={text.text}
      lang={saved}
      dir={localeDirection(saved)}
      className="toast-in no-print fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-md items-center gap-3 rounded-card border border-line-strong bg-surface p-3 ps-4 shadow-overlay"
    >
      <p className="flex-1 text-sm text-fg">{text.text}</p>
      <a
        href={localePath(saved, path)}
        hrefLang={saved}
        onClick={(e) => {
          e.currentTarget.href = localePath(saved, path) + currentHash();
        }}
        className={buttonClasses("secondary", "shrink-0", "sm")}
      >
        {text.action}
      </a>
      <button
        type="button"
        onClick={dismiss}
        aria-label={text.dismiss}
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-control text-muted hover:bg-raised hover:text-fg"
      >
        <X size={18} aria-hidden="true" />
      </button>
    </div>
  );
}
