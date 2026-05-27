import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import MarkdownContent from "@/components/common/MarkdownContent";
import WikiSideMenu from "@/components/wiki/WikiSideMenu";
import NewBadge from "@/components/wiki/NewBadge";
import {
  WIKI_ARTICLES,
  NEW_ARTICLE_SLUGS,
  getArticleBySlug,
  getNextArticle,
  getTrackById,
  wikiArticlePath,
  wikiTrackPath,
} from "@/data/wiki/articles";

interface PageProps {
  params: Promise<{ track: string; slug: string }>;
}

/** Only the canonical track/slug pairs render; anything else 404s. */
export const dynamicParams = false;

/** Pre-render every wiki article at build time, under its track. */
export function generateStaticParams() {
  return WIKI_ARTICLES.map((a) => ({ track: a.trackId, slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Wiki article not found" };
  const canonical = `https://smilepass.com.au${wikiArticlePath(article)}`;
  return {
    title: article.title,
    description: article.lead,
    alternates: { canonical },
    openGraph: {
      title: `${article.title} — SmilePass Wiki`,
      description: article.lead,
      url: canonical,
    },
  };
}

/**
 * /wiki/[track]/[slug] — one article per page.
 *
 * Content comes from `data/wiki/articles.ts` and is rendered via the shared
 * MarkdownContent (which rewrites inline /wiki and /strategy links to their
 * nested form). Layout: breadcrumb + title/lead + body + "Next step" link.
 * Side menu (left) is shared with the /wiki index so navigation is consistent.
 */
export default async function WikiArticlePage({ params }: PageProps) {
  const { track: trackId, slug } = await params;
  const article = getArticleBySlug(slug);
  // Guard the parent segment: an article is only valid under its own track.
  if (!article || article.trackId !== trackId) notFound();

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
          <Breadcrumbs
            variant="light"
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Wiki", href: "/wiki" },
              ...(track ? [{ label: track.title, href: wikiTrackPath(track.id) }] : []),
              { label: article.title },
            ]}
          />

          {/* Header */}
          <header className="mb-8">
            <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-3">
              {track ? `Track ${track.order} · ${track.title}` : "Wiki article"}
            </p>
            {NEW_ARTICLE_SLUGS.has(article.slug) && (
              <div className="mb-3">
                <NewBadge />
              </div>
            )}
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
          <MarkdownContent className="wiki-article prose-body">
            {article.body}
          </MarkdownContent>

          {/* Next step */}
          {next ? (
            <Link
              href={wikiArticlePath(next)}
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
                You&apos;ve reached the end. Where now?
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
