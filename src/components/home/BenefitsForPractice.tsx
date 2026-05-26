import RequestDemoButton from "@/components/forms/RequestDemoButton";

/**
 * "Benefits for Your Practice" — 5 shield-shaped benefit tiles in a row.
 * Labels are verbatim from the current site.
 *
 * The shield shape is a pure CSS trick using an elliptical border-radius:
 * flat-ish top corners + wide rounded bottom. Avoids an SVG-per-tile, scales
 * cleanly, and inherits the brand gradient without per-tile assets.
 */

interface BenefitCard {
  title: string;
  icon: React.ReactNode;
}

const benefitCards: BenefitCard[] = [
  {
    title: "Create Recurring Revenue",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
        <path d="M5 27h22" strokeLinecap="round" />
        <path d="M9 27V15M15 27V11M21 27V7M27 27V13" strokeLinecap="round" />
        <path d="M9 9l8-3" strokeLinecap="round" />
        <circle cx={9} cy={9} r={1.2} fill="currentColor" />
        <circle cx={17} cy={6} r={1.2} fill="currentColor" />
        <path d="M21 4v-1M21 9V8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Improve Patient Loyalty",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
        <circle cx={16} cy={14} r={5} />
        <path d="M11 24a5 5 0 0110 0" strokeLinecap="round" />
        <path d="M22 9l1 2 2 .3-1.4 1.5.3 2L22 13.7l-1.9 1 .3-2L19 11.3l2-.3z" />
        <path d="M10 9l1 2 2 .3-1.4 1.5.3 2L10 13.7l-1.9 1 .3-2L7 11.3l2-.3z" />
      </svg>
    ),
  },
  {
    title: "Attract & Retain More Patients",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
        <circle cx={16} cy={16} r={3} />
        <circle cx={8} cy={9} r={3} />
        <circle cx={24} cy={9} r={3} />
        <circle cx={8} cy={23} r={3} />
        <circle cx={24} cy={23} r={3} />
        <path d="M11 9h10M11 23h10M10 12l4 3M22 12l-4 3M10 20l4-3M22 20l-4-3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Differentiate From Competitors",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
        <path d="M11 6h10v6a5 5 0 01-10 0V6z" strokeLinejoin="round" />
        <path d="M11 8H7v2a3 3 0 003 3M21 8h4v2a3 3 0 01-3 3" strokeLinejoin="round" />
        <path d="M14 17h4v3h-4z" />
        <path d="M11 23h10v2H11z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Streamline Payment Process",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
        <circle cx={16} cy={16} r={4} />
        <path d="M16 14v4M14 16h4" strokeLinecap="round" />
        <circle cx={16} cy={5} r={1.5} fill="currentColor" />
        <circle cx={16} cy={27} r={1.5} fill="currentColor" />
        <circle cx={5} cy={16} r={1.5} fill="currentColor" />
        <circle cx={27} cy={16} r={1.5} fill="currentColor" />
        <circle cx={8} cy={8} r={1.5} fill="currentColor" />
        <circle cx={24} cy={8} r={1.5} fill="currentColor" />
        <circle cx={8} cy={24} r={1.5} fill="currentColor" />
        <circle cx={24} cy={24} r={1.5} fill="currentColor" />
        <path d="M16 7v5M16 20v5M7 16h5M20 16h5M10 10l3 3M22 10l-3 3M10 22l3-3M22 22l-3-3" />
      </svg>
    ),
  },
];

export default function BenefitsForPractice() {
  return (
    <section className="bg-paper py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16 reveal">
          <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-5">
            Benefits for Your Practice
          </p>
          <h2 className="text-purple-deep" style={{ fontWeight: 500, lineHeight: 1.08 }}>
            Designed by <em className="display-accent text-brand-purple">Dentists,</em> For Dentists
          </h2>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10 lg:gap-x-6 mb-14">
          {benefitCards.map((b, i) => (
            <li
              key={b.title}
              className={`flex flex-col items-center text-center reveal reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <BenefitShield>{b.icon}</BenefitShield>
              <h3
                className="mt-5 text-purple-deep text-[1rem] lg:text-[1.05rem] leading-snug max-w-[10rem]"
                style={{ fontWeight: 600 }}
              >
                {b.title}
              </h3>
            </li>
          ))}
        </ul>

        <div className="flex justify-center reveal">
          <RequestDemoButton className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-paper text-[0.78rem] font-semibold tracking-[0.18em] uppercase shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 bg-[linear-gradient(135deg,var(--color-brand-purple)_0%,var(--color-brand-purple-hover)_100%)]" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */

/**
 * Shield-shaped icon container — flat top, sharply rounded bottom.
 * Brand-purple gradient background with a white icon overlay.
 */
function BenefitShield({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="group relative flex items-start justify-center w-[112px] h-[140px] pt-8 text-paper transition-transform duration-300 hover:-translate-y-1"
      style={{
        background:
          "linear-gradient(155deg, #9D9BF5 0%, var(--color-brand-purple) 55%, var(--color-brand-purple-hover) 100%)",
        borderRadius: "14px 14px 50% 50% / 14px 14px 42% 42%",
        boxShadow:
          "0 12px 24px -10px rgba(125, 122, 242, 0.45), 0 4px 10px -4px rgba(37, 33, 86, 0.15)",
      }}
    >
      <span className="block w-12 h-12">{children}</span>
    </div>
  );
}
