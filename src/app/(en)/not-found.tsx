import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { NotFoundPage } from "@/components/pages/not-found-page";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  setRequestLocale("en");
  return <NotFoundPage />;
}
