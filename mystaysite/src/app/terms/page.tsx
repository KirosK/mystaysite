"use client";

import { useState } from "react";

const content = {
  gr: {
    title: "Οροι Χρήσης",
    lastUpdated: "Τελευταία ενημέρωση: 1 Μαρτίου 2026",
    sections: [
      {
        heading: "1. Εισαγωγή",
        text: "Καλώς ήρθατε στο mystaysite.com. Χρησιμοποιώντας τον ιστότοπο και τις υπηρεσίες μας, αποδέχεστε τους παρακάτω όρους χρήσης. Αν δεν συμφωνείτε, παρακαλούμε μην χρησιμοποιήσετε τις υπηρεσίες μας.",
      },
      {
        heading: "2. Περιγραφή Υπηρεσιών",
        text: "Η mystaysite.com προσφέρει υπηρεσίες σχεδιασμού και κατασκευής ιστοσελίδων για ενοικιαζόμενα δωμάτια, βίλες και καταλύματα παγκοσμίως. Οι υπηρεσίες περιλαμβάνουν κατασκευή website, SEO, σύστημα κρατήσεων, ενσωμάτωση κριτικών και τεχνική υποστήριξη, ανάλογα με το επιλεγμένο πακέτο.",
      },
      {
        heading: "3. Τιμολόγηση & Πληρωμές",
        text: "Οι τιμές αναφέρονται σε εφάπαξ κόστος κατασκευής, εκτός αν ορίζεται διαφορετικά. Η μηνιαία συντήρηση (€29/μήνα) είναι προαιρετική. Η πληρωμή γίνεται μετά την έγκριση του mockup από τον πελάτη. Δεν υπάρχει χρέωση για το αρχικό mockup. Αποδεκτοί τρόποι πληρωμής: τραπεζική μεταφορά, Stripe, Viva Wallet, Crypto, Mastercard, Amex.",
      },
      {
        heading: "4. Εγγυήσεις",
        text: "Πληρώνεις ΜΟΝΟ αν σου αρέσει: Αν δεν εγκρίνεις το mockup, δεν χρεώνεσαι. Google-Ready σε 14 ημέρες: Εγγυόμαστε ότι το site σου θα είναι indexed στο Google εντός 14 ημερών. Lighthouse Score 90+: Εγγυόμαστε performance score 90+ στο Google Lighthouse. Δωρεάν διορθώσεις: Αν κάτι δεν λειτουργεί σωστά, το φτιάχνουμε δωρεάν.",
      },
      {
        heading: "5. Ιδιοκτησία & Πνευματικά Δικαιώματα",
        text: "Μετά την ολοκλήρωση της πληρωμής, ο πελάτης αποκτά πλήρη ιδιοκτησία του website, του περιεχομένου και του κώδικα. Ο πελάτης είναι υπεύθυνος για τη διατήρηση του domain και του hosting. Η mystaysite.com διατηρεί το δικαίωμα χρήσης του project στο portfolio της, εκτός αν συμφωνηθεί διαφορετικά.",
      },
      {
        heading: "6. Υποχρεώσεις Πελάτη",
        text: "Ο πελάτης πρέπει να παρέχει τα απαραίτητα υλικά (φωτογραφίες, κείμενα, links) εγκαίρως. Καθυστερήσεις στην παροχή υλικών μπορεί να επηρεάσουν τον χρόνο παράδοσης. Ο πελάτης εγγυάται ότι όλο το υλικό που παρέχει δεν παραβιάζει δικαιώματα τρίτων.",
      },
      {
        heading: "7. Αλλαγές & Τροποποιήσεις",
        text: "Αλλαγές εντός του αρχικού brief γίνονται δωρεάν πριν το site πάει live. Αλλαγές μετά την παράδοση καλύπτονται από τη μηνιαία συντήρηση ή χρεώνονται ανά περίπτωση. Μεγάλες αλλαγές scope (π.χ. αλλαγή δομής, νέα features) μπορεί να απαιτούν πρόσθετη χρέωση.",
      },
      {
        heading: "8. Ακύρωση",
        text: "Ο πελάτης μπορεί να ακυρώσει πριν την έγκριση του mockup χωρίς καμία χρέωση. Μετά την έγκριση του mockup και την έναρξη ανάπτυξης, η ακύρωση συνεπάγεται χρέωση 50% της αξίας του πακέτου. Η μηνιαία συντήρηση μπορεί να ακυρωθεί ανά πάσα στιγμή.",
      },
      {
        heading: "9. Περιορισμός Ευθύνης",
        text: "Η mystaysite.com δεν ευθύνεται για απώλεια εσόδων, δεδομένων ή κερδών που προκύπτουν από τη χρήση ή αδυναμία χρήσης του website. Δεν εγγυόμαστε συγκεκριμένα αποτελέσματα κρατήσεων ή κατάταξης στο Google. Η μέγιστη ευθύνη μας περιορίζεται στο ποσό που καταβλήθηκε για τις υπηρεσίες.",
      },
      {
        heading: "10. Προστασία Δεδομένων",
        text: "Τα προσωπικά δεδομένα που συλλέγονται χρησιμοποιούνται αποκλειστικά για την παροχή υπηρεσιών. Δεν μοιραζόμαστε δεδομένα με τρίτους χωρίς τη συγκατάθεσή σας. Μπορείτε να ζητήσετε τη διαγραφή των δεδομένων σας ανά πάσα στιγμή μέσω email στο info@mystaysite.com.",
      },
      {
        heading: "11. Εφαρμοστέο Δίκαιο",
        text: "Οι παρόντες όροι διέπονται από το Ελληνικό Δίκαιο.",
      },
      {
        heading: "12. Τροποποιήσεις Όρων",
        text: "Η mystaysite.com διατηρεί το δικαίωμα να τροποποιεί τους παρόντες όρους. Οι αλλαγές θα αναρτώνται σε αυτή τη σελίδα. Η συνέχιση χρήσης των υπηρεσιών μετά από αλλαγή αποτελεί αποδοχή των νέων όρων.",
      },
      {
        heading: "13. Επικοινωνία",
        text: "Για ερωτήσεις σχετικά με τους όρους χρήσης, επικοινωνήστε μαζί μας:\n\nEmail: info@mystaysite.com\nWebsite: mystaysite.com",
      },
    ],
  },
  en: {
    title: "Terms of Service",
    lastUpdated: "Last updated: March 1, 2026",
    sections: [
      {
        heading: "1. Introduction",
        text: "Welcome to mystaysite.com. By using our website and services, you agree to the following terms of use. If you do not agree, please do not use our services.",
      },
      {
        heading: "2. Description of Services",
        text: "mystaysite.com offers website design and development services for vacation rentals, villas and accommodations worldwide. Services include website development, SEO, booking systems, review integration and technical support, depending on the selected package.",
      },
      {
        heading: "3. Pricing & Payments",
        text: "Prices refer to a one-time development cost, unless otherwise stated. Monthly maintenance (€29/month) is optional. Payment is made after the client approves the mockup. There is no charge for the initial mockup. Accepted payment methods: bank transfer, Stripe, Viva Wallet, Crypto, Mastercard, Amex.",
      },
      {
        heading: "4. Guarantees",
        text: "Pay ONLY if you like it: If you don't approve the mockup, you are not charged. Google-Ready in 14 days: We guarantee your site will be indexed on Google within 14 days. Lighthouse Score 90+: We guarantee a performance score of 90+ on Google Lighthouse. Free fixes: If something doesn't work properly, we fix it for free.",
      },
      {
        heading: "5. Ownership & Copyright",
        text: "After full payment, the client acquires full ownership of the website, content and code. The client is responsible for maintaining the domain and hosting. mystaysite.com retains the right to use the project in its portfolio, unless otherwise agreed.",
      },
      {
        heading: "6. Client Obligations",
        text: "The client must provide the necessary materials (photos, text, links) in a timely manner. Delays in providing materials may affect delivery time. The client warrants that all provided material does not infringe on third-party rights.",
      },
      {
        heading: "7. Changes & Modifications",
        text: "Changes within the original brief are made free of charge before the site goes live. Post-delivery changes are covered by monthly maintenance or charged on a case-by-case basis. Major scope changes (e.g., structural changes, new features) may require additional charges.",
      },
      {
        heading: "8. Cancellation",
        text: "The client may cancel before mockup approval without any charge. After mockup approval and development start, cancellation incurs a 50% charge of the package value. Monthly maintenance can be cancelled at any time.",
      },
      {
        heading: "9. Limitation of Liability",
        text: "mystaysite.com is not liable for loss of revenue, data or profits arising from the use or inability to use the website. We do not guarantee specific booking results or Google rankings. Our maximum liability is limited to the amount paid for the services.",
      },
      {
        heading: "10. Data Protection",
        text: "Personal data collected is used exclusively for service provision. We do not share data with third parties without your consent. You may request deletion of your data at any time by emailing info@mystaysite.com.",
      },
      {
        heading: "11. Governing Law",
        text: "These terms are governed by Greek Law.",
      },
      {
        heading: "12. Amendments",
        text: "mystaysite.com reserves the right to modify these terms. Changes will be posted on this page. Continued use of services after a change constitutes acceptance of the new terms.",
      },
      {
        heading: "13. Contact",
        text: "For questions regarding the terms of service, contact us:\n\nEmail: info@mystaysite.com\nWebsite: mystaysite.com",
      },
    ],
  },
};

type Lang = "gr" | "en";

export default function TermsPage() {
  const [lang, setLang] = useState<Lang>("gr");
  const t = content[lang];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-bg-darker">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <div className="font-heading">
              <span className="text-lg font-extrabold text-white">my</span>
              <span className="text-lg font-extrabold text-primary">stay</span>
              <span className="text-lg font-extrabold text-white">site</span>
            </div>
          </a>
          <button
            onClick={() => setLang(lang === "gr" ? "en" : "gr")}
            className="text-xs font-medium text-gray-300 px-3 py-1.5 rounded-md border border-white/20 hover:bg-white/10 transition-colors flex items-center gap-1.5"
          >
            {lang === "gr" ? (
              <svg viewBox="0 0 640 480" className="w-4 h-3 rounded-sm shrink-0">
                <rect fill="#005bae" width="640" height="480" />
                <rect fill="#fff" y="53.3" width="640" height="53.3" />
                <rect fill="#fff" y="160" width="640" height="53.3" />
                <rect fill="#fff" y="266.7" width="640" height="53.3" />
                <rect fill="#fff" y="373.3" width="640" height="53.3" />
                <rect fill="#005bae" width="266.7" height="266.7" />
                <rect fill="#fff" x="106.7" width="53.3" height="266.7" />
                <rect fill="#fff" y="106.7" width="266.7" height="53.3" />
              </svg>
            ) : (
              <svg viewBox="0 0 640 480" className="w-4 h-3 rounded-sm shrink-0">
                <rect fill="#012169" width="640" height="480" />
                <path fill="#fff" d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z" />
                <path fill="#C8102E" d="M424 281l216 159v40L369 281zM241 241l-21 17L0 440v-40l200-159zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z" />
                <path fill="#fff" d="M241 0v480h160V0zM0 160v160h640V160z" />
                <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z" />
              </svg>
            )}
            {lang === "gr" ? "EL" : "EN"}
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-2">
          {t.title}
        </h1>
        <p className="text-sm text-text-secondary mb-10">{t.lastUpdated}</p>

        <div className="space-y-8">
          {t.sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-bold text-text-primary mb-2">
                {section.heading}
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                {section.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <a href="/" className="text-primary hover:text-primary-dark font-medium text-sm transition-colors">
            ← {lang === "gr" ? "Αρχική" : "Home"}
          </a>
          <span className="hidden sm:inline text-gray-300">·</span>
          <a href="/privacy" className="text-primary hover:text-primary-dark font-medium text-sm transition-colors">
            {lang === "gr" ? "Πολιτική Απορρήτου" : "Privacy Policy"}
          </a>
          <span className="hidden sm:inline text-gray-300">·</span>
          <a href="/#pricing" className="text-primary hover:text-primary-dark font-medium text-sm transition-colors">
            {lang === "gr" ? "Πακέτα & Τιμές" : "Packages & Pricing"}
          </a>
        </div>
      </main>
    </div>
  );
}
