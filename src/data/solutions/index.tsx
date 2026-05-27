import type { SolutionData } from "./types";
import {
  MembershipPlansIcon,
  PaymentPlansIcon,
  OnlinePaymentsIcon,
} from "./icons";

/**
 * Registry of SmilePass solutions surfaced in primary nav (Solutions
 * dropdown), the home "All in One Place" tabs, and the home #solutions
 * section the breadcrumb level points at.
 *
 * The legacy production site listed 9 products. The current IA collapses
 * them into 3 real hub pages — `/membership-plans`, `/payment-plans`,
 * `/online-payments` — and `next.config.ts` 301s the other 6 legacy slugs
 * into the closest of these three. Each entry's `href` is its own hub page.
 * Adding a solution to this array makes it appear in every consumer
 * simultaneously — see CLAUDE.md "Adding a new solution".
 *
 * Copy is verbatim from the current site's solution cards.
 */
export const solutions: SolutionData[] = [
  {
    slug: "membership-plans",
    label: "Membership Plans",
    href: "/solutions/membership-plans",
    tagline: "Build, launch and grow your own in-house subscription membership.",
    headline: "Dental Membership Plans",
    description:
      "Easily build, launch and grow your own in-house subscription-based dental membership plan directly to patients. SmilePass puts your dental practice 100% in control of your membership program, while automating the time-consuming administrative tasks. Patients get better care. You get loyal patients that accept more treatment.",
    bullets: [
      "Full control of your membership program",
      "Increase patient loyalty and enhance patient care",
      "Offer a steady and predictable flow on income",
    ],
    imageAlt: "Dentist and patient smiling — Dental Membership Plans",
    imageSrc: "/images/solutions/membership-plans.png",
    Icon: MembershipPlansIcon,
  },
  {
    slug: "payment-plans",
    label: "Payment Plans",
    href: "/solutions/payment-plans",
    tagline: "In-house customisable payment plans for treatments.",
    headline: "In-House Payment Plans",
    description:
      "Offer customisable payment plans to your patients, allowing them to spread the cost of their treatments over time. This leads to a marked improvement in patient satisfaction, as treatments become more affordable. Enhance loyalty and gain a robust tool to streamline and optimize your cash flow.",
    bullets: [
      "Increase treatment acceptance",
      "Full autonomy over payment schedule, terms and fees",
      "Automated billings and reminders",
    ],
    imageAlt: "In-House Payment Plans — spread the cost of treatment",
    imageSrc: "/images/solutions/payment-plans.png",
    Icon: PaymentPlansIcon,
  },
  {
    slug: "online-payments",
    label: "Online Payments",
    href: "/solutions/online-payments",
    tagline: "Secure card payments by link — no terminal, anywhere.",
    headline: "Online Payments",
    description:
      "Process card payments without a terminal, anywhere, anytime. Create and send a secure payment link to your patient's mobile phone or email address. They can pay right away from the privacy of their phone, no matter where they are.",
    bullets: [
      "Fast, flexible contact-free dental payments",
      "Eliminate manual payment processing and tracking",
      "Offer modern, hassle-free payment methods",
    ],
    imageAlt: "Online Payments — secure card payments by link",
    imageSrc: "/images/solutions/online-payments.png",
    Icon: OnlinePaymentsIcon,
  },
];

export type { SolutionData } from "./types";
