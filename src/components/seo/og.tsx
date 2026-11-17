import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { ogPortrait } from "./og-portrait";

export const ogSize = { width: 1200, height: 630 };

// Dark-theme tokens from globals.css (next/og can't read CSS variables).
const C = {
  bg: "#0d0f12",
  surface: "#131619",
  line: "#343a43",
  fg: "#eceef1",
  muted: "#959ca7",
  accent: "#8fa8ff",
  live: "#4ad48a",
};

/** Shared Open Graph card used by the English home page and every English case study. */
export function renderOg({
  eyebrow,
  title,
  accent,
  subtitle,
  chips = [],
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle: string;
  chips?: string[];
}) {
  const length = (title + (accent ?? "")).length;
  const titleSize = length > 44 ? 54 : length > 24 ? 62 : 72;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: C.bg, color: C.fg, padding: 64, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, paddingRight: 40 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: C.muted }}>
              <div style={{ display: "flex", width: 10, height: 10, borderRadius: 10, background: C.live, marginRight: 12 }} />
              {eyebrow}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", columnGap: 16, fontSize: titleSize, fontWeight: 600, marginTop: 28, lineHeight: 1.08, letterSpacing: -1.5 }}>
              <span>{title}</span>
              {accent && <span style={{ color: C.muted }}>{accent}</span>}
            </div>
            <div style={{ display: "flex", fontSize: 28, color: C.fg, marginTop: 28, lineHeight: 1.35, maxWidth: 660, borderLeft: `3px solid ${C.accent}`, paddingLeft: 18 }}>
              {subtitle}
            </div>
            {chips.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28 }}>
                {chips.map((c) => (
                  <div key={c} style={{ display: "flex", fontSize: 20, border: `1px solid ${C.line}`, borderRadius: 6, padding: "4px 12px", color: C.muted }}>
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: C.muted }}>
            <div style={{ display: "flex", width: 10, height: 10, borderRadius: 10, background: C.accent, marginRight: 12 }} />
            <span style={{ color: C.fg, fontWeight: 600 }}>{site.name}</span>
            <span style={{ marginLeft: 12 }}>· {new URL(site.url).host.replace(/^www\./, "")}</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            width: 340,
            height: 425,
            alignSelf: "center",
            borderRadius: 18,
            overflow: "hidden",
            border: `1px solid ${C.line}`,
            background: C.surface,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={ogPortrait} width={340} height={425} style={{ objectFit: "cover" }} />
        </div>
      </div>
    ),
    ogSize,
  );
}
