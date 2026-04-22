"use client";

import { useLang } from "@/lib/language-context";

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
        text: "Οι τιμές αναφέρονται σε εφάπαξ κόστος κατασκευής, εκτός αν ορίζεται διαφορετικά. Η ετήσια συντήρηση ανέρχεται σε €200/χρόνο, με τον πρώτο χρόνο δωρεάν για όλα τα νέα πακέτα. Η συνεργασία ξεκινά με προκαταβολή 30% της αξίας του πακέτου, ενώ το υπόλοιπο 70% καταβάλλεται με την παράδοση και έγκριση του τελικού site. Αποδεκτοί τρόποι πληρωμής: τραπεζική μεταφορά, Stripe, Viva Wallet, Crypto, Mastercard, Amex.",
      },
      {
        heading: "4. Εγγυήσεις",
        text: "Απεριόριστα revisions: Κάνουμε όσες διορθώσεις χρειάζονται μέχρι να είστε 100% ικανοποιημένοι, πριν την τελική παράδοση. Google-Ready σε 14 ημέρες: Εγγυόμαστε ότι το site σας θα είναι indexed στο Google εντός 14 ημερών από την παράδοση. 6 μήνες bug-free εγγύηση: Αν κάτι δεν λειτουργεί σωστά εντός 6 μηνών, το διορθώνουμε δωρεάν.",
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
        text: "Αλλαγές εντός του αρχικού brief γίνονται δωρεάν πριν το site πάει live. Για 3 μήνες μετά την παράδοση, οι αλλαγές κειμένου, τιμών και φωτογραφιών είναι επίσης δωρεάν. Μετά την περίοδο αυτή καλύπτονται από την ετήσια συντήρηση (€200/χρόνο, 1ος χρόνος δωρεάν) ή χρεώνονται ανά περίπτωση. Μεγάλες αλλαγές scope (π.χ. αλλαγή δομής, νέα features) μπορεί να απαιτούν πρόσθετη χρέωση.",
      },
      {
        heading: "8. Ακύρωση",
        text: "Η προκαταβολή 30% δεν επιστρέφεται μετά την έναρξη των εργασιών, καθώς καλύπτει το αρχικό σχεδιαστικό και τεχνικό έργο. Αν ο πελάτης ζητήσει ακύρωση μετά την παράδοση του αρχικού design αλλά πριν την ολοκλήρωση, το υπόλοιπο 70% δεν οφείλεται. Η ετήσια συντήρηση μπορεί να ακυρωθεί πριν την ανανέωσή της κάθε έτος.",
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
        text: "Prices refer to a one-time development cost, unless otherwise stated. Yearly maintenance is €200/year, with the first year free for all new packages. The engagement starts with a 30% deposit of the package value, with the remaining 70% paid upon delivery and approval of the final site. Accepted payment methods: bank transfer, Stripe, Viva Wallet, Crypto, Mastercard, Amex.",
      },
      {
        heading: "4. Guarantees",
        text: "Unlimited revisions: We make as many changes as needed until you're 100% satisfied, before final delivery. Google-Ready in 14 days: We guarantee your site will be indexed on Google within 14 days of delivery. 6-month bug-free guarantee: If something doesn't work properly within 6 months, we fix it for free.",
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
        text: "Changes within the original brief are made free of charge before the site goes live. For 3 months after delivery, text, pricing and photo edits are also free of charge. After that period they are covered by yearly maintenance (€200/year, 1st year free) or charged on a case-by-case basis. Major scope changes (e.g., structural changes, new features) may require additional charges.",
      },
      {
        heading: "8. Cancellation",
        text: "The 30% deposit is non-refundable once work has begun, as it covers the initial design and technical work. If the client cancels after initial design delivery but before completion, the remaining 70% is not owed. Yearly maintenance can be cancelled before renewal each year.",
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

export default function TermsPage() {
  const { lang } = useLang();
  const t = content[lang];
  const urlLocale = lang === "en" ? "en" : "el";

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F1A]">
      <div className="h-16 md:h-18" />
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
          <a href={`/${urlLocale}`} className="text-primary hover:text-primary-dark font-medium text-sm transition-colors">
            ← {lang === "gr" ? "Αρχική" : "Home"}
          </a>
          <span className="hidden sm:inline text-gray-300 dark:text-gray-600">·</span>
          <a href={`/${urlLocale}/privacy`} className="text-primary hover:text-primary-dark font-medium text-sm transition-colors">
            {lang === "gr" ? "Πολιτική Απορρήτου" : "Privacy Policy"}
          </a>
          <span className="hidden sm:inline text-gray-300 dark:text-gray-600">·</span>
          <a href={`/${urlLocale}/#pricing`} className="text-primary hover:text-primary-dark font-medium text-sm transition-colors">
            {lang === "gr" ? "Πακέτα & Τιμές" : "Packages & Pricing"}
          </a>
        </div>
      </main>
    </div>
  );
}
