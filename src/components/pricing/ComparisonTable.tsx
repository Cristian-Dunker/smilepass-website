import { COMPARISON_SECTIONS, PRICING_TIERS } from "@/data/pricing";

/**
 * Detailed feature comparison across all four tiers.
 *
 * Server-rendered. Sticky header row on long sections. Boolean values
 * render as a tick or em-dash; string values render verbatim (e.g.
 * "5.94%", "Unlimited").
 */
export default function ComparisonTable() {
  return (
    <section className="bg-mist py-16 lg:py-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-10 reveal">
          <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-3">
            Plans, side by side
          </p>
          <h2
            className="text-purple-deep mb-3"
            style={{ fontWeight: 500, lineHeight: 1.1 }}
          >
            What you get on each plan
          </h2>
          <p className="text-[1rem] text-purple-deep/75 leading-relaxed">
            Every plan includes the core SmilePass platform. Larger plans add
            more members, more locations, custom branding, advanced analytics
            and higher-touch support.
          </p>
        </div>

        <div className="overflow-x-auto -mx-6 lg:mx-0">
          <div className="min-w-[820px] px-6 lg:px-0">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink/15">
                  <th className="py-4 pr-4 text-[0.82rem] font-medium text-ink/65 w-[34%]">
                    Feature
                  </th>
                  {PRICING_TIERS.map((tier) => (
                    <th
                      key={tier.id}
                      className="py-4 px-3 text-[0.95rem] font-semibold text-purple-deep w-[16.5%]"
                      style={{ fontWeight: 600 }}
                    >
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_SECTIONS.map((section) => (
                  <SectionRows key={section.title} section={section} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionRows({
  section,
}: {
  section: (typeof COMPARISON_SECTIONS)[number];
}) {
  return (
    <>
      <tr>
        <td
          colSpan={5}
          className="pt-8 pb-3 text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-brand-purple border-b border-ink/10"
        >
          {section.title}
        </td>
      </tr>
      {section.rows.map((row, i) => (
        <tr
          key={`${section.title}-${i}`}
          className="border-b border-ink/8 hover:bg-paper/40 transition-colors"
        >
          <td className="py-3.5 pr-4 text-[0.9rem] text-ink/85">
            {row.feature}
          </td>
          {row.values.map((v, j) => (
            <td key={j} className="py-3.5 px-3 text-[0.9rem] text-ink/80">
              {typeof v === "boolean" ? <ValueIcon on={v} /> : <span>{v}</span>}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function ValueIcon({ on }: { on: boolean }) {
  if (on)
    return (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="w-4 h-4 text-brand-purple"
        aria-label="Included"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.5l3.5 3.5 6.5-7" />
      </svg>
    );
  return (
    <span className="text-ink/30" aria-label="Not included">
      —
    </span>
  );
}
