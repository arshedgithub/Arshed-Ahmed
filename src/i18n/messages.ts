import ar from "../../messages/ar.json";
import en from "../../messages/en.json";
import type { Locale } from "./routing";

// npm run i18n:check keeps both files on an identical key structure, so one type describes them.
export type Messages = typeof en;

const catalogs: Record<Locale, Messages> = { en, ar };

export function catalog(locale: Locale): Messages {
  return catalogs[locale];
}
