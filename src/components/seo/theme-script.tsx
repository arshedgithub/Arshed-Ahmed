import { THEME_COLORS, THEME_DEFAULT } from "@/lib/site";

// Runs synchronously while the HTML is parsed, before first paint, so there is no theme flash.
// Order: saved choice, then an OS light preference (THEME_DEFAULT "system"), then dark.
// Once the head is parsed it also points the browser-chrome theme-color at the active theme,
// which can differ from the OS scheme the <meta media> queries assume.
const script = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=${
  THEME_DEFAULT === "system" ? `matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"` : `"dark"`
}}document.documentElement.dataset.theme=t;document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){m.content=${JSON.stringify(
  THEME_COLORS,
).replace(/"/g, "'")}[t]})})}catch(e){}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
