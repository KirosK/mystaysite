import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

const content = {
  el: {
    metadata: {
      title: "SEO για Καταλύματα Ελλάδα | Αύξηση Organic Traffic | MyStaySite",
      description:
        "SEO υπηρεσίες για ενοικιαζόμενα δωμάτια, βίλες και ξενοδοχεία σε Ελλάδα, Κυκλάδες, Χαλκιδική. Organic traffic χωρίς διαφημίσεις, από €79/μήνα.",
      ogTitle: "SEO για Καταλύματα & Βίλες Ελλάδα | MyStaySite",
      ogDescription:
        "Εμφανιστείτε στο Google χωρίς διαφημίσεις. Local SEO για Αντίπαρο, Νάξο, Μύκονο, Χαλκιδική και κάθε ελληνικό προορισμό.",
    },
    data: {
      title: "SEO για Καταλύματα",
      subtitle:
        "Εμφανιστείτε στο Google χωρίς διαφημίσεις. Organic traffic που φέρνει κρατήσεις μακροπρόθεσμα.",
      price: "Από €79/μήνα",
      features: [
        "Technical SEO audit & fixes",
        "Keyword research για την περιοχή σας",
        "On-page optimization (titles, meta, headings, content)",
        "Google Business Profile optimization",
        "Local SEO (Google Maps, τοπικό ranking)",
        "Content strategy & blog articles (1-2/μήνα)",
        "Backlink building (τοπικοί κατάλογοι, travel sites)",
        "Μηνιαία αναφορά ranking & traffic",
        "Schema markup (FAQ, Reviews, LocalBusiness)",
        "Competitor analysis & αναφορά",
      ],
      faq: [
        {
          q: "Πόσο χρόνο χρειάζεται το SEO;",
          a: "Τα πρώτα αποτελέσματα φαίνονται σε 2-4 εβδομάδες (indexing). Σημαντική βελτίωση σε 3-6 μήνες. Το SEO είναι μακροπρόθεσμη επένδυση.",
        },
        {
          q: "Αξίζει αν έχω μικρό κατάλυμα;",
          a: "Ιδιαίτερα. Τα μικρά καταλύματα έχουν λιγότερο ανταγωνισμό στο local SEO. Μπορείτε να βγείτε πρώτοι στο Google για την περιοχή σας.",
        },
        {
          q: "Χρειάζομαι website;",
          a: "Ναι, το SEO βελτιστοποιεί το website σας. Χωρίς site, δεν υπάρχει τίποτα να βελτιστοποιηθεί.",
        },
      ],
    },
  },
  en: {
    metadata: {
      title: "SEO for Vacation Rentals in Greece | Organic Traffic Growth | MyStaySite",
      description:
        "SEO services for vacation rentals, villas and hotels in Greece, Cyclades, Halkidiki. Organic traffic without ads, from €79/month.",
      ogTitle: "SEO for Vacation Rentals in Greece | MyStaySite",
      ogDescription:
        "Appear on Google without ads. Local SEO for Antiparos, Naxos, Mykonos, Halkidiki and every Greek destination.",
    },
    data: {
      title: "SEO for Vacation Rentals",
      subtitle:
        "Appear on Google without ads. Organic traffic that drives bookings long-term.",
      price: "From €79/month",
      features: [
        "Technical SEO audit & fixes",
        "Keyword research for your area",
        "On-page optimization (titles, meta, headings, content)",
        "Google Business Profile optimization",
        "Local SEO (Google Maps, local ranking)",
        "Content strategy & blog articles (1-2/month)",
        "Backlink building (local directories, travel sites)",
        "Monthly ranking & traffic report",
        "Schema markup (FAQ, Reviews, LocalBusiness)",
        "Competitor analysis & reports",
      ],
      faq: [
        {
          q: "How long does SEO take?",
          a: "Initial results show in 2-4 weeks (indexing). Significant improvement in 3-6 months. SEO is a long-term investment.",
        },
        {
          q: "Is it worth it for a small property?",
          a: "Especially. Small properties face less competition in local SEO. You can rank first on Google for your area.",
        },
        {
          q: "Do I need a website?",
          a: "Yes, SEO optimizes your website. Without a site, there's nothing to optimize.",
        },
      ],
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = content[locale === "en" ? "en" : "el"].metadata;
  return {
    title: { absolute: c.title },
    description: c.description,
    alternates: {
      canonical: `https://mystaysite.com/${locale}/services/seo`,
      languages: {
        el: "https://mystaysite.com/el/services/seo",
        en: "https://mystaysite.com/en/services/seo",
      },
    },
    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
      url: `https://mystaysite.com/${locale}/services/seo`,
    },
  };
}

export default async function SEOPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const data = content[locale === "en" ? "en" : "el"].data;
  return <ServicePage data={data} locale={locale} slug="seo" />;
}
