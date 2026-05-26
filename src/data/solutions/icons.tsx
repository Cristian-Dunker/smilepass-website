import type { SVGProps } from "react";

/**
 * Inline SVG icons for each SmilePass solution.
 *
 * Stroke-based, weight 1.6, 24×24 base — match a modern fintech aesthetic.
 * Use as `<MembershipPlansIcon className="w-6 h-6" />`. Color inherits via `currentColor`.
 *
 * Keep this file in sync with `./index.tsx` — only export icons consumed by
 * a current solution entry (work rule #6: zero deadcode).
 */

type IconProps = SVGProps<SVGSVGElement>;

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function MembershipPlansIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x={3} y={5} width={18} height={16} rx={2} />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="M8 15h4" />
      <circle cx={16} cy={16} r={1.2} fill="currentColor" />
    </svg>
  );
}

export function PaymentPlansIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x={3} y={6} width={18} height={13} rx={2} />
      <path d="M3 11h18" />
      <path d="M7 16h3M13 16h4" />
    </svg>
  );
}

export function OnlinePaymentsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x={5} y={3} width={14} height={18} rx={2} />
      <path d="M10 18h4" />
      <path d="M9 7h6M9 10h6M9 13h3" />
    </svg>
  );
}

export function LoyaltyReferralIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.5-7 11-7 11z" />
      <path d="M12 8.5l1.2 2.4 2.6.4-1.9 1.8.5 2.6L12 14.5l-2.4 1.3.5-2.6-1.9-1.8 2.6-.4z" />
    </svg>
  );
}
