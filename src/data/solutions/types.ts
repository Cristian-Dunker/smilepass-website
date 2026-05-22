import type { ComponentType, SVGProps } from "react";

/**
 * Single-source-of-truth shape for every SmilePass solution.
 *
 * Consumed by:
 *   - Header dropdown + footer dropdown (label, slug, tagline)
 *   - Home "All in One Place" tabs (description, bullets, Icon, image)
 *   - Individual solution pages (everything above + future fields)
 *
 * Per work rule: utility covers UNION of caller needs — keep all fields
 * here even when only some surfaces use them.
 */
export interface SolutionData {
  /** URL-safe slug (matches WP slug where possible). */
  slug: string;
  /** Display label, exact wording from current site. */
  label: string;
  /** Full path including leading slash. */
  href: string;
  /** One-line tagline for nav dropdowns and grid cards. */
  tagline: string;
  /** Headline used on the solution's tab + own page hero. */
  headline: string;
  /** Paragraph description (verbatim from current site "All in One Place"). */
  description: string;
  /** Three bullet points (matches current site card structure). */
  bullets: [string, string, string];
  /** Alt text for the per-solution illustrative image. */
  imageAlt: string;
  /** Optional image path under public/. When omitted the tabs render a placeholder. */
  imageSrc?: string;
  /** Inline SVG icon component. */
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}
