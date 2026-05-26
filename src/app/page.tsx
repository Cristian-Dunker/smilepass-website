import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import WhatIsSmilePass from "@/components/home/WhatIsSmilePass";
import BenefitsForPractice from "@/components/home/BenefitsForPractice";
import SolutionsTabs from "@/components/home/SolutionsTabs";
import Differentiators from "@/components/home/Differentiators";
import SuccessStory from "@/components/home/SuccessStory";
import FinalCtaBand from "@/components/home/FinalCtaBand";
import FaqTeaser from "@/components/home/FaqTeaser";

export const metadata: Metadata = {
  title: "SmilePass | Dental Membership and Payment Plan Software for Australian Practices",
  description:
    "Run in-house dental membership plans, customisable payment plans, and online card payments from one platform. Built for Australian dental practices. Free to start, no setup fee, no contract.",
  keywords: [
    "dental membership plans Australia",
    "in-house dental payment plans",
    "dental subscription software",
    "dental practice payment software",
    "dental membership platform",
    "online dental payments",
  ],
  alternates: { canonical: "https://smilepass.com.au/" },
  openGraph: {
    title: "SmilePass | Dental Membership and Payment Plan Software",
    description:
      "All-in-one dental payments platform for Australian practices: in-house memberships, payment plans, online payments.",
    url: "https://smilepass.com.au/",
  },
};

/**
 * Home page — composes the sections shown to first-time visitors.
 *
 * Order: hero → product explainer → benefits → solution detail →
 * differentiators → success story → final CTA → FAQ.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <WhatIsSmilePass />
      <BenefitsForPractice />
      <SolutionsTabs />
      <Differentiators />
      <SuccessStory />
      <FinalCtaBand />
      <FaqTeaser />
    </>
  );
}
