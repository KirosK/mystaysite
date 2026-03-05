"use client";

import { useLang } from "@/lib/language-context";

function PaymentIcon({ type }: { type: string }) {
  const className = "w-3.5 h-3.5 text-gray-400 shrink-0";
  switch (type) {
    case "bank":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
        </svg>
      );
    case "stripe":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.549-2.354 1.549-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.571-7.305z" />
        </svg>
      );
    case "viva":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45v6.74L12 18.82l-6.9-3.45V7.63L12 4.18z" />
        </svg>
      );
    case "crypto":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83M19.07 4.93l-2.83 2.83M7.76 16.24l-2.83 2.83" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    case "mastercard":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <circle cx="9" cy="12" r="7" fill="currentColor" opacity="0.7" />
          <circle cx="15" cy="12" r="7" fill="currentColor" opacity="0.5" />
        </svg>
      );
    case "amex":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
          <path d="M7 9l3 4 2-3 2 4h2" />
        </svg>
      );
    default:
      return null;
  }
}

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
              <div className="font-heading">
                <span className="text-lg font-extrabold text-white">my</span>
                <span className="text-lg font-extrabold text-primary">stay</span>
                <span className="text-lg font-extrabold text-white">site</span>
              </div>
            </div>
            <p className="text-sm text-gray-400">{t.footer.tagline}</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              {t.footer.quickLinkItems.map((item, i) => {
                const targets = ["/#portfolio", "/#pricing", "/#faq", "/#contact"];
                return (
                  <li key={i}>
                    <a
                      href={targets[i]}
                      className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Portfolio */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3">{t.footer.portfolio}</h3>
            <ul className="space-y-2">
              {t.footer.portfolioItems.map((item: { label: string; url: string }) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    {...(item.url.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3">{t.footer.legal}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/terms" className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
                  {t.footer.legalList[0]}
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
                  {t.footer.legalList[1]}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment methods */}
        <div className="border-t border-white/10 pt-6 mb-4">
          <p className="text-xs text-gray-400 mb-2">{t.footer.paymentMethods}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {t.footer.paymentMethodsItems.map((item: { key: string; label: string }, i: number) => (
              <span key={item.key} className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                <PaymentIcon type={item.key} />
                <span>{item.label}</span>
                {i < t.footer.paymentMethodsItems.length - 1 && <span className="text-gray-600">·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">{t.footer.copyright}</p>
          <a
            href="https://mystaysite.com?ref=badge"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 text-gray-400 text-xs hover:text-gray-300 transition-colors group"
          >
            <div className="w-4 h-4 bg-primary rounded flex items-center justify-center group-hover:shadow-sm transition-shadow">
              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <span className="font-heading">
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
