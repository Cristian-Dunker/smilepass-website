import type { Metadata } from "next";
import SolutionCategoryPageTemplate from "@/components/solutions/SolutionPageTemplate";
import {
  paymentPlansPageData,
  paymentPlansCanonical,
} from "@/data/solution-pages/payment-plans";

export const metadata: Metadata = {
  title: "In-House Dental Payment Plans Software | SmilePass",
  description:
    "Offer in-house payment plans to your dental patients without third-party finance. Customisable terms, automated billing, treatment-day deposits, no commission to credit providers. Built for Australian practices.",
  keywords: [
    "dental payment plans Australia",
    "in-house dental payment plan",
    "dental treatment financing",
    "dental practice payment plan software",
    "dental instalment plans",
    "alternative to dental Afterpay",
  ],
  alternates: { canonical: paymentPlansCanonical },
  openGraph: {
    title: "In-House Dental Payment Plans Software | SmilePass",
    description:
      "Get more patients to say yes to treatment with customisable in-house payment plans. Keep 100% of your fee, automate billing, eliminate no-shows.",
    url: paymentPlansCanonical,
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${paymentPlansCanonical}#faq`,
  mainEntity: paymentPlansPageData.faq?.items.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: { "@type": "Answer", text: q.answer },
  })) ?? [],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${paymentPlansCanonical}#service`,
  name: "Dental Payment Plan Software",
  serviceType: "In-house patient financing platform for dental practices",
  provider: { "@type": "Organization", name: "SmilePass", url: "https://smilepass.com.au" },
  areaServed: { "@type": "Country", name: "Australia" },
  description:
    "SmilePass enables Australian dental practices to offer in-house payment plans for high-value treatments without third-party lenders, automating billing, reminders, escrow deposits and reporting.",
  audience: { "@type": "Audience", audienceType: "Dental practices" },
  url: paymentPlansCanonical,
};

export default function PaymentPlansPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <SolutionCategoryPageTemplate data={paymentPlansPageData} />
    </>
  );
}
