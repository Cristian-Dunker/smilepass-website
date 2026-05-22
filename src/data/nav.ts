/**
 * Navigation source-of-truth for header + footer.
 *
 * Solutions are sourced from `@/data/solutions` (single source of truth per
 * work rule "utility covers union"). Nav-specific data (primary menu, footer
 * sections, social links, contact, CTA targets, brand tagline) stays here.
 */

import { solutions } from "@/data/solutions";
import type { SolutionData } from "@/data/solutions";

export { solutions };
export type { SolutionData };

export interface PrimaryNavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

/** Top-nav items — matches current site exactly (Solutions ▾ · Pricing · Contact). */
export const primaryNav: PrimaryNavItem[] = [
  { label: "Solutions", href: solutions[0].href, hasDropdown: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export const externalAppUrl = "https://app.smilepass.com.au/pages/authentication/login-v2";

export const ctaLinks = {
  login: externalAppUrl,
  requestDemo: "/request-demo",
  getStarted: "https://app.smilepass.com.au/pages/authentication/first-access",
};

/** Footer columns — match current site (About + Get In Touch). */
export const footerSections = [
  {
    title: "About",
    items: [
      { label: "Benefits", href: "/benefits" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Patients", href: "/patients" },
    ],
  },
  {
    title: "Get In Touch",
    items: [
      { label: "Contact", href: "/contact" },
      { label: "Become a SmilePass Dentist", href: "/request-demo" },
    ],
  },
];

export const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/smilepass" },
  { label: "Instagram", href: "https://instagram.com/smilepass" },
  { label: "X", href: "https://x.com/smilepass" },
  { label: "LinkedIn", href: "https://linkedin.com/company/smilepass" },
  { label: "YouTube", href: "https://youtube.com/@smilepass" },
];

export const contactInfo = {
  phone: "1300 426 391",
  email: "enquiries@smilepass.com.au",
  supportEmail: "contact@smilepass.com.au",
};

/** Tagline beneath the logo in the footer — verbatim from current site. */
export const brandTagline = "Dental payments made easy";
