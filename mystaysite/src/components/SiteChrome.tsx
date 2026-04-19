"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/language-context";
import { ThemeProvider } from "@/lib/theme-context";
import Navbar from "@/components/Navbar";
import Analytics from "@/components/Analytics";
import WebMCP from "@/components/WebMCP";

const Footer = dynamic(() => import("@/components/Footer"));
const MobileStickyCTA = dynamic(() => import("@/components/MobileStickyCTA"), { ssr: false });
const ChatBot = dynamic(() => import("@/components/ChatBot"), { ssr: false });
const ExitIntentPopup = dynamic(() => import("@/components/ExitIntentPopup"), { ssr: false });
const FloatingCTA = dynamic(() => import("@/components/FloatingCTA"), { ssr: false });
const CookieConsent = dynamic(() => import("@/components/CookieConsent"), { ssr: false });

export default function SiteChrome({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) {
  return (
    <ThemeProvider>
      <LanguageProvider initialLocale={locale}>
        <Analytics locale={locale} />
        <WebMCP />
        <Navbar />
        {children}
        <Footer />
        <MobileStickyCTA />
        <ChatBot />
        <ExitIntentPopup />
        <FloatingCTA />
        <CookieConsent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
