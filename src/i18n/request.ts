import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { catalog } from "./messages";
import { routing } from "./routing";

// Every layout and page calls setRequestLocale, so this never reads headers and pages stay static.
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return { locale, messages: catalog(locale), timeZone: "UTC" };
});
