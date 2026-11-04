import { useLocale } from "next-intl";
import Link from "next/link";
import type { ComponentProps } from "react";
import { localePath } from "./routing";

/** next/link for internal paths, written without a locale ("/#work") and prefixed for the current one. */
export function LocaleLink({ href, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  return <Link href={localePath(useLocale(), href)} {...props} />;
}
