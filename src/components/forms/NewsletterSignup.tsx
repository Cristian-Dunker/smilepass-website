"use client";

import { useState } from "react";

interface NewsletterSignupProps {
  variant?: "light" | "dark";
}

/**
 * Newsletter signup inline form.
 *
 * Phase 1: Captures email in local state; submit is stubbed (logs to console).
 * Phase 2: Wire to a Server Action (`@/app/actions/subscribe-newsletter`)
 *          that calls Resend Audiences.
 */
export default function NewsletterSignup({ variant = "light" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const isDark = variant === "dark";

  const inputClass = isDark
    ? "bg-paper/8 border-paper/20 text-paper placeholder:text-paper/40 focus:border-brand-purple focus:bg-paper/12"
    : "bg-paper border-ink/15 text-ink placeholder:text-ink/40 focus:border-brand-purple";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Email is required.");
      return;
    }
    // Loose client-side check; real validation is server-side (Zod).
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email.");
      return;
    }

    setStatus("submitting");
    try {
      // TODO(phase-2): replace with `await subscribeNewsletter({ email: trimmed })`
      await new Promise((resolve) => setTimeout(resolve, 600));
      console.log("[newsletter.stub] would subscribe:", trimmed);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className={`text-[0.9rem] ${isDark ? "text-brand-purple" : "text-brand-purple"}`}>
        Thanks — you’re on the list.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@clinic.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "submitting"}
          className={`flex-1 min-w-0 rounded-md px-3 py-2.5 text-[0.92rem] border outline-none transition-colors ${inputClass}`}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary text-[0.85rem] px-4 py-2.5 whitespace-nowrap"
        >
          {status === "submitting" ? "..." : "Subscribe"}
        </button>
      </div>
      {error && (
        <p className={`text-[0.78rem] ${isDark ? "text-brand-purple" : "text-brand-purple"}`}>
          {error}
        </p>
      )}
    </form>
  );
}
