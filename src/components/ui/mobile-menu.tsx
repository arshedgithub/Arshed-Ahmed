"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ThemeToggle, type ThemeLabels } from "./theme-toggle";

export type MobileMenuCopy = {
  open: string;
  close: string;
  navAria: string;
  appearance: string;
  theme: ThemeLabels;
  /** Already localized hrefs. */
  items: { href: string; label: string }[];
};

/**
 * Phone and tablet menu: an opaque sheet under the header (nothing shows through), page scroll locked,
 * focus kept inside while open and returned to the button on close.
 */
export function MobileMenu({ copy }: { copy: MobileMenuCopy }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    function close(returnFocus: boolean) {
      setOpen(false);
      if (returnFocus) buttonRef.current?.focus();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") return close(true);
      if (e.key !== "Tab" || !panelRef.current) return;
      // Trap: cycle between the menu button and the sheet's controls.
      const items = [buttonRef.current!, ...panelRef.current.querySelectorAll<HTMLElement>("a, button")];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    function onResize() {
      if (window.matchMedia("(min-width: 64rem)").matches) close(false);
    }
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? copy.close : copy.open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-control text-fg hover:bg-surface"
      >
        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="menu-sheet fixed inset-x-0 top-14 bottom-0 z-40 overflow-y-auto border-t border-line bg-canvas md:top-16"
      >
        <div className="container-page flex min-h-full flex-col py-4">
          <nav aria-label={copy.navAria}>
            <ul className="grid">
              {copy.items.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link href={item.href} onClick={() => setOpen(false)} className="flex min-h-14 items-center text-xl font-medium text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="kicker">{copy.appearance}</span>
            <ThemeToggle labels={copy.theme} withLabel className="border border-line px-3 text-fg" />
          </div>
        </div>
      </div>
    </div>
  );
}
