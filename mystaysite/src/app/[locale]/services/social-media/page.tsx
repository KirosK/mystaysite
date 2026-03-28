import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Social Media για Καταλύματα | MyStaySite",
  description:
    "Διαχείριση social media για ενοικιαζόμενα δωμάτια και βίλες. Instagram, Facebook, content creation από €149/μήνα.",
  openGraph: {
    title: "Social Media για Καταλύματα | MyStaySite",
    description:
      "Διαχείριση social media για καταλύματα. Instagram, Facebook, content creation.",
  },
};

const data = {
  title: "Social Media για Καταλύματα",
  subtitle:
    "Επαγγελματική παρουσία σε Instagram & Facebook. Φωτογραφίες, stories, reels που φέρνουν κρατήσεις.",
  price: "Από €149/μήνα",
  features: [
    "Setup & optimization Instagram + Facebook σελίδας",
    "8-12 posts/μήνα (φωτογραφίες, carousel, reels)",
    "Content calendar & στρατηγική",
    "Hashtag research & location tags",
    "Stories & highlights setup",
    "Community management (απαντήσεις σε σχόλια & μηνύματα)",
    "Μηνιαίο reporting (engagement, reach, κρατήσεις)",
    "Cover photos & visual branding",
    "Seasonal campaigns (Πάσχα, καλοκαίρι, εορτές)",
    "Cross-promotion με website & Google",
  ],
  faq: [
    {
      q: "Χρειάζεται να δίνω φωτογραφίες;",
      a: "Ιδανικά ναι, αλλά μπορούμε να δουλέψουμε με τις υπάρχουσες φωτογραφίες σας και να δημιουργήσουμε γραφικά.",
    },
    {
      q: "Σε ποιες πλατφόρμες;",
      a: "Εστιάζουμε σε Instagram και Facebook, που είναι οι πιο σημαντικές για τουρισμό στην Ελλάδα.",
    },
    {
      q: "Πόσο χρόνο χρειάζεται;",
      a: "Βλέπετε αποτελέσματα από τον 2ο μήνα. Τα social media χτίζουν σταδιακά κοινό και αναγνωρισιμότητα.",
    },
  ],
};

export default function SocialMediaPage() {
  return <ServicePage data={data} />;
}
