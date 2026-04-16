import Link from "next/link";

interface ServiceData {
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  faq: { q: string; a: string }[];
}

interface ServicePageProps {
  data: ServiceData;
  locale: string;
}

export default function ServicePage({ data, locale }: ServicePageProps) {
  const isEn = locale === "en";
  const urlLocale = isEn ? "en" : "el";
  const labels = {
    whatsIncluded: isEn ? "What's included" : "Τι περιλαμβάνει",
    faqTitle: isEn ? "Frequently asked questions" : "Συχνές ερωτήσεις",
    ctaTitle: isEn ? "Get started today" : "Ξεκινήστε σήμερα",
    ctaText: isEn
      ? "Request a free evaluation of your property and see how we can increase your bookings."
      : "Ζητήστε δωρεάν αξιολόγηση του καταλύματός σας και δείτε πώς μπορούμε να αυξήσουμε τις κρατήσεις σας.",
    ctaPrimary: isEn ? "Get a Quote" : "Ζητήστε Προσφορά",
    ctaSecondary: isEn ? "See our work" : "Δείτε δείγματα",
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] to-[#1E3A5F]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
            {data.title}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            {data.subtitle}
          </p>
          <div className="inline-block bg-white/10 backdrop-blur border border-white/20 rounded-xl px-6 py-3">
            <span className="text-2xl font-extrabold text-white">{data.price}</span>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-12">
            {labels.whatsIncluded}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {data.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100"
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
                <span className="text-sm font-medium text-gray-800">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-12">
            {labels.faqTitle}
          </h2>
          <div className="space-y-4">
            {data.faq.map((item, i) => (
              <details
                key={i}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden group"
              >
                <summary className="cursor-pointer px-6 py-4 text-sm font-bold text-gray-900 flex items-center justify-between">
                  {item.q}
                  <svg
                    className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
            {labels.ctaTitle}
          </h2>
          <p className="text-gray-600 mb-8">{labels.ctaText}</p>
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
