import type { Metadata } from "next";
import Link from "next/link";
import RequestDemoButton from "@/components/forms/RequestDemoButton";
import WikiSideMenu from "@/components/wiki/WikiSideMenu";
import { WIKI_TRACKS, getArticlesInTrack } from "@/data/wiki/articles";

export const metadata: Metadata = {
  title: "SmilePass Wiki — Product Knowledge Base for Dental Practices",
  description:
    "Step-by-step guides for using SmilePass to run dental memberships, payment plans, and online payments. Onboarding, plan setup, daily workflows, account settings, integrations. Written for practice staff, not engineers.",
  keywords: [
    "SmilePass user guide",
    "dental membership plan how to",
    "dental payment plan setup",
    "SmilePass help",
    "dental software documentation",
  ],
  alternates: { canonical: "https://smilepass.com.au/wiki" },
  openGraph: {
    title: "SmilePass Wiki — Product Knowledge Base",
    description:
      "How-to articles for practice staff running memberships and payment plans on SmilePass.",
    url: "https://smilepass.com.au/wiki",
  },
};

/**
 * /wiki — landing page (track browser).
 *
 * The four workflow tracks are rendered as cards. Each card lists every
 * article in that track and links to the first article so visitors can jump
 * straight into the read.
 *
 * The side menu on the left lists every article across every track and is
 * shared with the /wiki/[slug] article page so navigation is consistent.
 */
export default function WikiIndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-mist pt-[110px] lg:pt-[130px] pb-12 lg:pb-16 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-5 reveal">
            Knowledge base
          </p>
          <h1
            className="text-purple-deep mb-5 reveal reveal-delay-1"
            style={{ fontWeight: 400, lineHeight: 1.05 }}
          >
            The SmilePass <em className="display-accent text-brand-purple">Wiki.</em>
          </h1>
          <p className="text-[1.05rem] lg:text-[1.1rem] text-purple-deep/75 leading-relaxed max-w-3xl reveal reveal-delay-2">
            Step-by-step documentation for practice staff, organised into four
            tracks you can follow in order or dip into when you need a
            specific answer. Need help right now? Open the chat at the
            bottom-right of any article.
          </p>
        </div>
      </section>

      {/* Tracks + side menu */}
      <section className="bg-paper py-16 lg:py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <aside className="lg:col-span-3">
            <WikiSideMenu />
          </aside>

          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {WIKI_TRACKS.slice()
                .sort((a, b) => a.order - b.order)
                .map((track, idx) => {
                  const articles = getArticlesInTrack(track.id);
                  const firstSlug = articles[0]?.slug;
                  return (
                    <Link
                      key={track.id}
                      href={firstSlug ? `/wiki/${firstSlug}` : "/wiki"}
                      className="group bg-bone rounded-2xl border border-divider p-7 hover:border-brand-purple hover:bg-brand-purple/[0.04] transition-colors reveal"
                      style={{ animationDelay: `${idx * 60}ms` }}
                    >
                      <p className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-brand-purple mb-3">
                        Track {track.order}
                      </p>
                      <h2
                        className="text-purple-deep text-[1.35rem] lg:text-[1.5rem] mb-2 group-hover:text-brand-purple transition-colors"
                        style={{ fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.005em" }}
                      >
                        {track.title}
                      </h2>
                      <p className="text-[0.93rem] text-purple-deep/70 leading-relaxed mb-4">
                        {track.description}
                      </p>
                      <p className="text-[0.78rem] font-semibold tracking-[0.14em] uppercase text-purple-deep/55 mb-2">
                        {articles.length} article{articles.length === 1 ? "" : "s"}
                      </p>
                      <ul className="space-y-1.5 mb-5">
                        {articles.map((a) => (
                          <li
                            key={a.slug}
                            className="flex items-start gap-2 text-[0.88rem] text-purple-deep/75 leading-snug"
                          >
                            <span aria-hidden className="text-brand-purple/70 mt-0.5">
                              ›
                            </span>
                            {a.title}
                          </li>
                        ))}
                      </ul>
                      <span className="inline-flex items-center gap-1 text-[0.88rem] font-semibold text-brand-purple group-hover:text-brand-purple-hover">
                        Start track
                        <svg viewBox="0 0 14 12" fill="none" className="w-3.5 h-3" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M1 6h12m0 0L8 1m5 5L8 11" />
                        </svg>
                      </span>
                    </Link>
                  );
                })}
            </div>

            {/* CTA card at bottom of index */}
            <div className="bg-mist rounded-2xl p-7 lg:p-9 border border-divider mt-10">
              <h3
                className="text-purple-deep text-[1.25rem] lg:text-[1.4rem] mb-3"
                style={{ fontWeight: 500, lineHeight: 1.1 }}
              >
                Ready to start using SmilePass?
              </h3>
              <p className="text-[0.95rem] text-purple-deep/75 leading-relaxed mb-5">
                You can sign up free at any time — no demo booking required.
                If you'd rather a hand getting set up, the chatbot bottom-right
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
    </>
  );
}
