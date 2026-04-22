import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const url = `https://mystaysite.com/${locale}/odigos-direct-bookings`;

  return {
    title: {
      absolute: isEn
        ? "10 Mistakes Greek Vacation Rentals Make (Free Guide) | MyStaySite"
        : "10 λάθη ελληνικών καταλυμάτων που χάνουν κρατήσεις (Δωρεάν οδηγός) | MyStaySite",
    },
    description: isEn
      ? "Free guide: the 10 most common mistakes Greek vacation rental owners make, and how to fix them in 30 minutes. More direct bookings, zero Booking.com commission."
      : "Δωρεάν οδηγός: τα 10 πιο συνηθισμένα λάθη που κάνουν οι ιδιοκτήτες καταλυμάτων στην Ελλάδα και πώς να τα διορθώσεις σε 30 λεπτά. Περισσότερες direct κρατήσεις, μηδενική προμήθεια.",
    alternates: {
      canonical: url,
      languages: {
        el: "https://mystaysite.com/el/odigos-direct-bookings",
        en: "https://mystaysite.com/en/odigos-direct-bookings",
      },
    },
    openGraph: {
      title: isEn
        ? "10 Mistakes Greek Vacation Rentals Make (Free Guide)"
        : "10 λάθη ελληνικών καταλυμάτων (Δωρεάν οδηγός)",
      description: isEn
        ? "Practical fixes for more direct bookings without paying Booking.com commission."
        : "Πρακτικές διορθώσεις για περισσότερες direct κρατήσεις χωρίς προμήθεια Booking.",
      url,
      locale: isEn ? "en_US" : "el_GR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: isEn
        ? "10 mistakes Greek vacation rentals make (free guide)"
        : "10 λάθη ελληνικών καταλυμάτων (δωρεάν οδηγός)",
    },
    robots: { index: true, follow: true },
  };
}

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
