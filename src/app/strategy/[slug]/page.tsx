import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import RequestDemoButton from "@/components/forms/RequestDemoButton";
import {
  STRATEGIES,
  getStrategyBySlug,
  getCategoryById,
  getStrategiesInCategory,
} from "@/data/strategy/strategies";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render every strategy at build time. */
export function generateStaticParams() {
  return STRATEGIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const strategy = getStrategyBySlug(slug);
  if (!strategy) return { title: "Strategy not found" };
  return {
    title: strategy.title,
    description: strategy.lead,
    alternates: { canonical: `https://smilepass.com.au/strategy/${strategy.slug}` },
    openGraph: {
      title: `${strategy.title} — SmilePass Strategy`,
      description: strategy.lead,
      url: `https://smilepass.com.au/strategy/${strategy.slug}`,
    },
  };
}

/**
 * /strategy/[slug] — one strategy per page.
 *
 * Marketing-focused: hero (category tag + title + lead), Markdown body,
 * sibling-strategy nav at the bottom (other strategies in the same
 * category), and prominent CTAs. Bodies are authored in
 * `data/strategy/strategies.ts` and rendered via react-markdown.
 */
export default async function StrategyPage({ params }: PageProps) {
  const { slug } = await params;
  const strategy = getStrategyBySlug(slug);
  if (!strategy) notFound();

  const category = getCategoryById(strategy.categoryId);
  const siblings = category
    ? getStrategiesInCategory(category.id).filter((s) => s.slug !== strategy.slug)
    : [];

  return (
    <>
      {/* Hero */}
      <section className="bg-mist pt-[110px] lg:pt-[130px] pb-10 lg:pb-12 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-[0.82rem] text-purple-deep/60"
          >
            <Link href="/" className="hover:text-brand-purple transition-colors">
              Home
            </Link>
            <span aria-hidden className="mx-2">›</span>
            <Link href="/strategy" className="hover:text-brand-purple transition-colors">
              Strategy
            </Link>
            {category && (
              <>
                <span aria-hidden className="mx-2">›</span>
                <span className="text-purple-deep/80">{category.title}</span>
              </>
            )}
          </nav>

          <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-3 reveal">
            {category ? `${category.title} · Strategy ${strategy.order}` : `Strategy ${strategy.order}`}
          </p>
          <h1
            className="text-purple-deep mb-4 reveal reveal-delay-1"
            style={{ fontWeight: 400, lineHeight: 1.05, fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}
          >
            {strategy.title}
          </h1>
          <p className="text-[1.1rem] text-purple-deep/75 leading-relaxed reveal reveal-delay-2">
            {strategy.lead}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-paper py-12 lg:py-16 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="wiki-article prose-body">
            <ReactMarkdown>{strategy.body}</ReactMarkdown>
          </div>

          {/* CTAs */}
          <div className="bg-mist rounded-2xl p-7 lg:p-9 border border-divider mt-12">
            <h3
              className="text-purple-deep text-[1.2rem] lg:text-[1.35rem] mb-3"
              style={{ fontWeight: 500, lineHeight: 1.1 }}
            >
              Put this play to work
            </h3>
            <p className="text-[0.95rem] text-purple-deep/75 leading-relaxed mb-5">
              Sign up free and build this strategy yourself — every feature
              referenced above is available on the Free tier (Payment Hold
              needs Growth). Or get in touch if you want a hand setting it up.
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

          {/* Sibling strategies */}
          {siblings.length > 0 && category && (
            <div className="mt-12">
              <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-4">
                More {category.title} strategies
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {siblings.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/strategy/${s.slug}`}
                    className="group block bg-bone border border-divider rounded-xl p-5 hover:border-brand-purple hover:bg-brand-purple/[0.04] transition-colors"
                  >
                    <h4
                      className="text-purple-deep text-[1.05rem] mb-1.5 group-hover:text-brand-purple transition-colors"
                      style={{ fontWeight: 600, letterSpacing: "-0.005em" }}
                    >
                      {s.title} →
                    </h4>
                    <p className="text-[0.88rem] text-purple-deep/70 leading-snug">
                      {s.lead}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to index */}
          <div className="mt-10 text-center">
            <Link
              href="/strategy"
              className="inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-brand-purple hover:text-brand-purple-hover transition-colors"
            >
              ← Back to all strategies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
