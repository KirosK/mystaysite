"use client";

import { useLang } from "@/lib/language-context";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-bg-darker py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span className="text-lg font-extrabold text-white">my</span>
                <span className="text-lg font-extrabold text-primary">stay</span>
                <span className="text-lg font-extrabold text-white">site</span>
              </div>
            </div>
            <p className="text-sm text-gray-400">{t.footer.tagline}</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {t.footer.quickLinkItems.map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => {
                      const targets = ["#portfolio", "#pricing", "#faq", "#contact"];
                      const el = document.querySelector(targets[i]);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">{t.footer.legal}</h4>
            <ul className="space-y-2">
              <li>
                <a href="/terms" className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
                  {t.footer.legalList[0]}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">{t.footer.copyright}</p>
          <a
            href="https://mystaysite.com?ref=badge"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 text-gray-500 text-xs hover:text-gray-300 transition-colors group"
          >
            <div className="w-4 h-4 bg-primary rounded flex items-center justify-center group-hover:shadow-sm transition-shadow">
              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Built by{" "}
              <span className="font-bold text-gray-400 group-hover:text-gray-200">my</span>
              <span className="font-bold text-primary group-hover:text-primary">stay</span>
              <span className="font-bold text-gray-400 group-hover:text-gray-200">site</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
