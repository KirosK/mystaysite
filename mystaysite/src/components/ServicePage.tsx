import Link from "next/link";

interface ServiceData {
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  faq: { q: string; a: string }[];
  priceNote?: string;
}

interface ServicePageProps {
  data: ServiceData;
  locale: string;
  slug?: string;
}

export default function ServicePage({ data, locale, slug }: ServicePageProps) {
  const isEn = locale === "en";
  const urlLocale = isEn ? "en" : "el";
  const serviceUrl = slug
    ? `https://mystaysite.com/${urlLocale}/services/${slug}`
    : undefined;
  const isQuote =
    data.price.toLowerCase().includes("ζητήστε") ||
    data.price.toLowerCase().includes("προσφορά") ||
    data.price.toLowerCase().includes("quote") ||
    data.price.toLowerCase().includes("custom");
  const labels = {
    whatsIncluded: isEn ? "What's included" : "Τι περιλαμβάνει",
    faqTitle: isEn ? "Frequently asked questions" : "Συχνές ερωτήσεις",
    ctaTitle: isQuote
      ? isEn
        ? "Request your custom quote"
        : "Ζητήστε εξατομικευμένη προσφορά"
      : isEn
      ? "Get started today"
      : "Ξεκινήστε σήμερα",
    ctaText: isQuote
      ? isEn
        ? "Send us your Booking or Airbnb link and we'll reply with a tailored quote within 24 hours."
        : "Στείλε μας το Booking ή Airbnb link σου και σου απαντάμε με εξατομικευμένη προσφορά σε 24 ώρες."
      : isEn
      ? "Tell us about your property and we'll get you started within 24 hours."
      : "Πες μας για το κατάλυμά σου και ξεκινάμε μέσα σε 24 ώρες.",
    ctaPrimary: isQuote
      ? isEn
        ? "Get a Quote"
        : "Ζητήστε Προσφορά"
      : isEn
      ? "Start now"
      : "Ξεκινήστε τώρα",
    ctaSecondary: isEn ? "See our work" : "Δείτε δείγματα",
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    description: data.subtitle,
    url: serviceUrl,
    provider: { "@id": "https://mystaysite.com/#organization" },
    areaServed: [
      { "@type": "Country", name: "Greece" },
      { "@type": "AdministrativeArea", name: "Cyclades" },
      { "@type": "AdministrativeArea", name: "Halkidiki" },
    ],
    ...(isQuote
      ? {}
      : {
          offers: {
            "@type": "Offer",
            price: data.price.replace(/[^\d]/g, ""),
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: serviceUrl,
          },
        }),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F1A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] to-[#1E3A5F]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
            {data.title}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            {data.subtitle}
          </p>
          <div className="inline-flex flex-col items-center gap-1 bg-white/10 backdrop-blur border border-white/20 rounded-xl px-6 py-3">
            <span className="text-2xl font-extrabold text-white">
              {isQuote
                ? isEn
                  ? "Custom Pricing"
                  : "Προσαρμοσμένη Τιμή"
                : data.price}
            </span>
            {isQuote && (
              <span className="text-xs text-gray-300">
                {isEn
                  ? "Based on property size & needs"
                  : "Ανάλογα με το μέγεθος και τις ανάγκες"}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-12 text-text-primary">
            {labels.whatsIncluded}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {data.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-100 dark:border-white/10"
              >
                <svg
                  className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50 dark:bg-[#0F172A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-12 text-text-primary">
            {labels.faqTitle}
          </h2>
          <div className="space-y-4">
            {data.faq.map((item, i) => (
              <details
                key={i}
                className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden group"
              >
                <summary className="cursor-pointer px-6 py-4 text-sm font-bold text-gray-900 dark:text-white flex items-center justify-between">
                  {item.q}
                  <svg
                    className="w-4 h-4 text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-text-primary">
            {labels.ctaTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{labels.ctaText}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${urlLocale}#contact`}
              className="bg-accent hover:bg-accent-dark text-white font-bold text-base px-8 py-3.5 rounded-lg transition-colors shadow-lg shadow-accent/20"
            >
              {labels.ctaPrimary}
            </Link>
            <Link
              href={`/${urlLocale}#portfolio`}
              className="text-primary hover:text-primary-dark font-medium text-base transition-colors underline underline-offset-4"
            >
              {labels.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
