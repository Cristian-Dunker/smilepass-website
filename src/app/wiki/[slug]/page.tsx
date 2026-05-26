import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import WikiSideMenu from "@/components/wiki/WikiSideMenu";
import {
  WIKI_ARTICLES,
  getArticleBySlug,
  getNextArticle,
  getTrackById,
} from "@/data/wiki/articles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render every wiki article at build time. */
export function generateStaticParams() {
  return WIKI_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Wiki article not found" };
  return {
    title: article.title,
    description: article.lead,
    alternates: { canonical: `https://smilepass.com.au/wiki/${article.slug}` },
    openGraph: {
      title: `${article.title} — SmilePass Wiki`,
      description: article.lead,
      url: `https://smilepass.com.au/wiki/${article.slug}`,
    },
  };
}

/**
 * /wiki/[slug] — one article per page.
 *
 * Content comes from `data/wiki/articles.ts` and is rendered via
 * react-markdown. Layout: breadcrumb + title/lead + Markdown body +
 * "Next step" link. Side menu (left) is shared with the /wiki index so
 * navigation feels consistent.
 */
export default async function WikiArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const track = getTrackById(article.trackId);
  const next = getNextArticle(article);

  return (
    <section className="bg-paper pt-[110px] lg:pt-[130px] pb-16 lg:pb-20 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Side menu */}
        <aside className="lg:col-span-3">
          <WikiSideMenu activeSlug={article.slug} />
        </aside>

        {/* Article */}
        <article className="lg:col-span-9 max-w-3xl">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-[0.82rem] text-purple-deep/60"
          >
            <Link href="/" className="hover:text-brand-purple transition-colors">
              Home
            </Link>
            <span aria-hidden className="mx-2">›</span>
            <Link href="/wiki" className="hover:text-brand-purple transition-colors">
              Wiki
            </Link>
            {track && (
              <>
                <span aria-hidden className="mx-2">›</span>
                <span className="text-purple-deep/80">{track.title}</span>
              </>
            )}
          </nav>

          {/* Header */}
          <header className="mb-8">
            <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-3">
              {track ? `Track ${track.order} · ${track.title}` : "Wiki article"}
            </p>
            <h1
              className="text-purple-deep mb-3"
              style={{ fontWeight: 400, lineHeight: 1.05, fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}
            >
              {article.title}
            </h1>
            <p className="text-[1.05rem] text-purple-deep/75 leading-relaxed">
              {article.lead}
            </p>
          </header>

          {/* Markdown body */}
          <div className="wiki-article prose-body">
            <ReactMarkdown>{article.body}</ReactMarkdown>
          </div>

          {/* Next step */}
          {next ? (
            <Link
              href={`/wiki/${next.slug}`}
              className="group block bg-mist rounded-2xl border border-divider hover:border-brand-purple hover:bg-brand-purple/[0.04] p-6 lg:p-7 mt-12 transition-colors"
            >
              <p className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-brand-purple mb-2">
                Next step
              </p>
              <p
                className="text-purple-deep text-[1.2rem] mb-1 group-hover:text-brand-purple transition-colors"
                style={{ fontWeight: 500 }}
              >
                {next.title} →
              </p>
              <p className="text-[0.92rem] text-purple-deep/70 leading-snug">
                {next.lead}
              </p>
            </Link>
          ) : (
            <div className="bg-mist rounded-2xl border border-divider p-6 lg:p-7 mt-12">
              <p className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-brand-purple mb-2">
                End of the wiki
              </p>
              <p className="text-purple-deep text-[1.1rem] mb-2" style={{ fontWeight: 500 }}>
                You've reached the end. Where now?
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <Link href="/wiki" className="btn-primary text-[0.9rem]">
                  Back to wiki home
                </Link>
                <Link href="/contact" className="btn-outline-purple text-[0.9rem]">
                  Get in touch
                </Link>
              </div>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
