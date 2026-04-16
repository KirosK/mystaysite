import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

const content = {
  el: {
    metadata: {
      title: "Διαχείριση Καταλύματος (Remote) | MyStaySite",
      description:
        "Απομακρυσμένη διαχείριση καταλύματος: κρατήσεις, τιμές, επικοινωνία, reviews, reporting. Από 15% ανά κράτηση ή €299/μήνα.",
      ogTitle: "Διαχείριση Καταλύματος (Remote) | MyStaySite",
      ogDescription:
        "Αναλαμβάνουμε την online διαχείριση του καταλύματος σας. Εσύ εισπράττεις.",
    },
    data: {
      title: "Διαχείριση Καταλύματος (Remote)",
      subtitle:
        "Σταμάτα να χάνεις χρόνο σε Booking, messages και price adjustments. Αναλαμβάνουμε όλη την online διαχείριση. Εσύ εισπράττεις.",
      price: "15% ανά κράτηση ή €299/μήνα",
      features: [
        "Κεντρικό ημερολόγιο: Booking + Airbnb + Expedia + website σε sync (Channel Manager)",
        "Dynamic pricing: αυτόματες τιμές με βάση ζήτηση & ανταγωνισμό (+15-30% revenue)",
        "Επικοινωνία guests σε EL/EN μέσω WhatsApp, email, Booking messages",
        "Check-in coordination (smart locks ή local partners)",
        "Management κριτικών: auto-requests, απαντήσεις, handling αρνητικών",
        "Google Business Profile + Airbnb/Booking listing optimization",
        "Monthly performance report: κρατήσεις, έσοδα, occupancy, ADR, RevPAR",
        "Strategy calls (1 ώρα/μήνα)",
        "24/7 support για επείγοντα θέματα guests",
        "Συνεργασία με τοπικούς καθαριστές/τεχνικούς (αν χρειάζεται)",
      ],
      faq: [
        {
          q: "Τι διαφορά έχει από property manager;",
          a: "Αναλαμβάνουμε όλη την online διαχείριση remote, χωρίς φυσική παρουσία. Για καθάρισμα και συντήρηση συνεργαζόμαστε με τοπικούς παρόχους που συντονίζουμε εμείς.",
        },
        {
          q: "Πως λειτουργεί η τιμολόγηση;",
          a: "Δύο μοντέλα: (α) 15% ανά κράτηση (performance-based, ιδανικό για καταλύματα με υψηλό όγκο). (β) €299/μήνα flat (προβλεψιμότητα κόστους). Επιλέγεις ό,τι σε συμφέρει.",
        },
        {
          q: "Τι γίνεται με τα καθαριστικά και maintenance;",
          a: "Συντονίζουμε τοπικούς παρόχους που συνεργάζεσαι ήδη. Αν δεν έχεις, σε βοηθάμε να τους βρεις. Εμείς αναλαμβάνουμε το scheduling και την επικοινωνία μαζί τους.",
        },
        {
          q: "Πόσο γρήγορα μπορούμε να ξεκινήσουμε;",
          a: "Onboarding σε 7-14 μέρες. Χρειαζόμαστε πρόσβαση σε Booking/Airbnb, κλειδιά ή smart lock, και ένα brief για το κατάλυμα.",
        },
        {
          q: "Μπορώ να διακόψω οποιαδήποτε στιγμή;",
          a: "Ναι. Ειδοποίηση 30 ημερών. Δεν υπάρχει μακροχρόνιο contract. Δουλεύουμε με αποτελέσματα.",
        },
        {
          q: "Έχω ήδη Booking και Airbnb. Θα χαθούν τα reviews μου;",
          a: "Όχι. Συνεχίζουμε να χρησιμοποιούμε τις υπάρχουσες λίστες σας. Απλά τις διαχειριζόμαστε εμείς. Όλα τα reviews και η ιστορία παραμένουν.",
        },
      ],
    },
  },
  en: {
    metadata: {
      title: "Property Management (Remote) | MyStaySite",
      description:
        "Remote property management: bookings, pricing, guest communication, reviews, reporting. From 15% per booking or €299/month.",
      ogTitle: "Property Management (Remote) | MyStaySite",
      ogDescription:
        "We handle the online management of your property. You collect.",
    },
    data: {
      title: "Property Management (Remote)",
      subtitle:
        "Stop losing time on Booking, messages and price adjustments. We handle the entire online management. You collect.",
      price: "15% per booking or €299/month",
      features: [
        "Unified calendar: Booking + Airbnb + Expedia + website in sync (Channel Manager)",
        "Dynamic pricing: auto-pricing based on demand & competition (+15-30% revenue)",
        "Guest communication in EL/EN via WhatsApp, email, Booking messages",
        "Check-in coordination (smart locks or local partners)",
        "Review management: auto-requests, replies, negative review handling",
        "Google Business Profile + Airbnb/Booking listing optimization",
        "Monthly performance report: bookings, revenue, occupancy, ADR, RevPAR",
        "Strategy calls (1 hour/month)",
        "24/7 support for guest emergencies",
        "Coordination with local cleaners/technicians (if needed)",
      ],
      faq: [
        {
          q: "How is this different from a traditional property manager?",
          a: "We handle the full online management remotely, without physical presence. For cleaning and maintenance we coordinate with local providers.",
        },
        {
          q: "How does pricing work?",
          a: "Two models: (a) 15% per booking (performance-based, ideal for high-volume). (b) €299/month flat (cost predictability). You choose.",
        },
        {
          q: "What about cleaning and maintenance?",
          a: "We coordinate local providers you already work with. If you don't have any, we help you find them. We handle scheduling and communication.",
        },
        {
          q: "How fast can we start?",
          a: "Onboarding in 7-14 days. We need access to Booking/Airbnb, keys or smart lock, and a brief on the property.",
        },
        {
          q: "Can I cancel anytime?",
          a: "Yes. 30-day notice. No long-term contract. We work on results.",
        },
        {
          q: "I already have Booking and Airbnb. Will I lose my reviews?",
          a: "No. We continue using your existing listings. We just manage them. All reviews and history remain intact.",
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
      canonical: `https://mystaysite.com/${locale}/services/property-management`,
      languages: {
        el: "https://mystaysite.com/el/services/property-management",
        en: "https://mystaysite.com/en/services/property-management",
      },
    },
    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
      url: `https://mystaysite.com/${locale}/services/property-management`,
    },
  };
}

export default async function PropertyManagementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const data = content[locale === "en" ? "en" : "el"].data;
  return <ServicePage data={data} locale={locale} />;
}
