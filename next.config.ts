import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// DEPLOY_TARGET=static builds a fully static site into /out (Cloudflare Pages, Netlify).
// Anything else (default) builds for Vercel / a Node server.
const isStaticExport = process.env.DEPLOY_TARGET === "static";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
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
