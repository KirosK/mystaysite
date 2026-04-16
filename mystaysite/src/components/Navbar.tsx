"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/lib/language-context";

function FlagGR() {
  return (
    <svg viewBox="0 0 640 480" className="w-4 h-3 rounded-sm shrink-0 pointer-events-none">
      <rect fill="#005bae" width="640" height="480" />
      <rect fill="#fff" y="53.3" width="640" height="53.3" />
      <rect fill="#fff" y="160" width="640" height="53.3" />
      <rect fill="#fff" y="266.7" width="640" height="53.3" />
      <rect fill="#fff" y="373.3" width="640" height="53.3" />
      <rect fill="#005bae" width="266.7" height="266.7" />
      <rect fill="#fff" x="106.7" width="53.3" height="266.7" />
      <rect fill="#fff" y="106.7" width="266.7" height="53.3" />
    </svg>
  );
}

function FlagEN() {
  return (
    <svg viewBox="0 0 640 480" className="w-4 h-3 rounded-sm shrink-0 pointer-events-none">
      <rect fill="#012169" width="640" height="480" />
      <path fill="#fff" d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z" />
      <path fill="#C8102E" d="M424 281l216 159v40L369 281zM241 241l-21 17L0 440v-40l200-159zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z" />
      <path fill="#fff" d="M241 0v480h160V0zM0 160v160h640V160z" />
      <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z" />
    </svg>
  );
}

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const urlLocale = lang === "en" ? "en" : "el";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#portfolio", label: t.nav.portfolio },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#faq", label: t.nav.faq },
    { href: `/${urlLocale}/blog`, label: t.nav.blog, isRoute: true },
    { href: "#contact", label: t.nav.contact },
  ];

  const scrollTo = (href: string): boolean => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return true;
    }
    return false;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <a href={`/${urlLocale}`} className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
          <div className="flex items-baseline gap-0" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <span className="text-lg font-extrabold text-text-primary tracking-tight">my</span>
            <span className="text-lg font-extrabold text-primary tracking-tight">stay</span>
            <span className="text-lg font-extrabold text-text-primary tracking-tight">site</span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map((link) =>
            "isRoute" in link && link.isRoute ? (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.href}
                href={`/${urlLocale}${link.href}`}
                onClick={(e) => { if (scrollTo(link.href)) e.preventDefault(); }}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            )
          )}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1">
              {t.nav.services}
              <svg className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 pt-2">
                <div className="bg-white rounded-xl shadow-xl border border-gray-200 py-2 min-w-[180px]">
                  {t.nav.servicesItems.map((item) => (
                    <a
                      key={item.href}
                      href={`/${urlLocale}${item.href}`}
                      className="block px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {/* Language toggle */}
          <button
            type="button"
            onClick={toggleLang}
            className="text-xs font-medium px-3 py-2 rounded-md border border-border hover:bg-bg-light transition-colors flex items-center gap-1.5 active:bg-bg-light"
          >
            {lang === "gr" ? <FlagGR /> : <FlagEN />}
            {lang === "gr" ? "EL" : "EN"}
          </button>

          {/* CTA */}
          <a
            href={`/${urlLocale}#contact`}
            onClick={(e) => { if (scrollTo("#contact")) e.preventDefault(); }}
            className="bg-accent hover:bg-accent-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            {t.nav.cta}
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            className="text-xs font-medium px-3 py-2 rounded-md border border-border flex items-center gap-1.5 active:bg-bg-light"
          >
            {lang === "gr" ? <FlagGR /> : <FlagEN />}
            {lang === "gr" ? "EL" : "EN"}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-text-primary"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-border shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {links.map((link) =>
              "isRoute" in link && link.isRoute ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="block w-full text-left text-base font-medium text-text-secondary hover:text-text-primary transition-colors py-2"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.href}
                  href={`/${urlLocale}${link.href}`}
                  onClick={(e) => { if (scrollTo(link.href)) e.preventDefault(); }}
                  className="block w-full text-left text-base font-medium text-text-secondary hover:text-text-primary transition-colors py-2"
                >
                  {link.label}
                </a>
              )
            )}
            <div className="border-t border-gray-200 pt-2">
              <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">{t.nav.services}</p>
              {t.nav.servicesItems.map((item) => (
                <a
                  key={item.href}
                  href={`/${urlLocale}${item.href}`}
                  className="block w-full text-left text-base font-medium text-text-secondary hover:text-text-primary transition-colors py-2 pl-3"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              href={`/${urlLocale}#contact`}
              onClick={(e) => { if (scrollTo("#contact")) e.preventDefault(); }}
              className="block w-full text-center bg-accent hover:bg-accent-dark text-white text-sm font-semibold px-5 py-3 rounded-lg transition-colors mt-2"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
