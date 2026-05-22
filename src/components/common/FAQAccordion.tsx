"use client";

import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  columns?: 1 | 2;
  /** "dark" renders on dark backgrounds (bg-ink); "light" renders on paper. */
  variant?: "dark" | "light";
}

function FAQColumn({ items, variant }: { items: FAQItem[]; variant: "dark" | "light" }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const borderClass = variant === "dark" ? "border-clay/15" : "border-ink/10";
  const questionColor = variant === "dark" ? "text-paper" : "text-ink";
  const answerColor = variant === "dark" ? "text-clay" : "text-ink/70";
  const iconColor = variant === "dark" ? "text-brand-purple" : "text-brand-purple";

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className={`border-b ${borderClass}`}>
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-start justify-between gap-6 py-6 text-left group"
              aria-expanded={isOpen}
            >
              <span
                className={`font-heading text-[0.95rem] leading-snug ${questionColor}`}
                style={{ fontWeight: 500, letterSpacing: "-0.01em" }}
              >
                {item.question}
              </span>
              {/* Plus / Minus icon — fades between states */}
              <span className={`flex-shrink-0 w-5 h-5 mt-0.5 relative ${iconColor}`}>
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="absolute inset-0 w-full h-full transition-opacity duration-200"
                  style={{ opacity: isOpen ? 0 : 1 }}
                >
                  <path strokeLinecap="round" d="M10 4v12M4 10h12" />
                </svg>
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="absolute inset-0 w-full h-full transition-opacity duration-200"
                  style={{ opacity: isOpen ? 1 : 0 }}
                >
                  <path strokeLinecap="round" d="M4 10h12" />
                </svg>
              </span>
            </button>

            <div
              className="grid transition-all duration-300 ease-in-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className={`text-[0.9rem] leading-[1.8] pb-6 ${answerColor}`}>
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function FAQAccordion({ items, columns = 2, variant = "light" }: FAQAccordionProps) {
  if (columns === 1) {
    return (
      <div className="grid grid-cols-1 gap-y-0 max-w-3xl">
        <FAQColumn items={items} variant={variant} />
      </div>
    );
  }

  const leftItems = items.filter((_, i) => i % 2 === 0);
  const rightItems = items.filter((_, i) => i % 2 === 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-0">
      <FAQColumn items={leftItems} variant={variant} />
      <FAQColumn items={rightItems} variant={variant} />
    </div>
  );
}
