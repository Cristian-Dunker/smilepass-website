import Link from "next/link";
import Image from "next/image";
import { solutions, ctaLinks } from "@/data/nav";
import RequestDemoButton from "@/components/forms/RequestDemoButton";

/**
 * Home hero — matches `smilepass.com.au` hero block.
 *
 * Layout: left text column (eyebrow + tagline + body + dual primary CTAs)
 *         right illustration (downloaded from prod /uploads/2024/04/Untitled-700-x-831.png)
 *         below: horizontal scrollable chip list of solutions (count comes
 *         from the registry — keep the eyebrow copy in sync).
 *
 * CTA hierarchy (per user feedback):
 *   - `Get started free` → `btn-primary` (solid brand-purple, primary path — self-serve signup)
 *   - `Get in touch`     → `btn-outline-purple` (soft secondary — opens contact modal for people who want a hand)
 */
export default function HomeHero() {
  return (
    <section className="relative bg-paper overflow-hidden pt-[110px] lg:pt-[130px] pb-16 lg:pb-24 px-6 lg:px-10">
      {/* Subtle purple-tinted radial wash in the corner */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[40rem] h-[40rem] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--color-brand-purple) 0%, transparent 60%)",
          opacity: 0.08,
        }}
      />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left: Copy */}
        <div className="lg:col-span-7">
          <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-5 reveal">
            Dental Payments, Elevated:
          </p>
          <h1
            className="text-purple-deep mb-6 reveal reveal-delay-1"
            style={{ fontWeight: 400, lineHeight: 1.05 }}
          >
            The Premier Choice for{" "}
            <em className="display-accent text-brand-purple">Growing Practices.</em>
          </h1>
          <p className="text-lg lg:text-xl text-purple-deep/75 leading-relaxed max-w-2xl mb-9 reveal reveal-delay-2">
            Advanced payment solutions designed to boost treatment acceptance, tailored to scale
            with your evolving practice.
          </p>
          <div className="flex flex-wrap gap-3 reveal reveal-delay-3">
            <a href={ctaLinks.getStarted} className="btn-primary text-[0.95rem]">
              Get started free
            </a>
            <RequestDemoButton className="btn-outline-purple text-[0.95rem]" />
          </div>
          <p className="mt-5 text-[0.82rem] text-purple-deep/55 reveal reveal-delay-4">
            No credit card required · Built for Australian dental practices
          </p>
        </div>

        {/* Right: Illustration */}
        <div className="lg:col-span-5 reveal reveal-delay-2">
          <div className="relative aspect-square w-full max-w-[520px] mx-auto">
            <Image
              src="/images/hero/smilepass-hero-illustration.png"
              alt="SmilePass — dental payments illustration"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Solution chips strip — centered block */}
      <div className="relative max-w-7xl mx-auto mt-12 lg:mt-16 pt-8 border-t border-divider reveal reveal-delay-4">
        <p className="text-center text-[0.7rem] font-medium tracking-[0.16em] uppercase text-purple-deep/55 mb-4">
          All-in-one platform · {solutions.length} solutions
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {solutions.map((sol) => (
            <Link
              key={sol.slug}
              href={sol.href}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-bone hover:bg-brand-purple/10 text-purple-deep/80 hover:text-brand-purple rounded-full text-[0.82rem] font-medium transition-colors"
            >
              <sol.Icon className="w-3.5 h-3.5" />
              {sol.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
