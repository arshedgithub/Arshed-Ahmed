import { notFound } from "next/navigation";

// Unmatched /ar/* URLs land here so they get the Arabic 404 (./not-found.tsx), not the English global one.
// A static export needs at least one prerendered path, which becomes /ar/404.html.
export function generateStaticParams() {
  return [{ rest: ["404"] }];
}

export default function CatchAll() {
  notFound();
}
