import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

// Unmatched /ar/* URLs land here so they get the Arabic 404 (./not-found.tsx), not the English global one.
// A static export needs at least one prerendered path, which becomes /ar/404.html.
// Known limitation (server builds): other unmatched /ar/* paths get Next's error shell, and the Arabic 404 is
// rendered in the browser. `dynamic = "force-static"` was tried; it serves the English global 404 instead.

export function generateStaticParams() {
  return [{ rest: ["404"] }];
}

export default function CatchAll() {
  setRequestLocale("ar");
  notFound();
}
