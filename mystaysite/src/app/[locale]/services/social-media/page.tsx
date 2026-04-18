import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

const content = {
  el: {
    metadata: {
      title: "Social Media για Καταλύματα | MyStaySite",
      description:
        "Διαχείριση social media για ενοικιαζόμενα δωμάτια και βίλες. Instagram, Facebook, content creation από €149/μήνα.",
      ogTitle: "Social Media για Καταλύματα | MyStaySite",
      ogDescription:
        "Διαχείριση social media για καταλύματα. Instagram, Facebook, content creation.",
    },
    data: {
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
    },
  },
  en: {
    metadata: {
      title: "Social Media for Vacation Rentals | MyStaySite",
      description:
        "Social media management for vacation rentals and villas. Instagram, Facebook, content creation from €149/month.",
      ogTitle: "Social Media for Vacation Rentals | MyStaySite",
      ogDescription:
        "Social media management for vacation rentals. Instagram, Facebook, content creation.",
    },
    data: {
      title: "Social Media for Vacation Rentals",
      subtitle:
        "Professional presence on Instagram & Facebook. Photos, stories, reels that drive bookings.",
      price: "From €149/month",
      features: [
        "Instagram + Facebook page setup & optimization",
        "8-12 posts/month (photos, carousel, reels)",
        "Content calendar & strategy",
        "Hashtag research & location tags",
        "Stories & highlights setup",
        "Community management (replies to comments & messages)",
        "Monthly reporting (engagement, reach, bookings)",
        "Cover photos & visual branding",
        "Seasonal campaigns (Easter, summer, holidays)",
        "Cross-promotion with website & Google",
      ],
      faq: [
        {
          q: "Do I need to provide photos?",
          a: "Ideally yes, but we can work with your existing photos and create graphics for you.",
        },
        {
          q: "Which platforms?",
          a: "We focus on Instagram and Facebook, the most important ones for tourism in Greece.",
        },
        {
          q: "How long does it take?",
          a: "You'll see results from the 2nd month. Social media builds audience and brand recognition gradually.",
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
      canonical: `https://mystaysite.com/${locale}/services/social-media`,
      languages: {
        el: "https://mystaysite.com/el/services/social-media",
        en: "https://mystaysite.com/en/services/social-media",
      },
    },
    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
      url: `https://mystaysite.com/${locale}/services/social-media`,
    },
  };
}

export default async function SocialMediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const data = content[locale === "en" ? "en" : "el"].data;
  return <ServicePage data={data} locale={locale} slug="social-media" />;
}
