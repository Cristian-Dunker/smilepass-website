import type { Metadata } from "next";
import Link from "next/link";
import PricingTiers from "@/components/pricing/PricingTiers";
import ComparisonTable from "@/components/pricing/ComparisonTable";
import FAQAccordion from "@/components/common/FAQAccordion";
import RequestDemoButton from "@/components/forms/RequestDemoButton";
import PageHero from "@/components/common/PageHero";
import { PRICING_FAQS, PRICING_TIERS } from "@/data/pricing";

const CANONICAL = "https://smilepass.com.au/pricing";

export const metadata: Metadata = {
  title: "Pricing | Dental Membership and Payment Plan Software",
  description:
    "Transparent SmilePass pricing for Australian dental practices. Free plan forever, Growth from $29/month, Pro from $56/month, Enterprise custom. No setup fee, no contract. Compare every feature side-by-side.",
  keywords: [
    "dental software pricing",
    "dental membership plan software cost",
    "dental payment plan software pricing",
    "SmilePass pricing",
    "dental practice software Australia",
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "SmilePass pricing: start free, scale with your practice",
    description:
      "Free forever for small clinics, $29/month Growth, $56/month Pro, custom Enterprise. No setup fee, no contract.",
    url: CANONICAL,
    type: "website",
  },
};

/* ─── FAQPage JSON-LD for AI Overviews + Google rich results ─── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${CANONICAL}#faq`,
  mainEntity: PRICING_FAQS.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: { "@type": "Answer", text: q.answer },
  })),
};

/* ─── Offer schema — each plan as a SaaS pricing offer ─── */
const offerCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${CANONICAL}#product`,
  name: "SmilePass: Dental Membership and Payment Plan Software",
  description:
    "All-in-one dental payments platform for Australian dental practices: memberships, payment plans, online payments and loyalty.",
  brand: { "@type": "Brand", name: "SmilePass" },
  offers: PRICING_TIERS.map((tier) => ({
    "@type": "Offer",
    name: `${tier.name} plan`,
    description: tier.summary,
    priceCurrency: "AUD",
    price: tier.annualPrice ?? tier.monthlyPrice ?? "0",
    availability: "https://schema.org/InStock",
    url: CANONICAL,
    priceSpecification:
      tier.annualPrice !== null
        ? {
            "@type": "UnitPriceSpecification",
            price: tier.annualPrice,
            priceCurrency: "AUD",
            unitText: "MONTH",
            billingDuration: "P1Y",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
          }
        : undefined,
  })),
};

/**
 * /pricing — Free / Growth / Pro / Enterprise plans + full comparison + FAQ.
 *
 * SEO targets: "dental membership plan software pricing", "dental payment plan
 * software cost", "SmilePass pricing", "dental practice software Australia".
 * FAQPage + Product schema injected for rich results + AI citations.
 */
export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema) }}
      />

      <PageHero
        align="center"
        eyebrow="Pricing"
        title={
          <>
            Start free.{" "}
            <em className="display-accent text-brand-purple">Grow at your pace.</em>
          </>
        }
        description={
          <>
            One transparent platform for dental memberships, payment plans, and
            online payments. No setup fee, no lock-in contract, no surprise
            charges. Choose the plan that matches your practice today, change
            it any time as you grow.
          </>
        }
      />

      {/* Tier cards */}
      <PricingTiers />

      {/* Comparison table */}
      <ComparisonTable />

      {/* What is and is not included */}
      <section className="bg-paper py-14 lg:py-20 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <Block
            heading="Included on every plan"
            items={[
              "Members directory and bulk import of existing patients",
              "Automated invoicing, reminders and failed-payment retries",
              "Custom-branded patient portal where members manage their own plan",
              "Real-time dashboard for revenue, members and payment status",
              "Standard reports + cloud storage",
              "Privacy Act 1988 compliant data handling",
              "Two-factor authentication for staff",
            ]}
          />
          <Block
            heading="Things you never pay for"
            tone="muted"
            items={[
              "Setup or onboarding fees",
              "Long-term contracts (cancel any time)",
              "Per-patient charges (your members never see a SmilePass invoice)",
              "Hidden platform charges",
              "Per-staff seat fees on Pro and Enterprise",
            ]}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bone py-16 lg:py-24 px-6 lg:px-10 border-t border-ink/8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 reveal">
            <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-3">
              Frequently asked
            </p>
            <h2
              className="text-purple-deep mb-3"
              style={{ fontWeight: 500, lineHeight: 1.1 }}
            >
              Pricing questions
            </h2>
            <p className="text-[1rem] text-purple-deep/75 leading-relaxed max-w-2xl">
              The same questions practices ask us on demos, answered honestly.
              If your question is not here, get in touch and we will answer it
              the same day.
            </p>
          </div>

          <FAQAccordion items={PRICING_FAQS} variant="light" columns={2} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-paper py-16 lg:py-20 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-purple-deep mb-4"
            style={{ fontWeight: 500, lineHeight: 1.1 }}
          >
            Try the platform free. Decide later.
          </h2>
          <p className="text-[1rem] text-purple-deep/75 leading-relaxed mb-7">
            Build your first membership plan, invite a handful of patients,
            and run a few payment plans. If it works for your practice you can
            upgrade in a click. If it does not, you walk away.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="https://app.smilepass.com.au/pages/authentication/first-access"
              className="btn-primary"
            >
              Get started free
            </Link>
            <RequestDemoButton className="btn-outline-purple" />
          </div>
        </div>
      </section>
    </>
  );
}

function Block({
  heading,
  items,
  tone = "default",
}: {
  heading: string;
  items: string[];
  tone?: "default" | "muted";
}) {
  const iconClass = tone === "muted" ? "text-ink/40" : "text-brand-purple";
  return (
    <div>
      <h3
        className="text-purple-deep text-[1.15rem] mb-5"
        style={{ fontWeight: 500, letterSpacing: "-0.005em" }}
      >
        {heading}
      </h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-[0.94rem] text-ink/80 leading-snug"
          >
            <Icon tone={tone} className={`w-4 h-4 mt-0.5 flex-shrink-0 ${iconClass}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Icon({ tone, className }: { tone: "default" | "muted"; className?: string }) {
  if (tone === "muted")
    return (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className={className} aria-hidden>
        <path strokeLinecap="round" d="M4 8h8" />
      </svg>
    );
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.5l3.5 3.5 6.5-7" />
    </svg>
  );
}
