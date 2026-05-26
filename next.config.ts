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
    // Legacy live-site slug for online-payments uses /instant-payment.
    { source: "/instant-payment", destination: "/online-payments", permanent: true },
    { source: "/instant-payment/", destination: "/online-payments", permanent: true },

    // Trailing-slash variants of our actual product pages so external links
    // such as /membership-plans/ from the old WP site still resolve cleanly.
    { source: "/membership-plans/", destination: "/membership-plans", permanent: true },
    { source: "/payment-plans/", destination: "/payment-plans", permanent: true },
    { source: "/online-payments/", destination: "/online-payments", permanent: true },
    { source: "/pricing/", destination: "/pricing", permanent: true },
    { source: "/strategy/", destination: "/strategy", permanent: true },
    { source: "/wiki/", destination: "/wiki", permanent: true },

    // Legacy product slugs without dedicated new pages → funnel to the
    // closest matching product page.
    { source: "/dental-savings-account", destination: "/membership-plans", permanent: true },
    { source: "/dental-savings-account/", destination: "/membership-plans", permanent: true },
    { source: "/dental-loans", destination: "/payment-plans", permanent: true },
    { source: "/dental-loans/", destination: "/payment-plans", permanent: true },
    { source: "/loyalty-referral-programs", destination: "/membership-plans", permanent: true },
    { source: "/loyalty-referral-programs/", destination: "/membership-plans", permanent: true },
    { source: "/access-superannuation", destination: "/payment-plans", permanent: true },
    { source: "/access-superannuation/", destination: "/payment-plans", permanent: true },
    { source: "/crowdfunding", destination: "/payment-plans", permanent: true },
    { source: "/crowdfunding/", destination: "/payment-plans", permanent: true },
    { source: "/crypto-payments", destination: "/online-payments", permanent: true },
    { source: "/crypto-payments/", destination: "/online-payments", permanent: true },

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
