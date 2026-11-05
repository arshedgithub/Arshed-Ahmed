import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { NotFoundPage } from "@/components/pages/not-found-page";
import { catalog } from "@/i18n/messages";

export const metadata: Metadata = {
  title: catalog("ar").notFound.metaTitle,
  robots: { index: false },
};

export default function NotFound() {
  setRequestLocale("ar");
  return <NotFoundPage />;
}
