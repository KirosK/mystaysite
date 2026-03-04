"use client";

import { LanguageProvider } from "@/lib/language-context";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import Solution from "@/components/Solution";
import Portfolio from "@/components/Portfolio";
import HowItWorks from "@/components/HowItWorks";

import Pricing from "@/components/Pricing";
import GuaranteeStack from "@/components/GuaranteeStack";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
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
      <Footer />
      <MobileStickyCTA />
      <ChatBot />
    </LanguageProvider>
  );
}
