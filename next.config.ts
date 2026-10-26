import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// DEPLOY_TARGET=static builds a fully static site into /out (Cloudflare Pages, Netlify).
// Anything else (default) builds for Vercel / a Node server.
const isStaticExport = process.env.DEPLOY_TARGET === "static";

const nextConfig: NextConfig = {
  // Cache Components is off: the site is fully static, and `output: "export"` requires
  // `dynamic = "force-static"` on sitemap/robots, which Cache Components does not allow.
  // Keeping it off means both deploy targets render identically.
  // `*.server.ts` route files (the Resend contact API) only exist in server builds.
  pageExtensions: isStaticExport ? ["tsx", "ts", "mdx"] : ["tsx", "ts", "mdx", "server.ts"],
  ...(isStaticExport ? { output: "export" as const } : {}),
  images: isStaticExport
    ? { unoptimized: true }
    : { formats: ["image/avif", "image/webp"] },
  env: {
    BUILD_YEAR: String(new Date().getFullYear()),
  },
  turbopack: {
    // Pin the root: a stray lockfile higher up the tree would otherwise be picked up.
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
