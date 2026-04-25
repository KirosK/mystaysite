import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const url = `https://mystaysite.com/${locale}/portfolio/luna-rossa-santorini`;

  return {
    title: isEn
      ? "Luna Rossa Santorini | Hotel Website Redesign Case Study"
      : "Luna Rossa Santorini | Case Study Κατασκευής Website Ξενοδοχείου",
    description: isEn
      ? "Case study: Website redesign for Luna Rossa Santorini in Imerovigli. Before & after screenshots, direct booking UX, bilingual content, reviews, room pages, and local guide sections. By MyStaySite."
      : "Case study: Κατασκευή website για Luna Rossa Santorini στο Ημεροβίγλι. Πριν και μετά screenshots, direct booking UX, δύο γλώσσες, reviews, room pages και local guide sections. Από MyStaySite.",
    openGraph: {
      title: isEn
        ? "Luna Rossa Santorini | MyStaySite Case Study"
        : "Luna Rossa Santorini | MyStaySite Case Study",
      description: isEn
        ? "See how we redesigned Luna Rossa Santorini's website into a premium direct-booking experience. Before & After."
        : "Δες πώς μεταμορφώσαμε το website του Luna Rossa Santorini σε premium direct-booking εμπειρία. Πριν & Μετά.",
      url,
      type: "article",
      images: ["/portfolio/lunarossa/after-01-hero.png"],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/portfolio/lunarossa/after-01-hero.png"],
    },
    alternates: {
      canonical: url,
      languages: {
        el: "https://mystaysite.com/el/portfolio/luna-rossa-santorini",
        en: "https://mystaysite.com/en/portfolio/luna-rossa-santorini",
      },
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
