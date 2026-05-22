"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { solutions } from "@/data/nav";

/**
 * "All in One Place" — interactive sidebar tabs (sidebar of 9 solutions
 * left, content panel right with image placeholder + headline + description
 * + bullets). Replaces the previous flat 9-card grid to match the current
 * site's "SmilePass Solutions" interactive UI.
 *
 * Mobile: sidebar collapses to horizontal scrolling chip rail.
 */
export default function SolutionsTabs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = solutions[activeIdx];

  return (
    <section className="bg-paper py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12 reveal">
          <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-4">
            All in One Place
          </p>
          <h2 className="text-purple-deep" style={{ fontWeight: 500 }}>
            SmilePass <em className="display-accent text-brand-purple">Solutions.</em>
          </h2>
        </div>

        <div className="bg-paper rounded-3xl overflow-hidden shadow-sm border border-divider reveal reveal-delay-1">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Sidebar (desktop) / horizontal scroll (mobile) */}
            <nav
              aria-label="Solutions"
              className="lg:col-span-4 bg-brand-purple/5 lg:border-r border-divider"
            >
              {/* Desktop: vertical list */}
              <ul className="hidden lg:flex flex-col py-4">
                {solutions.map((sol, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <li key={sol.slug}>
                      <button
                        type="button"
                        onClick={() => setActiveIdx(idx)}
                        className={`relative w-full text-left pl-7 pr-5 py-3.5 flex items-center gap-3 transition-colors ${
                          isActive
                            ? "text-purple-deep"
                            : "text-purple-deep/70 hover:text-purple-deep hover:bg-brand-purple/[0.04]"
                        }`}
                        aria-pressed={isActive}
                      >
                        {isActive && (
                          <span
                            aria-hidden
                            className="absolute left-3 top-1.5 bottom-1.5 w-[3px] rounded-full bg-brand-purple"
                          />
                        )}
                        <sol.Icon
                          className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-brand-purple" : "text-purple-deep/55"}`}
                        />
                        <span
                          className="text-[0.95rem]"
                          style={{ fontWeight: isActive ? 600 : 500 }}
                        >
                          {sol.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Mobile: horizontal scroll chips */}
              <div className="lg:hidden overflow-x-auto no-scrollbar border-b border-divider">
                <ul className="flex gap-2 px-5 py-4 w-max">
                  {solutions.map((sol, idx) => {
                    const isActive = idx === activeIdx;
                    return (
                      <li key={sol.slug}>
                        <button
                          type="button"
                          onClick={() => setActiveIdx(idx)}
                          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[0.85rem] whitespace-nowrap transition-colors ${
                            isActive
                              ? "bg-brand-purple text-paper"
                              : "bg-bone text-purple-deep/75"
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

            {/* Content panel */}
            <div className="lg:col-span-8 p-6 lg:p-10">
              {/* Image area */}
              <div className="mb-7 lg:mb-8 reveal">
                <SolutionPreview slug={active.slug} Icon={active.Icon} imageAlt={active.imageAlt} imageSrc={active.imageSrc} />
              </div>

              {/* Headline */}
              <h3
                className="text-purple-deep text-[1.6rem] lg:text-[1.85rem] mb-5 reveal reveal-delay-1"
                style={{ fontWeight: 500, letterSpacing: "-0.01em" }}
              >
                {active.headline}
              </h3>

              {/* Description + bullets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mb-8">
                <p className="text-purple-deep/75 text-[0.93rem] leading-relaxed reveal reveal-delay-2">
                  {active.description}
                </p>
                <ul className="space-y-3 reveal reveal-delay-3">
                  {active.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand-purple/15 text-brand-purple flex items-center justify-center">
                        <svg
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="w-3 h-3"
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.5 6.5l2.5 2.5 5-5.5"
                          />
                        </svg>
                      </span>
                      <span className="text-[0.93rem] text-purple-deep/85 leading-snug">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={active.href}
                className="inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-brand-purple hover:text-brand-purple-hover transition-colors reveal reveal-delay-4"
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
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-bone">
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
      className="relative aspect-[16/9] rounded-xl bg-gradient-to-br from-brand-purple/12 via-brand-purple/6 to-purple-deep/5 overflow-hidden flex flex-col items-center justify-center"
    >
      {/* dotted texture */}
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
