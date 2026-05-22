import Link from "next/link";
import Image from "next/image";
import { solutions } from "@/data/nav";

/**
 * "What is SmilePass?" — matches the section on the current site
 * (dashboard devices image left, eyebrow + heading + paragraphs + CTA right).
 *
 * Image: /uploads/2024/01/Mask-Group-2... downloaded as
 * `public/images/sections/smilepass-dashboard-devices.png`.
 */
export default function WhatIsSmilePass() {
  return (
    <section className="bg-paper py-20 lg:py-28 px-6 lg:px-10 relative overflow-hidden">
      {/* Decorative grid pattern behind everything */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--color-purple-deep) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Dashboard mockup */}
        <div className="lg:col-span-7 reveal">
          <div className="relative aspect-[1400/1045] w-full">
            <Image
              src="/images/sections/smilepass-dashboard-devices.png"
              alt="SmilePass dashboard preview on desktop and tablet"
              fill
              sizes="(max-width: 1024px) 90vw, 55vw"
              className="object-contain"
            />
          </div>
        </div>

        {/* Right: Copy */}
        <div className="lg:col-span-5">
          <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-brand-purple mb-4 reveal">
            What is SmilePass?
          </p>
          <h2
            className="text-purple-deep mb-6 reveal reveal-delay-1"
            style={{ fontWeight: 500, lineHeight: 1.08 }}
          >
            <em className="display-accent text-brand-purple">All-in-One</em> Dental Payments Software
          </h2>
          <div className="space-y-4 text-purple-deep/75 text-[0.96rem] leading-relaxed mb-8 reveal reveal-delay-2">
            <p>
              SmilePass is an integrated payment platform that empowers dentists to directly offer
              flexible payment services and plans to their patients in a simple and personalised
              way. We offer innovative tools designed to make dental care more accessible and
              cost-effective for patients while also boosting revenue and increasing case
              acceptance for dental practices.
            </p>
            <p>
              Our mission is to bridge the gap between patients and dentists, helping practices
              improve performance and providing patients with better access to care, fostering
              long-term relationships.
            </p>
          </div>
          <Link
            href={solutions[0].href}
            className="btn-primary text-[0.9rem] reveal reveal-delay-3"
          >
            Find out more
          </Link>
        </div>
      </div>
    </section>
  );
}
