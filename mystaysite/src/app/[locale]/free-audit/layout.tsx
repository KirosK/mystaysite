import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const url = `https://mystaysite.com/${locale}/free-audit`;

  return {
    title: {
      absolute: isEn
        ? "Free Video Audit for Vacation Rental Websites | MyStaySite"
        : "Δωρεάν Video Audit για Website Καταλύματος | MyStaySite",
    },
    description: isEn
      ? "Get a free 5-minute video audit of your vacation rental website. We'll show you 5 concrete improvements that will bring more direct bookings. Delivered within 48 hours."
      : "Λάβε δωρεάν 5-λεπτο video audit του website του καταλύματός σου. Σου δείχνουμε 5 συγκεκριμένες βελτιώσεις για περισσότερες direct κρατήσεις. Παράδοση εντός 48 ωρών.",
    alternates: {
      canonical: url,
      languages: {
        el: "https://mystaysite.com/el/free-audit",
        en: "https://mystaysite.com/en/free-audit",
      },
    },
    openGraph: {
      title: isEn
        ? "Free Video Audit for Vacation Rental Websites"
        : "Δωρεάν Video Audit για Website Καταλύματος",
      description: isEn
        ? "5 minutes. 5 concrete improvements. 0 cost. Delivered in 48 hours."
        : "5 λεπτά. 5 συγκεκριμένες βελτιώσεις. 0 κόστος. Παράδοση σε 48 ώρες.",
      url,
      locale: isEn ? "en_US" : "el_GR",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default function FreeAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
