import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RevealAnimations from "@/components/common/RevealAnimations";
import Analytics from "@/components/layout/Analytics";
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
    default: "SmilePass — Dental payments software for growing practices",
    template: "%s | SmilePass",
  },
  description:
    "All-in-one dental payments platform: memberships, payment plans, online payments, and patient financing. Designed for dental practices in Australia.",
  keywords: [
    "dental payments",
    "dental membership plans",
    "dental payment plans",
    "dental loans Australia",
    "dental practice software",
    "dental SaaS",
  ],
  authors: [{ name: "SmilePass Pty Ltd" }],
  creator: "SmilePass Pty Ltd",
  publisher: "SmilePass Pty Ltd",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: "SmilePass",
    title: "SmilePass — Dental payments software for growing practices",
    description:
      "All-in-one dental payments platform for Australian dental practices: memberships, payment plans, online payments, and patient financing.",
    images: [
      {
        url: "/images/hero/og-image.png",
        width: 1200,
        height: 630,
        alt: "SmilePass — Dental payments software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmilePass — Dental payments software for growing practices",
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
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "SmilePass",
  legalName: "SmilePass Pty Ltd",
  url: siteUrl,
  logo: `${siteUrl}/images/logos/smilepass-logo.svg`,
  description:
    "All-in-one dental payments software for Australian dental practices.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+61-1300-426-391",
    contactType: "customer service",
    email: "enquiries@smilepass.com.au",
    areaServed: "AU",
    availableLanguage: "en",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "AU",
  },
  sameAs: [
    "https://facebook.com/smilepass",
    "https://instagram.com/smilepass",
    "https://x.com/smilepass",
    "https://linkedin.com/company/smilepass",
  ],
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
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <RevealAnimations />
        <Analytics />
      </body>
    </html>
  );
}
