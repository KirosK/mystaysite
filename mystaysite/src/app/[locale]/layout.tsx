import type { Metadata, Viewport } from "next";
import { DM_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import SiteChrome from "@/components/SiteChrome";
import { THEME_INIT_SCRIPT } from "@/lib/theme-context";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F172A",
};

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
    metadataBase: new URL("https://mystaysite.com"),
    title: {
      default: isEn
        ? "MyStaySite | Websites for Vacation Rentals & Accommodations"
        : "MyStaySite | Κατασκευή Website για Ενοικιαζόμενα Δωμάτια & Καταλύματα",
      template: "%s | MyStaySite",
    },
    description: isEn
      ? "We build professional websites for vacation rentals in Greece. Direct bookings without Booking commission. 3 live sites. Get a quote."
      : "Φτιάχνουμε επαγγελματικά websites για τουριστικά καταλύματα στην Ελλάδα. Direct bookings χωρίς προμήθεια Booking. 3 live sites. Ζητήστε προσφορά.",
    keywords: [
      "κατασκευή ιστοσελίδας ενοικιαζόμενα δωμάτια",
      "website ενοικιαζόμενα δωμάτια",
      "κατασκευή site κατάλυμα",
      "website για airbnb",
      "website για booking",
      "direct bookings greece",
      "mystaysite",
    ],
    openGraph: {
      title: isEn
        ? "MyStaySite | Websites for Vacation Rentals"
        : "MyStaySite | Κατασκευή Website για Ενοικιαζόμενα Δωμάτια",
      description: isEn
        ? "Professional websites for vacation rentals. Direct bookings, reviews, SEO. Get a quote."
        : "Φτιάχνουμε επαγγελματικά websites για τουριστικά καταλύματα. Direct bookings, κριτικές, SEO. Ζητήστε προσφορά.",
      url: `https://mystaysite.com/${locale}`,
      siteName: "MyStaySite",
      locale: isEn ? "en_US" : "el_GR",
      alternateLocale: isEn ? "el_GR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isEn
        ? "MyStaySite | Websites for Vacation Rentals"
        : "MyStaySite | Website για Ενοικιαζόμενα Δωμάτια",
      description: isEn
        ? "Professional websites for vacation rentals. Direct bookings, reviews, SEO."
        : "Φτιάχνουμε επαγγελματικά websites για τουριστικά καταλύματα. Direct bookings, κριτικές, SEO.",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `https://mystaysite.com/${locale}`,
      languages: {
        el: "https://mystaysite.com/el",
        en: "https://mystaysite.com/en",
      },
    },
    verification: {
      google: "googlefc417ebe34185aed",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const htmlLang = locale === "en" ? "en" : "el";
  const isEn = htmlLang === "en";

  const faqEl = [
    {
      q: "Πόσο κοστίζει ένα website για ενοικιαζόμενα δωμάτια;",
      a: "Κάθε κατάλυμα έχει διαφορετικές ανάγκες. Ζητήστε προσφορά και σας ετοιμάζουμε προσωπικό πλάνο. Ξεκινάμε με 30% προκαταβολή.",
    },
    {
      q: "Σε πόσο καιρό παραδίδεται το website;",
      a: "Το website παραδίδεται σε 2-5 εργάσιμες ημέρες, ανάλογα με το πακέτο.",
    },
    {
      q: "Χρειάζομαι website αν έχω ήδη Booking.com;",
      a: "Ναι. Με δικό σου website παίρνεις κρατήσεις χωρίς 15-20% προμήθεια, εμφανίζεσαι στο Google, και δείχνεις τις κριτικές σου.",
    },
  ];
  const faqEn = [
    {
      q: "How much does a website for vacation rentals cost?",
      a: "Every property has different needs. Request a quote and we will prepare a tailored plan. We start with a 30% deposit.",
    },
    {
      q: "How long does delivery take?",
      a: "The website is delivered within 2-5 business days, depending on the package.",
    },
    {
      q: "Do I need a website if I already have Booking.com?",
      a: "Yes. With your own website you receive bookings without a 15-20% commission, you appear on Google, and you showcase your reviews in one place.",
    },
  ];
  const faq = isEn ? faqEn : faqEl;

  return (
    <html lang={htmlLang} className={`scroll-smooth ${dmSans.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <link rel="alternate" hrefLang="el" href="https://mystaysite.com/el" />
        <link rel="alternate" hrefLang="en" href="https://mystaysite.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://mystaysite.com/el" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://mystaysite.com/#organization",
                name: "MyStaySite",
                legalName: "MyStaySite",
                url: "https://mystaysite.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://mystaysite.com/icon",
                  width: 512,
                  height: 512,
                },
                image: "https://mystaysite.com/og.png",
                description: isEn
                  ? "MyStaySite builds professional websites for vacation rentals, villas and studios in Greece."
                  : "Η MyStaySite κατασκευάζει επαγγελματικά websites για ενοικιαζόμενα δωμάτια, βίλες και studios στην Ελλάδα.",
                email: "info@mystaysite.com",
                telephone: "+30 697 458 5063",
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    telephone: "+30 697 458 5063",
                    email: "info@mystaysite.com",
                    availableLanguage: ["Greek", "English"],
                    areaServed: "GR",
                  },
                ],
                founder: {
                  "@type": "Person",
                  name: "Κύρος",
                  jobTitle: "Founder",
                  image: "https://mystaysite.com/team/kyros.jpg",
                  worksFor: { "@id": "https://mystaysite.com/#organization" },
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "@id": "https://mystaysite.com/#business",
                name: "MyStaySite",
                url: "https://mystaysite.com",
                description: isEn
                  ? "Professional website design for vacation rentals, villas, studios and apartments in Greece. Direct bookings, reviews, SEO."
                  : "Κατασκευή επαγγελματικών websites για ενοικιαζόμενα δωμάτια, βίλες, studios και apartments στην Ελλάδα. Online κρατήσεις, κριτικές, SEO.",
                areaServed: [
                  { "@type": "Country", name: "Greece" },
                  { "@type": "AdministrativeArea", name: "Central Macedonia" },
                  { "@type": "AdministrativeArea", name: "Halkidiki" },
                  { "@type": "AdministrativeArea", name: "Cyclades" },
                  { "@type": "AdministrativeArea", name: "Crete" },
                ],
                serviceType: isEn
                  ? [
                      "Website design",
                      "Web development",
                      "Vacation rental website",
                      "SEO for accommodations",
                      "Google Business Profile",
                    ]
                  : [
                      "Κατασκευή ιστοσελίδας",
                      "Web Design",
                      "Website για ενοικιαζόμενα δωμάτια",
                      "SEO για καταλύματα",
                      "Google Business Profile",
                    ],
                telephone: "+30 697 458 5063",
                email: "info@mystaysite.com",
                image: "https://mystaysite.com/og.png",
                logo: "https://mystaysite.com/icon",
                address: {
                  "@type": "PostalAddress",
                  addressCountry: "GR",
                  addressLocality: "Thessaloniki",
                  addressRegion: "Central Macedonia",
                },
                priceRange: "€349 - €899+",
                inLanguage: ["el", "en"],
                currenciesAccepted: "EUR",
                paymentAccepted: isEn
                  ? "Bank transfer, Revolut, IRIS"
                  : "Τραπεζική κατάθεση, Revolut, IRIS",
                openingHoursSpecification: {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "20:00",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://mystaysite.com/#website",
                name: "MyStaySite",
                url: "https://mystaysite.com",
                inLanguage: ["el", "en"],
                publisher: { "@id": "https://mystaysite.com/#organization" },
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://mystaysite.com/el/blog?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faq.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
            ]),
          }}
        />
      </head>
      <body className="antialiased">
        <SiteChrome locale={htmlLang}>{children}</SiteChrome>
      </body>
    </html>
  );
}
