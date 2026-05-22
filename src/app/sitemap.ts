import type { MetadataRoute } from "next";
import { solutions } from "@/data/nav";

const SITE_URL = "https://smilepass.com.au";

// Revalidate the sitemap once a day.
export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,                 lastModified: now, priority: 1.0,  changeFrequency: "weekly"  },
    { url: `${SITE_URL}/pricing`,          lastModified: now, priority: 0.9,  changeFrequency: "monthly" },
    { url: `${SITE_URL}/request-demo`,     lastModified: now, priority: 0.85, changeFrequency: "monthly" },
    { url: `${SITE_URL}/contact`,          lastModified: now, priority: 0.7,  changeFrequency: "monthly" },
    { url: `${SITE_URL}/patients`,         lastModified: now, priority: 0.75, changeFrequency: "monthly" },
    { url: `${SITE_URL}/benefits`,         lastModified: now, priority: 0.7,  changeFrequency: "monthly" },
    { url: `${SITE_URL}/how-it-works`,     lastModified: now, priority: 0.7,  changeFrequency: "monthly" },
    { url: `${SITE_URL}/faqs`,             lastModified: now, priority: 0.5,  changeFrequency: "monthly" },
    { url: `${SITE_URL}/policies/privacy`, lastModified: now, priority: 0.3,  changeFrequency: "yearly"  },
    { url: `${SITE_URL}/policies/terms`,   lastModified: now, priority: 0.3,  changeFrequency: "yearly"  },
  ];

  const solutionRoutes: MetadataRoute.Sitemap = solutions.map((sol) => ({
    url: `${SITE_URL}${sol.href}`,
    lastModified: now,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...solutionRoutes];
}
