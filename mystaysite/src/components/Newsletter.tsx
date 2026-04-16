"use client";

import { useState } from "react";

const FORMSPREE_FORM_ID = "xeerjqzn";

type Variant = "full" | "compact";

interface NewsletterProps {
  locale?: string;
  variant?: Variant;
}

export default function Newsletter({
  locale = "el",
  variant = "full",
}: NewsletterProps) {
  const isEn = locale === "en";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [consent, setConsent] = useState(false);

  const copy = {
    eyebrow: isEn ? "Newsletter" : "Newsletter",
    heading: isEn
      ? "Tips για περισσότερες direct bookings, κάθε μήνα"
      : "Tips για περισσότερες direct bookings, κάθε μήνα",
    headingEn: "More direct bookings, every month",
    subtitle: isEn
      ? "One email per month with actionable tips on SEO, listings and guest experience for Greek vacation rentals. No spam, unsubscribe anytime."
      : "Ένα email τον μήνα με πρακτικά tips για SEO, listings και guest experience σε ελληνικά καταλύματα. Χωρίς spam, unsubscribe όποτε θες.",
    placeholder: isEn ? "your@email.com" : "your@email.com",
    cta: isEn ? "Subscribe" : "Εγγραφή",
    ctaLoading: isEn ? "Sending..." : "Αποστολή...",
    success: isEn
      ? "You're in! Check your inbox for a confirmation."
      : "Εγγράφηκες! Θα λάβεις επιβεβαίωση στο email σου.",
    error: isEn
      ? "Something went wrong. Please try again."
      : "Κάτι πήγε στραβά. Δοκίμασε ξανά.",
    privacy: isEn
      ? "I agree to receive email updates. See our"
      : "Συμφωνώ να λαμβάνω email updates. Δες την",
    privacyLink: isEn ? "Privacy Policy" : "Πολιτική Απορρήτου",
    privacyRequired: isEn
      ? "Please accept the privacy policy."
      : "Παρακαλώ αποδέξου την πολιτική απορρήτου.",
    bullets: isEn
      ? [
          "Actionable SEO & marketing tips",
          "Case studies from real Greek properties",
          "No spam. Unsubscribe with one click.",
        ]
      : [
          "Πρακτικά tips SEO & marketing",
          "Case studies από ελληνικά καταλύματα",
          "Χωρίς spam. Unsubscribe με ένα click.",
        ],
  };

  const headline = isEn ? copy.headingEn : copy.heading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          _subject: `Newsletter signup (${locale})`,
          source: "newsletter",
          locale,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const privacyHref = `/${isEn ? "en" : "el"}/privacy`;

  if (variant === "compact") {
    return (
      <div className="w-full">
        {status === "success" ? (
          <p className="text-sm text-emerald-400">{copy.success}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <label className="block text-xs font-bold text-white/90 uppercase tracking-wider mb-1">
              {copy.eyebrow}
            </label>
            <p className="text-xs text-gray-400 mb-2">{copy.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={copy.placeholder}
                className="flex-1 min-w-0 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-500 text-sm px-3 py-2 focus:outline-none focus:border-primary"
                disabled={status === "loading"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-primary hover:bg-primary-dark text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors disabled:opacity-60"
              >
                {status === "loading" ? copy.ctaLoading : copy.cta}
              </button>
            </div>
            <label className="flex items-start gap-2 text-[11px] text-gray-400 leading-snug">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 shrink-0 accent-primary"
              />
              <span>
                {copy.privacy}{" "}
                <a
                  href={privacyHref}
                  className="underline hover:text-gray-200"
                >
                  {copy.privacyLink}
                </a>
                .
              </span>
            </label>
            {status === "error" && (
              <p className="text-xs text-red-400">
                {!consent ? copy.privacyRequired : copy.error}
              </p>
            )}
          </form>
        )}
      </div>
    );
  }

  return (
    <section className="my-12 rounded-2xl bg-gradient-to-br from-primary/10 via-white to-accent/10 border border-primary/20 p-6 sm:p-8 md:p-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16v12H4zM4 6l8 7 8-7" />
            </svg>
          </div>
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            {copy.eyebrow}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-3">
          {headline}
        </h3>
        <p className="text-text-secondary mb-5">{copy.subtitle}</p>

        <ul className="grid sm:grid-cols-3 gap-2 mb-6">
          {copy.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-text-primary">
              <svg
                className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {status === "success" ? (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <svg
              className="w-5 h-5 text-emerald-600 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <p className="text-sm font-semibold text-emerald-800">{copy.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={copy.placeholder}
                className="flex-1 min-w-0 rounded-lg bg-white border border-gray-300 text-text-primary placeholder:text-gray-400 text-base px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                disabled={status === "loading"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-lg transition-colors shadow-sm disabled:opacity-60"
              >
                {status === "loading" ? copy.ctaLoading : copy.cta}
              </button>
            </div>
            <label className="flex items-start gap-2 text-xs text-text-secondary leading-snug">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 shrink-0 accent-primary"
              />
              <span>
                {copy.privacy}{" "}
                <a
                  href={privacyHref}
                  className="underline hover:text-text-primary"
                >
                  {copy.privacyLink}
                </a>
                .
              </span>
            </label>
            {status === "error" && (
              <p className="text-xs text-red-600">
                {!consent ? copy.privacyRequired : copy.error}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
