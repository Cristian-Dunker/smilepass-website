"use client";

import { useState, useEffect, useRef } from "react";

/**
 * "What Our Clients Say" — testimonials carousel.
 *
 * Current site uses placeholder copy with "Patient Name Here" attribution.
 * Until real testimonials land we render the same neutral placeholder so the
 * section keeps its shape on the page — captioned clearly as a TBD.
 */

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "SmilePass has truly transformed my dental care experience. As someone who couldn't afford my dental treatment, I had put off care for far too long. I couldn't be happier with the level of service and care I received through SmilePass. Highly recommend.",
    author: "[Patient name pending]",
    role: "Membership patient",
  },
  {
    quote:
      "Setting up the membership plan was simpler than we expected. Our recurring revenue is now predictable and the team has more time to focus on patients instead of chasing payments.",
    author: "[Practice owner name pending]",
    role: "Dental practice — Australia",
  },
  {
    quote:
      "Sending payment links by SMS removed our biggest collection headache. Patients pay faster and we no longer print or post paper invoices.",
    author: "[Practice manager name pending]",
    role: "Dental practice — Australia",
  },
];

export default function TestimonialsCarousel() {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIdx((prev) => (prev + 1) % testimonials.length);
    }, 6500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const current = testimonials[idx];

  return (
    <section className="bg-purple-deep text-paper py-20 lg:py-28 px-6 lg:px-10 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--color-brand-purple) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-6 reveal">
          What Our Clients Say
        </p>

        <div className="relative min-h-[10rem] reveal reveal-delay-1" key={idx}>
          <svg
            viewBox="0 0 36 28"
            className="w-9 h-7 text-brand-purple opacity-70 mx-auto mb-6"
            fill="currentColor"
            aria-hidden
          >
            <path d="M0 18.4C0 9.5 5.7 3 13.7 0l2.5 4.3c-4.7 2.5-7.2 5.6-7.4 9.3h7.4V28H0V18.4zm20 0C20 9.5 25.7 3 33.7 0l2.5 4.3c-4.7 2.5-7.2 5.6-7.4 9.3H36V28H20V18.4z" />
          </svg>
          <blockquote className="text-paper/95 text-[1.15rem] lg:text-[1.3rem] leading-[1.5] font-light max-w-3xl mx-auto">
            “{current.quote}”
          </blockquote>
          <p className="mt-7 text-[0.92rem] text-paper/80">
            <span className="font-medium text-paper">{current.author}</span>
            {current.role && <span className="text-paper/60"> · {current.role}</span>}
          </p>
        </div>

        {/* Dot navigation */}
        <div className="flex justify-center gap-2 mt-10 reveal reveal-delay-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? "w-8 bg-brand-purple" : "w-1.5 bg-paper/30 hover:bg-paper/50"
              }`}
            />
          ))}
        </div>

        <p className="mt-10 text-[0.75rem] text-paper/45 reveal reveal-delay-3">
          Placeholder testimonials — real customer quotes pending client sign-off.
        </p>
      </div>
    </section>
  );
}
