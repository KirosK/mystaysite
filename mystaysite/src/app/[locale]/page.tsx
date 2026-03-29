"use client";

import dynamic from "next/dynamic";
import { LanguageProvider } from "@/lib/language-context";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const PainPoints = dynamic(() => import("@/components/PainPoints"));
const Solution = dynamic(() => import("@/components/Solution"));
const Portfolio = dynamic(() => import("@/components/Portfolio"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const GuaranteeStack = dynamic(() => import("@/components/GuaranteeStack"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));

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
