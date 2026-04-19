import Script from "next/script";
import FreeAuditLanding from "@/components/FreeAuditLanding";

export async function generateStaticParams() {
  return [{ locale: "el" }, { locale: "en" }];
}

export default async function FreeAuditPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";
  const url = `https://mystaysite.com/${locale}/free-audit`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isEn
      ? "Free Video Audit for Vacation Rental Websites"
      : "Δωρεάν Video Audit για Website Καταλύματος",
    description: isEn
      ? "A free 5-minute video audit of your vacation rental website, highlighting the top 5 concrete improvements that will bring more direct bookings. Delivered within 48 hours."
      : "Δωρεάν 5-λεπτο video audit του website του καταλύματός σου με τις 5 σημαντικότερες συγκεκριμένες βελτιώσεις για περισσότερες direct κρατήσεις. Παράδοση εντός 48 ωρών.",
    provider: {
      "@type": "ProfessionalService",
      "@id": "https://mystaysite.com/#business",
      name: "MyStaySite",
      url: "https://mystaysite.com",
    },
    areaServed: [
      { "@type": "Country", name: "Greece" },
      { "@type": "AdministrativeArea", name: "Central Macedonia" },
      { "@type": "AdministrativeArea", name: "Halkidiki" },
      { "@type": "AdministrativeArea", name: "Cyclades" },
      { "@type": "AdministrativeArea", name: "Crete" },
    ],
    serviceType: isEn ? "Website audit" : "Website audit",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url,
    },
    audience: {
      "@type": "Audience",
      name: isEn
        ? "Vacation rental, villa, apartment and studio owners in Greece"
        : "Ιδιοκτήτες καταλυμάτων, βιλών, διαμερισμάτων και studios στην Ελλάδα",
    },
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
        name: isEn ? "Free Audit" : "Δωρεάν Audit",
        item: url,
      },
    ],
  };

  return (
    <>
      <Script
        id="free-audit-jsonld-service"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceJsonLd)}
      </Script>
      <Script
        id="free-audit-jsonld-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <FreeAuditLanding locale={locale} />
    </>
  );
}
