import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { NotFoundPage } from "@/components/pages/not-found-page";

export const metadata: Metadata = {
  robots: { index: false },
};

export default function NotFound() {
  setRequestLocale("ar");
  return <NotFoundPage />;
}
