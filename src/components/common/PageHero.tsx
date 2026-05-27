import type { ReactNode } from "react";

interface Props {
  eyebrow: string;
  /** Heading content — pass the `<em className="display-accent">` accent inline. */
  title: ReactNode;
  description: ReactNode;
  /** `left` (default) for index/landing pages, `center` for pricing-style heroes. */
  align?: "left" | "center";
}

/**
 * Standard top-of-page hero band: eyebrow + display heading + lead paragraph
 * on the `mist` background, with the staggered `.reveal` entrance. Shared by
 * the strategy/wiki index pages and the pricing page. Pages with a different
 * hero shape (e.g. the split form layout on /contact) compose their own.
 */
export default function PageHero({ eyebrow, title, description, align = "left" }: Props) {
  const centered = align === "center";
  return (
    <section className="bg-mist pt-[110px] lg:pt-[130px] pb-12 lg:pb-16 px-6 lg:px-10">
      <div className={`mx-auto ${centered ? "max-w-4xl text-center" : "max-w-5xl"}`}>
        <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-5 reveal">
          {eyebrow}
        </p>
        <h1
          className="text-purple-deep mb-5 reveal reveal-delay-1"
          style={{ fontWeight: 400, lineHeight: 1.05 }}
        >
          {title}
        </h1>
        <p
          className={`text-[1.05rem] lg:text-[1.1rem] text-purple-deep/75 leading-relaxed reveal reveal-delay-2 ${
            centered ? "max-w-2xl mx-auto" : "max-w-3xl"
          }`}
        >
          {description}
        </p>
      </div>
    </section>
  );
}
