"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const PainPoints = dynamic(() => import("@/components/PainPoints"));
const Solution = dynamic(() => import("@/components/Solution"));
const Portfolio = dynamic(() => import("@/components/Portfolio"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const GuaranteeStack = dynamic(() => import("@/components/GuaranteeStack"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function Home() {
  return (
    <main>
      <Hero />
      <PainPoints />
      <Solution />
      <Portfolio />
      <HowItWorks />
      <Pricing />
      <GuaranteeStack />
      <FAQ />
      <Contact />
    </main>
  );
}
