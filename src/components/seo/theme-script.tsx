import { THEME_DEFAULT } from "@/lib/site";

// Runs synchronously while the HTML is parsed, before first paint, so there is no theme flash.
const script = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=${
  THEME_DEFAULT === "system" ? `matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"` : `"dark"`
}}document.documentElement.dataset.theme=t}catch(e){}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
