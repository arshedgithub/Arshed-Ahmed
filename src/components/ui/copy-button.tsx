"use client";

import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function CopyButton({ value, label, className }: { value: string; label: string; className?: string }) {
  const t = useTranslations("common");
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = setTimeout(() => setState("idle"), 2500);
    return () => clearTimeout(timer);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      title={label}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-control)] border border-line text-muted transition-colors hover:border-line-strong hover:text-fg",
        className,
      )}
    >
      {state === "copied" ? <Check size={18} className="text-live" aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
      <span className="sr-only">{label}</span>
      <span role="status" className="sr-only">
        {state === "copied" ? t("copied") : state === "failed" ? t("copyFailed") : ""}
      </span>
    </button>
  );
}
