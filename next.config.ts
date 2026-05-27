import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin Turbopack to this project (there's an unrelated package-lock.json one
  // directory up that Next.js otherwise picks up as the workspace root).
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Trailing slashes: treat /foo and /foo/ as equivalent without a redirect.
  skipTrailingSlashRedirect: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    // We author our own SVG mocks for the Strategy "Set it up in SmilePass"
    // sections, so SVG is safe to allow through the optimizer. CSP locks it
    // down so injected scripts in any SVG cannot execute.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  /*
   * Redirects map legacy live-site URLs (from the WordPress predecessor) onto
   * the equivalent new page so SEO authority + bookmarks transfer.
   *
   * Anything that does NOT have a sensible destination on the new site is
   * intentionally omitted, so the request returns a real 404 rather than
   * bouncing the visitor into another 404.
   */
  redirects: async () => [
    // Solution hubs live under /solutions/*. The flat slugs (old WP site +
    // the earlier flat build) 301 to their nested home.
    { source: "/membership-plans", destination: "/solutions/membership-plans", permanent: true },
    { source: "/membership-plans/", destination: "/solutions/membership-plans", permanent: true },
    { source: "/payment-plans", destination: "/solutions/payment-plans", permanent: true },
    { source: "/payment-plans/", destination: "/solutions/payment-plans", permanent: true },
    { source: "/online-payments", destination: "/solutions/online-payments", permanent: true },
    { source: "/online-payments/", destination: "/solutions/online-payments", permanent: true },
    { source: "/instant-payment", destination: "/solutions/online-payments", permanent: true },
    { source: "/instant-payment/", destination: "/solutions/online-payments", permanent: true },

    // Trailing-slash variants of content sections.
    { source: "/pricing/", destination: "/pricing", permanent: true },
    { source: "/strategy/", destination: "/strategy", permanent: true },
    { source: "/wiki/", destination: "/wiki", permanent: true },

    // "Solutions" is not a standalone page — it anchors to the home #solutions
    // section that describes all three hubs.
    { source: "/solutions", destination: "/#solutions", permanent: true },
    { source: "/solutions/", destination: "/#solutions", permanent: true },

    // Legacy product slugs without dedicated pages → closest hub.
    { source: "/dental-savings-account", destination: "/solutions/membership-plans", permanent: true },
    { source: "/dental-savings-account/", destination: "/solutions/membership-plans", permanent: true },
    { source: "/dental-loans", destination: "/solutions/payment-plans", permanent: true },
    { source: "/dental-loans/", destination: "/solutions/payment-plans", permanent: true },
    { source: "/loyalty-referral-programs", destination: "/solutions/membership-plans", permanent: true },
    { source: "/loyalty-referral-programs/", destination: "/solutions/membership-plans", permanent: true },
    { source: "/access-superannuation", destination: "/solutions/payment-plans", permanent: true },
    { source: "/access-superannuation/", destination: "/solutions/payment-plans", permanent: true },
    { source: "/crowdfunding", destination: "/solutions/payment-plans", permanent: true },
    { source: "/crowdfunding/", destination: "/solutions/payment-plans", permanent: true },
    { source: "/crypto-payments", destination: "/solutions/online-payments", permanent: true },
    { source: "/crypto-payments/", destination: "/solutions/online-payments", permanent: true },

    // Forms / CTAs / contact: legacy slugs → current routes.
    { source: "/request-a-demo", destination: "/contact", permanent: true },
    { source: "/request-a-demo/", destination: "/contact", permanent: true },
    { source: "/request-demo", destination: "/contact", permanent: true },
    { source: "/request-demo/", destination: "/contact", permanent: true },
    { source: "/contact-us", destination: "/contact", permanent: true },
    { source: "/contact-us/", destination: "/contact", permanent: true },

    // Legacy patient/dentist landings → home (no replacement page exists yet).
    { source: "/patients", destination: "/", permanent: true },
    { source: "/patients/", destination: "/", permanent: true },
    { source: "/dentists", destination: "/", permanent: true },
    { source: "/dentists/", destination: "/", permanent: true },
    { source: "/benefits", destination: "/", permanent: true },
    { source: "/benefits/", destination: "/", permanent: true },
    { source: "/how-it-works", destination: "/", permanent: true },
    { source: "/how-it-works/", destination: "/", permanent: true },
    { source: "/become-a-smilepass-dentist", destination: "/", permanent: true },
    { source: "/become-a-smilepass-dentist/", destination: "/", permanent: true },
  ],
};

export default nextConfig;
