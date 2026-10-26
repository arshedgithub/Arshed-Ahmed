import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-start justify-center py-16">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">This page doesn&apos;t exist</h1>
      <p className="mt-3 max-w-md text-muted">The link may be out of date. The projects and contact details are all on the home page.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href="/">Go to home page</ButtonLink>
        <ButtonLink href="/#work" variant="secondary">
          View projects
        </ButtonLink>
      </div>
    </section>
  );
}
