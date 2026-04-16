import type { Metadata, Viewport } from "next";
import { DM_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import SiteChrome from "@/components/SiteChrome";

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

  return (
    <html lang={htmlLang} className={`scroll-smooth ${dmSans.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="alternate" hrefLang="el" href="https://mystaysite.com/el" />
        <link rel="alternate" hrefLang="en" href="https://mystaysite.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://mystaysite.com/el" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                name: "MyStaySite",
                url: "https://mystaysite.com",
                description:
                  "Κατασκευή επαγγελματικών websites για ενοικιαζόμενα δωμάτια, βίλες, studios και apartments. Online κρατήσεις, κριτικές, SEO.",
                areaServed: { "@type": "Place", name: "Worldwide" },
                serviceType: [
                  "Κατασκευή ιστοσελίδας",
                  "Web Design",
                  "Website για ενοικιαζόμενα δωμάτια",
                  "SEO για καταλύματα",
                ],
                telephone: "+30 697 458 5063",
                email: "info@mystaysite.com",
                address: { "@type": "PostalAddress", addressCountry: "GR" },
                priceRange: "€349 - €899+",
                sameAs: [],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "MyStaySite",
                url: "https://mystaysite.com",
                inLanguage: ["el", "en"],
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Πόσο κοστίζει ένα website για ενοικιαζόμενα δωμάτια;",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Κάθε κατάλυμα έχει διαφορετικές ανάγκες. Ζητήστε προσφορά και σας ετοιμάζουμε προσωπικό πλάνο. Ξεκινάμε με 30% προκαταβολή.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Σε πόσο καιρό παραδίδεται το website;",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Το website παραδίδεται σε 2-5 εργάσιμες ημέρες, ανάλογα με το πακέτο.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Χρειάζομαι website αν έχω ήδη Booking.com;",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Ναι. Με δικό σου website παίρνεις κρατήσεις χωρίς 15-20% προμήθεια, εμφανίζεσαι στο Google, και δείχνεις τις κριτικές σου.",
                    },
                  },
                ],
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
