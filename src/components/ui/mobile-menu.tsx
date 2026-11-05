"use client";

import { Download, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { LocaleLink } from "@/i18n/link";
import type { Locale } from "@/i18n/routing";
import { nav } from "@/lib/site";
import { buttonClasses } from "./button";
import { LanguageSwitcher } from "./language-switcher";

export function MobileMenu({ cv }: { cv: { href: string; lang: Locale } }) {
  const t = useTranslations("nav");
  const common = useTranslations("common");
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onPointer(e: PointerEvent) {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t("closeMenu") : t("openMenu")}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-lg text-fg hover:bg-surface"
      >
        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-canvas px-4 pb-4 shadow-card"
      >
        <nav aria-label={t("mobileAria")}>
          <ul className="grid gap-1 py-2">
            {nav.map((item) => (
              <li key={item.key}>
                <LocaleLink
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-lg px-3 text-base text-fg hover:bg-surface"
                >
                  {t(item.key)}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </nav>
        <LanguageSwitcher className="mb-2 flex min-h-11 items-center rounded-lg px-3 text-base text-fg hover:bg-surface" />
        <a href={cv.href} hrefLang={cv.lang} download className={buttonClasses("secondary", "w-full")}>
          <Download size={16} aria-hidden="true" />
          {common("downloadCv")}
        </a>
      </div>
    </div>
  );
}
