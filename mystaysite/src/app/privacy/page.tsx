"use client";

import { useState } from "react";

const content = {
  gr: {
    title: "Πολιτική Απορρήτου",
    lastUpdated: "Τελευταία ενημέρωση: 1 Μαρτίου 2026",
    sections: [
      {
        heading: "1. Εισαγωγή",
        text: "Η mystaysite.com (εφεξής 'εμείς') σέβεται το απόρρητό σας. Η παρούσα πολιτική εξηγεί ποια δεδομένα συλλέγουμε, πώς τα χρησιμοποιούμε και ποια είναι τα δικαιώματά σας.",
      },
      {
        heading: "2. Δεδομένα που συλλέγουμε",
        text: "Συλλέγουμε τα εξής δεδομένα: (α) Στοιχεία επικοινωνίας που μας δίνετε εσείς μέσω της φόρμας επικοινωνίας (email, τηλέφωνο, Booking/Airbnb link). (β) Δεδομένα χρήσης μέσω Google Analytics (ανώνυμα στατιστικά επισκεψιμότητας). (γ) Δεδομένα cookies μέσω Meta Pixel για τη βελτιστοποίηση διαφημίσεων.",
      },
      {
        heading: "3. Πώς χρησιμοποιούμε τα δεδομένα",
        text: "Χρησιμοποιούμε τα δεδομένα σας για: (α) Να επικοινωνήσουμε μαζί σας σχετικά με τις υπηρεσίες μας. (β) Να βελτιώσουμε τον ιστότοπο και τις υπηρεσίες μας. (γ) Να στοχεύσουμε καλύτερα τις διαφημίσεις μας. Δεν πουλάμε και δεν μοιραζόμαστε τα προσωπικά σας δεδομένα με τρίτους, εκτός αν απαιτείται από τον νόμο.",
      },
      {
        heading: "4. Cookies & Tracking",
        text: "Ο ιστότοπος χρησιμοποιεί: (α) Google Analytics (GA4) για ανώνυμα στατιστικά επισκεψιμότητας. (β) Meta Pixel για τη βελτιστοποίηση διαφημίσεων στο Facebook/Instagram. (γ) Απαραίτητα cookies για τη λειτουργία του ιστότοπου. Μπορείτε να απενεργοποιήσετε τα cookies μέσω των ρυθμίσεων του browser σας.",
      },
      {
        heading: "5. Τα δικαιώματά σας (GDPR)",
        text: "Σύμφωνα με τον GDPR, έχετε δικαίωμα: (α) Πρόσβασης στα δεδομένα σας. (β) Διόρθωσης ανακριβών δεδομένων. (γ) Διαγραφής των δεδομένων σας. (δ) Εναντίωσης στην επεξεργασία. (ε) Φορητότητας δεδομένων. Για οποιοδήποτε αίτημα, επικοινωνήστε μαζί μας στο info@mystaysite.com.",
      },
      {
        heading: "6. Ασφάλεια δεδομένων",
        text: "Λαμβάνουμε κατάλληλα τεχνικά και οργανωτικά μέτρα για την προστασία των δεδομένων σας. Ο ιστότοπός μας χρησιμοποιεί HTTPS encryption.",
      },
      {
        heading: "7. Αποθήκευση δεδομένων",
        text: "Τα δεδομένα σας αποθηκεύονται για όσο χρόνο είναι απαραίτητο για τους σκοπούς που περιγράφονται παραπάνω. Τα δεδομένα analytics διατηρούνται για 14 μήνες.",
      },
      {
        heading: "8. Επικοινωνία",
        text: "Για ερωτήσεις σχετικά με την πολιτική απορρήτου, επικοινωνήστε μαζί μας: info@mystaysite.com",
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: March 1, 2026",
    sections: [
      {
        heading: "1. Introduction",
        text: "mystaysite.com ('we') respects your privacy. This policy explains what data we collect, how we use it, and what your rights are.",
      },
      {
        heading: "2. Data we collect",
        text: "We collect: (a) Contact information you provide via the contact form (email, phone, Booking/Airbnb link). (b) Usage data via Google Analytics (anonymous traffic statistics). (c) Cookie data via Meta Pixel for advertising optimization.",
      },
      {
        heading: "3. How we use your data",
        text: "We use your data to: (a) Contact you regarding our services. (b) Improve our website and services. (c) Better target our advertisements. We do not sell or share your personal data with third parties, except as required by law.",
      },
      {
        heading: "4. Cookies & Tracking",
        text: "Our website uses: (a) Google Analytics (GA4) for anonymous traffic statistics. (b) Meta Pixel for Facebook/Instagram ad optimization. (c) Essential cookies for website functionality. You can disable cookies through your browser settings.",
      },
      {
        heading: "5. Your rights (GDPR)",
        text: "Under GDPR, you have the right to: (a) Access your data. (b) Correct inaccurate data. (c) Delete your data. (d) Object to processing. (e) Data portability. For any request, contact us at info@mystaysite.com.",
      },
      {
        heading: "6. Data security",
        text: "We take appropriate technical and organizational measures to protect your data. Our website uses HTTPS encryption.",
      },
      {
        heading: "7. Data retention",
        text: "Your data is stored for as long as necessary for the purposes described above. Analytics data is retained for 14 months.",
      },
      {
        heading: "8. Contact",
        text: "For questions about this privacy policy, contact us: info@mystaysite.com",
      },
    ],
  },
};

export default function PrivacyPolicy() {
  const [lang, setLang] = useState<"gr" | "en">("gr");
  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#0EA5E9] rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <span className="text-lg font-extrabold text-gray-900">my</span>
              <span className="text-lg font-extrabold text-[#0EA5E9]">stay</span>
              <span className="text-lg font-extrabold text-gray-900">site</span>
            </div>
          </a>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "gr" ? "en" : "gr")}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            >
              {lang === "gr" ? "EN" : "GR"}
            </button>
            <a href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              ← {lang === "gr" ? "Αρχική" : "Home"}
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
          {t.title}
        </h1>
        <p className="text-sm text-gray-400 mb-10">{t.lastUpdated}</p>

        <div className="space-y-8">
          {t.sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                {section.heading}
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                {section.text}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
