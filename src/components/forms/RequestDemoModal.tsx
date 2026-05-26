"use client";

import { useState } from "react";
import Modal from "@/components/common/Modal";
import RequestDemoForm from "./RequestDemoForm";

interface RequestDemoModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Modal wrapper around the shared RequestDemoForm.
 *
 * Owns only the modal-specific concerns:
 *   - toggling between form view and a confirmation panel
 *   - resetting form internal state on close (via a remount key)
 *
 * The form itself (fields, validation, submit, Notion wiring) lives in
 * RequestDemoForm so it can be reused inline on the /contact page.
 */
export default function RequestDemoModal({ open, onClose }: RequestDemoModalProps) {
  const [submitted, setSubmitted] = useState(false);
  // Remount key — bumps on close so the next open starts from a clean form
  // without bleeding stale field state from the previous attempt.
  const [resetKey, setResetKey] = useState(0);

  function handleClose() {
    setSubmitted(false);
    setResetKey((k) => k + 1);
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={submitted ? "Message received" : "Get in touch"}
      subtitle={
        submitted
          ? "Thanks — someone from the SmilePass team will be in touch shortly."
          : "Have a question, or want a hand getting set up? Drop us a message and the SmilePass team will get back to you. Prefer to dive in solo — start free at app.smilepass.com.au."
      }
    >
      <RequestDemoForm
        key={resetKey}
        onCancel={handleClose}
        onSuccess={() => setSubmitted(true)}
        renderSuccess={() => (
          <div className="flex flex-col gap-4">
            <p className="text-[0.95rem] text-purple-deep/80 leading-relaxed">
              A SmilePass team member will reach out using the email you provided.
              In the meantime, feel free to explore the platform — you can also{" "}
              <a
                href="https://app.smilepass.com.au/pages/authentication/first-access"
                className="text-brand-purple font-semibold hover:text-brand-purple-hover"
              >
                get started free
              </a>{" "}
              today.
            </p>
            <button type="button" onClick={handleClose} className="btn-primary self-start">
              Close
            </button>
          </div>
        )}
      />
    </Modal>
  );
}
