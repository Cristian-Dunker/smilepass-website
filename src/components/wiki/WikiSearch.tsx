"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import NewBadge from "./NewBadge";
import { WIKI_ARTICLES, NEW_ARTICLE_SLUGS, getTrackById, wikiArticlePath } from "@/data/wiki/articles";

/**
 * Client-side wiki search — the discovery entry point shared by the index
 * and every article (mounted at the top of WikiSideMenu).
 *
 * Filters the article registry by title + lead + optional keywords. No
 * backend, no index build: the article set is small enough to scan in the
 * browser. Every token in the query must match (AND), case-insensitive.
 */
export default function WikiSearch() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (q.length < 2) return [];
    const tokens = q.split(/\s+/);
    return WIKI_ARTICLES.filter((a) => {
      const haystack = `${a.title} ${a.lead} ${(a.keywords ?? []).join(" ")}`.toLowerCase();
      return tokens.every((t) => haystack.includes(t));
    }).slice(0, 8);
  }, [q]);

  return (
    <div className="mb-4">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search the wiki…"
        aria-label="Search the wiki"
        className="w-full rounded-lg border border-divider bg-paper px-3 py-2 text-[0.88rem] text-purple-deep placeholder:text-purple-deep/45 focus:outline-none focus:border-brand-purple transition-colors"
      />
      {q.length >= 2 && (
        <ul className="mt-2 flex flex-col gap-0.5">
          {results.length === 0 ? (
            <li className="px-2 py-1.5 text-[0.85rem] text-purple-deep/55">No matches.</li>
          ) : (
            results.map((article) => {
              const track = getTrackById(article.trackId);
              return (
                <li key={article.slug}>
                  <Link
                    href={wikiArticlePath(article)}
                    className="block px-2 py-1.5 rounded-md hover:bg-paper/60 transition-colors"
                  >
                    <span className="block text-[0.88rem] leading-snug text-purple-deep">
                      {article.title}
                      {NEW_ARTICLE_SLUGS.has(article.slug) && (
                        <NewBadge className="ml-1.5 align-middle" />
                      )}
                    </span>
                    {track && (
                      <span className="block text-[0.72rem] text-purple-deep/50">
                        {track.title}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
