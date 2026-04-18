import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const url = `https://mystaysite.com/${locale}/privacy`;

  return {
    title: isEn ? "Privacy Policy" : "Πολιτική Απορρήτου",
    description: isEn
      ? "Privacy policy for MyStaySite: how we collect, store, and use your personal data. GDPR compliant."
      : "Πολιτική απορρήτου της MyStaySite: πώς συλλέγουμε, αποθηκεύουμε και χρησιμοποιούμε τα προσωπικά σας δεδομένα. Συμβατή με GDPR.",
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: {
        el: "https://mystaysite.com/el/privacy",
        en: "https://mystaysite.com/en/privacy",
      },
    },
  };
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
