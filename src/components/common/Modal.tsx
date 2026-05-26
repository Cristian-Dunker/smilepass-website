"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * Reusable modal primitive.
 *
 * Per CLAUDE.md work rules, every input-capture flow (request demo, contact,
 * confirmations) wraps this — do not build one-off popovers or drawers.
 *
 * Accessibility:
 *  - role="dialog" + aria-modal + aria-labelledby
 *  - Esc closes (handled at document level)
 *  - Backdrop click closes
 *  - Body scroll locked while open
 *  - Focus moves to the close button on open; previous focus is restored on close
 */
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Visible heading text — also wires aria-labelledby. */
  title: string;
  /** Optional subheading shown beneath the title. */
  subtitle?: string;
  children: React.ReactNode;
  /** Optional className for the panel — extend, do not replace, base styles. */
  panelClassName?: string;
}

export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  panelClassName = "",
}: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  // Latest-onClose ref so the open/close effect doesn't re-run (and tear down
  // focus / scroll lock) every time the parent re-renders with a new function
  // identity. That re-render storm was stealing focus from form fields on
  // every keystroke. Synced via effect (not during render) so the strict
  // react-hooks rule stays happy.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Esc-to-close + body scroll lock + focus management.
  // Dependencies are intentionally `[open]` only — see onCloseRef above.
  useEffect(() => {
    if (!open) return;

    lastFocusedRef.current = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Defer focus until after the portal mounts
    const timer = window.setTimeout(() => closeBtnRef.current?.focus(), 0);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
      lastFocusedRef.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-purple-deep/55 backdrop-blur-sm cursor-default"
      />

      {/* Panel */}
      <div
        className={`relative bg-paper rounded-2xl shadow-2xl w-full max-w-lg max-h-[calc(100vh-3rem)] overflow-y-auto ${panelClassName}`}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div>
            <h2
              id="modal-title"
              className="text-purple-deep text-[1.4rem] leading-tight"
              style={{ fontWeight: 500, letterSpacing: "-0.01em" }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1.5 text-[0.9rem] text-purple-deep/65 leading-snug">
                {subtitle}
              </p>
            )}
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex-shrink-0 w-9 h-9 -mr-1 -mt-1 rounded-full text-purple-deep/55 hover:text-purple-deep hover:bg-bone transition-colors flex items-center justify-center"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              className="w-4 h-4"
              aria-hidden
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="px-6 pb-6 pt-5">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
