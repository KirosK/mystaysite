import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const url = `https://mystaysite.com/${locale}/terms`;

  return {
    title: isEn ? "Terms of Service" : "Όροι Χρήσης",
    description: isEn
      ? "Terms of service for MyStaySite website services: scope, payments, deliverables, and obligations."
      : "Όροι χρήσης των υπηρεσιών της MyStaySite: αντικείμενο, πληρωμές, παραδοτέα, υποχρεώσεις.",
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: {
        el: "https://mystaysite.com/el/terms",
        en: "https://mystaysite.com/en/terms",
      },
    },
  };
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
