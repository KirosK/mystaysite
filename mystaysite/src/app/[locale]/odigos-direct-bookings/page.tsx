import Script from "next/script";
import GuideLanding from "@/components/GuideLanding";

export async function generateStaticParams() {
  return [{ locale: "el" }, { locale: "en" }];
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";
  const url = `https://mystaysite.com/${locale}/odigos-direct-bookings`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isEn
      ? "10 mistakes Greek vacation rentals make - and how to fix them in 30 minutes"
      : "10 λάθη που χάνουν κρατήσεις στα ελληνικά καταλύματα - και πώς να τα διορθώσεις σε 30 λεπτά",
    description: isEn
      ? "A practical guide to the 10 most common mistakes vacation rental owners make in Greece, with concrete fixes for each."
      : "Ένας πρακτικός οδηγός για τα 10 πιο συνηθισμένα λάθη ιδιοκτητών καταλυμάτων στην Ελλάδα, με συγκεκριμένες διορθώσεις.",
    inLanguage: isEn ? "en" : "el",
    datePublished: "2026-03-10",
    dateModified: "2026-03-10",
    author: {
      "@type": "Person",
      name: "Kyros",
      url: "https://mystaysite.com",
    },
    publisher: {
      "@type": "Organization",
      name: "MyStaySite",
      url: "https://mystaysite.com",
      logo: {
        "@type": "ImageObject",
        url: "https://mystaysite.com/icon",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    about: [
      { "@type": "Thing", name: "Direct bookings" },
      { "@type": "Thing", name: "Vacation rental marketing" },
      { "@type": "Thing", name: "Greek tourism" },
      { "@type": "Thing", name: "Website conversion optimization" },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isEn ? "Home" : "Αρχική",
        item: `https://mystaysite.com/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isEn ? "Free Guide" : "Δωρεάν Οδηγός",
        item: url,
      },
    ],
  };

  return (
    <>
      <Script
        id="guide-jsonld-article"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(articleJsonLd)}
      </Script>
      <Script
        id="guide-jsonld-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <GuideLanding locale={locale} />
    </>
  );
}
