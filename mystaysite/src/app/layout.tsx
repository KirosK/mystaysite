import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mystaysite.com"),
  title: {
    default:
      "MyStaySite | Κατασκευή Website για Ενοικιαζόμενα Δωμάτια & Καταλύματα",
    template: "%s | MyStaySite",
  },
  description:
    "Κατασκευή επαγγελματικών websites για ενοικιαζόμενα δωμάτια, βίλες, studios και apartments στην Ελλάδα. Online κρατήσεις, κριτικές Booking & Google, SEO στο Google. Από €349. Δωρεάν mockup σε 48 ώρες. Σταμάτα να πληρώνεις 15-20% προμήθεια στο Booking.",
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
      "Επαγγελματικά websites για καταλύματα στην Ελλάδα. Online κρατήσεις, κριτικές, SEO. Από €349. Δωρεάν mockup σε 48 ώρες.",
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
    <html lang="el" className="scroll-smooth">
      <head>
        {/* Google Analytics (GA4) - Replace G-XXXXXXXXXX with your Measurement ID */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');`,
          }}
        />

        {/* Meta/Facebook Pixel - Replace XXXXXXXXXXXXXXXX with your Pixel ID */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','XXXXXXXXXXXXXXXX');fbq('track','PageView');`,
          }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
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
                  "Κατασκευή επαγγελματικών websites για ενοικιαζόμενα δωμάτια, βίλες, studios και apartments στην Ελλάδα. Online κρατήσεις, κριτικές, SEO.",
                areaServed: {
                  "@type": "Country",
                  name: "Greece",
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
                      price: "699",
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
                      text: "Τα πακέτα ξεκινούν από €349 για one-page website, €699 για πλήρες website με online κρατήσεις, και €1499 για premium με booking engine και digital marketing.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Σε πόσο καιρό παραδίδεται το website;",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Το website παραδίδεται σε 5-7 εργάσιμες ημέρες, ανάλογα με το πακέτο.",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
