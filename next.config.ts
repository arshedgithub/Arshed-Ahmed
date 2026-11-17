import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// DEPLOY_TARGET=static builds a fully static site into /out (Cloudflare Pages, Netlify).
// Anything else (default) builds for Vercel / a Node server.
const isStaticExport = process.env.DEPLOY_TARGET === "static";

const nextConfig: NextConfig = {
  // Cache Components is off: the site is fully static, and `output: "export"` requires
  // `dynamic = "force-static"` on sitemap/robots, which Cache Components does not allow.
  // Keeping it off means both deploy targets render identically.
  // `*.server.ts` route files (the Resend contact API) only exist in server builds.
  pageExtensions: isStaticExport ? ["tsx", "ts"] : ["tsx", "ts", "server.ts"],
  ...(isStaticExport ? { output: "export" as const } : {}),
  images: isStaticExport
    ? { unoptimized: true }
    : {
        formats: ["image/avif", "image/webp"],
        // Largest source image is 1200px wide, so nothing above that is ever useful.
        deviceSizes: [360, 414, 640, 750, 828, 1080, 1200],
        imageSizes: [48, 96, 128, 192, 256, 384, 480],
      },
  // The canonical host is www (src/lib/site.ts). Vercel's domain settings already 308 the apex to www;
  // public/_redirects does the same on Netlify.
  env: {
    BUILD_YEAR: String(new Date().getFullYear()),
  },
  // Two root layouts (English and Arabic) leave no single layout for a 404 of unmatched URLs.
  experimental: { globalNotFound: true },
  turbopack: {
    // Pin the root: a stray lockfile higher up the tree would otherwise be picked up.
    root: process.cwd(),
  },
  async headers() {
    // Vercel ignores public/_headers, so the same security headers are set here for server builds.
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
