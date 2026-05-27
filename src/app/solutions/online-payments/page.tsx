import type { Metadata } from "next";
import SolutionPageTemplate from "@/components/solutions/SolutionPageTemplate";
import {
  onlinePaymentsPageData,
  onlinePaymentsCanonical,
} from "@/data/solution-pages/online-payments";

export const metadata: Metadata = {
  title: "Online Dental Payments by Link | Pay-by-Link for Dentists",
  description:
    "Take secure online card payments by SMS or email link. No EFTPOS terminal needed. Apple Pay + Google Pay supported. Settle next business day. Built for Australian dental practices.",
  keywords: [
    "online dental payments",
    "pay by link dentist",
    "dental payment link Australia",
    "online card payments for dentists",
    "dental pay by SMS",
    "contactless dental payments",
  ],
  alternates: { canonical: onlinePaymentsCanonical },
  openGraph: {
    title: "Online Dental Payments by Link | SmilePass",
    description:
      "Send patients a secure payment link by SMS or email. No terminal, no app, no friction. Apple Pay + Google Pay supported.",
    url: onlinePaymentsCanonical,
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${onlinePaymentsCanonical}#faq`,
  mainEntity: onlinePaymentsPageData.faq?.items.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: { "@type": "Answer", text: q.answer },
  })) ?? [],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${onlinePaymentsCanonical}#service`,
  name: "Online Dental Payments: Pay by Link",
  serviceType: "Online payment processing for dental practices",
  provider: { "@type": "Organization", name: "SmilePass", url: "https://smilepass.com.au" },
  areaServed: { "@type": "Country", name: "Australia" },
  description:
    "SmilePass enables Australian dental practices to take secure card payments by SMS or email link, without an EFTPOS terminal, with real-time settlement and PCI-DSS compliance.",
  audience: { "@type": "Audience", audienceType: "Dental practices" },
  url: onlinePaymentsCanonical,
};

export default function OnlinePaymentsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <SolutionPageTemplate data={onlinePaymentsPageData} />
    </>
  );
}
