import type { MetadataRoute } from "next";
import { solutions } from "@/data/nav";
import { STRATEGIES } from "@/data/strategy/strategies";
import { WIKI_ARTICLES } from "@/data/wiki/articles";

const SITE_URL = "https://smilepass.com.au";

/**
 * Sitemap — listed routes must exist as real pages on the site.
 *
 * Static routes are hand-maintained (small set). Dynamic routes for the
 * Solutions registry, Strategy pages and Wiki articles are auto-derived
 * from their respective single-source-of-truth data files, so adding a
 * new entry in those files surfaces it in the sitemap on the next build.
 */
export const revalidate = 86400; // Daily.

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,          lastModified: now, priority: 1.0,  changeFrequency: "weekly"  },
    { url: `${SITE_URL}/pricing`,   lastModified: now, priority: 0.95, changeFrequency: "monthly" },
    { url: `${SITE_URL}/strategy`,  lastModified: now, priority: 0.85, changeFrequency: "monthly" },
    { url: `${SITE_URL}/wiki`,      lastModified: now, priority: 0.75, changeFrequency: "monthly" },
    { url: `${SITE_URL}/contact`,   lastModified: now, priority: 0.7,  changeFrequency: "monthly" },
  ];

  const solutionRoutes: MetadataRoute.Sitemap = solutions.map((sol) => ({
    url: `${SITE_URL}${sol.href}`,
    lastModified: now,
    priority: 0.9, // High — these are primary conversion pages.
    changeFrequency: "monthly" as const,
  }));

  const strategyRoutes: MetadataRoute.Sitemap = STRATEGIES.map((s) => ({
    url: `${SITE_URL}/strategy/${s.slug}`,
    lastModified: now,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const wikiRoutes: MetadataRoute.Sitemap = WIKI_ARTICLES.map((a) => ({
    url: `${SITE_URL}/wiki/${a.slug}`,
    lastModified: now,
    priority: 0.55,
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...solutionRoutes, ...strategyRoutes, ...wikiRoutes];
}
