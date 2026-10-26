import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { ogPortrait } from "./og-portrait";

export const ogSize = { width: 1200, height: 630 };

const C = {
  base: "#0b0f14",
  surface: "#111827",
  line: "#2c3b52",
  fg: "#f8fafc",
  muted: "#94a3b8",
  accent: "#3b82f6",
};

/** Shared Open Graph card used by the home page and every case study. */
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
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: `radial-gradient(circle at 80% 30%, #16233a 0%, ${C.base} 60%)`,
          color: C.fg,
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, paddingRight: 32 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 24, color: C.accent, letterSpacing: 2, textTransform: "uppercase" }}>
              {eyebrow}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", columnGap: 18, fontSize: (title + (accent ?? "")).length > 16 ? 64 : 72, fontWeight: 700, marginTop: 20, lineHeight: 1.05 }}>
              <span>{title}</span>
              {accent && <span style={{ color: C.accent }}>{accent}</span>}
            </div>
            <div style={{ display: "flex", fontSize: 30, color: C.muted, marginTop: 24, lineHeight: 1.35, maxWidth: 680 }}>
              {subtitle}
            </div>
            {chips.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28 }}>
                {chips.map((c) => (
                  <div
                    key={c}
                    style={{ display: "flex", fontSize: 20, border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px 12px", color: C.fg }}
                  >
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: C.muted }}>
            <span style={{ color: C.fg, fontWeight: 600 }}>Arshed Ahmed</span>
            <span style={{ marginLeft: 12 }}>· {new URL(site.url).host}</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            width: 360,
            height: 450,
            alignSelf: "center",
            borderRadius: 24,
            overflow: "hidden",
            border: `1px solid ${C.accent}88`,
            background: "radial-gradient(circle at 50% 30%, #1c2738 0%, #0d131c 80%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={ogPortrait} width={360} height={450} style={{ objectFit: "cover" }} />
        </div>
      </div>
    ),
    ogSize,
  );
}
