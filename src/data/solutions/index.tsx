import type { SolutionData } from "./types";
import {
  MembershipPlansIcon,
  PaymentPlansIcon,
  DentalLoansIcon,
  SavingsAccountIcon,
  OnlinePaymentsIcon,
  AccessSuperannuationIcon,
  CryptoPaymentsIcon,
  LoyaltyReferralIcon,
  CrowdfundingIcon,
} from "./icons";

/**
 * Registry of all SmilePass solutions.
 *
 * Order here matches the "All in One Place" tabs order on the current
 * `smilepass.com.au` home (Membership Plans → Payment Plans → Dental Loans
 * → Savings Account → Online Payments → Access Superannuation → Crypto
 * Payments → Loyalty & Referral → Crowdfunding).
 *
 * Copy is verbatim from the current site's solution cards.
 */
export const solutions: SolutionData[] = [
  {
    slug: "membership-plans",
    label: "Membership Plans",
    href: "/membership-plans",
    tagline: "Build, launch and grow your own in-house subscription membership.",
    headline: "Dental Membership Plans",
    description:
      "Easily build, launch and grow your own in-house subscription-based dental membership plan directly to patients. SmilePass puts your dental practice 100% in control of your membership program, while automating the time-consuming administrative tasks. Patients get better care. You get loyal patients that accept more treatment.",
    bullets: [
      "Full control of your membership program",
      "Increase patient loyalty and enhance patient care",
      "Offer a steady and predictable flow on income",
    ],
    imageAlt: "Dental Membership Plans interface preview",
    Icon: MembershipPlansIcon,
  },
  {
    slug: "payment-plans",
    label: "Payment Plans",
    href: "/payment-plans",
    tagline: "In-house customisable payment plans for treatments.",
    headline: "In-House Payment Plans",
    description:
      "Offer customisable payment plans to your patients, allowing them to spread the cost of their treatments over time. This leads to a marked improvement in patient satisfaction, as treatments become more affordable. Enhance loyalty and gain a robust tool to streamline and optimize your cash flow.",
    bullets: [
      "Increase treatment acceptance",
      "Full autonomy over payment schedule, terms and fees",
      "Automated billings and reminders",
    ],
    imageAlt: "In-House Payment Plans interface preview",
    Icon: PaymentPlansIcon,
  },
  {
    slug: "dental-loans",
    label: "Dental Loans",
    href: "/dental-loans",
    tagline: "Top-tier financing partners, one unified workflow.",
    headline: "Dental Loans",
    description:
      "We've consolidated in a single platform the top-tier financing companies specializing in dental treatments. This means more options meticulously crafted to fit your patients' distinct financial needs, simplified application procedures and faster approvals, and you gain unparalleled control and oversee all payment processes from one unified platform.",
    bullets: [
      "Offer a wider range of financing options",
      "Centralized Loan Management",
      "Streamline Patient Experience",
    ],
    imageAlt: "Dental Loans interface preview",
    Icon: DentalLoansIcon,
  },
  {
    slug: "dental-savings-account",
    label: "Savings Account",
    href: "/dental-savings-account",
    tagline: "Patients save monthly for treatment in your practice.",
    headline: "Dental Savings Account",
    description:
      "Allow your patients to set aside funds exclusively for their dental treatments in your practice. Patients can gradually contribute to their savings, ensuring they have the necessary funds for their treatment. This not only fosters a sense of commitment and planning among patients but also facilitates smoother transaction processes.",
    bullets: [
      "Encourage long-term patient commitment",
      "Streamlined Financial Management",
      "Reduce Payment Delays",
    ],
    imageAlt: "Dental Savings Account interface preview",
    Icon: SavingsAccountIcon,
  },
  {
    slug: "online-payments",
    label: "Online Payments",
    href: "/online-payments",
    tagline: "Secure card payments by link — no terminal, anywhere.",
    headline: "Online Payments",
    description:
      "Process card payments without a terminal, anywhere, anytime. Create and send a secure payment link to your patient's mobile phone or email address. They can pay right away from the privacy of their phone, no matter where they are.",
    bullets: [
      "Fast, flexible contact-free dental payments",
      "Eliminate manual payment processing and tracking",
      "Offer modern, hassle-free payment methods",
    ],
    imageAlt: "Online Payments interface preview",
    Icon: OnlinePaymentsIcon,
  },
  {
    slug: "access-superannuation",
    label: "Access Superannuation",
    href: "/access-superannuation",
    tagline: "Help patients apply for early superannuation release.",
    headline: "Access Superannuation",
    description:
      "We help your patients to apply for the Early Release of their Superannuation to pay for their own or eligible family member's dental procedure. With our support, your practice can track the solicitations in real-time, ensuring transparency and effective management.",
    bullets: [
      "Enhance Treatment Accessibility",
      "Real-time tracking of superannuation requests",
      "Simplify Administrative Tasks",
    ],
    imageAlt: "Access Superannuation interface preview",
    Icon: AccessSuperannuationIcon,
  },
  {
    slug: "crypto-payments",
    label: "Crypto Payments",
    href: "/crypto-payments",
    tagline: "Accept cryptocurrency, settled instantly in AUD.",
    headline: "Crypto Payments",
    description:
      "Our platform enables your practice to accept cryptocurrency as a form of payment, catering to the evolving preferences of modern patients. All it requires is a simple step: send a payment link to your patient. Once they finalise the transaction, we instantly convert to AUD, at no additional fee.",
    bullets: [
      "Cater to a growing demographic of crypto users",
      "Immediate conversion to AUD without additional fees",
      "Enhance Financial Flexibility",
    ],
    imageAlt: "Crypto Payments interface preview",
    Icon: CryptoPaymentsIcon,
  },
  {
    slug: "loyalty-referral-programs",
    label: "Loyalty & Referral",
    href: "/loyalty-referral-programs",
    tagline: "Reward loyalty and incentivise patient referrals.",
    headline: "Loyalty & Referral Programs",
    description:
      "Reward your patients' commitment to your practice and incentivise them to introduce new patients to you. Our platform allows you to effortlessly track and manage the points, rewards, and referrals in real-time. By elevating patient experiences and promoting further positive engagement, you set the stage for sustained organic growth.",
    bullets: [
      "Enhance loyalty through tangible rewards",
      "Drive Organic Growth and Brand Advocacy",
      "Deepen Patient Engagement",
    ],
    imageAlt: "Loyalty & Referral Programs interface preview",
    Icon: LoyaltyReferralIcon,
  },
  {
    slug: "crowdfunding",
    label: "Crowdfunding",
    href: "/crowdfunding",
    tagline: "Enable crowdfunding campaigns for major treatments.",
    headline: "Crowdfunding",
    description:
      "Empower your patients and local entities to initiate crowdfunding campaigns for crucial dental treatments within your practice. Your practice can monitor crowdfunding campaigns in real-time, ensuring full transparency and streamlined management. Gain exposure through shared campaigns while providing an avenue for patients to overcome financial barriers.",
    bullets: [
      "Expand Treatment Accessibility",
      "Foster community engagement and support",
      "Enhance Practice Visibility",
    ],
    imageAlt: "Crowdfunding interface preview",
    Icon: CrowdfundingIcon,
  },
];

export type { SolutionData } from "./types";
