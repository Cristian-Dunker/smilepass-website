import Link from "next/link";
import Image from "next/image";
import FAQAccordion, { type FAQItem } from "@/components/common/FAQAccordion";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/common/Breadcrumbs";

/* ─────────────────────────── Types ─────────────────────────── */

export interface SolutionHero {
  eyebrow: string;
  title: string;
  /** Optional italic-display accent rendered after the title on its own line. */
  titleAccent?: string;
  subtitle?: string;
  body: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  breadcrumb?: BreadcrumbItem[];
  /** Optional supporting image; falls back to clean type-only hero when omitted. */
  image?: { src: string; alt: string };
}

export interface SubProduct {
  id: string;
  title: string;
  tagline: string;
  body: string;
  bullets?: string[];
  /** Optional secondary link, e.g. "Learn more" deep link. */
  cta?: { label: string; href: string };
  /** Inline SVG node — keeps zero icon-lib deps. */
  icon: React.ReactNode;
}

export interface HowItWorksStep {
  num: string;
  title: string;
  body: string;
}

export interface CategoryBenefit {
  title: string;
  body: string;
  icon?: React.ReactNode;
}

export interface IntegrationLogo {
  name: string;
  src: string;
  width?: number;
  height?: number;
}

export interface FinalCta {
  eyebrow?: string;
  heading: string;
  body?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export interface SolutionCategoryData {
  hero: SolutionHero;
  subProducts: SubProduct[];
  howItWorks?: { heading: string; subheading?: string; steps: HowItWorksStep[] };
  benefits?: { heading: string; subheading?: string; items: CategoryBenefit[] };
  integrations?: { heading: string; logos: IntegrationLogo[] };
  faq?: { heading?: string; items: FAQItem[] };
  cta: FinalCta;
}

/* ─────────────────────────── Component ─────────────────────────── */

export default function SolutionCategoryPageTemplate({ data }: { data: SolutionCategoryData }) {
  return (
    <>
      <Hero hero={data.hero} />
      <SubProductsSection subProducts={data.subProducts} />
      {data.howItWorks && <HowItWorksSection {...data.howItWorks} />}
      {data.benefits && <BenefitsSection {...data.benefits} />}
      {data.integrations && <IntegrationsSection {...data.integrations} />}
      {data.faq && <FaqSection {...data.faq} />}
      <CtaBand cta={data.cta} />
    </>
  );
}

/* ─────────────────────────── Sections ─────────────────────────── */

function Hero({ hero }: { hero: SolutionHero }) {
  return (
    <section className="relative bg-paper pt-[100px] lg:pt-[120px] pb-20 lg:pb-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {hero.breadcrumb && hero.breadcrumb.length > 0 && (
          <div className="mb-8">
            <Breadcrumbs items={hero.breadcrumb} variant="light" />
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <p className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-brand-purple mb-5 reveal">
              {hero.eyebrow}
            </p>
            <h1
              className="text-ink mb-6 reveal reveal-delay-1"
              style={{ fontWeight: 400 }}
            >
              {hero.title}
              {hero.titleAccent && (
                <>
                  <br />
                  <em className="display-accent text-brand-purple">{hero.titleAccent}</em>
                </>
              )}
            </h1>
            {hero.subtitle && (
              <p className="text-lg lg:text-xl text-ink/75 leading-relaxed mb-5 max-w-2xl reveal reveal-delay-2">
                {hero.subtitle}
              </p>
            )}
            <p className="text-[0.98rem] text-ink/70 leading-relaxed mb-8 max-w-2xl reveal reveal-delay-3">
              {hero.body}
            </p>
            <div className="flex flex-wrap gap-3 reveal reveal-delay-4">
              <Link href={hero.primaryCta.href} className="btn-primary">
                {hero.primaryCta.label}
              </Link>
              {hero.secondaryCta && (
                <Link href={hero.secondaryCta.href} className="btn-secondary">
                  {hero.secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
          {hero.image && (
            <div className="lg:col-span-5 reveal reveal-delay-2">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-bone">
                <Image
                  src={hero.image.src}
                  alt={hero.image.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SubProductsSection({ subProducts }: { subProducts: SubProduct[] }) {
  return (
    <section className="bg-bone py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14 reveal">
          <p className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-brand-purple mb-4">
            What’s included
          </p>
          <h2 className="text-ink" style={{ fontWeight: 500 }}>
            Tools in this category
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {subProducts.map((sp, i) => (
            <article
              key={sp.id}
              id={sp.id}
              className={`group bg-paper rounded-2xl p-8 lg:p-10 reveal reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-purple/8 text-brand-purple flex items-center justify-center mb-5">
                {sp.icon}
              </div>
              <p className="text-[0.7rem] font-medium tracking-[0.15em] uppercase text-brand-purple mb-3">
                {sp.tagline}
              </p>
              <h3 className="text-ink mb-3" style={{ fontWeight: 500 }}>
                {sp.title}
              </h3>
              <p className="text-ink/70 text-[0.95rem] leading-relaxed mb-5">
                {sp.body}
              </p>
              {sp.bullets && sp.bullets.length > 0 && (
                <ul className="space-y-2 mb-6">
                  {sp.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[0.9rem] text-ink/80">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-purple flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {sp.cta && (
                <Link
                  href={sp.cta.href}
                  className="inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-brand-purple hover:text-brand-purple transition-colors"
                >
                  {sp.cta.label}
                  <ArrowRight />
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection({
  heading,
  subheading,
  steps,
}: {
  heading: string;
  subheading?: string;
  steps: HowItWorksStep[];
}) {
  return (
    <section className="bg-paper py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14 reveal">
          <p className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-brand-purple mb-4">
            How it works
          </p>
          <h2 className="text-ink" style={{ fontWeight: 500 }}>
            {heading}
          </h2>
          {subheading && (
            <p className="text-ink/70 text-lg mt-5 leading-relaxed">{subheading}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`relative bg-bone rounded-2xl p-7 reveal reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <div className="font-mono text-[0.72rem] text-brand-purple/70 tracking-widest mb-3">
                {step.num}
              </div>
              <h3 className="text-ink mb-3 text-[1.15rem]" style={{ fontWeight: 500 }}>
                {step.title}
              </h3>
              <p className="text-ink/70 text-[0.92rem] leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection({
  heading,
  subheading,
  items,
}: {
  heading: string;
  subheading?: string;
  items: CategoryBenefit[];
}) {
  return (
    <section className="bg-ink text-paper py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14 reveal">
          <p className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-brand-purple mb-4">
            Why practices choose this
          </p>
          <h2 className="text-paper" style={{ fontWeight: 500 }}>
            {heading}
          </h2>
          {subheading && (
            <p className="text-paper/70 text-lg mt-5 leading-relaxed">{subheading}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}>
              {item.icon && (
                <div className="w-10 h-10 text-brand-purple mb-4">{item.icon}</div>
              )}
              <h3 className="text-paper mb-3 text-[1.15rem]" style={{ fontWeight: 500 }}>
                {item.title}
              </h3>
              <p className="text-paper/70 text-[0.93rem] leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntegrationsSection({
  heading,
  logos,
}: {
  heading: string;
  logos: IntegrationLogo[];
}) {
  return (
    <section className="bg-paper py-16 lg:py-20 px-6 lg:px-10 border-t border-ink/8">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-[0.7rem] font-medium tracking-[0.18em] uppercase text-brand-purple mb-10 reveal">
          {heading}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map((logo, i) => (
            <div
              key={logo.name}
              className={`opacity-60 hover:opacity-100 transition-opacity reveal reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width ?? 120}
                height={logo.height ?? 36}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ heading, items }: { heading?: string; items: FAQItem[] }) {
  return (
    <section className="bg-paper py-20 lg:py-28 px-6 lg:px-10 border-t border-ink/8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 reveal">
          <p className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-brand-purple mb-4">
            Frequently asked
          </p>
          <h2 className="text-ink" style={{ fontWeight: 500 }}>
            {heading ?? "Common questions"}
          </h2>
        </div>
        <FAQAccordion items={items} variant="light" columns={2} />
      </div>
    </section>
  );
}

function CtaBand({ cta }: { cta: FinalCta }) {
  return (
    <section className="bg-brand-purple text-paper py-20 lg:py-24 px-6 lg:px-10">
      <div className="max-w-4xl mx-auto text-center">
        {cta.eyebrow && (
          <p className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-brand-purple mb-4 reveal">
            {cta.eyebrow}
          </p>
        )}
        <h2 className="text-paper mb-5 reveal reveal-delay-1" style={{ fontWeight: 500 }}>
          {cta.heading}
        </h2>
        {cta.body && (
          <p className="text-paper/80 text-lg leading-relaxed mb-8 max-w-2xl mx-auto reveal reveal-delay-2">
            {cta.body}
          </p>
        )}
        <div className="flex flex-wrap gap-3 justify-center reveal reveal-delay-3">
          <Link
            href={cta.primaryCta.href}
            className="inline-flex items-center justify-center gap-2 bg-brand-purple text-paper rounded-[10px] px-6 py-3 font-medium text-[0.95rem] hover:bg-brand-purple-hover transition-colors"
          >
            {cta.primaryCta.label}
          </Link>
          {cta.secondaryCta && (
            <Link
              href={cta.secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 bg-transparent border border-paper/40 text-paper rounded-[10px] px-6 py-3 font-medium text-[0.95rem] hover:bg-paper/10 transition-colors"
            >
              {cta.secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Helpers ─────────────────────────── */

function ArrowRight() {
  return (
    <svg viewBox="0 0 14 12" fill="none" className="w-3.5 h-3" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M1 6h12m0 0L8 1m5 5L8 11" />
    </svg>
  );
}
