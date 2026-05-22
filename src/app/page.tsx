import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import WhatIsSmilePass from "@/components/home/WhatIsSmilePass";
import BenefitsForPractice from "@/components/home/BenefitsForPractice";
import SolutionsTabs from "@/components/home/SolutionsTabs";
import Differentiators from "@/components/home/Differentiators";
import SuccessStory from "@/components/home/SuccessStory";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import FinalCtaBand from "@/components/home/FinalCtaBand";
import FaqTeaser from "@/components/home/FaqTeaser";

export const metadata: Metadata = {
  title: "SmilePass — Dental payments software for growing practices",
  description:
    "All-in-one dental payments platform: memberships, payment plans, online payments, and patient financing. Designed for Australian dental practices.",
  alternates: { canonical: "https://smilepass.com.au/" },
};

/**
 * Home page — composes the 10 sections that mirror the current
 * smilepass.com.au layout. Order matches the production site so the
 * client can iterate from a familiar shell.
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
      <TestimonialsCarousel />
      <FinalCtaBand />
      <FaqTeaser />
    </>
  );
}
