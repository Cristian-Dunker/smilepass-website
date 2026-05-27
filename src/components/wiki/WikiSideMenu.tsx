"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  WIKI_TRACKS,
  getArticleBySlug,
  getArticlesInTrack,
  wikiArticlePath,
  wikiTrackPath,
} from "@/data/wiki/articles";

/**
 * Sticky left-side navigation shared by the /wiki index and every
 * /wiki/[slug] article.
 *
 * Each track is collapsible. The track containing the active article is
 * expanded automatically on first render; the others stay collapsed so the
 * menu stays short. Manual clicks toggle individual tracks and persist
 * for the lifetime of the session.
 *
 * Read-only — content comes from `data/wiki/articles.ts`. Adding an
 * article makes it appear here automatically.
 */
interface WikiSideMenuProps {
  /** Slug of the article currently being viewed; undefined on the index page. */
  activeSlug?: string;
}

export default function WikiSideMenu({ activeSlug }: WikiSideMenuProps) {
  const sortedTracks = useMemo(
    () => WIKI_TRACKS.slice().sort((a, b) => a.order - b.order),
    [],
  );

  // Which track contains the active article — that one expands by default.
  const activeTrackId = useMemo(() => {
    if (!activeSlug) return undefined;
    return getArticleBySlug(activeSlug)?.trackId;
  }, [activeSlug]);

  // Build initial expansion state once: active track open, others closed.
  // On the /wiki index (no activeSlug) every track is collapsed by default
  // so the side menu stays visually tight.
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      sortedTracks.map((t) => [t.id, t.id === activeTrackId]),
    ),
  );

  // If the user navigates between articles in different tracks, open the
  // new track automatically without collapsing whatever else they had open.
  useEffect(() => {
    if (!activeTrackId) return;
    setExpanded((prev) =>
      prev[activeTrackId] ? prev : { ...prev, [activeTrackId]: true },
    );
  }, [activeTrackId]);

  function toggleTrack(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <nav
      aria-label="Wiki contents"
      className="lg:sticky lg:top-[88px] bg-mist/60 rounded-2xl p-5 border border-divider max-h-[calc(100vh-100px)] overflow-y-auto"
    >
      <Link
        href="/wiki"
        className="block mb-5 text-[0.75rem] font-semibold tracking-[0.18em] uppercase text-brand-purple hover:text-brand-purple-hover transition-colors"
      >
        ← Wiki home
      </Link>

      <ul className="flex flex-col gap-1">
        {sortedTracks.map((track) => {
          const articles = getArticlesInTrack(track.id);
          const isOpen = !!expanded[track.id];
          const isActiveTrack = track.id === activeTrackId;
          const panelId = `wiki-track-${track.id}`;
          return (
            <li key={track.id}>
              <div
                className={`w-full flex items-center justify-between gap-1 rounded-lg transition-colors ${
                  isActiveTrack ? "bg-brand-purple/10" : "hover:bg-paper/60"
                }`}
              >
                <Link
                  href={wikiTrackPath(track.id)}
                  className="flex items-baseline gap-2 min-w-0 flex-1 px-3 py-2.5 text-purple-deep"
                >
                  <span
                    aria-hidden
                    className={`flex-shrink-0 text-[0.65rem] font-bold ${
                      isActiveTrack ? "text-brand-purple" : "text-purple-deep/45"
                    }`}
                  >
                    {String(track.order).padStart(2, "0")}
                  </span>
                  <span
                    className="text-[0.95rem] leading-tight truncate"
                    style={{ fontWeight: 700, letterSpacing: "-0.005em" }}
                  >
                    {track.title}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => toggleTrack(track.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  aria-label={`${isOpen ? "Collapse" : "Expand"} ${track.title}`}
                  className="flex-shrink-0 px-3 py-2.5 text-purple-deep"
                >
                  <Chevron open={isOpen} />
                </button>
              </div>

              {isOpen && (
                <ul id={panelId} className="mt-1 mb-2 ml-3 pl-3 border-l border-divider flex flex-col gap-0.5">
                  {articles.map((article) => {
                    const isActive = article.slug === activeSlug;
                    return (
                      <li key={article.slug}>
                        <Link
                          href={wikiArticlePath(article)}
                          className={`block text-[0.88rem] leading-snug px-3 py-1.5 rounded-md transition-colors ${
                            isActive
                              ? "bg-brand-purple/12 text-brand-purple font-semibold"
                              : "text-purple-deep/75 hover:text-brand-purple hover:bg-paper/50"
                          }`}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {article.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────── */

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      className={`w-3.5 h-3.5 flex-shrink-0 text-purple-deep/55 transition-transform duration-200 ${
        open ? "rotate-90" : ""
      }`}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 4l4 4-4 4" />
    </svg>
  );
}
