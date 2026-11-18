"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function CopyButton({
  value,
  labels,
  className,
}: {
  value: string;
  labels: { action: string; copied: string; failed: string };
  className?: string;
}) {
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
      title={labels.action}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-control border border-line text-muted transition-colors hover:border-line-strong hover:text-fg",
        className,
      )}
    >
      {state === "copied" ? <Check size={18} className="text-live" aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
      <span className="sr-only">{labels.action}</span>
      <span role="status" className="sr-only">
        {state === "copied" ? labels.copied : state === "failed" ? labels.failed : ""}
      </span>
    </button>
  );
}
