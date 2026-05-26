import type { Metadata } from "next";
import SolutionCategoryPageTemplate from "@/components/solutions/SolutionPageTemplate";
import {
  membershipPlansPageData,
  membershipPlansCanonical,
} from "@/data/solution-pages/membership-plans";

export const metadata: Metadata = {
  title: "Dental Membership Plans Software for Australian Practices",
  description:
    "SmilePass powers in-house dental membership plans for Australian practices. Build custom subscription plans, automate billing and renewals, replace insurance dependence, and grow predictable monthly revenue. Free to start.",
  keywords: [
    "dental membership plans Australia",
    "in-house dental membership plan software",
    "dental subscription plan platform",
    "dental practice membership program",
    "private dental membership",
    "in-house dental plan",
  ],
  alternates: { canonical: membershipPlansCanonical },
  openGraph: {
    title: "Dental Membership Plans Software | SmilePass",
    description:
      "Build, launch and grow your own in-house dental membership plan in weeks. Predictable monthly revenue, higher treatment acceptance, no insurance middleman.",
    url: membershipPlansCanonical,
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${membershipPlansCanonical}#faq`,
  mainEntity: membershipPlansPageData.faq?.items.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: { "@type": "Answer", text: q.answer },
  })) ?? [],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${membershipPlansCanonical}#service`,
  name: "Dental Membership Plan Software",
  serviceType: "Subscription billing software for dental practices",
  provider: { "@type": "Organization", name: "SmilePass", url: "https://smilepass.com.au" },
  areaServed: { "@type": "Country", name: "Australia" },
  description:
    "SmilePass enables dental practices in Australia to design, launch and operate their own in-house membership plans with automated recurring billing, family discounts, custom branding and full reporting.",
  audience: { "@type": "Audience", audienceType: "Dental practices" },
  url: membershipPlansCanonical,
};

export default function MembershipPlansPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <SolutionCategoryPageTemplate data={membershipPlansPageData} />
    </>
  );
}
