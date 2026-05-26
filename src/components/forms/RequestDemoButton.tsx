"use client";

import { useRequestDemo } from "./RequestDemoProvider";

/**
 * Drop-in CTA that opens the shared contact modal via the provider context.
 * Keeps the host free to stay a Server Component when it has no other
 * client state.
 *
 * Default label is "Get in touch" — SmilePass's strategy is self-serve
 * signup first (`ctaLinks.getStarted`), with this softer secondary path
 * for people who want a human. Component name kept as RequestDemoButton
 * internally so existing callers don't need to be touched.
 */
interface RequestDemoButtonProps {
  className?: string;
  children?: React.ReactNode;
  /** Default label if no children passed. */
  label?: string;
  /** Optional onClick that fires before the modal opens (analytics, menu close, …). */
  onClick?: () => void;
}

export default function RequestDemoButton({
  className,
  children,
  label = "Get in touch",
  onClick,
}: RequestDemoButtonProps) {
  const { open } = useRequestDemo();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        open();
      }}
      className={className}
    >
      {children ?? label}
    </button>
  );
}
