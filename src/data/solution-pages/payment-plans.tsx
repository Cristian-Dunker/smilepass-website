import type { SolutionCategoryData } from "@/components/solutions/SolutionPageTemplate";

const CANONICAL = "https://smilepass.com.au/solutions/payment-plans";

const IconDesign = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18v12H3zM3 11h18M7 15h4M7 7V5h10v2" />
  </svg>
);
const IconRisk = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l9 4v6a9 9 0 11-18 0V6l9-4zM12 8v4m0 4h.01" />
  </svg>
);
const IconHold = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 11h14a2 2 0 012 2v6H3v-6a2 2 0 012-2zM8 11V7a4 4 0 118 0v4" />
  </svg>
);
const IconAutoBill = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-3-6.7M21 4v5h-5" />
  </svg>
);
const IconDashboard = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13a9 9 0 0118 0M12 13l4-4M7 19h10" />
  </svg>
);
const IconShield = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4zM9 12l2 2 4-4" />
  </svg>
);

export const paymentPlansPageData: SolutionCategoryData = {
  hero: {
    eyebrow: "Dental payment plans",
    title: "In-house payment plans that get more patients to",
    titleAccent: "say yes to treatment.",
    subtitle:
      "Customisable in-house payment plans for treatments your patients keep deferring. You set the terms, you set the deposit, you keep the relationship. SmilePass automates the billing, tracking and follow-up.",
    body:
      "Patients walk out with a treatment they would have postponed, and you walk into the next month with predictable cash flow already booked. No third-party lender, no credit check that excludes half your patient base, no commissions clawed back from your fee.",
    primaryCta: { label: "Get started free", href: "https://app.smilepass.com.au/pages/authentication/first-access" },
    secondaryCta: { label: "View pricing", href: "/pricing" },
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/#solutions" },
      { label: "Payment Plans" },
    ],
  },

  subProducts: [
    {
      id: "design-plans",
      title: "Design any plan structure",
      tagline: "Plan builder",
      body:
        "Configure deposit amount, instalment frequency (weekly, fortnightly, monthly), instalment count, total amount, and any setup fee. Save plan templates per treatment category (ortho, implants, full mouth rehab) so the front desk can issue them in seconds.",
      bullets: [
        "Weekly, fortnightly or monthly billing",
        "Optional deposit + setup fee",
        "Save templates per treatment type",
      ],
      icon: IconDesign,
    },
    {
      id: "payment-hold",
      title: "Lock in treatment-day deposits",
      tagline: "Payment Hold",
      body:
        "Take a refundable deposit at booking that releases as the first instalment on treatment day. No-shows drop to near zero on high-value cases like implants and All-on-X. Money sits in escrow until the patient turns up.",
      bullets: [
        "Refundable escrow until treatment day",
        "Auto-converts to first instalment",
        "Massive reduction in no-shows",
      ],
      icon: IconHold,
    },
    {
      id: "risk-tools",
      title: "Risk assessment built in",
      tagline: "Risk + safeguards",
      body:
        "Built-in risk indicators help your front desk decide which patients qualify for longer instalment terms and which get shorter ones with a higher deposit. You stay in control of every approval.",
      bullets: [
        "Configurable approval rules",
        "Manual override always available",
        "Audit trail per plan + per patient",
      ],
      icon: IconRisk,
    },
    {
      id: "auto-billing",
      title: "Billing and reminders on autopilot",
      tagline: "Recurring billing",
      body:
        "Every instalment debits automatically on the schedule you set. Failed cards retry on a smart schedule, expiring cards trigger update prompts, and your team gets a single dashboard view of every overdue cent. No more end-of-month spreadsheet panic.",
      bullets: [
        "Smart-retry on failed cards",
        "Automated SMS + email reminders",
        "One dashboard, every overdue plan",
      ],
      icon: IconAutoBill,
    },
    {
      id: "live-dashboard",
      title: "See cash flow in real time",
      tagline: "Reporting",
      body:
        "Track total outstanding, paid this month, paid this quarter, average plan size, and average days to default. Spot a slipping account two days late instead of two months late.",
      bullets: [
        "Live outstanding balance per patient",
        "Per-treatment-category performance",
        "Exportable to your accounting system",
      ],
      icon: IconDashboard,
    },
    {
      id: "compliance",
      title: "Compliant, secure, Australian",
      tagline: "Trust + security",
      body:
        "PCI-DSS compliant payment gateway, Australian-region data hosting, two-factor authentication for staff, and Privacy Act 1988 compliance built in. Your patients' card details never touch your practice's systems.",
      bullets: [
        "PCI-DSS compliant gateway",
        "Australian data residency",
        "Privacy Act 1988 + APP compliant",
      ],
      icon: IconShield,
    },
  ],

  howItWorks: {
    heading: "From treatment plan presentation to first instalment in 5 minutes",
    subheading:
      "Designed for the front desk workflow. Issue a plan as part of the same conversation where you present the treatment, and the patient signs it on their own phone before they leave the chair.",
    steps: [
      {
        num: "01",
        title: "Build the plan template",
        body:
          "Set up plan templates for your most common high-cost treatments (ortho start, implant case, full crowns) once. From then on, issuing a plan is two clicks.",
      },
      {
        num: "02",
        title: "Present + send",
        body:
          "Discuss the plan with the patient, then send the agreement to their phone by SMS or email. They review terms, enter card details, and digitally sign.",
      },
      {
        num: "03",
        title: "Treatment goes ahead",
        body:
          "Deposit clears (or sits in Payment Hold escrow), treatment proceeds, and the patient leaves with their treatment underway and their commitment locked in.",
      },
      {
        num: "04",
        title: "Auto-collect, auto-reconcile",
        body:
          "Every instalment debits automatically. Your team only gets involved when something genuinely needs a human, like a card change, a hardship request, or a plan amendment.",
      },
    ],
  },

  benefits: {
    heading: "Why Australian practices replace third-party finance with in-house plans",
    subheading:
      "Outsourced patient finance excludes the patients who need it most (credit checks fail), takes a 6-12% commission off the top, and the lender owns the customer relationship. In-house plans flip every one of those.",
    items: [
      {
        title: "More patients qualify",
        body:
          "No credit-check gate keeping out the patients who most need a payment plan. You make the call about who is good for the money, not a third-party algorithm trained on consumer credit.",
      },
      {
        title: "Keep 100% of the fee",
        body:
          "Third-party patient finance can take 6-12% off the top. SmilePass charges a small platform fee + a competitive per-transaction processing fee. The maths is dramatically better on a $5,000 case.",
      },
      {
        title: "Own the patient relationship",
        body:
          "Third-party lenders own the customer relationship and the data. With SmilePass the patient pays your practice directly, sees your branding on every reminder, and stays your patient.",
      },
      {
        title: "Higher treatment acceptance",
        body:
          "Practices that introduce in-house plans typically see a 30-60% lift in case acceptance on treatments over $2,000. The mental block is the lump sum, not the underlying number.",
      },
      {
        title: "Fewer no-shows on high-value cases",
        body:
          "With Payment Hold escrow, no-show rates on $10k+ implant cases drop near zero. Patients commit before treatment day, not on treatment day.",
      },
      {
        title: "Cash flow you can plan around",
        body:
          "Once you have a hundred active plans running, your monthly receipts become forecastable to within a few percent. Plan staffing, supplies, and equipment investments accordingly.",
      },
    ],
  },

  faq: {
    heading: "Common questions about in-house dental payment plans",
    items: [
      {
        question: "Are in-house dental payment plans legal in Australia?",
        answer:
          "Yes. In-house dental payment plans are a long-standing practice in Australia. SmilePass plans are short-term, interest-free instalment arrangements between the practice and the patient for the cost of dental services received. They sit outside the National Consumer Credit Protection Act when configured as standard short-term interest-free agreements, but practices should always discuss their specific configuration with a legal or compliance advisor and ensure terms are clearly disclosed in writing.",
      },
      {
        question: "How is this different from Afterpay, Zip, or Humm?",
        answer:
          "Buy-now-pay-later providers do credit checks (excluding many patients), take a merchant fee of 4 to 6%, and own the customer relationship, so every reminder comes from them, not you. With SmilePass in-house plans, your practice approves the patient, sets the terms, keeps the full fee minus a small per-transaction processing cost, and remains the brand on every communication. You also have the flexibility to offer longer terms (6, 12, 24 months) that BNPL providers will not.",
      },
      {
        question: "What kind of treatments do practices typically offer payment plans on?",
        answer:
          "The high-impact use cases are orthodontics ($6-9k typical case), All-on-X implant cases ($30-50k), full-mouth rehabilitation ($15-40k), veneers cases ($8-15k), and major perio surgery. Practices also use shorter 3 to 6 month plans on $1,500-3,000 treatments like crowns, root canals, and partial dentures to reduce the price barrier.",
      },
      {
        question: "What happens if a patient defaults?",
        answer:
          "SmilePass automatically retries failed cards on a schedule you control, sends escalating reminders, and flags the account in your dashboard. You decide your collection policy. Most practices follow a 30-60-90 day escalation pattern, then refer genuinely defaulting accounts to a debt collection service. Recovery rates on properly configured plans are typically 92 to 96% of total billed.",
      },
      {
        question: "Can I set a deposit and treatment-day payment hold?",
        answer:
          "Yes. The Payment Hold feature (Growth plan and above) takes a refundable deposit at booking that sits in escrow until treatment day, then automatically converts to the first instalment. This eliminates no-shows on high-value cases almost entirely while protecting the patient. If treatment does not go ahead, the deposit is refunded.",
      },
      {
        question: "How does the practice get paid?",
        answer:
          "Every instalment is processed through the SmilePass payment gateway and settled to your nominated bank account on a daily or weekly cycle (your choice). Your patient pays you, not SmilePass. We only ever charge the platform subscription fee and a small per-transaction processing fee, both clearly itemised.",
      },
      {
        question: "Do I need to do credit checks on my patients?",
        answer:
          "No credit check is required by SmilePass. You decide which patients qualify for which plan terms using your own judgement and the built-in risk indicators. Most practices ask for a higher deposit and shorter terms on new patients, and offer longer terms to established patients of record with a good payment history.",
      },
      {
        question: "How long does it take to set up a payment plan with a patient?",
        answer:
          "Once your plan templates are configured, issuing a plan to a patient takes about 90 seconds at reception. The patient receives a secure link by SMS or email, reads the terms, enters card details and signs digitally on their phone. The whole process from treatment-plan presentation to signed payment plan is usually under five minutes.",
      },
    ],
  },

  cta: {
    eyebrow: "Stop losing cases over price",
    heading: "Convert the next $5,000 treatment plan instead of postponing it.",
    body:
      "Start free, build your first payment plan template in ten minutes, and offer it to the next patient who hesitates on cost. Watch the case acceptance lift in your first week.",
    primaryCta: { label: "Get started free", href: "https://app.smilepass.com.au/pages/authentication/first-access" },
    secondaryCta: { label: "See payment-plan strategies", href: "/strategy" },
  },
};

export const paymentPlansCanonical = CANONICAL;
