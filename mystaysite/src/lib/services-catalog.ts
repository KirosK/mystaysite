export type ServiceItem = {
  id: string;
  title: { el: string; en: string };
  description: { el: string; en: string };
  price: { el: string; en: string };
  href?: string;
  iconKey?: string;
  badge?: { el: string; en: string };
};

export type ServiceCategory = {
  id: string;
  title: { el: string; en: string };
  subtitle: { el: string; en: string };
  accent: string;
  items: ServiceItem[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "property-management",
    title: {
      el: "Διαχείριση Καταλύματος",
      en: "Property Management",
    },
    subtitle: {
      el: "Απομακρυσμένη διαχείριση online παρουσίας, κρατήσεων και επικοινωνίας.",
      en: "Remote management of online presence, bookings and guest communication.",
    },
    accent: "from-violet-500 to-indigo-500",
    items: [
      {
        id: "full-property-management",
        title: {
          el: "Πλήρης Διαχείριση (Remote)",
          en: "Full Property Management (Remote)",
        },
        description: {
          el: "Φροντίζουμε κρατήσεις, τιμές, επικοινωνία, reviews. Εσύ εισπράττεις.",
          en: "We handle bookings, pricing, guest communication and reviews. You collect.",
        },
        price: { el: "15% ανά κράτηση ή €299/μήνα", en: "15% per booking or €299/month" },
        href: "/services/property-management",
        iconKey: "building",
        badge: { el: "Νέο", en: "New" },
      },
      {
        id: "channel-manager",
        title: {
          el: "Channel Manager Setup",
          en: "Channel Manager Setup",
        },
        description: {
          el: "Σύνδεση Booking, Airbnb, Expedia, website σε ένα ημερολόγιο (Beds24, Smoobu).",
          en: "Connect Booking, Airbnb, Expedia and website into one calendar (Beds24, Smoobu).",
        },
        price: { el: "€249 setup + €39/μήνα", en: "€249 setup + €39/month" },
        iconKey: "sync",
      },
      {
        id: "dynamic-pricing",
        title: {
          el: "Dynamic Pricing",
          en: "Dynamic Pricing",
        },
        description: {
          el: "Αυτόματες τιμές βάσει ζήτησης μέσω PriceLabs ή Beyond. +15-30% revenue.",
          en: "Auto pricing based on demand via PriceLabs or Beyond. +15-30% revenue.",
        },
        price: { el: "€149 setup + €29/μήνα", en: "€149 setup + €29/month" },
        iconKey: "chart",
      },
      {
        id: "digital-guest-guide",
        title: {
          el: "Digital Guest Guide",
          en: "Digital Guest Guide",
        },
        description: {
          el: "Web-based οδηγός με Wi-Fi, οδηγίες check-in, τοπικά tips. Λιγότερα μηνύματα.",
          en: "Web-based guide with Wi-Fi, check-in info, local tips. Fewer messages.",
        },
        price: { el: "€199 setup", en: "€199 setup" },
        iconKey: "book",
      },
      {
        id: "whatsapp-automation",
        title: {
          el: "WhatsApp Business",
          en: "WhatsApp Business",
        },
        description: {
          el: "Templates, auto-replies, catalog setup για επαγγελματική επικοινωνία.",
          en: "Templates, auto-replies, catalog setup for professional communication.",
        },
        price: { el: "€129 one-time", en: "€129 one-time" },
        iconKey: "chat",
      },
      {
        id: "smart-checkin",
        title: {
          el: "Smart Check-in",
          en: "Smart Check-in",
        },
        description: {
          el: "Setup smart lock (TTLock/Nuki) + integration με booking platform.",
          en: "Smart lock setup (TTLock/Nuki) + integration with booking platform.",
        },
        price: { el: "€199 + εξοπλισμός", en: "€199 + hardware" },
        iconKey: "lock",
      },
    ],
  },
  {
    id: "marketing",
    title: {
      el: "Marketing & Προβολή",
      en: "Marketing & Visibility",
    },
    subtitle: {
      el: "Περισσότερη επισκεψιμότητα, περισσότερες κρατήσεις.",
      en: "More traffic, more bookings.",
    },
    accent: "from-accent to-orange-500",
    items: [
      {
        id: "google-ads",
        title: { el: "Google Ads", en: "Google Ads" },
        description: {
          el: "Άμεσες κρατήσεις μέσω στοχευμένων διαφημίσεων στο Google.",
          en: "Instant bookings via targeted Google Ads.",
        },
        price: { el: "Από €99/μήνα", en: "From €99/month" },
        href: "/services/google-ads",
        iconKey: "ads",
      },
      {
        id: "seo",
        title: { el: "SEO", en: "SEO" },
        description: {
          el: "Organic traffic στο Google χωρίς διαφημίσεις. Μακροπρόθεσμο ROI.",
          en: "Organic traffic on Google without ads. Long-term ROI.",
        },
        price: { el: "Από €79/μήνα", en: "From €79/month" },
        href: "/services/seo",
        iconKey: "search",
      },
      {
        id: "social-media",
        title: { el: "Social Media", en: "Social Media" },
        description: {
          el: "Instagram & Facebook posts, stories, reels. Content calendar, community management.",
          en: "Instagram & Facebook posts, stories, reels. Content calendar, community management.",
        },
        price: { el: "Από €149/μήνα", en: "From €149/month" },
        href: "/services/social-media",
        iconKey: "social",
      },
      {
        id: "google-business-profile",
        title: {
          el: "Google Business Profile Management",
          en: "Google Business Profile Management",
        },
        description: {
          el: "Βελτιστοποίηση + εβδομαδιαίες αναρτήσεις + απαντήσεις σε reviews.",
          en: "Optimization + weekly posts + review responses.",
        },
        price: { el: "Από €49/μήνα", en: "From €49/month" },
        iconKey: "pin",
      },
      {
        id: "email-marketing",
        title: {
          el: "Email Marketing",
          en: "Email Marketing",
        },
        description: {
          el: "Welcome sequence, newsletter, seasonal campaigns (Mailchimp/Brevo).",
          en: "Welcome sequence, newsletter, seasonal campaigns (Mailchimp/Brevo).",
        },
        price: { el: "€199 setup + €69/μήνα", en: "€199 setup + €69/month" },
        iconKey: "mail",
      },
    ],
  },
  {
    id: "reviews",
    title: {
      el: "Reviews & Listings",
      en: "Reviews & Listings",
    },
    subtitle: {
      el: "Καλύτερη online φήμη, περισσότερες κρατήσεις.",
      en: "Better online reputation, more bookings.",
    },
    accent: "from-emerald-500 to-teal-500",
    items: [
      {
        id: "review-management",
        title: {
          el: "Review Management",
          en: "Review Management",
        },
        description: {
          el: "Auto-requests μετά από check-out, απαντήσεις σε Booking/Google/Tripadvisor.",
          en: "Auto-requests after check-out, replies on Booking/Google/Tripadvisor.",
        },
        price: { el: "Από €39/μήνα", en: "From €39/month" },
        iconKey: "star",
      },
      {
        id: "listing-optimization",
        title: {
          el: "Listing Optimization (Booking/Airbnb)",
          en: "Listing Optimization (Booking/Airbnb)",
        },
        description: {
          el: "Audit + βελτιστοποίηση τίτλου, φωτογραφιών, περιγραφών, amenities.",
          en: "Audit + optimization of title, photos, description, amenities.",
        },
        price: { el: "€149 ανά πλατφόρμα", en: "€149 per platform" },
        iconKey: "list",
      },
    ],
  },
  {
    id: "website",
    title: {
      el: "Website Services",
      en: "Website Services",
    },
    subtitle: {
      el: "Νέο site, συντήρηση ή audit υπάρχοντος.",
      en: "New site, maintenance or audit of existing.",
    },
    accent: "from-sky-500 to-blue-500",
    items: [
      {
        id: "website-build",
        title: {
          el: "Κατασκευή Website",
          en: "Website Build",
        },
        description: {
          el: "Επαγγελματικό site με κρατήσεις, reviews, SEO. 3 πακέτα.",
          en: "Professional site with bookings, reviews, SEO. 3 packages.",
        },
        price: { el: "Από €349", en: "From €349" },
        href: "/#pricing",
        iconKey: "web",
      },
      {
        id: "website-audit",
        title: {
          el: "Website Technical Audit",
          en: "Website Technical Audit",
        },
        description: {
          el: "Audit ταχύτητας, SEO, security, UX. Detailed report + action plan.",
          en: "Speed, SEO, security, UX audit. Detailed report + action plan.",
        },
        price: { el: "€199 one-time", en: "€199 one-time" },
        href: "/services/website-audit",
        iconKey: "audit",
        badge: { el: "Νέο", en: "New" },
      },
      {
        id: "website-maintenance",
        title: {
          el: "Website Maintenance & Hosting",
          en: "Website Maintenance & Hosting",
        },
        description: {
          el: "Updates, backups, security, speed monitoring, 1 ώρα αλλαγών/μήνα.",
          en: "Updates, backups, security, speed monitoring, 1 hour of changes/month.",
        },
        price: { el: "€39/μήνα", en: "€39/month" },
        iconKey: "wrench",
      },
    ],
  },
  {
    id: "analytics-consulting",
    title: {
      el: "Analytics & Consulting",
      en: "Analytics & Consulting",
    },
    subtitle: {
      el: "Δεδομένα και στρατηγική για καλύτερες αποφάσεις.",
      en: "Data and strategy for better decisions.",
    },
    accent: "from-purple-500 to-pink-500",
    items: [
      {
        id: "analytics-consulting",
        title: {
          el: "Analytics Consulting Bundle",
          en: "Analytics Consulting Bundle",
        },
        description: {
          el: "GA4 + Search Console + Booking/Airbnb δεδομένα σε ένα dashboard + μηνιαίο call.",
          en: "GA4 + Search Console + Booking/Airbnb data in one dashboard + monthly call.",
        },
        price: { el: "€149 setup + €79/μήνα", en: "€149 setup + €79/month" },
        href: "/services/analytics-consulting",
        iconKey: "chart",
        badge: { el: "Νέο", en: "New" },
      },
      {
        id: "strategy-audit",
        title: {
          el: "Strategy Audit",
          en: "Strategy Audit",
        },
        description: {
          el: "2ωρη συνάντηση + 10-page audit report: website, SEO, listings, ανταγωνισμός.",
          en: "2-hour session + 10-page audit report: website, SEO, listings, competition.",
        },
        price: { el: "€199 one-time", en: "€199 one-time" },
        iconKey: "target",
      },
      {
        id: "monthly-report",
        title: {
          el: "Monthly Performance Report",
          en: "Monthly Performance Report",
        },
        description: {
          el: "GA4, Search Console, Booking, ads σε ένα PDF dashboard κάθε μήνα.",
          en: "GA4, Search Console, Booking, ads in one PDF dashboard every month.",
        },
        price: { el: "€39/μήνα", en: "€39/month" },
        iconKey: "report",
      },
    ],
  },
  {
    id: "legal",
    title: {
      el: "Νομικά & Compliance",
      en: "Legal & Compliance",
    },
    subtitle: {
      el: "Μείνε εντός νόμου χωρίς να χάνεις χρόνο.",
      en: "Stay legally compliant without the headache.",
    },
    accent: "from-rose-500 to-red-500",
    items: [
      {
        id: "mite-aade",
        title: {
          el: "ΜΗΤΕ / ΑΑΔΕ Registration Support",
          en: "MITE / AADE Registration Support",
        },
        description: {
          el: "Καταχώρηση βραχυχρόνιας μίσθωσης, σύνδεση με MyData.",
          en: "Short-term rental registration in Greece, MyData integration.",
        },
        price: { el: "€129 one-time", en: "€129 one-time" },
        iconKey: "doc",
      },
      {
        id: "gdpr",
        title: {
          el: "GDPR Compliance Pack",
          en: "GDPR Compliance Pack",
        },
        description: {
          el: "Privacy policy, cookie consent, data forms για website και booking platforms.",
          en: "Privacy policy, cookie consent, data forms for website and booking platforms.",
        },
        price: { el: "€129 one-time", en: "€129 one-time" },
        iconKey: "shield",
      },
    ],
  },
  {
    id: "branding",
    title: {
      el: "Branding",
      en: "Branding",
    },
    subtitle: {
      el: "Επαγγελματική εικόνα που ξεχωρίζει.",
      en: "Professional image that stands out.",
    },
    accent: "from-amber-500 to-yellow-500",
    items: [
      {
        id: "logo-identity",
        title: {
          el: "Logo & Brand Identity",
          en: "Logo & Brand Identity",
        },
        description: {
          el: "Λογότυπο + χρωματική παλέτα + font system + business cards design.",
          en: "Logo + color palette + font system + business card design.",
        },
        price: { el: "Από €249", en: "From €249" },
        iconKey: "palette",
      },
      {
        id: "printed-materials",
        title: {
          el: "Printed Materials",
          en: "Printed Materials",
        },
        description: {
          el: "Welcome cards, τιμοκατάλογοι, οδηγίες, κουπόνια (design + print partner).",
          en: "Welcome cards, price lists, instructions, coupons (design + print partner).",
        },
        price: { el: "Από €149 + τύπωμα", en: "From €149 + printing" },
        iconKey: "printer",
      },
    ],
  },
];

export type ServiceBundle = {
  id: string;
  name: { el: string; en: string };
  target: { el: string; en: string };
  includes: { el: string[]; en: string[] };
  price: { el: string; en: string };
  highlight?: boolean;
};

export const SERVICE_BUNDLES: ServiceBundle[] = [
  {
    id: "launch",
    name: { el: "Launch Package", en: "Launch Package" },
    target: {
      el: "Για νέα καταλύματα που θέλουν πλήρες online setup",
      en: "For new properties that need a full online setup",
    },
    includes: {
      el: [
        "Website (Professional package)",
        "Listing Optimization (Booking + Airbnb)",
        "Google Business Profile setup",
        "GDPR Compliance Pack",
        "30 μέρες onboarding support",
      ],
      en: [
        "Website (Professional package)",
        "Listing Optimization (Booking + Airbnb)",
        "Google Business Profile setup",
        "GDPR Compliance Pack",
        "30 days onboarding support",
      ],
    },
    price: { el: "Από €1,199", en: "From €1,199" },
  },
  {
    id: "growth",
    name: { el: "Growth Package", en: "Growth Package" },
    target: {
      el: "Για καταλύματα σε λειτουργία που θέλουν περισσότερες direct κρατήσεις",
      en: "For operating properties that want more direct bookings",
    },
    includes: {
      el: [
        "SEO (€79/μήνα)",
        "Google Ads (€99/μήνα)",
        "Review Management (€39/μήνα)",
        "Dynamic Pricing setup + support",
        "Monthly Performance Report",
      ],
      en: [
        "SEO (€79/month)",
        "Google Ads (€99/month)",
        "Review Management (€39/month)",
        "Dynamic Pricing setup + support",
        "Monthly Performance Report",
      ],
    },
    price: { el: "€249/μήνα", en: "€249/month" },
    highlight: true,
  },
  {
    id: "manage",
    name: { el: "Managed Package", en: "Managed Package" },
    target: {
      el: "Θέλεις να ασχολείσαι όσο το δυνατόν λιγότερο. Αναλαμβάνουμε όλη τη διαχείριση.",
      en: "You want to be as hands-off as possible. We handle everything.",
    },
    includes: {
      el: [
        "Πλήρης Διαχείριση (Remote)",
        "Channel Manager + Dynamic Pricing",
        "Review & GBP Management",
        "WhatsApp Business + Digital Guide",
        "Μηνιαίο strategy call",
      ],
      en: [
        "Full Property Management (Remote)",
        "Channel Manager + Dynamic Pricing",
        "Review & GBP Management",
        "WhatsApp Business + Digital Guide",
        "Monthly strategy call",
      ],
    },
    price: { el: "15% ανά κράτηση ή €399/μήνα", en: "15% per booking or €399/month" },
  },
];
