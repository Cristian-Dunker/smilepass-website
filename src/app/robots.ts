import type { MetadataRoute } from "next";

const SITE_URL = "https://smilepass.com.au";

/**
 * robots.txt — generated from Next.js App Router metadata API.
 *
 * - Allow every general crawler to index the entire marketing site.
 * - Explicitly disallow API routes and dev-only upload endpoint.
 * - Explicitly allow named AI crawlers so SmilePass content is
 *   eligible for ChatGPT / Perplexity / Claude / Google AI Overviews
 *   citations.
 * - Point all bots at the canonical sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // AI search crawlers — explicitly allowed so SmilePass content can
      // be cited in conversational answers across the major systems.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
