import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

const content = {
  el: {
    metadata: {
      title: "Analytics & Consulting για Καταλύματα | MyStaySite",
      description:
        "Unified dashboard GA4 + Search Console + Booking/Airbnb + μηνιαία strategy calls. €149 setup + €79/μήνα.",
      ogTitle: "Analytics & Consulting για Καταλύματα | MyStaySite",
      ogDescription:
        "Βλέπεις τα νούμερα, ξέρεις τι να κάνεις. Analytics dashboard + μηνιαίο consulting.",
    },
    data: {
      title: "Analytics & Consulting Bundle",
      subtitle:
        "Δεδομένα από Google Analytics, Search Console, Booking και Airbnb σε ΕΝΑ dashboard. Συν μηνιαίο consulting call για να ξέρεις τι να κάνεις μετά.",
      price: "€149 setup + €79/μήνα",
      features: [
        "Custom dashboard (Looker Studio) με όλα τα KPIs σε ένα μέρος",
        "Google Analytics 4: sessions, bookings, conversion rate, traffic sources",
        "Search Console: rankings, clicks, impressions, top keywords",
        "Booking.com + Airbnb: occupancy, ADR, RevPAR, reviews score",
        "Google Ads performance (εάν υπάρχει)",
        "Competitor benchmarking (2-3 competitors)",
        "Μηνιαίο strategy call (1 ώρα): τι δουλεύει, τι να αλλάξεις",
        "Μηνιαίο PDF report με insights & recommendations",
        "Alerts για σημαντικές αλλαγές (sudden traffic drop, ranking loss)",
        "Χωρίς περιορισμό ερωτήσεων μέσω email/WhatsApp",
        "Quarterly deep-dive (3 μήνες): trends, seasonality, τι να κάνεις στη νέα σεζόν",
        "Data export σε CSV/Excel (τα δεδομένα είναι δικά σου)",
      ],
      faq: [
        {
          q: "Τι είναι το Looker Studio;",
          a: "Δωρεάν εργαλείο της Google για dashboards. Ενώνει δεδομένα από διαφορετικά sources (Analytics, Ads, sheets) σε ωραία γραφικά. Ανανεώνεται live, δεν χρειάζεται να ζητάς report.",
        },
        {
          q: "Πώς μαζεύετε δεδομένα από Booking και Airbnb;",
          a: "Μέσω manual export ή API integrations (για Beds24/Smoobu accounts). Ενημερώνεται εβδομαδιαία ή μηνιαία, ανάλογα με τη συχνότητα που θέλετε.",
        },
        {
          q: "Χρειάζομαι Google Analytics εγκατεστημένο;",
          a: "Προτείνεται. Αν δεν έχετε, το κάνουμε setup δωρεάν στο πρώτο onboarding.",
        },
        {
          q: "Τι είδους αποφάσεις μπορώ να πάρω με αυτά;",
          a: "Πολλές: ποια sources σου φέρνουν πραγματικά κρατήσεις, ποιοι μήνες είναι underperforming, ποιες σελίδες δεν converting, πού να επενδύσεις περισσότερα χρήματα σε marketing.",
        },
        {
          q: "Είναι contract;",
          a: "Όχι. Monthly, cancel anytime με 30-day notice.",
        },
      ],
    },
  },
  en: {
    metadata: {
      title: "Analytics & Consulting for Vacation Rentals | MyStaySite",
      description:
        "Unified dashboard GA4 + Search Console + Booking/Airbnb + monthly strategy calls. €149 setup + €79/month.",
      ogTitle: "Analytics & Consulting for Vacation Rentals | MyStaySite",
      ogDescription:
        "See the numbers, know what to do. Analytics dashboard + monthly consulting.",
    },
    data: {
      title: "Analytics & Consulting Bundle",
      subtitle:
        "Data from Google Analytics, Search Console, Booking and Airbnb in ONE dashboard. Plus a monthly consulting call so you know what to do next.",
      price: "€149 setup + €79/month",
      features: [
        "Custom dashboard (Looker Studio) with all KPIs in one place",
        "Google Analytics 4: sessions, bookings, conversion rate, traffic sources",
        "Search Console: rankings, clicks, impressions, top keywords",
        "Booking.com + Airbnb: occupancy, ADR, RevPAR, reviews score",
        "Google Ads performance (if available)",
        "Competitor benchmarking (2-3 competitors)",
        "Monthly strategy call (1 hour): what's working, what to change",
        "Monthly PDF report with insights & recommendations",
        "Alerts for major changes (sudden traffic drop, ranking loss)",
        "Unlimited questions via email/WhatsApp",
        "Quarterly deep-dive (every 3 months): trends, seasonality, next season planning",
        "Data export to CSV/Excel (your data is yours)",
      ],
      faq: [
        {
          q: "What is Looker Studio?",
          a: "Google's free dashboard tool. Combines data from different sources (Analytics, Ads, sheets) into beautiful visuals. Updates live, no need to request reports.",
        },
        {
          q: "How do you collect data from Booking and Airbnb?",
          a: "Via manual export or API integrations (for Beds24/Smoobu accounts). Updates weekly or monthly depending on your preference.",
        },
        {
          q: "Do I need Google Analytics installed?",
          a: "Recommended. If you don't have it, we set it up free during onboarding.",
        },
        {
          q: "What kinds of decisions can I make with this?",
          a: "Many: which sources really drive bookings, which months are underperforming, which pages don't convert, where to invest more marketing budget.",
        },
        {
          q: "Is there a contract?",
          a: "No. Monthly, cancel anytime with 30-day notice.",
        },
      ],
    },
  },
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
  const c = content[locale === "en" ? "en" : "el"].metadata;
  return {
    title: { absolute: c.title },
    description: c.description,
    alternates: {
      canonical: `https://mystaysite.com/${locale}/services/analytics-consulting`,
      languages: {
        el: "https://mystaysite.com/el/services/analytics-consulting",
        en: "https://mystaysite.com/en/services/analytics-consulting",
      },
    },
    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
      url: `https://mystaysite.com/${locale}/services/analytics-consulting`,
    },
  };
}

export default async function AnalyticsConsultingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const data = content[locale === "en" ? "en" : "el"].data;
  return <ServicePage data={data} locale={locale} slug="analytics-consulting" />;
}
