import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Google Ads για Καταλύματα | MyStaySite",
  description:
    "Διαχείριση Google Ads για ενοικιαζόμενα δωμάτια και βίλες. Άμεσες κρατήσεις από €99/μήνα. Setup, βελτιστοποίηση, reporting.",
  openGraph: {
    title: "Google Ads για Καταλύματα | MyStaySite",
    description:
      "Διαχείριση Google Ads για ενοικιαζόμενα δωμάτια. Άμεσες κρατήσεις, reporting, βελτιστοποίηση.",
  },
};

const data = {
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
};

export default function GoogleAdsPage() {
  return <ServicePage data={data} />;
}
