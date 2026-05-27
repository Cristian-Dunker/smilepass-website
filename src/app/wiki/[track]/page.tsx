import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import WikiSideMenu from "@/components/wiki/WikiSideMenu";
import RequestDemoButton from "@/components/forms/RequestDemoButton";
import {
  WIKI_TRACKS,
  getArticlesInTrack,
  getTrackById,
  wikiArticlePath,
} from "@/data/wiki/articles";

interface PageProps {
  params: Promise<{ track: string }>;
}

/** Only the canonical track ids render; anything else 404s. */
export const dynamicParams = false;

/** Pre-render every track index at build time. */
export function generateStaticParams() {
  return WIKI_TRACKS.map((t) => ({ track: t.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { track: trackId } = await params;
  const track = getTrackById(trackId);
  if (!track) return { title: "Wiki track not found" };
  return {
    title: `${track.title} — SmilePass Wiki`,
    description: track.description,
    alternates: { canonical: `https://smilepass.com.au/wiki/${track.id}` },
    openGraph: {
      title: `${track.title} — SmilePass Wiki`,
      description: track.description,
      url: `https://smilepass.com.au/wiki/${track.id}`,
    },
  };
}

/**
 * /wiki/[track] — a single workflow track and the articles in it.
 *
 * Gives every track a linkable landing page so the wiki hierarchy
 * (track → article) is reachable by URL, not just visible in the side menu.
 * The side menu (left) is shared with the index and article pages.
 */
export default async function WikiTrackPage({ params }: PageProps) {
  const { track: trackId } = await params;
  const track = getTrackById(trackId);
  if (!track) notFound();

  const articles = getArticlesInTrack(track.id);

  return (
    <section className="bg-paper pt-[110px] lg:pt-[130px] pb-16 lg:pb-20 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Side menu */}
        <aside className="lg:col-span-3">
          <WikiSideMenu />
        </aside>

        {/* Track + articles */}
        <div className="lg:col-span-9 max-w-3xl">
          <Breadcrumbs
            variant="light"
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Wiki", href: "/wiki" },
              { label: track.title },
            ]}
          />

          <header className="mb-8">
            <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-3">
              Track {track.order}
            </p>
            <h1
              className="text-purple-deep mb-3"
              style={{ fontWeight: 400, lineHeight: 1.05, fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}
            >
              {track.title}
            </h1>
            <p className="text-[1.05rem] text-purple-deep/75 leading-relaxed">
              {track.description}
            </p>
          </header>

          <ul className="flex flex-col gap-4">
            {articles.map((article, idx) => (
              <li key={article.slug}>
                <Link
                  href={wikiArticlePath(article)}
                  className="group block bg-bone rounded-2xl border border-divider p-6 lg:p-7 hover:border-brand-purple hover:bg-brand-purple/[0.04] transition-colors"
                >
                  <p className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-brand-purple mb-2">
                    Article {idx + 1}
                  </p>
                  <h2
                    className="text-purple-deep text-[1.2rem] lg:text-[1.3rem] mb-2 group-hover:text-brand-purple transition-colors"
                    style={{ fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.005em" }}
                  >
                    {article.title}
                  </h2>
                  <p className="text-[0.93rem] text-purple-deep/75 leading-relaxed">
                    {article.lead}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="bg-mist rounded-2xl p-7 lg:p-9 border border-divider mt-10">
            <h3
              className="text-purple-deep text-[1.25rem] lg:text-[1.4rem] mb-3"
              style={{ fontWeight: 500, lineHeight: 1.1 }}
            >
              Ready to start using SmilePass?
            </h3>
            <p className="text-[0.95rem] text-purple-deep/75 leading-relaxed mb-5">
              You can sign up free at any time — no demo booking required. If
              you&apos;d rather a hand getting set up, the chatbot bottom-right
              can answer most questions instantly, or drop us a line.
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
      </div>
    </section>
  );
}
