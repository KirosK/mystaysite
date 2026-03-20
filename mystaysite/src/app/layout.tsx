import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    "Φτιάχνουμε επαγγελματικά websites για τουριστικά καταλύματα στην Ελλάδα. Direct bookings χωρίς προμήθεια Booking. 3 live sites. Ζητήστε demo.",
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
      "Φτιάχνουμε επαγγελματικά websites για τουριστικά καταλύματα. Direct bookings, κριτικές, SEO. Ζητήστε demo.",
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
      "Φτιάχνουμε επαγγελματικά websites για τουριστικά καταλύματα. Direct bookings, κριτικές, SEO. Ζητήστε demo.",
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-S05LEDF6JW" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-S05LEDF6JW');`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','49013716985302');fbq('track','PageView');`,
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
                telephone: "+30 697 458 5063",
                email: "info@mystaysite.com",
                address: {
                  "@type": "PostalAddress",
                  addressCountry: "GR",
                },
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
                      text: "Κάθε κατάλυμα έχει διαφορετικές ανάγκες. Ζητήστε ένα δωρεάν demo και σας ετοιμάζουμε προσωπική προσφορά. Χωρίς δέσμευση.",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
