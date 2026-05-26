import type { SolutionCategoryData } from "@/components/solutions/SolutionPageTemplate";

const CANONICAL = "https://smilepass.com.au/membership-plans";

/* ─── Icons ─── */
const IconBuild = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8-4 8 4-8 4-8-4zM4 12l8 4 8-4M4 17l8 4 8-4" />
  </svg>
);
const IconEnrol = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 11a5 5 0 10-10 0 5 5 0 0010 0zM3 21v-1a6 6 0 0112 0v1M18 8v6M21 11h-6" />
  </svg>
);
const IconTrack = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 14l4-4 4 4 5-6" />
  </svg>
);
const IconAuto = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4zM4 8h16M8 4v16" />
  </svg>
);
const IconFamily = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11a3 3 0 11-6 0 3 3 0 016 0zM6 21v-2a4 4 0 014-4h2a4 4 0 014 4v2M19 8a2 2 0 11-4 0 2 2 0 014 0zM5 8a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const IconBrand = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m0 16v1M5.34 5.34l.708.708m11.904 11.904l.708.708M3 12h1m16 0h1M5.34 18.66l.708-.708m11.904-11.904l.708-.708" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

export const membershipPlansPageData: SolutionCategoryData = {
  hero: {
    eyebrow: "Dental membership plans",
    title: "In-house membership plans your patients",
    titleAccent: "actually stay subscribed to.",
    subtitle:
      "Build, launch and grow your own subscription-based dental membership plan in weeks, not months. Replace insurance reliance with predictable monthly revenue and patients who say yes to treatment more often.",
    body:
      "SmilePass puts your practice 100% in control of your membership program while automating the time-consuming admin: enrolment, recurring billing, renewals, communications, and reporting. You design the plans, set the prices, define the benefits. We handle the plumbing so your front desk does not have to.",
    primaryCta: { label: "Get started free", href: "https://app.smilepass.com.au/pages/authentication/first-access" },
    secondaryCta: { label: "View pricing", href: "/pricing" },
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Solutions" },
      { label: "Membership Plans" },
    ],
  },

  subProducts: [
    {
      id: "plan-builder",
      title: "Build plans your way",
      tagline: "Plan builder",
      body:
        "Create as many membership tiers as you need: adult preventive, family, perio maintenance, ortho retention, kids, even seniors. Set inclusions, frequencies, discount percentages, billing cadences and waiver text. Use our proven templates or design from scratch.",
      bullets: [
        "Weekly, fortnightly, monthly or annual billing",
        "Adult and dependent pricing with auto family discount",
        "Custom waivers and terms per plan",
      ],
      icon: IconBuild,
    },
    {
      id: "patient-enrolment",
      title: "Enrol patients in 90 seconds",
      tagline: "Sign-up flow",
      body:
        "Front desk sends a secure enrolment link by SMS or email. The patient signs digitally on their phone, enters a payment method, and the membership is live. No paperwork, no payment terminal, no waiting for forms to come back.",
      bullets: [
        "SMS or email invite from the dashboard",
        "Patient signs and pays on their own device",
        "Bulk import from your PMS for existing patients",
      ],
      icon: IconEnrol,
    },
    {
      id: "automated-billing",
      title: "Recurring billing on autopilot",
      tagline: "Billing engine",
      body:
        "Recurring debits go out automatically. Failed cards are retried on a schedule you control. Expiring cards trigger update reminders. Renewals process in the background. Your team stops chasing payments and starts chasing new members.",
      bullets: [
        "Smart retry logic for failed payments",
        "Automated card-update reminders",
        "Renewals + cancellations handled by the platform",
      ],
      icon: IconAuto,
    },
    {
      id: "family-discounts",
      title: "Family plans built in",
      tagline: "Dependent program",
      body:
        "Turn on the Dependent Program and the account holder's price drops 10% for every dependent added. Households join together, stay together, and the marketing math gets dramatically better than chasing individuals.",
      bullets: [
        "One adult member can save 30%+ with three dependents",
        "All dependents share the same plan structure",
        "Live pricing during signup so families see the discount",
      ],
      icon: IconFamily,
    },
    {
      id: "tracking-dashboard",
      title: "See your revenue grow in real time",
      tagline: "Reporting + dashboard",
      body:
        "Track member count, MRR (monthly recurring revenue), churn, average revenue per member, treatment acceptance lift, and per-plan performance. Every renewal, cancellation and signup is logged automatically.",
      bullets: [
        "MRR + member count on the home dashboard",
        "Per-plan and per-location breakdowns",
        "Daily signup notifications by email",
      ],
      icon: IconTrack,
    },
    {
      id: "branded-page",
      title: "Your own signup page",
      tagline: "Marketing tools",
      body:
        "Every practice gets a dedicated, custom-branded patient-facing webpage on your own subdomain. List your plans, accept enrolments, and link directly from your main website, Google Business profile, or Instagram bio.",
      bullets: [
        "Customisable colours, logo and copy",
        "Mobile-first design (most signups happen on phones)",
        "Free with every plan, no developer required",
      ],
      icon: IconBrand,
    },
  ],

  howItWorks: {
    heading: "Launch your first plan in under a week",
    subheading:
      "Most practices have a live membership program with their first three members enrolled inside seven days of starting their free trial. Here is the playbook we walk you through.",
    steps: [
      {
        num: "01",
        title: "Design the plans",
        body:
          "Use our templates as a starting point: Essentials, Comprehensive, Family. Tweak the inclusions and pricing to match your average preventive visit value. Most practices price between $25 and $45 per adult per month.",
      },
      {
        num: "02",
        title: "Import your patient list",
        body:
          "Bulk-upload your existing patient list once. From then on, every new patient at reception is one click away from a SmilePass enrolment invite.",
      },
      {
        num: "03",
        title: "Train the front desk",
        body:
          "We provide scripts, objection-handling cards, and a 20-minute video for your team. The pitch is short: 'For about the cost of one filling a year, you get all your hygiene visits covered.'",
      },
      {
        num: "04",
        title: "Promote + grow",
        body:
          "Use the free marketing pack (email templates, in-clinic flyers, social tiles) to announce the plan to your existing list. Practices usually sign up 20-40 members in the first month from their warm patients alone.",
      },
    ],
  },

  benefits: {
    heading: "Why practices switch to in-house membership plans",
    subheading:
      "Australian dental practices using membership plans report higher treatment acceptance, lower no-shows, and more predictable revenue than fee-for-service-only clinics, even before counting referral effects.",
    items: [
      {
        title: "Predictable monthly revenue",
        body:
          "Members pay every week, fortnight or month, automatically. A 200-member program at $30 a month is $6,000 of recurring revenue before they walk in the door, and your practice can plan around it.",
      },
      {
        title: "2 to 3 times higher treatment acceptance",
        body:
          "Members who have already pre-paid for preventive care are markedly more likely to say yes to elective work like whitening, veneers and orthodontic consultations once they are in the chair.",
      },
      {
        title: "Better hygiene reappointment rates",
        body:
          "Practices typically see members rebook their next hygiene 2 to 3 times more reliably than fee-for-service patients, because the visit is already paid for and the reminder cadence is automated.",
      },
      {
        title: "Replace insurance dependence",
        body:
          "Stop waiting on health-fund payouts and rebate negotiations. Members pay you directly, on a schedule you set, with no gap arguments and no claim rejections.",
      },
      {
        title: "Lower acquisition cost per family",
        body:
          "One adult enrolment with three dependents on a single family plan is a four-patient relationship from a single ad click. The CAC math is dramatically better than chasing individuals.",
      },
      {
        title: "Stickier patient relationships",
        body:
          "Cancelling a family dental membership is socially harder than ghosting an individual appointment. Members stay longer, refer more, and become advocates for the practice.",
      },
    ],
  },

  faq: {
    heading: "Common questions about dental membership plans",
    items: [
      {
        question: "What is a dental membership plan and how does it work in Australia?",
        answer:
          "A dental membership plan is a subscription patients pay directly to your practice in exchange for a defined set of dental benefits. Typical inclusions are preventive care (exams, cleans, x-rays) at no extra cost, plus a discount on other treatments. In Australia, in-house memberships are not regulated as private health insurance, because patients are buying defined services rather than indemnity cover. SmilePass automates enrolment, billing, renewals and reporting so your practice can run the program without adding admin headcount.",
      },
      {
        question: "How much does a typical Australian dental membership cost the patient?",
        answer:
          "Most Australian practices on SmilePass price adult plans between $25 and $45 per month, depending on what is included. A plan covering two scale-and-cleans, two exams, and small-dose x-rays per year usually lands around $30 a month. Family plans typically discount the account holder by 10% per dependent, so a couple with two kids pays roughly 30% less per person than two single adults would.",
      },
      {
        question: "Will a membership plan replace patients' private health insurance?",
        answer:
          "It is not a replacement for full private cover. But for many patients, particularly those who only ever claim dental, it is more cost-effective than the dental extras component of private health insurance. They get certainty about what is covered, no annual limit anxiety, and no claim paperwork. Practices typically position membership as 'instead of dental extras' rather than 'instead of all private cover'.",
      },
      {
        question: "How quickly can my practice launch a membership program?",
        answer:
          "Most SmilePass practices have their first three members enrolled inside seven days of starting the free trial. The bottleneck is usually deciding on pricing and inclusions, not the platform setup itself. We provide templates so you can start with proven defaults and tune from there.",
      },
      {
        question: "What is the difference between SmilePass and a third-party dental plan provider?",
        answer:
          "Third-party providers (such as outsourced membership networks) own the customer relationship and dictate the inclusions and pricing. With SmilePass, the plan is yours: you set the price, you set the inclusions, you own the patient relationship and the recurring revenue, and you keep 100% of the membership fee minus a small per-transaction processing fee. SmilePass is the software; you are the brand.",
      },
      {
        question: "Can I have different membership tiers for adults, kids, perio patients, and ortho patients?",
        answer:
          "Yes. SmilePass supports unlimited membership tiers on the Pro and Enterprise plans (up to 5 on Growth, 2 on Free). Most practices end up running between three and six tiers: Essentials, Comprehensive, Family, Kids, Perio Maintenance, and Implant/Cosmetic, which fits comfortably on Pro.",
      },
      {
        question: "What happens if a member misses a payment?",
        answer:
          "SmilePass automatically emails and SMSs the member, retries the card on a schedule you control, and flags the account in your dashboard. You decide whether to pause benefits immediately, allow a grace period, or chase manually. Most practices configure a 7-day grace period with two automated retries, which recovers around 70% of failed payments without staff intervention.",
      },
      {
        question: "Is patient data secure and compliant with Australian privacy law?",
        answer:
          "Yes. SmilePass is hosted on Australian-region infrastructure, complies with the Privacy Act 1988 and the Australian Privacy Principles, encrypts data in transit and at rest, and uses a PCI-DSS compliant payment gateway. Two-factor authentication is enforced for staff users on Pro and Enterprise.",
      },
    ],
  },

  cta: {
    eyebrow: "Ready to start?",
    heading: "Sign up the first ten members this month.",
    body:
      "Start your free trial, build your first plan in under an hour, and invite your warmest patients to be your founder members. No setup fee, no contract, no risk.",
    primaryCta: { label: "Get started free", href: "https://app.smilepass.com.au/pages/authentication/first-access" },
    secondaryCta: { label: "See the membership strategies", href: "/strategy" },
  },
};

export const membershipPlansCanonical = CANONICAL;
