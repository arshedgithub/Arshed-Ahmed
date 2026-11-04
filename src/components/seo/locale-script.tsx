import { LOCALE_STORAGE_KEY, type Locale } from "@/i18n/routing";

// Honours a language the visitor picked with the switcher (only it writes this key), before first paint.
// The browser's language is never consulted. Leading slashes are collapsed so "//host" can't leave the site.
const script = (locale: Locale) =>
  `(function(){try{var s=localStorage.getItem("${LOCALE_STORAGE_KEY}");if((s!=="en"&&s!=="ar")||s==="${locale}")return;var p=location.pathname.replace(/^\\/ar(?=\\/|$)/,"").replace(/^\\/+/,"/")||"/";location.replace((s==="ar"?"/ar"+(p==="/"?"":p):p)+location.search+location.hash)}catch(e){}})()`;

export function LocaleScript({ locale }: { locale: Locale }) {
  return <script dangerouslySetInnerHTML={{ __html: script(locale) }} />;
}
