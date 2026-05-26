import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RevealAnimations from "@/components/common/RevealAnimations";
import Analytics from "@/components/layout/Analytics";
import { RequestDemoProvider } from "@/components/forms/RequestDemoProvider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = "https://smilepass.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SmilePass | Dental Membership and Payment Plan Software for Australian Practices",
    template: "%s | SmilePass",
  },
  description:
    "SmilePass is the all-in-one platform for dental membership plans, in-house payment plans, and online payments. Built for Australian dental practices. Free to start, no setup fee, no contract.",
  keywords: [
    "dental membership plans Australia",
    "dental payment plans",
    "in-house dental payment plans",
    "dental membership software",
    "dental practice management software",
    "dental subscription plan",
    "dental pay by link",
    "online dental payments",
    "dental SaaS Australia",
    "alternative to dental insurance",
  ],
  authors: [{ name: "SmilePass Pty Ltd" }],
  creator: "SmilePass Pty Ltd",
  publisher: "SmilePass Pty Ltd",
  applicationName: "SmilePass",
  category: "Dental practice software",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: "SmilePass",
    title: "SmilePass | Dental Membership and Payment Plan Software",
    description:
      "All-in-one dental payments platform for Australian dental practices: memberships, in-house payment plans, and online payments. Free to start.",
    images: [
      {
        url: "/images/hero/og-image.png",
        width: 1200,
        height: 630,
        alt: "SmilePass: dental payments software for Australian practices",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmilePass | Dental Membership and Payment Plan Software",
    description:
      "All-in-one dental payments platform for Australian dental practices.",
    images: ["/images/hero/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "AU",
    "geo.placename": "Australia",
    "geo.position": "-25.2744;133.7751",
    "ICBM": "-25.2744, 133.7751",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "SmilePass",
  legalName: "SmilePass Pty Ltd",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/images/logos/smilepass-logo.svg`,
    width: 200,
    height: 28,
  },
  description:
    "All-in-one dental membership, payment plan and online payments software for Australian dental practices.",
  foundingDate: "2023",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+61-1300-426-391",
      contactType: "customer service",
      email: "enquiries@smilepass.com.au",
      areaServed: "AU",
      availableLanguage: "en",
    },
    {
      "@type": "ContactPoint",
      contactType: "technical support",
      email: "contact@smilepass.com.au",
      areaServed: "AU",
      availableLanguage: "en",
    },
  ],
  address: { "@type": "PostalAddress", addressCountry: "AU" },
  areaServed: { "@type": "Country", name: "Australia" },
  knowsAbout: [
    "Dental membership plans",
    "Dental payment plans",
    "Online dental payments",
    "Dental practice revenue",
    "Subscription billing for healthcare",
  ],
  sameAs: [
    "https://facebook.com/smilepass",
    "https://instagram.com/smilepass",
    "https://x.com/smilepass",
    "https://linkedin.com/company/smilepass",
    "https://youtube.com/@smilepass",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "SmilePass",
  description:
    "Dental membership, payment plan and online payments software for Australian practices.",
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: "en-AU",
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${siteUrl}/#software`,
  name: "SmilePass",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Dental practice software",
  operatingSystem: "Web, iOS, Android",
  url: siteUrl,
  description:
    "All-in-one dental payments platform: in-house membership plans, payment plans, online payments and patient financing.",
  publisher: { "@id": `${siteUrl}/#organization` },
  offers: [
    {
      "@type": "Offer",
      name: "Free plan",
      price: "0",
      priceCurrency: "AUD",
      description: "Up to 50 members. No setup fee. No credit card required.",
    },
    {
      "@type": "Offer",
      name: "Growth plan",
      price: "29",
      priceCurrency: "AUD",
      description: "Annual billing. Up to 200 members + practice webpage.",
    },
    {
      "@type": "Offer",
      name: "Pro plan",
      price: "56",
      priceCurrency: "AUD",
      description: "Annual billing. Unlimited members + advanced analytics.",
    },
  ],
  featureList: [
    "In-house dental membership plans",
    "Customisable payment plans",
    "Online payments by SMS or email link",
    "Automated recurring billing",
    "Patient referral program",
    "Family discount engine",
    "Real-time payment dashboard",
    "PCI-DSS compliant payment gateway",
    "Australian data residency",
  ],
  aggregateRating: undefined, // Add when we have legitimate review aggregation.
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-AU"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
      </head>
      <body>
        <RequestDemoProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </RequestDemoProvider>
        <RevealAnimations />
        <Analytics />
      </body>
    </html>
  );
}
