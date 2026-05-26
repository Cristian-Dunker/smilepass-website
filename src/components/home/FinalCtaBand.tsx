import { ctaLinks } from "@/data/nav";
import RequestDemoButton from "@/components/forms/RequestDemoButton";

/**
 * Final CTA band — verbatim heading/body from current site.
 */
export default function FinalCtaBand() {
  return (
    <section className="bg-brand-purple text-paper py-20 lg:py-24 px-6 lg:px-10">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-paper/70 mb-5 reveal">
          Ready to grow?
        </p>
        <h2
          className="text-paper mb-5 reveal reveal-delay-1"
          style={{ fontWeight: 500, lineHeight: 1.1 }}
        >
          Unlock the Power of <em className="display-accent">Your Dental Practice.</em>
        </h2>
        <p className="text-paper/85 text-lg leading-relaxed mb-9 max-w-2xl mx-auto reveal reveal-delay-2">
          We pride ourselves as innovators, and we continuously release product enhancements to
          boost your practice with tools to deliver the best patient experience.
        </p>
        <div className="flex flex-wrap gap-3 justify-center reveal reveal-delay-3">
          <a
            href={ctaLinks.getStarted}
            className="inline-flex items-center justify-center gap-2 bg-paper text-brand-purple rounded-[10px] px-7 py-3.5 font-semibold text-[0.95rem] hover:bg-paper/90 transition-colors"
          >
            Get started free
          </a>
          <RequestDemoButton className="inline-flex items-center justify-center gap-2 bg-transparent border border-paper/50 text-paper rounded-[10px] px-7 py-3.5 font-semibold text-[0.95rem] hover:bg-paper/10 transition-colors">
            Get in touch
          </RequestDemoButton>
        </div>
      </div>
    </section>
  );
}
