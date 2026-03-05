import type { Metadata, Viewport } from "next";
import { DM_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F172A",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mystaysite.com"),
  title: {
    default:
      "MyStaySite | Κατασκευή Website για Ενοικιαζόμενα Δωμάτια & Καταλύματα",
    template: "%s | MyStaySite",
  },
  description:
    "Επαγγελματικά websites για ενοικιαζόμενα δωμάτια, βίλες & apartments. Online κρατήσεις, SEO, κριτικές. Από €349. Δωρεάν mockup σε 48 ώρες.",
  keywords: [
    "κατασκευή ιστοσελίδας ενοικιαζόμενα δωμάτια",
    "website ενοικιαζόμενα δωμάτια",
    "κατασκευή site κατάλυμα",
    "ιστοσελίδα για ξενοδοχείο",
    "website για βίλα",
    "website για airbnb",
    "website για booking",
    "κατασκευή ιστοσελίδας τουριστικό κατάλυμα",
    "website κρατήσεις online",
    "website ξενώνας",
    "website studios",
    "website apartments ελλάδα",
    "direct bookings greece",
    "κατασκευή website χαλκιδική",
    "ιστοσελίδα ενοικιαζόμενα δωμάτια ελλάδα",
    "SEO ενοικιαζόμενα δωμάτια",
    "website κρατήσεις χωρίς προμήθεια",
    "φτιάξε site κατάλυμα",
    "mystaysite",
  ],
  openGraph: {
    title: "MyStaySite | Κατασκευή Website για Ενοικιαζόμενα Δωμάτια",
    description:
      "Επαγγελματικά websites για καταλύματα. Online κρατήσεις, κριτικές, SEO. Από €349. Δωρεάν mockup σε 48 ώρες.",
    url: "https://mystaysite.com",
    siteName: "MyStaySite",
    locale: "el_GR",
    alternateLocale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyStaySite | Website για Ενοικιαζόμενα Δωμάτια",
    description:
      "Επαγγελματικά websites για καταλύματα. Online κρατήσεις, κριτικές, SEO. Από €349.",
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
    canonical: "https://mystaysite.com",
  },
  verification: {
    google: "googlefc417ebe34185aed",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el" className={`scroll-smooth ${dmSans.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <head>
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
                areaServed: {
                  "@type": "Place",
                  name: "Worldwide",
                },
                serviceType: [
                  "Κατασκευή ιστοσελίδας",
                  "Web Design",
                  "Website για ενοικιαζόμενα δωμάτια",
                  "SEO για καταλύματα",
                ],
                priceRange: "€349 - €1499",
                telephone: "+30 697 458 5063",
                email: "info@mystaysite.com",
                address: {
                  "@type": "PostalAddress",
                  addressCountry: "GR",
                  addressRegion: "Χαλκιδική",
                },
                sameAs: [],
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "Πακέτα κατασκευής website",
                  itemListElement: [
                    {
                      "@type": "Offer",
                      name: "Starter",
                      description: "One-page website για ενοικιαζόμενα δωμάτια",
                      price: "349",
                      priceCurrency: "EUR",
                    },
                    {
                      "@type": "Offer",
                      name: "Professional",
                      description: "Πλήρες website με online κρατήσεις και SEO",
                      price: "599",
                      priceCurrency: "EUR",
                    },
                    {
                      "@type": "Offer",
                      name: "Premium",
                      description: "Premium website με booking engine, SEO και digital marketing",
                      price: "1499",
                      priceCurrency: "EUR",
                    },
                  ],
                },
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
                      text: "Τα πακέτα ξεκινούν από €349 για one-page website, €599 για πλήρες website με online κρατήσεις, και €1499 για premium με booking engine και digital marketing.",
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
                      text: "Ναι. Με δικό σου website παίρνεις κρατήσεις χωρίς 15-20% προμήθεια, εμφανίζεσαι στο Google, και δείχνεις τις κριτικές σου από όλες τις πλατφόρμες μαζί.",
                    },
                  },
                ],
              },
            ]),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S05LEDF6JW"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-S05LEDF6JW');`}
        </Script>
        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','49013716985302');fbq('track','PageView');`}
        </Script>
      </body>
    </html>
  );
}
