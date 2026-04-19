"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useLang } from "@/lib/language-context";

type Slide = {
  src: string;
  alt: string;
  domain: string;
  url: string;
  location: { el: string; en: string };
  name: string;
};

const SLIDES: Slide[] = [
  {
    src: "/portfolio/afroditi/hero.jpg",
    alt: "Villa Afroditi Antiparos — Επαγγελματικό website καταλύματος",
    domain: "antiparos-afroditivillas.gr",
    url: "https://www.antiparos-afroditivillas.gr/",
    location: { el: "Αντίπαρος", en: "Antiparos" },
    name: "Villa Afroditi",
  },
  {
    src: "/portfolio/rodavgi/hero.jpg",
    alt: "Rodavgi Apartments — Website καταλύματος",
    domain: "rodavgiapartments.com",
    url: "https://rodavgiapartments.com",
    location: { el: "Παξοί", en: "Paxos" },
    name: "Rodavgi Apartments",
  },
  {
    src: "/portfolio/achilleas/after-01-hero.jpg",
    alt: "Achilleas Peaceful Place — Website καταλύματος",
    domain: "achilleaspeacefulplace.gr",
    url: "https://achilleaspeacefulplace.gr",
    location: { el: "Λευκάδα", en: "Lefkada" },
    name: "Achilleas Peaceful",
  },
];

function BrowserMockup({
  viewLiveLabel,
  lang,
}: {
  viewLiveLabel: string;
  lang: "el" | "en";
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [paused]);

  const active = useMemo(() => SLIDES[index], [index]);

  return (
    <div
      className="animate-float relative animate-hero-fade-in"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <a
        href={active.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${viewLiveLabel} — ${active.name}`}
        className="block bg-white dark:bg-[#111827] rounded-xl shadow-2xl dark:shadow-black/60 overflow-hidden border border-gray-200 dark:border-white/10 hover:shadow-3xl transition-shadow duration-300 group"
      >
        <div className="bg-gray-100 dark:bg-[#0B0F1A] px-4 py-2.5 flex items-center gap-2 border-b border-gray-200 dark:border-white/10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-3">
            <div
              key={active.domain}
              className="bg-white dark:bg-[#111827] rounded-md px-3 py-1 text-xs text-gray-500 dark:text-gray-300 text-center border border-gray-200 dark:border-white/10 flex items-center justify-center gap-1.5 transition-opacity duration-300 url-bar-fade"
            >
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              {active.domain}
            </div>
          </div>
          <div className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">GR / EN</div>
        </div>

        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "1200 / 750" }}
        >
          {SLIDES.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 600px"
              className={`object-cover transition-opacity duration-700 ease-in-out group-hover:scale-[1.02] ${
                i === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 z-20">
            <span className="bg-white/90 dark:bg-[#111827]/90 backdrop-blur text-xs font-semibold text-text-primary px-4 py-2 rounded-full shadow-lg">
              {viewLiveLabel}
            </span>
          </div>
        </div>
      </a>

      {/* Carousel dots */}
      <div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10"
        role="tablist"
        aria-label="Featured sites"
      >
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={s.name}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index
                ? "w-6 bg-primary"
                : "w-1.5 bg-gray-300 dark:bg-white/30 hover:bg-gray-400 dark:hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Floating badge: Location (switches with slide) */}
      <div
        key={`loc-${active.domain}`}
        className="absolute -top-3 -right-3 md:-right-5 bg-white dark:bg-[#111827] rounded-xl shadow-lg dark:shadow-black/50 border border-gray-100 dark:border-white/10 px-3 py-2 flex items-center gap-2 z-10 animate-hero-fade-in"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-extrabold text-text-primary leading-none">
            {active.location[lang]}
          </div>
          <div className="text-[10px] text-text-secondary leading-tight mt-0.5">{active.name}</div>
        </div>
      </div>

      {/* Floating badge: Live indicator */}
      <div className="absolute top-8 -left-2 md:-left-4 bg-white dark:bg-[#111827] rounded-full shadow-lg dark:shadow-black/50 border border-gray-100 dark:border-white/10 px-3 py-1.5 flex items-center gap-1.5 z-10">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>
        <span className="text-[11px] font-bold text-text-primary">Live Site</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const { t, lang } = useLang();
  const urlLocale = lang === "en" ? "en" : "el";

  const scrollTo = (id: string): boolean => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return true;
    }
    return false;
  };

  return (
    <section className="relative pt-24 pb-8 md:pt-32 md:pb-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              {t.hero.title}
              <br />
              <span className="text-primary">{t.hero.titleHighlight}</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href={`/${urlLocale}#contact`}
                onClick={(e) => { if (scrollTo("#contact")) e.preventDefault(); }}
                className="bg-accent hover:bg-accent-dark text-white text-base font-semibold px-7 py-3.5 rounded-lg transition-colors shadow-lg shadow-accent/20 text-center"
              >
                {t.hero.cta}
              </a>
              <a
                href={`/${urlLocale}#portfolio`}
                onClick={(e) => { if (scrollTo("#portfolio")) e.preventDefault(); }}
                className="text-primary hover:text-primary-dark font-medium text-base transition-colors underline underline-offset-4 text-center"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            <div className="mt-4 flex justify-center lg:justify-start">
              <a
                href={`/${urlLocale}/free-audit`}
                className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
              >
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent/15 text-accent">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </span>
                {lang === "en"
                  ? "Or get a free 5-min video audit of your site →"
                  : "Ή πάρε δωρεάν 5-λεπτο video audit του site σου →"}
              </a>
            </div>
          </div>

          {/* Right: browser mockup */}
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
            <BrowserMockup
              viewLiveLabel={t.portfolio.mockupViewLive}
              lang={lang === "en" ? "en" : "el"}
            />
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { text: t.trust.delivery, color: "bg-sky-50 border-sky-100 dark:bg-sky-500/10 dark:border-sky-500/20", iconColor: "text-sky-500", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /> },
            { text: t.trust.google, color: "bg-emerald-50 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20", iconColor: "text-emerald-500", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /> },
            { text: t.trust.greek, color: "bg-blue-50 border-blue-100 dark:bg-blue-500/10 dark:border-blue-500/20", iconColor: "text-blue-500", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /> },
            { text: t.trust.mockup, color: "bg-amber-50 border-amber-100 dark:bg-amber-500/10 dark:border-amber-500/20", iconColor: "text-amber-500", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /> },
          ].map((item, i) => (
            <div key={i} className={`${item.color} border rounded-xl px-4 py-3.5 flex items-center gap-3`}>
              <svg className={`w-5 h-5 shrink-0 ${item.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                {item.icon}
              </svg>
              <span className="text-sm font-bold text-text-primary">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Proof bar */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 md:gap-8">
          {[t.proof.stat1, t.proof.stat2].map((stat, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
              <span className="w-1.5 h-1.5 bg-success rounded-full" />
              {stat}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
