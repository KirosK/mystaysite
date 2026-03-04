import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Achilleas Peaceful Place | Κατασκευή Website Ενοικιαζόμενα Δωμάτια Χαλκιδική",
  description:
    "Case study: Κατασκευή website για ενοικιαζόμενα δωμάτια στη Χαλκιδική. Πριν και μετά. Online κρατήσεις, κριτικές Booking 9.7/10, SEO, 6 διαμερίσματα. Από MyStaySite.",
  openGraph: {
    title: "Achilleas Peaceful Place | MyStaySite Case Study",
    description:
      "Δες πώς μεταμορφώσαμε το website του Achilleas Peaceful Place στη Χαλκιδική. Πριν & Μετά.",
    url: "https://mystaysite.com/portfolio/achilleas-peaceful-place",
    type: "article",
  },
  alternates: {
    canonical: "https://mystaysite.com/portfolio/achilleas-peaceful-place",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
