"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function CopyButton({ value, label, className }: { value: string; label: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure context or permissions): the mailto link next to it still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      title={label}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent",
        className,
      )}
    >
      {copied ? <Check size={18} className="text-success" aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
      <span className="sr-only">{label}</span>
      <span role="status" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
