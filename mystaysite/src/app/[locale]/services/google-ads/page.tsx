import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

const content = {
  el: {
    metadata: {
      title: "Google Ads για Καταλύματα | MyStaySite",
      description:
        "Διαχείριση Google Ads για ενοικιαζόμενα δωμάτια και βίλες. Άμεσες κρατήσεις από €99/μήνα. Setup, βελτιστοποίηση, reporting.",
      ogTitle: "Google Ads για Καταλύματα | MyStaySite",
      ogDescription:
        "Διαχείριση Google Ads για ενοικιαζόμενα δωμάτια. Άμεσες κρατήσεις, reporting, βελτιστοποίηση.",
    },
    data: {
      title: "Google Ads για Καταλύματα",
      subtitle:
        "Εμφανιστείτε πρώτοι στο Google όταν ψάχνουν κατάλυμα στην περιοχή σας. Άμεσα αποτελέσματα, μετρήσιμη απόδοση.",
      price: "Από €99/μήνα",
      features: [
        "Δημιουργία & setup καμπάνιας Google Ads",
        "Έρευνα keywords (π.χ. «βίλα Αντίπαρος», «ενοικιαζόμενα Χαλκιδική»)",
        "Σύνταξη διαφημιστικών κειμένων στα Ελληνικά & Αγγλικά",
        "Landing page optimization",
        "Conversion tracking (κρατήσεις, τηλέφωνα, φόρμες)",
        "Μηνιαία αναφορά performance (κλικ, κόστος, κρατήσεις)",
        "A/B testing διαφημίσεων",
        "Remarketing σε επισκέπτες που δεν έκλεισαν",
        "Budget management & bid optimization",
        "Seasonal campaign adjustments (σεζόν, γιορτές)",
      ],
      faq: [
        {
          q: "Πόσο budget χρειάζομαι;",
          a: "Συνιστούμε minimum €200-500/μήνα για tourism keywords. Το κόστος ανά κλικ κυμαίνεται €0.50-2 ανάλογα με την περιοχή και τον ανταγωνισμό.",
        },
        {
          q: "Πότε θα δω αποτελέσματα;",
          a: "Άμεσα. Μόλις ξεκινήσει η καμπάνια, εμφανίζεστε στο Google. Τις πρώτες 2-4 εβδομάδες βελτιστοποιούμε για καλύτερο ROI.",
        },
        {
          q: "Χρειάζομαι website;",
          a: "Ναι, τα Google Ads οδηγούν τους επισκέπτες στο site σας. Χωρίς καλό website, τα χρήματα χάνονται.",
        },
      ],
    },
  },
  en: {
    metadata: {
      title: "Google Ads for Vacation Rentals | MyStaySite",
      description:
        "Google Ads management for vacation rentals and villas. Instant bookings from €99/month. Setup, optimization, reporting.",
      ogTitle: "Google Ads for Vacation Rentals | MyStaySite",
      ogDescription:
        "Google Ads management for vacation rentals. Instant bookings, reporting, optimization.",
    },
    data: {
      title: "Google Ads for Vacation Rentals",
      subtitle:
        "Appear first on Google when people search for accommodation in your area. Instant results, measurable performance.",
      price: "From €99/month",
      features: [
        "Google Ads campaign creation & setup",
        "Keyword research (e.g. \"villa Antiparos\", \"apartments Halkidiki\")",
        "Ad copy in Greek & English",
        "Landing page optimization",
        "Conversion tracking (bookings, calls, forms)",
        "Monthly performance report (clicks, cost, bookings)",
        "A/B testing of ads",
        "Remarketing to visitors who didn't book",
        "Budget management & bid optimization",
        "Seasonal campaign adjustments (season, holidays)",
      ],
      faq: [
        {
          q: "How much budget do I need?",
          a: "We recommend a minimum of €200-500/month for tourism keywords. Cost per click ranges from €0.50-2 depending on area and competition.",
        },
        {
          q: "When will I see results?",
          a: "Immediately. Once the campaign launches, you appear on Google. In the first 2-4 weeks we optimize for better ROI.",
        },
        {
          q: "Do I need a website?",
          a: "Yes, Google Ads drive visitors to your site. Without a solid website, the budget is wasted.",
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
      canonical: `https://mystaysite.com/${locale}/services/google-ads`,
      languages: {
        el: "https://mystaysite.com/el/services/google-ads",
        en: "https://mystaysite.com/en/services/google-ads",
      },
    },
    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
      url: `https://mystaysite.com/${locale}/services/google-ads`,
    },
  };
}

export default async function GoogleAdsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const data = content[locale === "en" ? "en" : "el"].data;
  return <ServicePage data={data} locale={locale} />;
}
