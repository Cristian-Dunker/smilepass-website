import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import RequestDemoButton from "@/components/forms/RequestDemoButton";
import {
  STRATEGY_CATEGORIES,
  getCategoryById,
  getStrategiesInCategory,
  strategyPath,
} from "@/data/strategy/strategies";

interface PageProps {
  params: Promise<{ category: string }>;
}

/** Only the canonical category ids render; anything else 404s. */
export const dynamicParams = false;

/** Pre-render every category index at build time. */
export function generateStaticParams() {
  return STRATEGY_CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categoryId } = await params;
  const category = getCategoryById(categoryId);
  if (!category) return { title: "Strategy category not found" };
  return {
    title: `${category.title} Strategies — SmilePass`,
    description: category.description,
    alternates: { canonical: `https://smilepass.com.au/strategy/${category.id}` },
    openGraph: {
      title: `${category.title} Strategies — SmilePass`,
      description: category.description,
      url: `https://smilepass.com.au/strategy/${category.id}`,
    },
  };
}

/**
 * /strategy/[category] — one category and the strategies in it.
 *
 * Gives every category a linkable landing page so the strategy hierarchy
 * (category → strategy) is reachable by URL, not just visible as a section
 * on the index.
 */
export default async function StrategyCategoryPage({ params }: PageProps) {
  const { category: categoryId } = await params;
  const category = getCategoryById(categoryId);
  if (!category) notFound();

  const strategies = getStrategiesInCategory(category.id);

  return (
    <>
      {/* Hero */}
      <section className="bg-mist pt-[110px] lg:pt-[130px] pb-10 lg:pb-12 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs
            variant="light"
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Strategy", href: "/strategy" },
              { label: category.title },
            ]}
          />
          <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-5">
            Category {category.order}
          </p>
          <h1
            className="text-purple-deep mb-5"
            style={{ fontWeight: 400, lineHeight: 1.05 }}
          >
            {category.title}
          </h1>
          <p className="text-[1.05rem] lg:text-[1.1rem] text-purple-deep/75 leading-relaxed max-w-3xl">
            {category.description}
          </p>
        </div>
      </section>

      {/* Strategies */}
      <section className="bg-paper py-16 lg:py-20 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
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
                <h2
                  className="text-purple-deep text-[1.3rem] mb-3 group-hover:text-brand-purple transition-colors"
                  style={{ fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.005em" }}
                >
                  {s.title}
                </h2>
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

          {/* Final CTA */}
          <div className="bg-mist rounded-2xl p-7 lg:p-9 border border-divider mt-12">
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

          {/* Back to index */}
          <div className="mt-10 text-center">
            <Link
              href="/strategy"
              className="inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-brand-purple hover:text-brand-purple-hover transition-colors"
            >
              ← All strategies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
