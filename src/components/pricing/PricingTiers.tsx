"use client";

import { useState } from "react";
import Link from "next/link";
import { PRICING_TIERS, type BillingCycle, type PricingTier } from "@/data/pricing";

/**
 * Tier cards with a monthly/annual billing toggle.
 *
 * The toggle drives the price shown on Growth and Pro (Free stays $0,
 * Enterprise stays Custom). Annual saves 25% — same wording as the live
 * smilepass.com.au pricing page.
 */
export default function PricingTiers() {
  const [cycle, setCycle] = useState<BillingCycle>("annual");

  return (
    <section className="bg-paper py-14 lg:py-20 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <BillingToggle cycle={cycle} onChange={setCycle} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {PRICING_TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} cycle={cycle} />
          ))}
        </div>

        <p className="mt-8 text-center text-[0.82rem] text-ink/55">
          Prices in AUD per practice. All plans are month-to-month with no setup
          fee. Transaction fees apply on top of the subscription.
        </p>
      </div>
    </section>
  );
}

function BillingToggle({
  cycle,
  onChange,
}: {
  cycle: BillingCycle;
  onChange: (c: BillingCycle) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Billing cycle"
      className="mx-auto mb-10 lg:mb-12 flex items-center gap-1 bg-mist border border-ink/8 rounded-full p-1 w-fit"
    >
      <button
        type="button"
        onClick={() => onChange("monthly")}
        aria-pressed={cycle === "monthly"}
        className={`px-5 py-2 text-[0.85rem] font-medium rounded-full transition-colors ${
          cycle === "monthly"
            ? "bg-paper text-ink shadow-sm"
            : "text-ink/65 hover:text-ink"
        }`}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange("annual")}
        aria-pressed={cycle === "annual"}
        className={`px-5 py-2 text-[0.85rem] font-medium rounded-full transition-colors flex items-center gap-2 ${
          cycle === "annual"
            ? "bg-paper text-ink shadow-sm"
            : "text-ink/65 hover:text-ink"
        }`}
      >
        Annual
        <span className="text-[0.66rem] font-semibold tracking-wider uppercase text-brand-purple bg-brand-purple/10 px-2 py-0.5 rounded-full">
          Save 25%
        </span>
      </button>
    </div>
  );
}

function TierCard({ tier, cycle }: { tier: PricingTier; cycle: BillingCycle }) {
  const isFree = tier.id === "free";
  const isEnterprise = tier.id === "enterprise";
  const price =
    cycle === "annual" && tier.annualPrice !== null
      ? tier.annualPrice
      : tier.monthlyPrice;

  const wrapClass = tier.highlight
    ? "bg-ink text-paper border-ink"
    : "bg-bone text-ink border-ink/8";

  const headingClass = tier.highlight ? "text-paper" : "text-purple-deep";
  const summaryClass = tier.highlight ? "text-paper/75" : "text-ink/70";
  const bulletColor = tier.highlight ? "text-paper/85" : "text-ink/80";
  const checkColor = tier.highlight ? "text-brand-purple-soft" : "text-brand-purple";
  const ctaClass = tier.highlight
    ? "btn-primary w-full !bg-brand-purple hover:!bg-brand-purple-hover"
    : "btn-outline-purple w-full";
  const footnoteClass = tier.highlight ? "text-paper/60" : "text-ink/55";

  return (
    <div
      className={`relative rounded-2xl border p-6 lg:p-7 flex flex-col ${wrapClass}`}
    >
      {tier.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-purple text-paper text-[0.68rem] font-semibold tracking-[0.15em] uppercase px-3 py-1 rounded-full">
          {tier.badge}
        </span>
      )}

      <h3
        className={`text-[1.25rem] mb-1 ${headingClass}`}
        style={{ fontWeight: 600, letterSpacing: "-0.01em" }}
      >
        {tier.name}
      </h3>
      <p className={`text-[0.78rem] mb-5 ${summaryClass}`}>{tier.tagline}</p>

      <div className="mb-5">
        {isEnterprise ? (
          <span
            className={`text-[2rem] ${headingClass}`}
            style={{ fontWeight: 500 }}
          >
            Custom
          </span>
        ) : (
          <div className="flex items-baseline gap-1.5">
            <span
              className={`text-[2.4rem] leading-none ${headingClass}`}
              style={{ fontWeight: 500 }}
            >
              ${price}
            </span>
            <span className={`text-[0.85rem] ${summaryClass}`}>
              {isFree ? "/ forever" : "/ practice / month"}
            </span>
          </div>
        )}
        {!isFree && !isEnterprise && cycle === "annual" && (
          <p className={`mt-1.5 text-[0.78rem] ${summaryClass}`}>
            Billed yearly · {tier.annualSavings ?? "Save 25%"}
          </p>
        )}
        {!isFree && !isEnterprise && cycle === "monthly" && (
          <p className={`mt-1.5 text-[0.78rem] ${summaryClass}`}>
            Switch to annual to save 25%
          </p>
        )}
      </div>

      <p className={`text-[0.9rem] leading-relaxed mb-5 ${summaryClass}`}>
        {tier.summary}
      </p>

      <ul className="space-y-2.5 mb-7 flex-1">
        {tier.bullets.map((b, i) => (
          <li
            key={i}
            className={`flex items-start gap-2.5 text-[0.88rem] leading-snug ${bulletColor}`}
          >
            <CheckIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${checkColor}`} />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <Link href={tier.cta.href} className={ctaClass}>
        {tier.cta.label}
      </Link>
      {tier.ctaFootnote && (
        <p className={`mt-3 text-[0.75rem] text-center ${footnoteClass}`}>
          {tier.ctaFootnote}
        </p>
      )}
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={className}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.5l3.5 3.5 6.5-7" />
    </svg>
  );
}
