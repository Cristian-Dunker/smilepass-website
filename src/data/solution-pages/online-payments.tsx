import type { SolutionCategoryData } from "@/components/solutions/SolutionPageTemplate";

const CANONICAL = "https://smilepass.com.au/solutions/online-payments";

const IconLink = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l-3 3a4 4 0 005.7 5.7L17 18M14 10l3-3a4 4 0 00-5.7-5.7L7 6M8.5 15.5l7-7" />
  </svg>
);
const IconMobile = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zM11 18h2" />
  </svg>
);
const IconClock = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IconLock = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 11h14a2 2 0 012 2v6H3v-6a2 2 0 012-2zM8 11V7a4 4 0 118 0v4" />
  </svg>
);
const IconReceipt = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h12v18l-3-2-3 2-3-2-3 2V3zM9 7h6M9 11h6M9 15h4" />
  </svg>
);
const IconWallet = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7zM3 7l3-4h12l3 4M16 13a1 1 0 100 2 1 1 0 000-2z" />
  </svg>
);

export const onlinePaymentsPageData: SolutionCategoryData = {
  hero: {
    eyebrow: "Online dental payments",
    title: "Take card payments by link.",
    titleAccent: "No terminal. Anywhere.",
    subtitle:
      "Send your patient a secure payment link by SMS or email. They pay in seconds from their phone, anywhere, on any card. No EFTPOS machine, no queue at reception, no missed payments because someone left their wallet at home.",
    body:
      "SmilePass Online Payments works alongside your existing terminal or replaces it entirely. Issue payment requests directly from the dashboard, get instant confirmation when the patient pays, and watch your receivables drop to zero days outstanding.",
    primaryCta: { label: "Get started free", href: "https://app.smilepass.com.au/pages/authentication/first-access" },
    secondaryCta: { label: "View pricing", href: "/pricing" },
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/#solutions" },
      { label: "Online Payments" },
    ],
  },

  subProducts: [
    {
      id: "pay-by-link",
      title: "Pay by link in seconds",
      tagline: "Secure payment links",
      body:
        "Generate a payment request from your dashboard for any amount. The patient receives a secure, single-use link by SMS or email. Tap, pay, done, usually inside 30 seconds.",
      bullets: [
        "Send by SMS, email, or both",
        "Single-use, time-limited links",
        "Itemised invoice attached automatically",
      ],
      icon: IconLink,
    },
    {
      id: "any-device",
      title: "Works on any device",
      tagline: "Mobile-first checkout",
      body:
        "Patients pay on whatever they have to hand: phone, tablet, laptop. Apple Pay, Google Pay, Visa, Mastercard, AMEX. No app to download, no account to create, no friction.",
      bullets: [
        "Apple Pay + Google Pay supported",
        "Optimised for one-handed mobile use",
        "No patient signup or account required",
      ],
      icon: IconMobile,
    },
    {
      id: "instant-settle",
      title: "Settled in real time",
      tagline: "Instant confirmation",
      body:
        "The moment the patient pays, your dashboard updates and the practice receives a notification. Funds settle to your bank on a daily cycle. No waiting for EFTPOS settlement runs, no end-of-day reconciliation surprises.",
      bullets: [
        "Real-time payment notifications",
        "Daily bank settlement",
        "Per-patient transaction history",
      ],
      icon: IconClock,
    },
    {
      id: "secure",
      title: "Bank-grade security",
      tagline: "Compliance + privacy",
      body:
        "PCI-DSS compliant gateway, end-to-end encryption, two-factor authentication for staff users, Australian-region data hosting. Patient card details never touch your practice's network.",
      bullets: [
        "PCI-DSS compliant gateway",
        "End-to-end encryption",
        "Australian data residency",
      ],
      icon: IconLock,
    },
    {
      id: "auto-receipts",
      title: "Receipts + invoices automated",
      tagline: "Less admin",
      body:
        "Every payment generates a tax-compliant invoice and receipt automatically, sent to the patient and stored in your dashboard. Reconciliation is one report, not three days of cross-checking.",
      bullets: [
        "Auto-generated invoices + receipts",
        "Patient self-service download",
        "CSV + accounting-system export",
      ],
      icon: IconReceipt,
    },
    {
      id: "all-payment-methods",
      title: "All payment methods, one platform",
      tagline: "Unified payments",
      body:
        "Use the same SmilePass account for membership debits, payment plan instalments, deposits, and ad-hoc treatment payments. One reconciliation, one report, one set of patient records.",
      bullets: [
        "Memberships, plans + ad-hoc together",
        "One patient record, all payments",
        "Single end-of-month report",
      ],
      icon: IconWallet,
    },
  ],

  howItWorks: {
    heading: "From treatment end to payment received: under a minute",
    subheading:
      "Designed for the moment the patient is putting their coat back on. Skip the reception queue, skip the failed card search, skip the awkward 'we'll invoice you' conversation.",
    steps: [
      {
        num: "01",
        title: "Generate a link",
        body:
          "From the patient's record, click 'Request payment', enter the amount, choose SMS or email (or both). Two clicks.",
      },
      {
        num: "02",
        title: "Patient receives + opens",
        body:
          "They tap the link on their phone, review the amount and invoice, select Apple Pay or enter a card.",
      },
      {
        num: "03",
        title: "Pay + confirm",
        body:
          "Payment processes in under five seconds. Both practice and patient get instant confirmation. A tax-compliant receipt is emailed automatically.",
      },
      {
        num: "04",
        title: "Settled overnight",
        body:
          "Funds land in your nominated bank account on the next daily settlement run. Your dashboard updates in real time so you always know what is settled and what is pending.",
      },
    ],
  },

  benefits: {
    heading: "Why practices switch from terminal-only to pay-by-link",
    subheading:
      "The EFTPOS terminal is fine when the patient has a card with them, the line is short, and the connection works. The other 30% of the time, pay-by-link is the difference between getting paid today or chasing it for a week.",
    items: [
      {
        title: "Reduce 30+ day receivables to near zero",
        body:
          "Patients pay before they leave the chair, or within minutes of leaving. No 'we'll send you an invoice' bucket that turns into a month-long chase.",
      },
      {
        title: "No terminal, no contract, no minimums",
        body:
          "Skip the terminal lease fees, EFTPOS minimums, and the dead Saturday morning when the terminal will not connect. Pay-by-link works wherever your phone has reception.",
      },
      {
        title: "Mobile clinics and house calls covered",
        body:
          "Aged-care visits, home-bound patients, charity outreach. Anywhere your practice goes, payments go too. No more 'I'll come in next week with the cash'.",
      },
      {
        title: "Patient experience that matches their bank app",
        body:
          "Patients are used to paying in two taps with Apple Pay. Asking them to dig out a card and a terminal feels archaic. Pay-by-link is the modern default.",
      },
      {
        title: "Cleaner reconciliation",
        body:
          "Every payment is itemised, attached to a patient record, and time-stamped. End-of-month reconciliation is a single CSV export, not a three-person treasure hunt.",
      },
      {
        title: "Works for partial payments too",
        body:
          "Send a deposit link before treatment, a balance link after, and a payment plan signup link for the gap. All under one patient record, one platform.",
      },
    ],
  },

  faq: {
    heading: "Common questions about online dental payments",
    items: [
      {
        question: "Do I still need an EFTPOS terminal if I use SmilePass Online Payments?",
        answer:
          "Most practices keep the EFTPOS terminal for walk-up Visa or Mastercard tap-and-go at reception and use SmilePass Online Payments for everything else: patients who do not have their card, post-treatment invoicing, deposits booked over the phone, home visits, and follow-up payments after treatment. Some practices have replaced the terminal entirely and direct all payments through pay-by-link.",
      },
      {
        question: "How quickly do online payments settle to my bank account?",
        answer:
          "Card payments process in real time (under five seconds), and funds settle to your nominated Australian bank account on the next daily settlement run, typically within one business day. You can see settled vs pending balances in your dashboard at any time.",
      },
      {
        question: "What card and wallet types do you support?",
        answer:
          "Visa, Mastercard, American Express, Apple Pay and Google Pay. Most Australian patients pay via Apple Pay or Google Pay on mobile because the experience is fastest: biometric authentication and the payment is done.",
      },
      {
        question: "Is the payment link secure for my patients?",
        answer:
          "Yes. Every payment link is single-use, time-limited, and routed through a PCI-DSS compliant payment gateway with end-to-end encryption. Card details are entered directly into the gateway, never into a SmilePass-controlled form, so card data never touches your practice's systems or ours.",
      },
      {
        question: "What are the transaction fees on online payments?",
        answer:
          "Per-transaction processing fees are itemised on the pricing page and depend on your subscription tier. They are the same whether the payment came via EFTPOS, pay-by-link, membership debit, or payment plan instalment: one unified rate per tier. There are no separate gateway fees, monthly minimums, or hidden surcharges.",
      },
      {
        question: "Can I send a partial payment link or a deposit link?",
        answer:
          "Yes. You can issue links for any amount: a deposit before treatment, a balance after, a refund. You can also set up Payment Hold (escrow) so a deposit sits in trust until treatment day before automatically becoming the first payment plan instalment.",
      },
      {
        question: "What happens if the patient doesn't pay the link?",
        answer:
          "Unpaid links stay open until the time limit expires (you set the limit; default is 7 days). You can resend, increase the time limit, void the request, or convert it into a payment plan with one click. The dashboard shows every outstanding link so nothing is lost.",
      },
      {
        question: "Does SmilePass integrate with my practice management software?",
        answer:
          "SmilePass operates alongside your practice management software as a dedicated payments platform. Integrations with the most widely used Australian dental PMS systems are being rolled out progressively. In the meantime, the patient record in SmilePass is structured to match your PMS naming so transactional data is easy to reconcile.",
      },
    ],
  },

  cta: {
    eyebrow: "Stop chasing payments",
    heading: "Try pay-by-link on the next patient who leaves their card at home.",
    body:
      "Start free, send your first payment link today, and watch how fast 'I'll bring cash next week' becomes 'paid before they reach the car park'.",
    primaryCta: { label: "Get started free", href: "https://app.smilepass.com.au/pages/authentication/first-access" },
    secondaryCta: { label: "Talk to us", href: "/contact" },
  },
};

export const onlinePaymentsCanonical = CANONICAL;
