"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { solutions } from "@/data/nav";

/**
 * "All in One Place" — interactive sidebar tabs (sidebar of solutions on
 * the left, content panel on the right with image + headline + description
 * + bullets). Sidebar count comes from the `solutions` registry.
 *
 * Layout mirrors smilepass.com.au reference:
 *   - Section heading sits INSIDE the sidebar column at the top.
 *   - Sidebar is transparent over the lavender section background.
 *   - Right column is a single white rounded card.
 *
 * Mobile: sidebar collapses to a horizontal scrolling chip rail above the card.
 */
export default function SolutionsTabs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = solutions[activeIdx];

  return (
    <section className="bg-mist py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Sidebar (desktop) — heading + vertical tab list */}
        <aside className="lg:col-span-4">
          <div className="mb-10 reveal">
            <h2
              className="text-purple-deep"
              style={{ fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.01em" }}
            >
              SmilePass<br />Solutions
            </h2>
          </div>

          <nav aria-label="Solutions" className="hidden lg:block">
            <ul className="flex flex-col gap-1">
              {solutions.map((sol, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <li key={sol.slug}>
                    <button
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`relative w-full text-left pl-5 pr-5 py-3.5 flex items-center gap-3 rounded-r-lg transition-colors ${
                        isActive
                          ? "text-purple-deep"
                          : "text-purple-deep/65 hover:text-purple-deep hover:bg-paper/40"
                      }`}
                      aria-pressed={isActive}
                    >
                      {isActive && (
                        <span
                          aria-hidden
                          className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-brand-purple"
                        />
                      )}
                      <span
                        className="text-[1rem]"
                        style={{ fontWeight: isActive ? 600 : 500 }}
                      >
                        {sol.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Mobile chips */}
        <nav aria-label="Solutions" className="lg:hidden -mx-6">
          <div className="overflow-x-auto no-scrollbar px-6">
            <ul className="flex gap-2 w-max pb-2">
              {solutions.map((sol, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <li key={sol.slug}>
                    <button
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[0.85rem] whitespace-nowrap transition-colors ${
                        isActive
                          ? "bg-brand-purple text-paper"
                          : "bg-paper text-purple-deep/75 border border-divider"
                      }`}
                      aria-pressed={isActive}
                    >
                      <sol.Icon className="w-3.5 h-3.5" />
                      {sol.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Right panel — white card */}
        <div className="lg:col-span-8 bg-paper rounded-3xl shadow-sm border border-divider p-6 lg:p-10 reveal reveal-delay-1">
          {/* Image area */}
          <div className="mb-8">
            <SolutionPreview
              slug={active.slug}
              Icon={active.Icon}
              imageAlt={active.imageAlt}
              imageSrc={active.imageSrc}
            />
          </div>

          {/* Headline */}
          <h3
            className="text-purple-deep text-[1.85rem] lg:text-[2.15rem] mb-7"
            style={{ fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.1 }}
          >
            {active.headline}
          </h3>

          {/* Description + bullets in 2 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7 mb-8">
            <p className="text-purple-deep/75 text-[0.96rem] leading-relaxed">
              {active.description}
            </p>
            <ul className="space-y-4">
              {active.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-brand-purple text-paper flex items-center justify-center shadow-[0_4px_10px_-4px_rgba(125,122,242,0.55)]"
                  >
                    <svg
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.2}
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7.5l2.7 2.7L11 4.8"
                      />
                    </svg>
                  </span>
                  <span className="text-[0.96rem] text-purple-deep/85 leading-snug pt-0.5">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={active.href}
            className="inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-brand-purple hover:text-brand-purple-hover transition-colors"
          >
            Read more about {active.label}
            <svg
              viewBox="0 0 14 12"
              fill="none"
              className="w-3.5 h-3"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M1 6h12m0 0L8 1m5 5L8 11"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */

/**
 * Per-solution image area. If `imageSrc` is provided uses it; otherwise renders
 * a branded placeholder block with the solution's icon — clear "real screenshot
 * pending" affordance without looking broken.
 */
function SolutionPreview({
  slug,
  Icon,
  imageAlt,
  imageSrc,
}: {
  slug: string;
  Icon: React.ComponentType<{ className?: string }>;
  imageAlt: string;
  imageSrc?: string;
}) {
  if (imageSrc) {
    return (
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-bone">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 90vw, 55vw"
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`${imageAlt} (placeholder)`}
      className="relative aspect-[16/10] rounded-2xl bg-gradient-to-br from-brand-purple/12 via-brand-purple/6 to-purple-deep/5 overflow-hidden flex flex-col items-center justify-center"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--color-brand-purple) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <Icon className="relative w-14 h-14 text-brand-purple mb-3" />
      <p
        className="relative text-purple-deep/55 text-[0.78rem] tracking-[0.18em] uppercase font-medium"
        data-slug={slug}
      >
        Visual placeholder
      </p>
    </div>
  );
}
