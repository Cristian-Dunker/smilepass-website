"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import RequestDemoModal from "./RequestDemoModal";

/**
 * RequestDemoProvider — single source of open/close state for the
 * "Request a Demo" modal, mounted once in the root layout.
 *
 * Any client component can trigger the modal via `useRequestDemo().open()` —
 * Header CTA, hero CTA, mid-page CTAs, final CTA band all call the same hook
 * instead of carrying their own state.
 */
interface RequestDemoContextValue {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const RequestDemoContext = createContext<RequestDemoContextValue | null>(null);

export function RequestDemoProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<RequestDemoContextValue>(
    () => ({ open, close, isOpen }),
    [open, close, isOpen],
  );

  return (
    <RequestDemoContext.Provider value={value}>
      {children}
      <RequestDemoModal open={isOpen} onClose={close} />
    </RequestDemoContext.Provider>
  );
}

export function useRequestDemo(): RequestDemoContextValue {
  const ctx = useContext(RequestDemoContext);
  if (!ctx) {
    throw new Error(
      "useRequestDemo must be used inside <RequestDemoProvider>. Make sure the provider is mounted in the root layout.",
    );
  }
  return ctx;
}
