/**
 * Pricing source-of-truth — mirrors the four plans shown on the live
 * smilepass.com.au/pricing/ page. Used by the pricing page tier cards,
 * the comparison table, and the FAQPage schema JSON-LD.
 *
 * Per work rule "utility covers union": every consumer reads from this
 * file so a price change happens in exactly one place.
 */

export type BillingCycle = "monthly" | "annual";

export interface PricingTier {
  id: "free" | "growth" | "pro" | "enterprise";
  name: string;
  tagline: string;
  /** Set null for Custom-priced (Enterprise). */
  monthlyPrice: number | null;
  /** Annual = effective monthly when billed yearly. Null for Free/Enterprise. */
  annualPrice: number | null;
  /** Optional “Save 25%” style label. */
  annualSavings?: string;
  /** Badge text shown above the card (e.g. "Most popular"). */
  badge?: string;
  /** Highlighted card style. */
  highlight?: boolean;
  /** Short summary under price. */
  summary: string;
  /** Three to six bullet headlines for the card body. */
  bullets: string[];
  cta: { label: string; href: string };
  /** Optional copy line directly under the CTA (e.g. "No credit card required"). */
  ctaFootnote?: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Free forever",
    monthlyPrice: 0,
    annualPrice: 0,
    summary:
      "For small clinics exploring memberships and basic payment options.",
    bullets: [
      "Up to 50 active members",
      "1 staff user account",
      "Members directory + automated invoicing",
      "Membership auto-renewals",
      "Access to Help Centre",
    ],
    cta: { label: "Get started free", href: "https://app.smilepass.com.au/pages/authentication/first-access" },
    ctaFootnote: "No credit card required",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For practices ready to scale memberships",
    monthlyPrice: 39,
    annualPrice: 29,
    annualSavings: "Save 25%",
    summary: "Clinics expanding payment options with customisable plans.",
    bullets: [
      "Everything in Free, plus:",
      "Up to 200 active members",
      "3 staff user accounts",
      "Customisable membership terms",
      "Referral program",
      "Dedicated practice webpage",
    ],
    cta: { label: "Get started free", href: "https://app.smilepass.com.au/pages/authentication/first-access" },
    ctaFootnote: "14-day free Growth trial on signup",
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Most popular",
    monthlyPrice: 75,
    annualPrice: 56,
    annualSavings: "Save 25%",
    badge: "Most popular",
    highlight: true,
    summary:
      "For practices scaling memberships and payment plans across the patient base.",
    bullets: [
      "Everything in Growth, plus:",
      "Unlimited active members",
      "Unlimited staff users",
      "Dedicated onboarding + training",
      "Advanced analytics + reports",
      "Priority support",
    ],
    cta: { label: "Get started free", href: "https://app.smilepass.com.au/pages/authentication/first-access" },
    ctaFootnote: "14-day free Pro trial on signup",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For dental groups and DSOs",
    monthlyPrice: null,
    annualPrice: null,
    summary:
      "Large networks seeking full customisation, unlimited scale and white-label options.",
    bullets: [
      "Everything in Pro, plus:",
      "White-label platform",
      "Custom integrations",
      "Custom reporting",
      "Most competitive fees",
      "Organisation-level settings",
    ],
    cta: { label: "Get in touch", href: "/contact" },
  },
];

/* ─── Detailed comparison table ─── */

export interface ComparisonRow {
  feature: string;
  /** Either a value per tier, or a boolean (✓/—). */
  values: [string | boolean, string | boolean, string | boolean, string | boolean];
}

export interface ComparisonSection {
  title: string;
  rows: ComparisonRow[];
}

export const COMPARISON_SECTIONS: ComparisonSection[] = [
  {
    title: "Practice management",
    rows: [
      { feature: "Active members", values: ["50", "200", "Unlimited", "Unlimited"] },
      { feature: "Staff user accounts", values: ["1", "3", "Unlimited", "Unlimited"] },
      { feature: "Multi-location support", values: ["1", "1", "Unlimited", "Unlimited"] },
      { feature: "Membership tiers", values: ["2", "5", "Unlimited", "Unlimited"] },
    ],
  },
  {
    title: "Transactions and fees",
    rows: [
      { feature: "Membership processing fee", values: ["6.56%", "6.39%", "5.94%", "Custom"] },
      { feature: "Payment plan fee", values: ["2.5%", "2.1%", "1.8%", "Custom"] },
      { feature: "Gift card load fee", values: ["3.0%", "2.5%", "2.0%", "Custom"] },
      { feature: "No setup fee", values: [true, true, true, true] },
    ],
  },
  {
    title: "Memberships",
    rows: [
      { feature: "Members directory", values: [true, true, true, true] },
      { feature: "Membership auto-renewals", values: [true, true, true, true] },
      { feature: "Bulk import existing patients", values: [true, true, true, true] },
      { feature: "Custom membership terms", values: [false, true, true, true] },
      { feature: "Dependent program (family discounts)", values: [true, true, true, true] },
      { feature: "Admin-only member fields", values: [true, true, true, true] },
    ],
  },
  {
    title: "Payment plans",
    rows: [
      { feature: "Customisable payment schedules", values: [true, true, true, true] },
      { feature: "Automated billing and reminders", values: [true, true, true, true] },
      { feature: "Failed-payment auto-retry", values: [true, true, true, true] },
      { feature: "Payment Hold (escrow for treatment day)", values: [false, true, true, true] },
      { feature: "Risk-assessment tools", values: [false, true, true, true] },
    ],
  },
  {
    title: "Online payments",
    rows: [
      { feature: "Pay-by-link via email or SMS", values: [true, true, true, true] },
      { feature: "Patient-facing payment portal", values: [true, true, true, true] },
      { feature: "Real-time payment dashboard", values: [true, true, true, true] },
    ],
  },
  {
    title: "Marketing and branding",
    rows: [
      { feature: "Marketing campaign templates", values: [true, true, true, true] },
      { feature: "Custom-branded practice webpage", values: [false, true, true, true] },
      { feature: "Referral program", values: [false, true, true, true] },
      { feature: "Custom promo codes", values: [false, true, true, true] },
      { feature: "Remove SmilePass email branding", values: [false, false, true, true] },
      { feature: "White-label platform", values: [false, false, false, true] },
    ],
  },
  {
    title: "Analytics and reporting",
    rows: [
      { feature: "Cloud storage", values: [true, true, true, true] },
      { feature: "Standard reports", values: [true, true, true, true] },
      { feature: "Advanced analytics", values: [false, false, true, true] },
      { feature: "Custom reports", values: [false, false, false, true] },
    ],
  },
  {
    title: "Support",
    rows: [
      { feature: "Help Centre + video tutorials", values: [true, true, true, true] },
      { feature: "Email support", values: [true, true, true, true] },
      { feature: "Live chat support", values: [false, false, true, true] },
      { feature: "Ticket and request support", values: [false, false, true, true] },
      { feature: "Dedicated onboarding and staff training", values: [false, false, true, true] },
      { feature: "Priority support", values: [false, false, true, true] },
    ],
  },
];

/* ─── FAQ items used on the pricing page + in FAQPage JSON-LD ─── */

export interface PricingFAQ {
  question: string;
  answer: string;
}

export const PRICING_FAQS: PricingFAQ[] = [
  {
    question: "How do I choose the right SmilePass plan for my practice?",
    answer:
      "Start with the Free plan if you want to learn the platform with up to 50 patients on a single user account. Move to Growth (up to 200 members, 3 users) when you want customisable membership terms, a referral program and your own practice webpage. Pick Pro when you outgrow 200 members or want unlimited staff users, advanced analytics and priority support. Choose Enterprise if you run a multi-location group or DSO and need white-labelling and custom integrations.",
  },
  {
    question: "Can I switch plans later or cancel at any time?",
    answer:
      "Yes. All SmilePass plans are month-to-month. You can upgrade, downgrade or cancel any time from the billing area. Changes take effect at the start of your next billing cycle and your members keep access to their benefits until then.",
  },
  {
    question: "Is there a setup fee or contract on SmilePass?",
    answer:
      "No. There is no setup fee on any plan and no long-term contract. You can start free, switch plans at any time, and pause or cancel without penalty.",
  },
  {
    question: "Why does SmilePass charge transaction fees on top of the subscription?",
    answer:
      "Transaction fees cover the cost of processing card and direct-debit payments through our payment gateway. Combining a low monthly subscription with usage-based transaction fees lets small practices start at very low cost while larger practices pay proportionally as their member base grows. There are no hidden costs and every fee is shown upfront.",
  },
  {
    question: "How does the annual billing discount work?",
    answer:
      "When you choose annual billing on the Growth or Pro plan, you save 25% compared to paying month-to-month. You are charged once for the year and the effective monthly cost drops accordingly: Growth from $39 to $29 per practice per month, Pro from $75 to $56.",
  },
  {
    question: "Do members of my membership plan need to pay SmilePass anything?",
    answer:
      "No. Patients only pay your practice for the dental membership plan you create. SmilePass charges your practice the subscription and per-transaction fees described above. Your members never see a SmilePass invoice.",
  },
  {
    question: "Can I run more than one location on a single SmilePass account?",
    answer:
      "Free and Growth both cover one location. Pro and Enterprise support unlimited locations under a single organisation account, with separate dashboards, members and reports for each clinic.",
  },
  {
    question: "What kind of support and onboarding do I get on each plan?",
    answer:
      "Every plan includes the Help Centre, video tutorials and email support. Pro and Enterprise plans add live chat, ticketed support, dedicated onboarding sessions for your team, staff training, and priority response times. Pro and Enterprise practices also get a dedicated success contact for the first ninety days.",
  },
  {
    question: "Is SmilePass secure, and how is patient data handled?",
    answer:
      "Yes. SmilePass uses industry-standard encryption in transit and at rest, two-factor authentication for staff users, and a PCI-compliant payment gateway. Patient data is stored in Australian-region infrastructure and is never shared with third parties without consent. SmilePass complies with the Privacy Act 1988 and the Australian Privacy Principles.",
  },
  {
    question: "What happens if a member or payment-plan patient misses a payment?",
    answer:
      "SmilePass automatically notifies the patient by email and SMS when a payment fails. Failed cards are retried on a schedule you control, members get a grace period, and your dashboard shows every outstanding payment with one-click follow-up actions. You set the rules: automatic pause, manual chase, or both.",
  },
];
