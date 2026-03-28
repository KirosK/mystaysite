import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "SEO για Καταλύματα | MyStaySite",
  description:
    "SEO υπηρεσίες για ενοικιαζόμενα δωμάτια και βίλες. Εμφανιστείτε στο Google χωρίς διαφημίσεις, από €79/μήνα.",
  openGraph: {
    title: "SEO για Καταλύματα | MyStaySite",
    description:
      "SEO υπηρεσίες για καταλύματα. Εμφανιστείτε στο Google χωρίς διαφημίσεις.",
  },
};

const data = {
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
};

export default function SEOPage() {
  return <ServicePage data={data} />;
}
