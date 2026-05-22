import Link from "next/link";

/**
 * FAQ teaser — verbatim copy from current site.
 */
export default function FaqTeaser() {
  return (
    <section className="bg-paper py-20 lg:py-24 px-6 lg:px-10 border-t border-divider">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-5 reveal">
          Got Questions?
        </p>
        <h2
          className="text-purple-deep mb-5 reveal reveal-delay-1"
          style={{ fontWeight: 500, lineHeight: 1.1 }}
        >
          We&apos;re Here to <em className="display-accent text-brand-purple">Help.</em>
        </h2>
        <p className="text-purple-deep/70 text-[1rem] leading-relaxed mb-8 max-w-xl mx-auto reveal reveal-delay-2">
          Check out our helpful FAQs for all your SmilePass questions, or reach out directly to one
          of our dedicated SmilePass specialists.
        </p>
        <Link href="/faqs" className="btn-primary text-[0.92rem] reveal reveal-delay-3">
          Practice Help Centre
        </Link>
      </div>
    </section>
  );
}
