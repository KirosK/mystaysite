"use client";

import dynamic from "next/dynamic";
import { LanguageProvider } from "@/lib/language-context";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import Solution from "@/components/Solution";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import GuaranteeStack from "@/components/GuaranteeStack";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const MobileStickyCTA = dynamic(() => import("@/components/MobileStickyCTA"), { ssr: false });
const ChatBot = dynamic(() => import("@/components/ChatBot"), { ssr: false });
const ExitIntentPopup = dynamic(() => import("@/components/ExitIntentPopup"), { ssr: false });
const FloatingCTA = dynamic(() => import("@/components/FloatingCTA"), { ssr: false });
const CookieConsent = dynamic(() => import("@/components/CookieConsent"), { ssr: false });

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero />
        <PainPoints />
        <Solution />
        <Portfolio />
        <Testimonials />
        <HowItWorks />

        <Pricing />
        <GuaranteeStack />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <MobileStickyCTA />
      <ChatBot />
      <ExitIntentPopup />
      <FloatingCTA />
      <CookieConsent />
    </LanguageProvider>
  );
}
