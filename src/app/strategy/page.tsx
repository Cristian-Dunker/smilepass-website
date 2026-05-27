import type { Metadata } from "next";
import Link from "next/link";
import RequestDemoButton from "@/components/forms/RequestDemoButton";
import PageHero from "@/components/common/PageHero";
import {
  STRATEGY_CATEGORIES,
  getStrategiesInCategory,
  strategyPath,
  strategyCategoryPath,
} from "@/data/strategy/strategies";

export const metadata: Metadata = {
  title: "Dental Practice Growth Strategies — Memberships, Payment Plans, by Specialty",
  description:
    "23 concrete strategies for growing a dental practice with memberships and payment plans. Family plans, fortnightly billing, ortho financing, perio maintenance, all-on-X financing, kids plans, emergency safety nets. Built on real SmilePass features.",
  keywords: [
    "dental practice growth strategies",
    "dental membership plan strategy",
    "dental payment plan strategy",
    "dental practice marketing Australia",
    "orthodontic financing strategy",
    "dental membership tiers",
  ],
  alternates: { canonical: "https://smilepass.com.au/strategy" },
  openGraph: {
    title: "Dental Practice Growth Strategies — SmilePass",
    description:
      "23 plays for growing a dental practice with memberships and payment plans. Organised by category and specialty.",
    url: "https://smilepass.com.au/strategy",
  },
};

/**
 * /strategy — index page (category browser).
 *
 * Marketing-focused: two category sections (Memberships, Payment plans),
 * each showing the strategies in that category as cards. Each card links
 * to /strategy/[slug] for the full pitch + how-to.
 */
export default function StrategyIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Strategies"
        title={
          <>
            Practical plays for a{" "}
            <em className="display-accent text-brand-purple">growing practice.</em>
          </>
        }
        description={
          <>
            SmilePass is a toolset. These are the plays our most successful
            practices run with it, organised by the part of the business
            they grow. Memberships, payment plans, and specialty-specific
            strategies for ortho, perio, cosmetic, all-on-X, kids and
            emergency. Pick the one that matches the problem you&apos;re
            trying to solve.
          </>
        }
      />

      {/* Categories + strategies */}
      <section className="bg-paper py-16 lg:py-20 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto space-y-16">
          {STRATEGY_CATEGORIES
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((category) => {
              const strategies = getStrategiesInCategory(category.id);
              return (
                <section key={category.id} className="reveal">
                  <header className="mb-7 max-w-2xl">
                    <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-3">
                      Category {category.order}
                    </p>
                    <h2
                      className="text-purple-deep text-[1.75rem] lg:text-[2rem] mb-3"
                      style={{ fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.01em" }}
                    >
                      <Link
                        href={strategyCategoryPath(category.id)}
                        className="hover:text-brand-purple transition-colors"
                      >
                        {category.title}
                      </Link>
                    </h2>
                    <p className="text-[0.98rem] text-purple-deep/70 leading-relaxed">
                      {category.description}
                    </p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {strategies.map((s) => (
                      <Link
                        key={s.slug}
                        href={strategyPath(s)}
                        className="group block bg-bone border border-divider rounded-2xl p-7 hover:border-brand-purple hover:bg-brand-purple/[0.04] transition-colors"
                      >
                        <p className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-brand-purple mb-3">
                          Strategy {s.order}
                        </p>
                        <h3
                          className="text-purple-deep text-[1.3rem] mb-3 group-hover:text-brand-purple transition-colors"
                          style={{ fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.005em" }}
                        >
                          {s.title}
                        </h3>
                        <p className="text-[0.95rem] text-purple-deep/75 leading-relaxed mb-4">
                          {s.lead}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[0.88rem] font-semibold text-brand-purple group-hover:text-brand-purple-hover">
                          Read the play
                          <svg viewBox="0 0 14 12" fill="none" className="w-3.5 h-3" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M1 6h12m0 0L8 1m5 5L8 11" />
                          </svg>
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}

          {/* Final CTA */}
          <div className="bg-mist rounded-2xl p-7 lg:p-9 border border-divider">
            <h3
              className="text-purple-deep text-[1.25rem] lg:text-[1.4rem] mb-3"
              style={{ fontWeight: 500, lineHeight: 1.1 }}
            >
              Ready to put one of these to work?
            </h3>
            <p className="text-[0.95rem] text-purple-deep/75 leading-relaxed mb-5">
              Start free at any time — no booking required. If you&apos;d rather
              talk it through first, drop us a line.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://app.smilepass.com.au/pages/authentication/first-access"
                className="btn-primary text-[0.9rem]"
              >
                Get started free
              </a>
              <RequestDemoButton className="btn-outline-purple text-[0.9rem]" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
