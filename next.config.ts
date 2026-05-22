import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin Turbopack to this project (there's an unrelated package-lock.json one
  // directory up that Next.js otherwise picks up as the workspace root).
  turbopack: {
    root: path.resolve(__dirname),
  },
  // One-hop redirects: keep trailing-slash variants explicit below.
  skipTrailingSlashRedirect: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  redirects: async () => [
    // Legacy WordPress URLs -> new IA (3-category consolidation)
    { source: "/membership-plans", destination: "/solutions/recurring-revenue", permanent: true },
    { source: "/membership-plans/", destination: "/solutions/recurring-revenue", permanent: true },
    { source: "/payment-plans", destination: "/solutions/patient-financing", permanent: true },
    { source: "/payment-plans/", destination: "/solutions/patient-financing", permanent: true },
    { source: "/instant-payment", destination: "/solutions/payment-operations", permanent: true },
    { source: "/instant-payment/", destination: "/solutions/payment-operations", permanent: true },

    // Legacy product pages with no dedicated destination → relevant category
    { source: "/dental-savings-account", destination: "/solutions/patient-financing", permanent: true },
    { source: "/dental-savings-account/", destination: "/solutions/patient-financing", permanent: true },
    { source: "/crypto-payments", destination: "/solutions/payment-operations", permanent: true },
    { source: "/crypto-payments/", destination: "/solutions/payment-operations", permanent: true },
    { source: "/dental-loans", destination: "/solutions/patient-financing", permanent: true },
    { source: "/dental-loans/", destination: "/solutions/patient-financing", permanent: true },
    { source: "/loyalty-referral-programs", destination: "/solutions/recurring-revenue", permanent: true },
    { source: "/loyalty-referral-programs/", destination: "/solutions/recurring-revenue", permanent: true },
    { source: "/online-payments", destination: "/solutions/payment-operations", permanent: true },
    { source: "/online-payments/", destination: "/solutions/payment-operations", permanent: true },
    { source: "/access-superannuation", destination: "/solutions/patient-financing", permanent: true },
    { source: "/access-superannuation/", destination: "/solutions/patient-financing", permanent: true },
    { source: "/crowdfunding", destination: "/solutions/patient-financing", permanent: true },
    { source: "/crowdfunding/", destination: "/solutions/patient-financing", permanent: true },

    // Patient/dentist landings
    { source: "/patients", destination: "/for-patients", permanent: true },
    { source: "/patients/", destination: "/for-patients", permanent: true },
    { source: "/dentists", destination: "/", permanent: true },
    { source: "/dentists/", destination: "/", permanent: true },

    // CTAs / forms
    { source: "/request-a-demo", destination: "/request-demo", permanent: true },
    { source: "/request-a-demo/", destination: "/request-demo", permanent: true },
    { source: "/contact-us", destination: "/contact", permanent: true },
    { source: "/contact-us/", destination: "/contact", permanent: true },

    // FAQs / Legal
    { source: "/faqs/", destination: "/faqs", permanent: true },
    { source: "/privacy-policy", destination: "/policies/privacy", permanent: true },
    { source: "/privacy-policy/", destination: "/policies/privacy", permanent: true },
    { source: "/terms-of-use", destination: "/policies/terms", permanent: true },
    { source: "/terms-of-use/", destination: "/policies/terms", permanent: true },
  ],
};

export default nextConfig;
