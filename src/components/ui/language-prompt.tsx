"use client";

import { Check, Languages, X } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type MouseEvent } from "react";
import type { Messages } from "@/i18n/messages";
import { LOCALE_STORAGE_KEY, localeDirection, localePath, routing, stripLocale, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { currentHash } from "./language-switcher";

const PROMPTED_KEY = "locale-prompted";

// Blocked storage reads as "not a first visit": without it the prompt would come back on every page.
function isFirstVisit() {
  try {
    return !localStorage.getItem(LOCALE_STORAGE_KEY) && !localStorage.getItem(PROMPTED_KEY);
  } catch {
    return false;
  }
}

function remember(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

const subscribeToNothing = () => () => {};
const optionClass =
  "relative flex min-h-24 flex-col items-center justify-center gap-1 rounded-xl border p-3 text-center transition-colors hover:border-accent";

/**
 * First-visit language chooser. Rendered only in the browser, so it is not in the prerendered HTML and moves nothing.
 * Only an explicit pick saves a language; closing it just records that it was shown, so LocaleScript won't redirect.
 */
export function LanguagePrompt({ copy }: { copy: Record<Locale, Messages["languagePrompt"]> }) {
  const locale = useLocale();
  const path = stripLocale(usePathname());
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const currentRef = useRef<HTMLButtonElement>(null);
  const firstVisit = useSyncExternalStore(subscribeToNothing, isFirstVisit, () => false);
  const [closed, setClosed] = useState(false);
  const open = firstVisit && !closed;

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.showModal();
    currentRef.current?.focus();
  }, [open]);

  if (!open) return null;

  function close() {
    dialogRef.current?.close();
  }

  function keepCurrent() {
    remember(LOCALE_STORAGE_KEY, locale);
    close();
  }

  function switchTo(e: MouseEvent<HTMLAnchorElement>, target: Locale) {
    remember(LOCALE_STORAGE_KEY, target);
    e.currentTarget.href = localePath(target, path) + currentHash();
  }

  const other = locale === "ar" ? "en" : "ar";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={() => {
        remember(PROMPTED_KEY, "1");
        setClosed(true);
      }}
      // The panel fills the dialog, so the dialog itself is only ever the target for a backdrop click.
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className="lang-dialog m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-line-strong bg-surface p-0 text-fg shadow-card backdrop:bg-black/70"
    >
      <div className="relative p-6 text-center">
        <button
          type="button"
          onClick={close}
          aria-label={copy[locale].close}
          className="absolute end-2 top-2 inline-flex size-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-raised hover:text-fg"
        >
          <X size={18} aria-hidden="true" />
        </button>
        <span className="mx-auto inline-flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Languages size={22} aria-hidden="true" />
        </span>
        <h2 id={titleId} className="mt-4">
          <span lang={locale} className="block text-xl font-semibold">
            {copy[locale].title}
          </span>
          <span lang={other} dir={localeDirection(other)} className="mt-1 block text-sm font-normal text-muted">
            {copy[other].title}
          </span>
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {routing.locales.map((option) => {
            const content = (
              <>
                <span className="text-lg font-semibold">{copy[option].name}</span>
                <span className="text-xs text-muted">{copy[option].action}</span>
              </>
            );
            return option === locale ? (
              <button
                key={option}
                ref={currentRef}
                type="button"
                lang={option}
                dir={localeDirection(option)}
                aria-current="true"
                onClick={keepCurrent}
                className={cn(optionClass, "border-accent bg-accent-soft")}
              >
                <Check size={16} className="absolute end-2 top-2 text-accent" aria-hidden="true" />
                {content}
              </button>
            ) : (
              <a
                key={option}
                href={localePath(option, path)}
                hrefLang={option}
                lang={option}
                dir={localeDirection(option)}
                onClick={(e) => switchTo(e, option)}
                className={cn(optionClass, "border-line-strong")}
              >
                {content}
              </a>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-muted">{copy[locale].note}</p>
      </div>
    </dialog>
  );
}
