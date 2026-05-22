import Link from "next/link";
import Image from "next/image";
import {
  footerSections,
  socialLinks,
  ctaLinks,
  brandTagline,
} from "@/data/nav";
import NewsletterSignup from "@/components/forms/NewsletterSignup";

const currentYear = new Date().getFullYear();

/**
 * Site footer — matches `smilepass.com.au` structure 1:1.
 *
 * Layout (top to bottom):
 *   1. Logo PNG + "Dental payments made easy" tagline
 *   2. Two columns: About + Get In Touch
 *   3. Social row
 *   4. Bottom strip: "discover the benefits" left  /  "Log In / Sign Up" right
 *   5. Copyright (left) + Privacy/Terms (right)
 *
 * Background is light (bg-mist) so the primary-purple logo renders natively
 * without needing a white variant.
 */
export default function Footer() {
  return (
    <footer className="bg-mist text-ink border-t border-divider">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16">
        {/* Top block: logo + tagline */}
        <div className="mb-12">
          <Link href="/" aria-label="SmilePass home" className="inline-flex items-center mb-3">
            <Image
              src="/images/logos/smilepass-logo-primary-purple.png"
              alt="SmilePass"
              width={220}
              height={31}
              className="h-8 w-auto"
            />
          </Link>
          <p className="text-ink/70 text-[0.95rem]">{brandTagline}</p>
        </div>

        {/* 4 columns: About · Get In Touch · Follow · Subscribe */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-[0.7rem] uppercase tracking-[0.18em] text-brand-purple font-medium mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-ink/75 text-[0.93rem] hover:text-brand-purple transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Follow column */}
          <div>
            <h4 className="text-[0.7rem] uppercase tracking-[0.18em] text-brand-purple font-medium mb-4">
              Follow
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center text-ink/70 hover:text-brand-purple hover:border-brand-purple transition-colors"
                >
                  <SocialIcon name={social.label} />
                </a>
              ))}
            </div>
          </div>

          {/* Subscribe column */}
          <div>
            <h4 className="text-[0.7rem] uppercase tracking-[0.18em] text-brand-purple font-medium mb-4">
              Subscribe
            </h4>
            <p className="text-ink/70 text-[0.85rem] leading-snug mb-3">
              Subscribe for more information.
            </p>
            <NewsletterSignup variant="light" />
          </div>
        </div>

        {/* Bottom strip: discover benefits / Log In | Sign Up */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-6 border-t border-divider">
          <Link
            href="/benefits"
            className="text-[0.92rem] font-medium text-brand-purple hover:text-brand-purple-hover transition-colors"
          >
            discover the benefits →
          </Link>
          <div className="flex gap-3">
            <a
              href={ctaLinks.login}
              className="text-[0.92rem] font-medium text-ink/80 hover:text-brand-purple transition-colors"
            >
              Log In
            </a>
            <span className="text-ink/30">/</span>
            <a
              href={ctaLinks.getStarted}
              className="text-[0.92rem] font-medium text-ink/80 hover:text-brand-purple transition-colors"
            >
              Sign Up
            </a>
          </div>
        </div>

        {/* Copyright + Legal */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 pt-6 border-t border-divider text-[0.78rem] text-ink/55">
          <span>Copyright © SmilePass {currentYear}. All Rights Reserved.</span>
          <span className="flex gap-4">
            <Link href="/policies/privacy" className="hover:text-brand-purple transition-colors">
              Privacy Policy
            </Link>
            <Link href="/policies/terms" className="hover:text-brand-purple transition-colors">
              Terms of Use
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────── */

function SocialIcon({ name }: { name: string }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true as const,
  };

  switch (name) {
    case "Facebook":
      return (
        <svg {...common}>
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987H7.898V12h2.54V9.797c0-2.506 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.563V12h2.773l-.443 2.892h-2.33V21.879C18.343 21.128 22 16.991 22 12z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg {...common}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.585 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311 1.266-.058 1.646-.069 4.85-.069zM12 0C8.741 0 8.333.014 7.053.072 5.776.13 4.69.348 3.77 1.268c-.92.92-1.138 2.006-1.196 3.283C2.515 5.83 2.5 6.236 2.5 9.5v5c0 3.264.015 3.67.073 4.95.058 1.276.276 2.362 1.196 3.282.92.92 2.006 1.138 3.283 1.196 1.28.058 1.686.072 4.95.072s3.67-.014 4.95-.072c1.276-.058 2.362-.276 3.282-1.196.92-.92 1.138-2.006 1.196-3.283.058-1.28.072-1.686.072-4.95v-5c0-3.264-.014-3.67-.072-4.95-.058-1.276-.276-2.362-1.196-3.282-.92-.92-2.006-1.138-3.283-1.196C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case "X":
      return (
        <svg {...common}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg {...common}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg {...common}>
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    default:
      return null;
  }
}
