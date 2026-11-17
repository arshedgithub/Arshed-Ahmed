import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

// IBM Plex: the same superfamily as the Arabic face (IBM Plex Sans Arabic), so both locales share
// x-height, stroke and weights. Self-hosted by next/font at build time, Latin subset only, swap.
// Only 400/500/600 are used anywhere; nothing asks for 700, so no faux bold.
const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  // Kickers and dates only; the page reads fine in the fallback while it loads.
  preload: false,
});

export const latinFontClassName = `${plex.variable} ${plexMono.variable}`;
