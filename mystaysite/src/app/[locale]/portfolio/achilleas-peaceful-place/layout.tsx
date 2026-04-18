import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const url = `https://mystaysite.com/${locale}/portfolio/achilleas-peaceful-place`;

  return {
    title: isEn
      ? "Achilleas Peaceful Place | Website for short-term rentals Halkidiki"
      : "Achilleas Peaceful Place | Κατασκευή Website Ενοικιαζόμενα Δωμάτια Χαλκιδική",
    description: isEn
      ? "Case study: Website redesign for short-term rentals in Halkidiki, Greece. Before & after. Online bookings, Booking.com 9.7/10 reviews, SEO, 6 apartments. By MyStaySite."
      : "Case study: Κατασκευή website για ενοικιαζόμενα δωμάτια στη Χαλκιδική. Πριν και μετά. Online κρατήσεις, κριτικές Booking 9.7/10, SEO, 6 διαμερίσματα. Από MyStaySite.",
    openGraph: {
      title: isEn
        ? "Achilleas Peaceful Place | MyStaySite Case Study"
        : "Achilleas Peaceful Place | MyStaySite Case Study",
      description: isEn
        ? "See how we redesigned the website for Achilleas Peaceful Place in Halkidiki, Greece. Before & After."
        : "Δες πώς μεταμορφώσαμε το website του Achilleas Peaceful Place στη Χαλκιδική. Πριν & Μετά.",
      url,
      type: "article",
      images: ["/portfolio/achilleas/after-01-hero.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/portfolio/achilleas/after-01-hero.jpg"],
    },
    alternates: {
      canonical: url,
      languages: {
        el: "https://mystaysite.com/el/portfolio/achilleas-peaceful-place",
        en: "https://mystaysite.com/en/portfolio/achilleas-peaceful-place",
      },
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
