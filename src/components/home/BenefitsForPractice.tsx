import Link from "next/link";
import { ctaLinks } from "@/data/nav";

/**
 * "Designed by Dentists, For Dentists" — 5 benefit cards.
 * Verbatim labels from the current site's "Benefits for Your Practice" block.
 */

interface BenefitCard {
  title: string;
  icon: React.ReactNode;
}

const benefitCards: BenefitCard[] = [
  {
    title: "Create Recurring Revenue",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
        <path d="M3 17l6-6 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 7v4M21 7h-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Improve Patient Loyalty",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
        <path
          d="M12 21s-7-4.5-7-11a4 4 0 017-2.6A4 4 0 0119 10c0 6.5-7 11-7 11z"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Attract & Retain More Patients",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
        <circle cx={9} cy={8} r={3.5} />
        <path d="M2.5 21a6.5 6.5 0 0113 0" strokeLinecap="round" />
        <circle cx={17} cy={10} r={2.5} />
        <path d="M14 21a4.5 4.5 0 017.5-3.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Differentiate From Competitors",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
        <path
          d="M12 2l2.5 5.2 5.7.8-4.1 4 1 5.6L12 14.9l-5.1 2.7 1-5.6-4.1-4 5.7-.8z"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Streamline Payment Process",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
        <path d="M4 12a8 8 0 0114-5.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 12a8 8 0 01-14 5.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 4v3h-3M4 20v-3h3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function BenefitsForPractice() {
  return (
    <section className="bg-mist py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14 lg:mb-16 reveal">
          <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-4">
            Designed by Dentists, For Dentists
          </p>
          <h2 className="text-purple-deep" style={{ fontWeight: 500 }}>
            Benefits for <em className="display-accent text-brand-purple">Your Practice.</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6 mb-12">
          {benefitCards.map((b, i) => (
            <div
              key={b.title}
              className={`group bg-bone rounded-2xl p-6 lg:p-7 transition-shadow hover:shadow-md reveal reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <div className="w-11 h-11 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <span className="w-6 h-6 block">{b.icon}</span>
              </div>
              <h3
                className="text-purple-deep text-[1rem] leading-snug"
                style={{ fontWeight: 600 }}
              >
                {b.title}
              </h3>
            </div>
          ))}
        </div>

        <div className="flex justify-center reveal">
          <Link href={ctaLinks.requestDemo} className="btn-outline-purple text-[0.92rem]">
            Request a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
