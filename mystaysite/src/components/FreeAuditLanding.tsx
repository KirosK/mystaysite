"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { trackAuditRequest } from "@/lib/analytics";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

declare global {
  interface Window {
    turnstile?: {
      render: (
        selector: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "invisible";
          appearance?: "always" | "execute" | "interaction-only";
        }
      ) => string;
      reset: (widgetId?: string) => void;
      execute: (widgetId?: string) => void;
    };
  }
}

const PHONE = "306974585063";

const copy = {
  el: {
    eyebrow: "Δωρεάν • Χωρίς δέσμευση • Παράδοση σε 48h",
    title: "Δωρεάν Video Audit",
    titleHighlight: "για το website του καταλύματός σου",
    subtitle:
      "Σου τραβάω ένα 5λεπτο video screen-recording μαζί με τα 5 σημαντικότερα πράγματα που χάνουν κρατήσεις στο site σου, και πώς να τα διορθώσεις.",
    ctaPrimary: "Ζήτα το audit σου",
    ctaSecondary: "Δες πώς λειτουργεί",
    trust: {
      time: "48 ώρες παράδοση",
      cost: "100% δωρεάν",
      commitment: "Χωρίς δέσμευση",
    },
    howItWorks: {
      title: "Πώς λειτουργεί",
      steps: [
        {
          step: "01",
          title: "Στέλνεις το URL σου",
          text: "Συμπληρώνεις τη φόρμα με το website σου (ή λες «δεν έχω») και τι σε απασχολεί περισσότερο.",
        },
        {
          step: "02",
          title: "Αναλύω το site σου",
          text: "Κάνω deep dive σε speed, SEO, mobile, booking flow και conversion. Συγκρίνω με ανταγωνιστές.",
        },
        {
          step: "03",
          title: "Λαμβάνεις video σε 48h",
          text: "Σου στέλνω στο email σου ένα ιδιωτικό Loom link με τις 5 πιο σημαντικές βελτιώσεις, σε φυσική γλώσσα.",
        },
      ],
    },
    whatYouGet: {
      title: "Τι θα δεις στο video σου",
      items: [
        {
          icon: "speed",
          title: "Page speed analysis",
          text: "LCP, CLS, INP σε desktop + mobile. Πόσοι χρήστες φεύγουν πριν καν φορτώσει.",
        },
        {
          icon: "search",
          title: "SEO ευκαιρίες",
          text: "Keywords που βγαίνεις, που δεν βγαίνεις, και τι εμφανίζεται αντί για εσένα στη Google.",
        },
        {
          icon: "mobile",
          title: "Mobile experience",
          text: "Πραγματικό test σε κινητό - πού χάνεις 70% των χρηστών που έρχονται από Instagram.",
        },
        {
          icon: "conversion",
          title: "Booking conversion",
          text: "Το booking flow σου βήμα-βήμα: πού stalls, πού confuses, πού πάει το refund rate.",
        },
        {
          icon: "priority",
          title: "Priority action plan",
          text: "Τα 5 πιο σημαντικά things που πρέπει να αλλάξεις, με σειρά προτεραιότητας & εκτιμώμενο αποτέλεσμα.",
        },
      ],
    },
    form: {
      title: "Ζήτα το δωρεάν audit σου",
      subtitle: "Συμπληρώνεις σε 60 δευτερόλεπτα. Λαμβάνεις το video σε 48h.",
      name: "Όνομα",
      namePlaceholder: "Πώς σε λένε;",
      email: "Email",
      emailPlaceholder: "email@example.com",
      whatsapp: "WhatsApp (προαιρετικό)",
      whatsappPlaceholder: "+30 69XXXXXXXX",
      website: "Website URL",
      websitePlaceholder: "https://mywebsite.gr",
      noWebsite: "Δεν έχω ακόμα website",
      bookingLink: "Booking / Airbnb link (προαιρετικό)",
      bookingPlaceholder: "https://booking.com/...",
      concern: "Τι σε απασχολεί περισσότερο;",
      concernPlaceholder:
        "Π.χ. «Έχω πολύ trafficking από Booking αλλά μηδέν direct κρατήσεις», «το site φορτώνει πολύ αργά σε κινητό», «δεν βγαίνω στην Google»…",
      consent:
        "Συμφωνώ να λαμβάνω το video audit στο email μου, σύμφωνα με την",
      consentLink: "Πολιτική Απορρήτου",
      submit: "Στείλε μου το δωρεάν audit",
      submitting: "Αποστολή…",
      successTitle: "Το αίτημά σου έφτασε!",
      successText:
        "Θα λάβεις το video audit στο email σου εντός 48 ωρών. Σε περίπτωση έκτακτης ανάγκης, στείλε μου στο WhatsApp.",
      whatsappCta: "Στείλε μου WhatsApp τώρα",
      errorTitle: "Κάτι πήγε λάθος",
      errorText: "Δοκίμασε ξανά ή στείλε μου απευθείας WhatsApp.",
    },
    faq: {
      title: "Συχνές ερωτήσεις",
      items: [
        {
          q: "Είναι πραγματικά δωρεάν;",
          a: "Ναι, 100%. Δεν σου στέλνω προσφορά αν δεν μου το ζητήσεις. Σκοπός είναι να σου δώσω αξία και να δεις τη δουλειά μου πριν κλείσουμε οτιδήποτε.",
        },
        {
          q: "Πόση ώρα είναι το video;",
          a: "5 έως 10 λεπτά. Screen recording μαζί με τη φωνή μου. Χωρίς edit, χωρίς fancy intros - μόνο ουσία.",
        },
        {
          q: "Τι χρειάζεσαι από εμένα;",
          a: "Μόνο το URL του website σου (εάν υπάρχει), email και 1-2 γραμμές για το τι σε απασχολεί. Αν δεν έχεις website, αναλύω την παρουσία σου σε Booking/Airbnb/Google.",
        },
        {
          q: "Γιατί το κάνεις δωρεάν;",
          a: "Γιατί είναι ο καλύτερος τρόπος να δεις ότι ξέρω τι κάνω πριν πληρώσεις ευρώ. Οι περισσότεροι που λαμβάνουν το audit, καταλήγουν πελάτες - αλλά δεν υπάρχει καμία υποχρέωση.",
        },
        {
          q: "Πόσο σύντομα θα το λάβω;",
          a: "Εντός 48 ωρών από τη στιγμή που θα λάβω την αίτησή σου (εκτός σαββατοκύριακου). Αν έχω μεγάλη λίστα, σου στέλνω ενημέρωση στο email σου.",
        },
        {
          q: "Αφού δω το audit, τι συμβαίνει μετά;",
          a: "Τίποτα αν δεν θες εσύ. Μπορείς (α) να κάνεις τις βελτιώσεις μόνος, (β) να δώσεις το video σε έναν άλλον developer, ή (γ) να μιλήσουμε για το πώς θα μπορούσα να βοηθήσω. Χωρίς πίεση.",
        },
      ],
    },
    trustBar: {
      title: "Τα τελευταία 5 audits οδήγησαν σε:",
      items: [
        { stat: "3/5", text: "νέα websites" },
        { stat: "1/5", text: "technical audit (€199)" },
        { stat: "1/5", text: "μόνο χρήση των δωρεάν tips" },
      ],
    },
    seeSamples: {
      title: "Δες δουλειές που έχουμε κάνει",
      sites: [
        { label: "Villa Afroditi", url: "https://www.antiparos-afroditivillas.gr/" },
        { label: "Rodavgi Apartments", url: "https://rodavgiapartments.com" },
        { label: "Achilleas Peaceful", url: "https://achilleaspeacefulplace.gr" },
      ],
    },
    bottomCta: {
      title: "Ή μίλα μαζί μου απευθείας",
      text: "Αν προτιμάς να ξεκινήσεις με μια κουβέντα, πάτα WhatsApp.",
      whatsapp: "WhatsApp",
      whatsappMsg: "Γεια! Θα ήθελα να μιλήσουμε για το website του καταλύματός μου.",
    },
  },
  en: {
    eyebrow: "Free • No commitment • 48h turnaround",
    title: "Free Video Audit",
    titleHighlight: "for your vacation rental website",
    subtitle:
      "I'll record a 5-minute screen-recording video showing you the top 5 things on your site that are costing you bookings - and exactly how to fix them.",
    ctaPrimary: "Request your audit",
    ctaSecondary: "See how it works",
    trust: {
      time: "48h turnaround",
      cost: "100% free",
      commitment: "No commitment",
    },
    howItWorks: {
      title: "How it works",
      steps: [
        {
          step: "01",
          title: "Send your URL",
          text: "Fill the form with your website (or say 'I don't have one yet') and what concerns you most.",
        },
        {
          step: "02",
          title: "I analyze your site",
          text: "Deep dive on speed, SEO, mobile, booking flow and conversion. Competitive comparison included.",
        },
        {
          step: "03",
          title: "Video delivered in 48h",
          text: "You receive a private Loom link in your email with the top 5 improvements, explained in plain language.",
        },
      ],
    },
    whatYouGet: {
      title: "What you'll see in your video",
      items: [
        {
          icon: "speed",
          title: "Page speed analysis",
          text: "LCP, CLS, INP on desktop + mobile. How many users leave before your site even loads.",
        },
        {
          icon: "search",
          title: "SEO opportunities",
          text: "Keywords you rank for, ones you don't, and what shows up instead of you on Google.",
        },
        {
          icon: "mobile",
          title: "Mobile experience",
          text: "Real device test - where you lose the 70% of traffic coming from Instagram.",
        },
        {
          icon: "conversion",
          title: "Booking conversion",
          text: "Your booking flow step-by-step: where it stalls, where it confuses, where bookings leak.",
        },
        {
          icon: "priority",
          title: "Priority action plan",
          text: "The top 5 things you should change, ranked by priority & expected impact.",
        },
      ],
    },
    form: {
      title: "Request your free audit",
      subtitle: "Takes 60 seconds. Video delivered in 48h.",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "email@example.com",
      whatsapp: "WhatsApp (optional)",
      whatsappPlaceholder: "+30 69XXXXXXXX",
      website: "Website URL",
      websitePlaceholder: "https://mywebsite.com",
      noWebsite: "I don't have a website yet",
      bookingLink: "Booking / Airbnb link (optional)",
      bookingPlaceholder: "https://booking.com/...",
      concern: "What concerns you most?",
      concernPlaceholder:
        "E.g. 'Lots of Booking.com traffic but zero direct bookings', 'site loads slowly on mobile', 'I don't show up on Google'…",
      consent:
        "I agree to receive the video audit via email, in accordance with the",
      consentLink: "Privacy Policy",
      submit: "Send me my free audit",
      submitting: "Sending…",
      successTitle: "Request received!",
      successText:
        "You'll receive your video audit via email within 48 hours. If it's urgent, message me on WhatsApp.",
      whatsappCta: "Message me on WhatsApp",
      errorTitle: "Something went wrong",
      errorText: "Please try again or message me directly on WhatsApp.",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "Is it really free?",
          a: "Yes, 100%. I won't send you a quote unless you ask. The goal is to give you value and show you my work before you commit to anything.",
        },
        {
          q: "How long is the video?",
          a: "5 to 10 minutes. Screen recording with my voice. No editing, no fancy intros - just substance.",
        },
        {
          q: "What do you need from me?",
          a: "Just the URL of your website (if any), email, and 1-2 lines on what's bothering you. If you don't have a website, I'll analyze your Booking/Airbnb/Google presence.",
        },
        {
          q: "Why do you do it free?",
          a: "Because it's the best way to show you I know what I'm doing before you spend a euro. Most audit recipients become clients - but there's zero obligation.",
        },
        {
          q: "How soon will I get it?",
          a: "Within 48 hours of receiving your request (excluding weekends). If there's a backlog, I'll email you an ETA.",
        },
        {
          q: "After I see the audit, what happens?",
          a: "Nothing unless you want it to. You can (a) implement the fixes yourself, (b) send the video to another developer, or (c) chat with me about how I could help. No pressure.",
        },
      ],
    },
    trustBar: {
      title: "The last 5 audits led to:",
      items: [
        { stat: "3/5", text: "new websites" },
        { stat: "1/5", text: "technical audit (€199)" },
        { stat: "1/5", text: "DIY using free tips" },
      ],
    },
    seeSamples: {
      title: "See work we've done",
      sites: [
        { label: "Villa Afroditi", url: "https://www.antiparos-afroditivillas.gr/" },
        { label: "Rodavgi Apartments", url: "https://rodavgiapartments.com" },
        { label: "Achilleas Peaceful", url: "https://achilleaspeacefulplace.gr" },
      ],
    },
    bottomCta: {
      title: "Or talk to me directly",
      text: "If you prefer to start with a chat, hit WhatsApp.",
      whatsapp: "WhatsApp",
      whatsappMsg: "Hi! I'd like to talk about my vacation rental website.",
    },
  },
};

function Icon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  switch (name) {
    case "speed":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "search":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      );
    case "mobile":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    case "conversion":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      );
    case "priority":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      );
    default:
      return null;
  }
}

export default function FreeAuditLanding({ locale }: { locale: string }) {
  const isEn = locale === "en";
  const t = isEn ? copy.en : copy.el;
  const urlLocale = isEn ? "en" : "el";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [website, setWebsite] = useState("");
  const [noWebsite, setNoWebsite] = useState(false);
  const [bookingLink, setBookingLink] = useState("");
  const [concern, setConcern] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Anti-spam: honeypot + time guard
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [mountedAt] = useState<number>(() => Date.now());
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const turnstileWidgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    const renderWidget = () => {
      if (!window.turnstile || turnstileWidgetId.current) return;
      const el = document.getElementById("cf-turnstile-audit");
      if (!el) return;
      turnstileWidgetId.current = window.turnstile.render(el, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
        appearance: "interaction-only",
        theme: "auto",
      });
    };
    if (window.turnstile) renderWidget();
    else {
      const id = window.setInterval(() => {
        if (window.turnstile) {
          window.clearInterval(id);
          renderWidget();
        }
      }, 300);
      return () => window.clearInterval(id);
    }
  }, []);

  const canSubmit =
    email.trim() !== "" &&
    consent &&
    !submitting &&
    (noWebsite || website.trim() !== "") &&
    (!TURNSTILE_SITE_KEY || turnstileToken !== "");

  const whatsappHref = `https://wa.me/${PHONE}?text=${encodeURIComponent(t.bottomCta.whatsappMsg)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "free_audit",
          name,
          email,
          whatsapp,
          website: noWebsite ? "" : website,
          bookingLink,
          concern,
          locale,
          source: "mystaysite.com/free-audit",
          _gotcha: honeypotRef.current?.value ?? "",
          _ts: mountedAt,
          turnstileToken,
        }),
      });

      if (res.ok) {
        trackAuditRequest({
          hasWebsite: !noWebsite,
          source: "landing_page_form",
        });
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
      if (TURNSTILE_SITE_KEY && window.turnstile) {
        try {
          window.turnstile.reset(turnstileWidgetId.current ?? undefined);
        } catch {
          // ignore
        }
      }
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById("audit-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC] dark:bg-[#0B0F1A]">
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="lazyOnload"
        />
      )}
      <div className="h-16 md:h-18" />

      {/* Hero */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/10 dark:bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 dark:bg-accent/15 border border-accent/20 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-xs font-bold text-accent uppercase tracking-wider">
              {t.eyebrow}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight text-text-primary">
            {t.title}
            <br />
            <span className="text-primary">{t.titleHighlight}</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={scrollToForm}
              className="bg-accent hover:bg-accent-dark text-white text-base font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg shadow-accent/20"
            >
              {t.ctaPrimary}
            </button>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center text-primary hover:text-primary-dark font-medium text-base transition-colors underline underline-offset-4"
            >
              {t.ctaSecondary}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { icon: "⚡", text: t.trust.time },
              { icon: "💸", text: t.trust.cost },
              { icon: "🤝", text: t.trust.commitment },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-semibold text-text-secondary">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white dark:bg-[#111827]/50 border-y border-gray-200 dark:border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center text-text-primary mb-12">
            {t.howItWorks.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {t.howItWorks.steps.map((step, i) => (
              <div
                key={i}
                className="relative bg-gray-50 dark:bg-[#0B0F1A] rounded-2xl p-6 md:p-7 border border-gray-200 dark:border-white/10"
              >
                <div className="text-5xl font-extrabold text-primary/20 dark:text-primary/30 mb-3">
                  {step.step}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center text-text-primary mb-12">
            {t.whatYouGet.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {t.whatYouGet.items.map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#111827] rounded-xl p-6 border border-gray-200 dark:border-white/10 flex gap-4"
              >
                <div className="shrink-0 w-11 h-11 rounded-lg bg-primary/10 dark:bg-primary/15 text-primary flex items-center justify-center">
                  <Icon name={item.icon} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-text-primary mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar + Samples */}
      <section className="py-12 bg-white dark:bg-[#111827]/50 border-y border-gray-200 dark:border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-center text-sm font-bold text-text-secondary uppercase tracking-wider mb-5">
            {t.seeSamples.title}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {t.seeSamples.sites.map((site) => (
              <a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#0B0F1A] border border-gray-200 dark:border-white/10 text-sm font-semibold text-text-primary hover:border-primary dark:hover:border-primary transition-colors"
              >
                <span>→</span>
                {site.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="audit-form" className="py-16 md:py-24 bg-gradient-to-br from-[#0F172A] to-[#1a1a2e] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%20fill%3D%22%23fff%22%20fill-opacity%3D%221%22%20fill-rule%3D%22evenodd%22/%3E%3C/svg%3E')]" />
        <div className="relative max-w-xl mx-auto px-4 sm:px-6">
          {status === "success" ? (
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 md:p-10 text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                {t.form.successTitle}
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {t.form.successText}
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                {t.form.whatsappCta}
              </a>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3">
                  {t.form.title}
                </h2>
                <p className="text-gray-400 text-sm md:text-base">
                  {t.form.subtitle}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Honeypot — hidden from humans, filled by bots */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-5000px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  <label>
                    Leave this field empty
                    <input
                      ref={honeypotRef}
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      defaultValue=""
                    />
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fa-name" className="block text-sm font-semibold text-gray-300 mb-1.5">
                      {t.form.name}
                    </label>
                    <input
                      id="fa-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.form.namePlaceholder}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="fa-email" className="block text-sm font-semibold text-gray-300 mb-1.5">
                      {t.form.email} <span className="text-accent">*</span>
                    </label>
                    <input
                      id="fa-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.form.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="fa-whatsapp" className="block text-sm font-semibold text-gray-300 mb-1.5">
                    {t.form.whatsapp}
                  </label>
                  <input
                    id="fa-whatsapp"
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder={t.form.whatsappPlaceholder}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="fa-website" className="block text-sm font-semibold text-gray-300 mb-1.5">
                    {t.form.website} {!noWebsite && <span className="text-accent">*</span>}
                  </label>
                  <input
                    id="fa-website"
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder={t.form.websitePlaceholder}
                    disabled={noWebsite}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={noWebsite}
                      onChange={(e) => setNoWebsite(e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-accent focus:ring-accent/40 focus:ring-offset-0"
                    />
                    <span className="text-sm text-gray-400">{t.form.noWebsite}</span>
                  </label>
                </div>

                <div>
                  <label htmlFor="fa-booking" className="block text-sm font-semibold text-gray-300 mb-1.5">
                    {t.form.bookingLink}
                  </label>
                  <input
                    id="fa-booking"
                    type="url"
                    value={bookingLink}
                    onChange={(e) => setBookingLink(e.target.value)}
                    placeholder={t.form.bookingPlaceholder}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="fa-concern" className="block text-sm font-semibold text-gray-300 mb-1.5">
                    {t.form.concern}
                  </label>
                  <textarea
                    id="fa-concern"
                    value={concern}
                    onChange={(e) => setConcern(e.target.value)}
                    placeholder={t.form.concernPlaceholder}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors resize-none"
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-accent focus:ring-accent/40 focus:ring-offset-0 shrink-0"
                  />
                  <span className="text-xs text-gray-400 leading-relaxed">
                    {t.form.consent}{" "}
                    <Link
                      href={`/${urlLocale}/privacy`}
                      className="text-accent hover:underline"
                    >
                      {t.form.consentLink}
                    </Link>
                    .
                  </span>
                </label>

                {TURNSTILE_SITE_KEY && (
                  <div
                    id="cf-turnstile-audit"
                    className="flex justify-center pt-1"
                  />
                )}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full py-4 rounded-lg bg-accent hover:bg-accent-dark text-white font-bold text-base transition-colors shadow-lg shadow-accent/30 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting ? t.form.submitting : t.form.submit}
                </button>

                {status === "error" && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
                    <p className="text-sm font-semibold text-red-300 mb-1">
                      {t.form.errorTitle}
                    </p>
                    <p className="text-xs text-red-200/80 mb-3">
                      {t.form.errorText}
                    </p>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#25D366] hover:underline"
                    >
                      {t.form.whatsappCta}
                    </a>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center text-text-primary mb-12">
            {t.faq.title}
          </h2>
          <div className="space-y-3">
            {t.faq.items.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                  >
                    <span className="font-bold text-sm md:text-base text-text-primary">
                      {item.q}
                    </span>
                    <svg
                      className={`w-5 h-5 text-text-secondary shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 -mt-1">
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 p-6 md:p-8 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-2">
              {t.bottomCta.title}
            </h3>
            <p className="text-sm md:text-base text-text-secondary mb-5">
              {t.bottomCta.text}
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-bold px-6 py-3 rounded-lg transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.bottomCta.whatsapp}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
