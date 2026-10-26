import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrowserFrame({
  src,
  alt,
  sizes,
  className,
  preload,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  preload?: boolean;
}) {
  return (
    <figure className={cn("overflow-hidden rounded-xl border border-line-strong bg-surface", className)}>
      <div className="flex h-6 items-center gap-1.5 border-b border-line px-3" aria-hidden="true">
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover object-top" />
      </div>
    </figure>
  );
}

export function PhoneFrame({ src, alt, sizes, className }: { src: string; alt: string; sizes: string; className?: string }) {
  return (
    <figure
      className={cn("overflow-hidden rounded-[1.75rem] border-[6px] border-line-strong bg-surface", className)}
    >
      <div className="relative aspect-[9/19.5]">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
      </div>
    </figure>
  );
}
