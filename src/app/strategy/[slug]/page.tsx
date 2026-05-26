import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import RequestDemoButton from "@/components/forms/RequestDemoButton";
import {
  STRATEGIES,
  getStrategyBySlug,
  getCategoryById,
  getStrategiesInCategory,
  getStrategySetup,
  type SetupStep,
} from "@/data/strategy/strategies";

/* ─────────────────────────────────────────────────────────── */
/*  Each setup step gets a SmilePass screen mock via an explicit
 *  per-step mapping (STEP_SCREENS below). The mapping is reviewed
 *  step-by-step against the step text so the image always matches
 *  the action described. Steps with no useful screen (front-desk
 *  scripts, manual workflows) map to "none" and render text-only.
 */
/* ─────────────────────────────────────────────────────────── */

interface StepImage {
  src: string;
  alt: string;
}

type ScreenKey =
  | "members"
  | "payments"
  | "addons"
  | "discounts"
  | "import"
  | "marketing"
  | "reports"
  | "none";

const SCREENS: Record<Exclude<ScreenKey, "none">, StepImage> = {
  members: {
    src: "/images/strategy/screen-membership-builder.svg?v=2",
    alt: "SmilePass Membership Builder showing existing plan cards with toggle, member count, price and inclusions",
  },
  payments: {
    src: "/images/strategy/screen-payment-plan-builder.svg?v=2",
    alt: "SmilePass Payment Plan Builder modal showing an Implant Case template with deposit, Payment Hold and 24 monthly instalments",
  },
  addons: {
    src: "/images/strategy/screen-add-ons.svg?v=2",
    alt: "SmilePass Add-Ons Builder showing Whitening Boost, Night Guard and X-Ray Pack with active member counts and MRR",
  },
  discounts: {
    src: "/images/strategy/screen-manage-discounts.svg?v=2",
    alt: "SmilePass Custom Discounts and Code panel showing Referral Program, Dependent Program and Promo Code List",
  },
  import: {
    src: "/images/strategy/screen-import-patients.svg?v=2",
    alt: "SmilePass bulk Patient Import showing CSV template + 243 of 332 patients imported with a 73% progress bar",
  },
  marketing: {
    src: "/images/strategy/screen-marketing.svg?v=3",
    alt: "SmilePass Promotional Material library showing campaign templates, in-clinic kits and email series",
  },
  reports: {
    src: "/images/strategy/screen-reports.svg?v=2",
    alt: "SmilePass home dashboard showing $8,420 MRR, 284 members, 96.4% retention and a 12-month growth chart",
  },
};

/*
 * Explicit per-step screen mapping. Key format: "<slug>.<stepNum>".
 *
 * Each step's text was reviewed against the available screen mocks and
 * mapped to the most accurate one. Steps that describe staff scripts,
 * manual outreach, or process-only actions (no SmilePass screen to
 * point at) are mapped to "none" so the step renders text-only.
 */
const STEP_SCREENS: Record<string, ScreenKey> = {
  /* know-the-platform (Foundations) */
  "know-the-platform.01": "reports",  // Getting Started: dashboard + Quick Actions
  "know-the-platform.02": "members",  // Building Plans: Membership Builder etc
  "know-the-platform.03": "import",   // Daily Operations: registering + importing patients
  "know-the-platform.04": "discounts", // Account & Integrations: housekeeping
  "know-the-platform.05": "none",     // bookmark the wiki

  /* team-training (Foundations) */
  "team-training.01": "none",    // kickoff meeting
  "team-training.02": "members", // tour SmilePass together — start at the Membership Builder
  "team-training.03": "none",    // one-page reception cheat sheet
  "team-training.04": "none",    // role-play three conversations
  "team-training.05": "reports", // daily dashboard standup

  /* family-first-growth */
  "family-first-growth.01": "discounts", // turn on Dependent Program
  "family-first-growth.02": "members",   // build the family plan
  "family-first-growth.03": "members",   // plan settings: live price preview
  "family-first-growth.04": "none",      // front-desk script
  "family-first-growth.05": "reports", // email sent via own CRM, then track in Reports

  /* recurring-revenue-foundation */
  "recurring-revenue-foundation.01": "members",   // build first plan in Builder
  "recurring-revenue-foundation.02": "members",   // billing cadence on the plan
  "recurring-revenue-foundation.03": "import",    // upload patient CSV
  "recurring-revenue-foundation.04": "import",    // bulk invites from member list
  "recurring-revenue-foundation.05": "reports",   // dashboard MRR

  /* good-better-best-ladder */
  "good-better-best-ladder.01": "members",   // build three tiers
  "good-better-best-ladder.02": "members",   // tier inclusion design
  "good-better-best-ladder.03": "members",   // webpage order + Most Popular badge (Builder visibility)
  "good-better-best-ladder.04": "none",      // reception anchor script
  "good-better-best-ladder.05": "reports",   // tier mix monthly review

  /* hygiene-only-starter */
  "hygiene-only-starter.01": "members",   // build Hygiene Only plan
  "hygiene-only-starter.02": "members",   // pricing rule (still in Builder)
  "hygiene-only-starter.03": "none",      // hygienist script
  "hygiene-only-starter.04": "reports",   // track conversion

  /* demographic-segmented-tiers */
  "demographic-segmented-tiers.01": "none",      // strategic decision, no screen
  "demographic-segmented-tiers.02": "members",   // build one plan per segment
  "demographic-segmented-tiers.03": "members",   // hide niche plans (Visibility setting)
  "demographic-segmented-tiers.04": "none",      // staff cheat sheet
  "demographic-segmented-tiers.05": "reports",   // consolidate based on performance

  /* fortnightly-billing */
  "fortnightly-billing.01": "members",   // set frequency to Fortnightly
  "fortnightly-billing.02": "members",   // price as monthly/2.17
  "fortnightly-billing.03": "members",   // align debit day
  "fortnightly-billing.04": "none", // migration email sent via own CRM
  "fortnightly-billing.05": "reports",   // retention by cohort

  /* founder-launch-pricing */
  "founder-launch-pricing.01": "discounts",  // create promo code
  "founder-launch-pricing.02": "discounts",  // cap the campaign
  "founder-launch-pricing.03": "none",       // announcement email sent via own CRM
  "founder-launch-pricing.04": "marketing",  // reception signage from shop
  "founder-launch-pricing.05": "discounts",  // deactivate code

  /* referral-engine */
  "referral-engine.01": "discounts", // toggle on Referral Program
  "referral-engine.02": "discounts", // confirm 12-month duration
  "referral-engine.03": "none",      // announcement email sent via own CRM
  "referral-engine.04": "none",      // post-appointment script
  "referral-engine.05": "reports",   // referral dashboard

  /* corporate-workplace-memberships */
  "corporate-workplace-memberships.01": "members",   // build Corporate plan + Hidden
  "corporate-workplace-memberships.02": "discounts", // company-specific promo
  "corporate-workplace-memberships.03": "none",      // HR outreach
  "corporate-workplace-memberships.04": "discounts", // Dependent Program on
  "corporate-workplace-memberships.05": "reports",   // quarterly review

  /* add-on-revenue-layer */
  "add-on-revenue-layer.01": "addons",  // build first three add-ons
  "add-on-revenue-layer.02": "addons",  // show add-ons on signup
  "add-on-revenue-layer.03": "none",    // hygienist pitch training
  "add-on-revenue-layer.04": "reports", // attach rate review
  "add-on-revenue-layer.05": "addons",  // retire flops in Builder

  /* treatment-day-deposits */
  "treatment-day-deposits.01": "payments", // enable Payment Hold
  "treatment-day-deposits.02": "payments", // build high-value plan template
  "treatment-day-deposits.03": "payments", // refund rule on template
  "treatment-day-deposits.04": "none",     // issuing workflow
  "treatment-day-deposits.05": "reports",  // no-show drop

  /* accessible-major-treatments */
  "accessible-major-treatments.01": "none",     // strategic decision
  "accessible-major-treatments.02": "payments", // build plan template per treatment
  "accessible-major-treatments.03": "none",     // objection-handling script
  "accessible-major-treatments.04": "none",     // PDF handout update
  "accessible-major-treatments.05": "reports",  // case-acceptance lift

  /* ortho-financing-playbook */
  "ortho-financing-playbook.01": "payments",  // build Ortho 24-Month template
  "ortho-financing-playbook.02": "payments",  // Payment Hold for commitment fee
  "ortho-financing-playbook.03": "none",      // issuing at consult workflow
  "ortho-financing-playbook.04": "none",      // 48h follow-up automated in own CRM
  "ortho-financing-playbook.05": "reports",   // consult-to-start conversion

  /* post-ortho-retention */
  "post-ortho-retention.01": "members",  // build Retainer Care membership
  "post-ortho-retention.02": "addons",   // add retainer-replacement add-on
  "post-ortho-retention.03": "none",     // chairside script at de-bond
  "post-ortho-retention.04": "none",     // chairside-only positioning (no platform setting)
  "post-ortho-retention.05": "reports",  // 12-month retention

  /* perio-maintenance-membership */
  "perio-maintenance-membership.01": "members",  // build Perio plan
  "perio-maintenance-membership.02": "none",     // post-diagnosis positioning (no platform setting)
  "perio-maintenance-membership.03": "none",     // referral pathway workflow
  "perio-maintenance-membership.04": "none",     // insurance-gap framing script
  "perio-maintenance-membership.05": "reports",  // perio cohort report

  /* insurance-gap-perio */
  "insurance-gap-perio.01": "addons",    // build perio gap add-on
  "insurance-gap-perio.02": "addons",    // attach to existing plan
  "insurance-gap-perio.03": "none",      // hygienist end-of-year script
  "insurance-gap-perio.04": "none",      // annual reminder email scheduled in own CRM

  /* smile-makeover-combo */
  "smile-makeover-combo.01": "payments", // build Cosmetic Bundle template
  "smile-makeover-combo.02": "payments", // deposit with Payment Hold
  "smile-makeover-combo.03": "none",     // smile-design presentation moment
  "smile-makeover-combo.04": "members",  // add lifetime maintenance plan
  "smile-makeover-combo.05": "reports",  // cosmetic ROI

  /* pre-event-whitening */
  "pre-event-whitening.01": "discounts", // create WEDDING2026 promo code
  "pre-event-whitening.02": "payments",  // build Whitening payment plan
  "pre-event-whitening.03": "none",      // Instagram + patient list via own CRM
  "pre-event-whitening.04": "none",      // reception discovery question
  "pre-event-whitening.05": "members",   // convert to membership at follow-up

  /* all-on-x-financing */
  "all-on-x-financing.01": "payments",  // build All-on-X template
  "all-on-x-financing.02": "payments",  // refund rule on template
  "all-on-x-financing.03": "none",      // records appointment workflow
  "all-on-x-financing.04": "none",      // 24-month post-op cadence in own CRM
  "all-on-x-financing.05": "reports",   // consult-to-surgery conversion

  /* implant-maintenance-membership */
  "implant-maintenance-membership.01": "members", // build Implant Maintenance plan
  "implant-maintenance-membership.02": "none",    // surgery-completion appt workflow
  "implant-maintenance-membership.03": "none",    // warranty registration workflow
  "implant-maintenance-membership.04": "none",    // post-surgery positioning (no platform setting)
  "implant-maintenance-membership.05": "reports", // 10-year retention cohort

  /* kids-only-membership */
  "kids-only-membership.01": "members",   // build Kids Plan + age cap
  "kids-only-membership.02": "members",   // family-of-kids logic on plan
  "kids-only-membership.03": "marketing", // school-holiday campaign
  "kids-only-membership.04": "members",   // signup form prompts
  "kids-only-membership.05": "reports",   // kid-to-adult conversion cohort

  /* family-bundles-back-to-school */
  "family-bundles-back-to-school.01": "discounts", // create BACKTOSCHOOL code
  "family-bundles-back-to-school.02": "discounts", // replicate MIDYEAR
  "family-bundles-back-to-school.03": "none",      // BACKTOSCHOOL/MIDYEAR scheduled in own CRM
  "family-bundles-back-to-school.04": "marketing", // signage from Marketing Shop
  "family-bundles-back-to-school.05": "reports",   // promo code performance

  /* emergency-safety-net */
  "emergency-safety-net.01": "members",   // build Emergency Safety-Net plan
  "emergency-safety-net.02": "none",      // positioning pitch
  "emergency-safety-net.03": "none",      // post-emergency follow-up automated in own CRM
  "emergency-safety-net.04": "none",      // after-hours call script
  "emergency-safety-net.05": "reports",   // attach rate post-emergency
};

/**
 * Look up the screenshot for a step by its strategy slug + step number.
 *
 * Returns null when the step is intentionally text-only (front-desk
 * scripts, manual workflows, strategic decisions with no matching
 * SmilePass screen). Returns null too if no mapping exists yet (a new
 * setup added to strategies.ts without a corresponding STEP_SCREENS
 * entry) so the page degrades gracefully rather than guessing wrong.
 */
function getStepImage(slug: string, step: SetupStep): StepImage | null {
  const key = `${slug}.${step.num}`;
  const screen = STEP_SCREENS[key];
  if (!screen || screen === "none") return null;
  return SCREENS[screen];
}

// Legacy keyword-based inference helper was removed in favour of the
// explicit STEP_SCREENS map above. To map a new step to a screen, add an
// entry to STEP_SCREENS — never reintroduce keyword inference.

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render every strategy at build time. */
export function generateStaticParams() {
  return STRATEGIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const strategy = getStrategyBySlug(slug);
  if (!strategy) return { title: "Strategy not found" };
  return {
    title: strategy.title,
    description: strategy.lead,
    alternates: { canonical: `https://smilepass.com.au/strategy/${strategy.slug}` },
    openGraph: {
      title: `${strategy.title} — SmilePass Strategy`,
      description: strategy.lead,
      url: `https://smilepass.com.au/strategy/${strategy.slug}`,
    },
  };
}

/**
 * /strategy/[slug] — one strategy per page.
 *
 * Marketing-focused: hero (category tag + title + lead), Markdown body,
 * sibling-strategy nav at the bottom (other strategies in the same
 * category), and prominent CTAs. Bodies are authored in
 * `data/strategy/strategies.ts` and rendered via react-markdown.
 */
export default async function StrategyPage({ params }: PageProps) {
  const { slug } = await params;
  const strategy = getStrategyBySlug(slug);
  if (!strategy) notFound();

  const category = getCategoryById(strategy.categoryId);
  const siblings = category
    ? getStrategiesInCategory(category.id).filter((s) => s.slug !== strategy.slug)
    : [];
  const setup = getStrategySetup(strategy.slug);

  return (
    <>
      {/* Hero */}
      <section className="bg-mist pt-[110px] lg:pt-[130px] pb-10 lg:pb-12 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-[0.82rem] text-purple-deep/60"
          >
            <Link href="/" className="hover:text-brand-purple transition-colors">
              Home
            </Link>
            <span aria-hidden className="mx-2">›</span>
            <Link href="/strategy" className="hover:text-brand-purple transition-colors">
              Strategy
            </Link>
            {category && (
              <>
                <span aria-hidden className="mx-2">›</span>
                <span className="text-purple-deep/80">{category.title}</span>
              </>
            )}
          </nav>

          <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-3 reveal">
            {category ? `${category.title} · Strategy ${strategy.order}` : `Strategy ${strategy.order}`}
          </p>
          <h1
            className="text-purple-deep mb-4 reveal reveal-delay-1"
            style={{ fontWeight: 400, lineHeight: 1.05, fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}
          >
            {strategy.title}
          </h1>
          <p className="text-[1.1rem] text-purple-deep/75 leading-relaxed reveal reveal-delay-2">
            {strategy.lead}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-paper py-12 lg:py-16 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="wiki-article prose-body">
            <ReactMarkdown>{strategy.body}</ReactMarkdown>
          </div>

          {/* Setup steps — "Launch this in SmilePass" */}
          {setup && setup.length > 0 && (
            <SetupSection slug={strategy.slug} steps={setup} />
          )}

          {/* CTAs */}
          <div className="bg-mist rounded-2xl p-7 lg:p-9 border border-divider mt-12">
            <h3
              className="text-purple-deep text-[1.2rem] lg:text-[1.35rem] mb-3"
              style={{ fontWeight: 500, lineHeight: 1.1 }}
            >
              Put this play to work
            </h3>
            <p className="text-[0.95rem] text-purple-deep/75 leading-relaxed mb-5">
              {setup && setup.length > 0
                ? "Start your free account and follow the steps above. Every feature referenced is available on the Free tier (Payment Hold needs Growth). Or get in touch if you want a hand setting it up."
                : "Sign up free and build this strategy yourself. Every feature referenced above is available on the Free tier (Payment Hold needs Growth). Or get in touch if you want a hand setting it up."}
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

          {/* Sibling strategies */}
          {siblings.length > 0 && category && (
            <div className="mt-12">
              <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-4">
                More {category.title} strategies
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {siblings.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/strategy/${s.slug}`}
                    className="group block bg-bone border border-divider rounded-xl p-5 hover:border-brand-purple hover:bg-brand-purple/[0.04] transition-colors"
                  >
                    <h4
                      className="text-purple-deep text-[1.05rem] mb-1.5 group-hover:text-brand-purple transition-colors"
                      style={{ fontWeight: 600, letterSpacing: "-0.005em" }}
                    >
                      {s.title} →
                    </h4>
                    <p className="text-[0.88rem] text-purple-deep/70 leading-snug">
                      {s.lead}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to index */}
          <div className="mt-10 text-center">
            <Link
              href="/strategy"
              className="inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-brand-purple hover:text-brand-purple-hover transition-colors"
            >
              ← Back to all strategies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────────────────── */

/**
 * Setup steps section — "Launch this in SmilePass".
 *
 * Rendered between the marketing body and the CTA box. Each step has a
 * monospace step number, a one-line title and 1-3 sentences of concrete
 * action referencing actual SmilePass nav paths.
 */
function SetupSection({ slug, steps }: { slug: string; steps: SetupStep[] }) {
  return (
    <section
      aria-labelledby="setup-heading"
      className="mt-14 lg:mt-16 pt-10 lg:pt-12 border-t border-divider"
    >
      <div className="mb-7 lg:mb-9">
        <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-3">
          Set it up in SmilePass
        </p>
        <h2
          id="setup-heading"
          className="text-purple-deep text-[1.6rem] lg:text-[1.85rem] mb-3"
          style={{ fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.01em" }}
        >
          How to launch this in the platform
        </h2>
        <p className="text-[1rem] text-purple-deep/75 leading-relaxed">
          The shortest path from reading this play to having it live in your
          practice. Every step maps to an actual screen in SmilePass.
        </p>
      </div>

      <ol className="flex flex-col gap-6 lg:gap-8 list-none p-0">
        {steps.map((step) => {
          const image = getStepImage(slug, step);
          return (
            <li
              key={step.num}
              className="bg-bone border border-divider rounded-2xl p-6 lg:p-8"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-mono text-[0.78rem] tracking-widest text-brand-purple">
                  {step.num}
                </span>
                <h3
                  className="text-purple-deep text-[1.1rem] lg:text-[1.18rem]"
                  style={{ fontWeight: 600, letterSpacing: "-0.005em" }}
                >
                  {step.title}
                </h3>
              </div>
              <div className="text-[0.96rem] text-ink/80 leading-relaxed max-w-2xl strategy-step-body">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="m-0">{children}</p>,
                    a: ({ href, children }) => (
                      <a
                        href={href ?? "#"}
                        className="text-brand-purple font-medium underline decoration-brand-purple/30 underline-offset-2 hover:text-brand-purple-hover hover:decoration-brand-purple-hover transition-colors"
                      >
                        {children}
                      </a>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-purple-deep font-semibold">{children}</strong>
                    ),
                  }}
                >
                  {step.body}
                </ReactMarkdown>
              </div>
              {image && (
                <a
                  href={image.src}
                  target="_blank"
                  rel="noopener"
                  className="mt-5 block rounded-xl overflow-hidden border border-divider bg-paper hover:border-brand-purple/40 transition-colors group"
                  aria-label={`Open full screenshot: ${image.alt}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1366}
                    height={800}
                    unoptimized
                    className="w-full h-auto object-cover object-top group-hover:opacity-95 transition-opacity"
                    sizes="(max-width: 768px) 100vw, 768px"
                    loading="lazy"
                  />
                  <p className="px-4 py-2.5 text-[0.78rem] text-ink/55 border-t border-divider/60">
                    Where in SmilePass — click to enlarge
                  </p>
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
