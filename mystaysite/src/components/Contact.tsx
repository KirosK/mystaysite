"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useLang } from "@/lib/language-context";
import { useAnimateOnScroll } from "@/lib/use-animate-on-scroll";
import { trackLead, trackWhatsApp, trackPhone, trackEmail } from "@/lib/analytics";

const PHONE = "306974585063";
const EMAIL = "info@mystaysite.com";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}


export default function Contact() {
  const { t, lang } = useLang();
  const ref = useAnimateOnScroll();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);

  // Anti-spam: honeypot + time guard
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [mountedAt] = useState<number>(() => Date.now());
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const turnstileWidgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    const renderWidget = () => {
      if (!window.turnstile || turnstileWidgetId.current) return;
      const el = document.getElementById("cf-turnstile-contact");
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
    contact.trim() !== "" &&
    !submitting &&
    (!TURNSTILE_SITE_KEY || turnstileToken !== "");

  const whatsappPrefill = encodeURIComponent(t.contact.whatsappPrefill);
  const whatsappUrl = `https://wa.me/${PHONE}?text=${whatsappPrefill}`;
  const emailSubject = encodeURIComponent(
    lang === "gr" ? "Ζητώ προσφορά για website" : "Website quote request"
  );
  const emailBody = encodeURIComponent(
    lang === "gr"
      ? "Γεια σας! Θα ήθελα προσφορά για website. "
      : "Hi! I'd like a quote for a website. "
  );
  const emailUrl = `mailto:${EMAIL}?subject=${emailSubject}&body=${emailBody}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);

    const looksLikeEmail = contact.includes("@");
    const apiPayload = {
      type: "contact" as const,
      name,
      email: looksLikeEmail ? contact : "",
      contact: looksLikeEmail ? "" : contact,
      link,
      message,
      locale: lang === "en" ? "en" : "el",
      source: "mystaysite.com/contact",
      _gotcha: honeypotRef.current?.value ?? "",
      _ts: mountedAt,
      turnstileToken,
    };

    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      });
    } catch {
      // Silent — WhatsApp fallback still works below.
    }

    const msg = [
      lang === "gr" ? "Νέο αίτημα προσφοράς:" : "New quote request:",
      "",
      `${t.contact.nameLabel}: ${name}`,
      `${t.contact.contactLabel}: ${contact}`,
      ...(link ? [`Link: ${link}`] : []),
      ...(message ? [`${t.contact.messageLabel}: ${message}`] : []),
    ].join("\n");

    window.open(
      `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
    trackLead("contact_form");
    setStatus("success");
    setSubmitting(false);

    if (TURNSTILE_SITE_KEY && window.turnstile) {
      try {
        window.turnstile.reset(turnstileWidgetId.current ?? undefined);
      } catch {
        // ignore
      }
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 overflow-hidden">
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="lazyOnload"
        />
      )}
      <div className="absolute inset-0 bg-[#0F172A]" />
      <div
        className="absolute inset-0 opacity-[0.08] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=60')",
        }}
      />

      <div
        ref={ref}
        className="relative max-w-6xl mx-auto px-4 sm:px-6 animate-fade-in-up"
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4">
            {t.contact.sectionTitle}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 py-4 px-3 bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-sm rounded-lg transition-colors shadow-lg shadow-[#25D366]/20"
              >
                <WhatsAppIcon className="w-7 h-7 fill-white shrink-0" />
                WhatsApp
              </a>

              <a
                href={emailUrl}
                className="flex flex-col items-center justify-center gap-2 py-4 px-3 bg-[#EA4335] hover:bg-[#d33426] text-white font-bold text-sm rounded-lg transition-colors shadow-lg shadow-[#EA4335]/20"
              >
                <svg className="w-7 h-7 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Email
              </a>
            </div>

            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-gray-500 text-sm">{t.contact.divider}</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {status === "success" ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
                <div className="text-3xl mb-3">✅</div>
                <p className="text-white font-semibold text-lg">
                  {t.contact.success}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Honeypot */}
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

                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-300 mb-1.5">
                    {t.contact.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.contact.namePlaceholder}
                    className="w-full px-4 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-info" className="block text-sm font-semibold text-gray-300 mb-1.5">
                    {t.contact.contactLabel}{" "}
                    <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-info"
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={t.contact.contactPlaceholder}
                    className="w-full px-4 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-link" className="block text-sm font-semibold text-gray-300 mb-1.5">
                    {t.contact.linkLabel}
                  </label>
                  <input
                    id="contact-link"
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder={t.contact.linkPlaceholder}
                    className="w-full px-4 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-300 mb-1.5">
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.messagePlaceholder}
                    rows={3}
                    className="w-full px-4 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors resize-none"
                  />
                </div>

                {TURNSTILE_SITE_KEY && (
                  <div
                    id="cf-turnstile-contact"
                    className="flex justify-center"
                  />
                )}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full py-3.5 rounded-lg bg-accent hover:bg-accent-dark text-white font-bold text-base transition-colors shadow-lg shadow-accent/20 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t.contact.cta}
                </button>

                <p className="text-center text-gray-500 text-xs pt-1">
                  {t.contact.responseTime}
                </p>

                {status === "error" && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsApp("contact_form_error")}
                    className="block text-center text-sm text-[#25D366] hover:underline pt-1"
                  >
                    {t.contact.error}
                  </a>
                )}
              </form>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-5">
              <a
                href={`tel:+${PHONE}`}
                onClick={() => trackPhone("contact_section")}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
              >
                <span className="w-10 h-10 rounded-lg bg-white/5 group-hover:bg-white/10 flex items-center justify-center shrink-0 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                <span className="text-sm font-medium">{t.contact.infoPhone}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsApp("contact_section")}
                className="flex items-center gap-3 text-gray-300 hover:text-[#25D366] transition-colors group"
              >
                <span className="w-10 h-10 rounded-lg bg-white/5 group-hover:bg-[#25D366]/10 flex items-center justify-center shrink-0 transition-colors">
                  <WhatsAppIcon className="w-5 h-5 fill-current" />
                </span>
                <span className="text-sm font-medium">WhatsApp</span>
              </a>

              <a
                href={emailUrl}
                onClick={() => trackEmail("contact_section")}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
              >
                <span className="w-10 h-10 rounded-lg bg-white/5 group-hover:bg-white/10 flex items-center justify-center shrink-0 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <span className="text-sm font-medium">{t.contact.infoEmail}</span>
              </a>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
