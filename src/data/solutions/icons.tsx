import type { SVGProps } from "react";

/**
 * Inline SVG icons for each SmilePass solution.
 *
 * Stroke-based, weight 1.6, 24×24 base — match a modern fintech aesthetic.
 * Use as `<MembershipPlansIcon className="w-6 h-6" />`. Color inherits via `currentColor`.
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

export function DentalLoansIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 21h18" />
      <path d="M5 21V10l7-5 7 5v11" />
      <path d="M9 21v-6h6v6" />
    </svg>
  );
}

export function SavingsAccountIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M19 11c0-3.5-3.1-6-7-6S5 7.5 5 11c0 1.3.4 2.4 1.2 3.4L5 18l3.5-1.2A8.6 8.6 0 0 0 12 17c3.9 0 7-2.5 7-6Z" />
      <circle cx={15.5} cy={10.5} r={0.8} fill="currentColor" />
      <path d="M19 13l2 .5" />
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

export function AccessSuperannuationIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x={4} y={8} width={16} height={12} rx={2} />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" />
      <circle cx={12} cy={14} r={1.2} fill="currentColor" />
      <path d="M12 15v2" />
    </svg>
  );
}

export function CryptoPaymentsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx={12} cy={12} r={9} />
      <path d="M9.5 8h4.2a2.4 2.4 0 0 1 0 4.8H9.5z" />
      <path d="M9.5 12.8h4.6a2.4 2.4 0 0 1 0 4.8H9.5z" />
      <path d="M11 6.4V8M11 16v1.6M13 6.4V8M13 16v1.6" />
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

export function CrowdfundingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx={7} cy={9} r={3} />
      <circle cx={17} cy={9} r={3} />
      <circle cx={12} cy={15} r={3} />
      <path d="M9.5 11.5L11 13M14.5 11.5L13 13" />
    </svg>
  );
}
