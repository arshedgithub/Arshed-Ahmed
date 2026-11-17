import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Slim browser chrome around a 16:10 screenshot (or a schematic passed as children). */
export function BrowserFrame({
  src,
  alt,
  sizes,
  className,
  preload,
  children,
  caption,
}: {
  src?: string;
  alt?: string;
  sizes?: string;
  className?: string;
  preload?: boolean;
  children?: ReactNode;
  /** Visible label under the chrome, e.g. "Illustration, not a screenshot". */
  caption?: string;
}) {
  return (
    <figure className={cn("overflow-hidden rounded-control border border-line bg-surface", className)}>
      <div className="flex h-6 items-center gap-1.5 border-b border-line px-2.5" aria-hidden="true">
        <span className="size-1.5 rounded-full bg-line-strong" />
        <span className="size-1.5 rounded-full bg-line-strong" />
        <span className="size-1.5 rounded-full bg-line-strong" />
      </div>
      <div className="relative aspect-[16/10]">
        {src ? (
          <Image src={src} alt={alt ?? ""} fill sizes={sizes} preload={preload} className="object-cover object-top" />
        ) : (
          children
        )}
        {caption && (
          <figcaption className="absolute end-2 bottom-2 rounded-chip bg-surface/90 px-1.5 py-0.5 text-[11px] leading-4 text-muted">
            {caption}
          </figcaption>
        )}
      </div>
    </figure>
  );
}

export function PhoneFrame({ src, alt, sizes, className }: { src: string; alt: string; sizes: string; className?: string }) {
  return (
    <figure className={cn("overflow-hidden rounded-[1.5rem] border-[5px] border-line-strong bg-surface", className)}>
      <div className="relative aspect-[390/845]">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
      </div>
    </figure>
  );
}
