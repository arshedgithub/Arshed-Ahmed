import Link from "next/link";
import { site } from "@/lib/site";

export function Logo() {
  return (
    <Link href="/" className="inline-flex min-h-11 items-center text-base font-semibold tracking-tight">
      {site.firstName}&nbsp;<span className="text-accent">{site.lastName}</span>
    </Link>
  );
}
