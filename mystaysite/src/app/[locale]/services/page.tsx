import type { Metadata } from "next";
import Link from "next/link";
import { SERVICE_CATEGORIES, SERVICE_BUNDLES } from "@/lib/services-catalog";

type Locale = "el" | "en";

export async function generateStaticParams() {
  return [{ locale: "el" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    title: {
      absolute: isEn
        ? "All Services for Vacation Rentals | MyStaySite"
        : "Όλες οι Υπηρεσίες για Καταλύματα | MyStaySite",
    },
    description: isEn
      ? "Website, SEO, Google Ads, social media, property management, dynamic pricing, legal compliance, branding. Everything a vacation rental needs, remote."
      : "Website, SEO, Google Ads, social media, διαχείριση καταλύματος, dynamic pricing, νομικά, branding. Ό,τι χρειάζεται ένα κατάλυμα, remote.",
    openGraph: {
      title: isEn
        ? "All Services for Vacation Rentals | MyStaySite"
        : "Όλες οι Υπηρεσίες για Καταλύματα | MyStaySite",
      url: `https://mystaysite.com/${locale}/services`,
    },
    alternates: {
      canonical: `https://mystaysite.com/${locale}/services`,
      languages: {
        el: "https://mystaysite.com/el/services",
        en: "https://mystaysite.com/en/services",
      },
    },
  };
}

function ServiceIcon({ keyName }: { keyName?: string }) {
  const path = (() => {
    switch (keyName) {
      case "building":
        return "M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 13h6M9 10h6";
      case "sync":
        return "M4 4v6h6M20 20v-6h-6M5 19a9 9 0 0014.85-5M19 5a9 9 0 00-14.85 5";
      case "chart":
        return "M3 3v18h18M7 14l4-4 4 4 5-5";
      case "book":
        return "M4 4v16M4 4h13a3 3 0 013 3v10a3 3 0 01-3 3H4M8 8h6M8 12h6";
      case "chat":
        return "M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z";
      case "lock":
        return "M5 11h14v10H5zM8 11V7a4 4 0 118 0v4";
      case "ads":
        return "M3 12h3l3-9 6 18 3-9h3";
      case "search":
        return "M21 21l-4.35-4.35M11 18a7 7 0 110-14 7 7 0 010 14z";
      case "social":
        return "M17 11a3 3 0 100-6 3 3 0 000 6zM7 19a3 3 0 100-6 3 3 0 000 6zM17 19a3 3 0 100-6 3 3 0 000 6zM14.5 9.5l-5 3.5M14.5 15.5l-5-3";
      case "pin":
        return "M12 22s8-7.58 8-13a8 8 0 10-16 0c0 5.42 8 13 8 13zM12 12a3 3 0 100-6 3 3 0 000 6z";
      case "mail":
        return "M4 6h16v12H4zM4 6l8 7 8-7";
      case "star":
        return "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z";
      case "list":
        return "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01";
      case "web":
        return "M3 6h18v12H3zM3 10h18M7 6v4";
      case "audit":
        return "M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
      case "wrench":
        return "M21 11.5a8.38 8.38 0 01-15.5 4L3 20l4.5-2.5M15 9l4-4M20 4l-4 4";
      case "target":
        return "M12 2v4M12 18v4M2 12h4M18 12h4M12 8a4 4 0 100 8 4 4 0 000-8z";
      case "report":
        return "M9 11h6m-6 4h4M8 3h8l4 4v13a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z";
      case "doc":
        return "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6";
      case "shield":
        return "M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4z";
      case "palette":
        return "M12 21a9 9 0 110-18 9 9 0 019 9c0 1.66-1.34 3-3 3h-1a2 2 0 00-2 2c0 .55.22 1.05.59 1.41.36.36.58.86.58 1.41 0 1.1-.9 2-2 2h-2.17z";
      case "printer":
        return "M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z";
      default:
        return "M5 13l4 4L19 7";
    }
  })();
  return (
    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

export default async function ServicesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = locale === "en" ? "en" : "el";
  const isEn = loc === "en";
  const urlLocale = loc;

  const copy = {
    title: isEn ? "All Services" : "Όλες οι Υπηρεσίες",
    subtitle: isEn
      ? "Everything a vacation rental needs to grow online: website, marketing, operations and management. All remote."
      : "Ό,τι χρειάζεται ένα κατάλυμα για να αναπτυχθεί online: website, marketing, λειτουργία και διαχείριση. Όλα remote.",
    learnMore: isEn ? "Learn more →" : "Μάθετε περισσότερα →",
    startNow: isEn ? "Start now" : "Ξεκινήστε τώρα",
    bundlesTitle: isEn ? "Bundled Packages" : "Έτοιμα Πακέτα",
    bundlesSubtitle: isEn
      ? "Combine multiple services at a better price."
      : "Συνδύασε πολλαπλές υπηρεσίες σε καλύτερη τιμή.",
    bundleIncludes: isEn ? "Includes:" : "Περιλαμβάνει:",
    ctaTitle: isEn
      ? "Not sure what you need?"
      : "Δεν ξέρεις τι χρειάζεσαι;",
    ctaSubtitle: isEn
      ? "Send us your Booking or Airbnb link and we'll recommend the right package in 24 hours."
      : "Στείλε μας το Booking ή Airbnb link σου και σου προτείνουμε το σωστό πακέτο σε 24 ώρες.",
    ctaButton: isEn ? "Get a personalized recommendation" : "Ζήτα εξατομικευμένη πρόταση",
    popular: isEn ? "Most popular" : "Πιο δημοφιλές",
  };

  return (
    <>
      <div className="h-16 md:h-18" />

      <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-br from-[#0F172A] to-[#1E3A5F]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,_white_0%,_transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
            {copy.title}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {copy.subtitle}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
          {SERVICE_CATEGORIES.map((cat) => (
            <div key={cat.id} id={cat.id}>
              <div className="mb-8 max-w-3xl">
                <div className={`inline-block h-1.5 w-12 rounded-full bg-gradient-to-r ${cat.accent} mb-4`} />
                <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-2">
                  {cat.title[loc]}
                </h2>
                <p className="text-text-secondary text-base">
                  {cat.subtitle[loc]}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item) => {
                  const hasDetailPage = Boolean(item.href);
                  const cardBody = (
                    <>
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <ServiceIcon keyName={item.iconKey} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-text-primary text-base leading-snug">
                              {item.title[loc]}
                            </h3>
                            {item.badge && (
                              <span className="bg-accent/10 text-accent text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                                {item.badge[loc]}
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-bold text-primary mt-1">
                            {item.price[loc]}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {item.description[loc]}
                      </p>
                      {hasDetailPage && (
                        <span className="mt-3 text-sm font-semibold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          {copy.learnMore}
                        </span>
                      )}
                    </>
                  );

                  return hasDetailPage ? (
                    <Link
                      key={item.id}
                      href={`/${urlLocale}${item.href}`}
                      className="group bg-white border border-gray-200 rounded-2xl p-5 hover:border-primary/40 hover:shadow-md transition-all block"
                    >
                      {cardBody}
                    </Link>
                  ) : (
                    <div
                      key={item.id}
                      className="bg-white border border-gray-200 rounded-2xl p-5"
                    >
                      {cardBody}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-bg-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3">
              {copy.bundlesTitle}
            </h2>
            <p className="text-text-secondary text-base sm:text-lg">
              {copy.bundlesSubtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICE_BUNDLES.map((b) => (
              <div
                key={b.id}
                className={`relative bg-white rounded-2xl p-6 border ${
                  b.highlight
                    ? "border-accent shadow-xl shadow-accent/10"
                    : "border-gray-200"
                }`}
              >
                {b.highlight && (
                  <span className="absolute -top-3 left-6 bg-accent text-white text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                    {copy.popular}
                  </span>
                )}
                <h3 className="text-xl font-extrabold text-text-primary mb-2">
                  {b.name[loc]}
                </h3>
                <p className="text-sm text-text-secondary mb-4">{b.target[loc]}</p>
                <div className="text-2xl font-extrabold text-primary mb-5">
                  {b.price[loc]}
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-3">
                  {copy.bundleIncludes}
                </p>
                <ul className="space-y-2 mb-6">
                  {b.includes[loc].map((inc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-primary">
                      <svg
                        className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${urlLocale}#contact`}
                  className={`block w-full text-center text-sm font-bold px-5 py-3 rounded-lg transition-colors ${
                    b.highlight
                      ? "bg-accent hover:bg-accent-dark text-white shadow-lg shadow-accent/20"
                      : "bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                >
                  {copy.startNow}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">{copy.ctaTitle}</h2>
          <p className="text-text-secondary text-base sm:text-lg mb-7">
            {copy.ctaSubtitle}
          </p>
          <Link
            href={`/${urlLocale}#contact`}
            className="inline-block bg-accent hover:bg-accent-dark text-white font-bold text-base px-8 py-3.5 rounded-lg transition-colors shadow-lg shadow-accent/20"
          >
            {copy.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
