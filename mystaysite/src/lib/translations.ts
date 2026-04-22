export type Lang = "gr" | "en";

export const translations = {
  gr: {
    nav: {
      why: "Γιατί Εμάς",
      how: "Πώς Λειτουργεί",
      portfolio: "Δείγματα",
      pricing: "Πακέτα",
      services: "Υπηρεσίες",
      servicesItems: [
        { label: "Διαχείριση Καταλύματος", href: "/services/property-management" },
        { label: "Website Audit", href: "/services/website-audit" },
        { label: "Analytics & Consulting", href: "/services/analytics-consulting" },
        { label: "Google Ads", href: "/services/google-ads" },
        { label: "SEO", href: "/services/seo" },
        { label: "Social Media", href: "/services/social-media" },
      ],
      servicesAll: "Όλες οι υπηρεσίες →",
      faq: "FAQ",
      blog: "Blog",
      contact: "Επικοινωνία",
      cta: "Ζητήστε Προσφορά",
    },
    hero: {
      title: "Σταμάτα να δουλεύεις για το Booking.",
      titleHighlight: "Ασε το Booking να δουλεύει για σένα.",
      subtitle:
        "Το κατάλυμά σου αξίζει δική του θέση στο Google. Σου φτιάχνουμε επαγγελματικό website με κριτικές, φωτογραφίες και SEO. Όταν κάποιος ψάξει, βρίσκει ΕΣΕΝΑ.",
      cta: "Ζητήστε Προσφορά",
      ctaSecondary: "Δείτε δείγματα",
    },
    trust: {
      delivery: "Παράδοση σε 2-5 ημέρες",
      google: "Στο Google σε 14 ημέρες",
      greek: "Προσωπική εξυπηρέτηση",
      mockup: "30% προκαταβολή για να ξεκινήσουμε",
    },
    proof: {
      stat1: "9.5/10 Booking.com score πελάτη μας",
      stat2: "€0 προμήθεια σε κάθε κράτηση",
    },
    urgency: {
      banner: "Δεχόμαστε 5 νέα projects τον μήνα. 3 θέσεις διαθέσιμες.",
      seasonal: "Παράδοση εγγυημένη πριν τη σεζόν 2026",
    },
    pain: {
      sectionTitle: "Αυτά σου κοστίζουν χρήματα. Τώρα.",
      card1Title: "15-20% σε κάθε κράτηση",
      card1Text:
        "Κάθε φορά που κλείνει κάποιος μέσω Booking.com, εσύ χάνεις €15-€30. Σε 100 κρατήσεις; Αυτά είναι €1,500-€3,000 τον χρόνο. Λεφτά που θα μπορούσαν να είναι ΔΙΚΑ ΣΟΥ.",
      card1Cost: "",
      card2Title: "Δεν υπάρχεις στο Google",
      card2Text:
        "Κάποιος ψάχνει 'ενοικιαζόμενα δωμάτια Χαλκιδική'. Βρίσκει Booking, Airbnb, TripAdvisor. Δεν βρίσκει ΕΣΕ'ΝΑ. Χάνεις 30-50 κρατήσεις τον χρόνο από ανθρώπους που σε έψαξαν αλλά δεν σε βρήκαν.",
      card2Cost: "",
      card3Title: "Οι κριτικές σου σκορπισμένες",
      card3Text:
        "9.0 στο Booking. 4.8 στο Airbnb. 5.0 στο Google. Εντυπωσιακά. Αλλά κανείς δεν τα βλέπει μαζί. Ο ανταγωνισμός σου έχει site. Εσύ τους στέλνεις πελάτες δωρεάν.",
      card3Cost: "",
      transition: "Υπάρχει ένας απλός τρόπος να αλλάξει αυτό.",
    },
    solution: {
      sectionTitle:
        "Ένα website που δουλεύει για σένα - όχι απλά μια σελίδα που κάθεται",
      subtitle:
        "Κάθε site που φτιάχνουμε είναι σχεδιασμένο με ΕΝΑ στόχο: ο επισκέπτης να κλείσει απευθείας σε σένα.",
      features: [
        {
          title: "Σύστημα Κρατήσεων",
          text: "Ο επισκέπτης επιλέγει ημερομηνίες, βλέπει διαθεσιμότητα, κλείνει. Εσύ λαμβάνεις email + SMS. Χωρίς Booking, χωρίς προμήθεια, χωρίς μεσάζοντες.",
        },
        {
          title: "Κριτικές από Παντού σε Ένα Section",
          text: "Συγκεντρώνουμε τις κριτικές σου από Booking.com, Google Maps και Airbnb σε ένα εντυπωσιακό section. Social proof που πουλάει.",
        },
        {
          title: "Professional Gallery",
          text: "Full-screen φωτογραφίες: δωμάτια, κήπος, θέα, παραλίες. Κάθε εικόνα πουλάει μια εμπειρία. Lightbox, lazy-loaded, mobile-optimized.",
        },
        {
          title: "Χάρτης & Τοποθεσία",
          text: "Google Maps embed, αποστάσεις από κοντινές παραλίες, οδηγίες πρόσβασης. Ο επισκέπτης καταλαβαίνει ακριβώς πού είσαι.",
        },
        {
          title: "Google SEO",
          text: "Βελτιστοποιούμε κάθε σελίδα ώστε το κατάλυμά σου να εμφανίζεται στο Google. 'Ενοικιαζόμενα δωμάτια Λευκάδα' → η δική σου σελίδα.",
        },
        {
          title: "Πολύγλωσσο",
          text: "Ελληνικά, Αγγλικά, Γερμανικά, Ιταλικά - ο τουρίστας βλέπει τη γλώσσα του. Αυτόματα.",
        },
        {
          title: "Mobile-First",
          text: "82% των τουριστών ψάχνουν από κινητό. Κάθε site μας σχεδιάζεται πρώτα για κινητό, μετά για desktop.",
        },
        {
          title: "Γρήγορο & Ασφαλές",
          text: "SSL πιστοποιητικό, ταχύτητα φόρτωσης < 2 δεύτερα, GDPR compliant. Επαγγελματισμός σε κάθε λεπτομέρεια.",
        },
      ],
    },
    portfolio: {
      sectionTitle: "Δείγματα δουλειάς",
      subtitle:
        "Κάθε site είναι custom - σχεδιασμένο για το δικό σου κατάλυμα, τη δική σου περιοχή, τη δική σου αισθητική.",
      bottomText:
        "Αυτά είναι μόνο δείγματα. Το δικό σου site θα είναι φτιαγμένο 100% για ΕΣΕ'ΝΑ.",
      cta: "Θέλω κάτι παρόμοιο",
      seeMore: "Δες περισσότερα",
      viewLive: "Δες το live ↗",
      mockupViewLive: "Δες το live site ↗",
      before: "Πριν",
      after: "Μετά",
      projects: [
        {
          location: "Γλυφά, Αντίπαρος",
          features: ["Κρατήσεις", "Reviews", "SEO", "3 Γλώσσες", "Πισίνες"],
          metricsBefore: "0 online παρουσία",
          metricsAfter: "3γλωσσο site σε 5 μέρες",
        },
        {
          location: "Παραλία Συκιάς, Σιθωνία, Χαλκιδική",
          features: ["Κρατήσεις", "Reviews", "SEO", "Παραλίες"],
          metricsBefore: "0 direct bookings",
          metricsAfter: "12+/μήνα",
        },
        {
          location: "Σκάλα Συκιάς, Σιθωνία, Χαλκιδική",
          features: ["Κρατήσεις", "Reviews", "SEO", "6 Διαμ/τα"],
          metricsBefore: "Μόνο Booking",
          metricsAfter: "40% λιγότερες προμήθειες",
        },
      ],
    },
    howItWorks: {
      sectionTitle:
        "3 βήματα. 2 λεπτά από τον χρόνο σου. Τα υπόλοιπα τα κάνουμε εμείς.",
      steps: [
        {
          title: "Στείλε μας τα links σου",
          text: "Στείλε μας το Booking + Airbnb link σου. Τραβάμε φωτογραφίες, κριτικές, περιγραφές - αυτόματα. Δεν χρειάζεται να μας στείλεις τίποτα άλλο.",
        },
        {
          title: "Λαμβάνεις προσωπική προσφορά",
          text: "Σε 24 ώρες έχεις στα χέρια σου αναλυτική προσφορά με το πακέτο που ταιριάζει στο κατάλυμά σου. Ζητάς διευκρινίσεις ή αλλαγές πριν αποφασίσεις. Χωρίς δέσμευση, χωρίς πίεση.",
        },
        {
          title: "Υπάρχεις στο Google",
          text: "Με 30% προκαταβολή ξεκινάμε. Σε 2-5 ημέρες το site σου είναι live, σε 14 ημέρες εμφανίζεσαι στο Google. Απεριόριστες αλλαγές μέχρι να είσαι 100% ευχαριστημένος, και 3 μήνες δωρεάν edits μετά την παράδοση.",
        },
      ],
    },
    testimonials: {
      sectionTitle:
        "Δεν χρειάζεται να μας πιστέψεις. Πίστεψε αυτούς.",
      reviews: [
        {
          text: "Δεν πίστευα ότι χρειαζόμουν site. Τώρα παίρνω απευθείας κρατήσεις χωρίς να πληρώνω προμήθεια. Το RODAVGI site μας φέρνει κόσμο που μας βρίσκει στο Google!",
          name: "RODAVGI",
          property: "RODAVGI Apartments",
          location: "Χαλκιδική",
          url: "https://rodavgiapartments.com/",
        },
        {
          text: "Μου έφτιαξαν το site σε 6 μέρες. Ό,τι ακριβώς ζήτησα. Και ήδη μου βγήκε σε κρατήσεις η πρώτη σεζόν.",
          name: "Γιώργος Π.",
          property: "Studios Panorama",
          location: "Λευκάδα",
        },
        {
          text: "Το καλύτερο ήταν το section με τις κριτικές. Οι επισκέπτες βλέπουν τα 9.5 στο Booking μαζί με τα 5.0 στο Google και κλείνουν αμέσως.",
          name: "Ελένη Δ.",
          property: "Villa Sunset",
          location: "Νάξος",
        },
      ],
      googleRating: "5.0 στο Google",
      caseStudyLink: "Δες αναλυτικό case study →",
    },
    pricing: {
      sectionTitle: "Διάλεξε το πακέτο σου",
      subtitle:
        "Website | Website + Κρατήσεις | Website + Κρατήσεις + Marketing. Εσύ διαλέγεις.",
      popular: "ΔΗΜΟΦΙΛΕΣ",
      premiumBadge: "BEST VALUE",
      starter: {
        name: "STARTER",
        tagline: "Η πρώτη σου online παρουσία",
        price: "Από €349",
        priceSub: "εφάπαξ · 1ος χρόνος συντήρησης ΔΩΡΕΑΝ",
        target: "Για 1-3 δωμάτια",
        features: [
          "Custom responsive website",
          "Φωτογραφίες + κείμενα",
          "Google Maps & τοποθεσία",
          "Φόρμα κράτησης (email notification)",
          "SEO βασικό setup",
          "SSL + custom domain setup",
          "Google Business Profile setup",
          "Παράδοση σε 2-5 ημέρες",
          "3 μήνες δωρεάν αλλαγές μετά την παράδοση",
          "1ος χρόνος συντήρησης δωρεάν",
          "6 μήνες εγγύηση",
        ],
        cta: "Ξεκινήστε τώρα",
        ctaSub: "Χωρίς δέσμευση",
      },
      professional: {
        name: "PROFESSIONAL",
        tagline: "Η μηχανή κρατήσεων",
        price: "Από €599",
        priceSub: "εφάπαξ · 1ος χρόνος συντήρησης ΔΩΡΕΑΝ",
        target: "Για 3-10 δωμάτια",
        includes: "Ό,τι έχει το Starter, PLUS:",
        features: [
          "Σύστημα κρατήσεων (ημερολόγιο + date picker)",
          "Reviews section (Booking + Google + Airbnb)",
          "Professional photo gallery",
          "2 γλώσσες (GR + EN)",
          "Google Analytics setup",
          "Social media covers",
          "3 μήνες δωρεάν αλλαγές μετά την παράδοση",
          "1ος χρόνος συντήρησης δωρεάν",
          "6 μήνες εγγύηση",
        ],
        cta: "Ξεκινήστε τώρα",
        ctaSub: "Το 80% των πελατών μας επιλέγουν αυτό",
      },
      premium: {
        name: "PREMIUM",
        tagline: "Ολοκληρωμένο digital setup",
        price: "Κατόπιν προσφοράς",
        priceSub: "Προσαρμοσμένη τιμή",
        target: "Για βίλες & πολλαπλά καταλύματα",
        includes: "Ό,τι έχει το Professional, PLUS:",
        features: [
          "Online πληρωμές (Stripe / Viva Wallet)",
          "iCal availability sync (αυτόματη ενημέρωση διαθεσιμότητας)",
          "3+ γλώσσες (GR / EN / DE ή IT)",
          "Blog section + 3 SEO articles γραμμένα από εμάς",
          "Professional copywriting σε όλες τις γλώσσες",
          "Google Ads - setup 1ης καμπάνιας + ad credit",
          "Facebook + Instagram setup + 5 posts με εικόνες",
          "Google Business Profile πλήρης βελτιστοποίηση",
          "RoomLink PMS σύνδεση",
          "12 μήνες priority support",
          "Μηνιαία αναφορά performance",
        ],
        cta: "Ζητήστε Προσφορά",
        ctaSub: "Website + Marketing + Content. Done-for-you.",
      },
      maintenance:
        "Συντήρηση: €200/χρόνο - 1ος χρόνος ΔΩΡΕΑΝ. Περιλαμβάνει: updates, backups, security patches, μικρές αλλαγές κειμένου/τιμών.",
      guarantee:
        "Απεριόριστα revisions μέχρι να είσαι ικανοποιημένος. 6 μήνες εγγύηση.",
      custom: "Θες κάτι custom; Μίλα μαζί μας",
      termsLink: "Όροι χρήσης & πληρωμών",
    },
    guarantee: {
      sectionTitle: "3 εγγυήσεις. Μηδέν ρίσκο.",
      subtitle: "Δίκαιη συνεργασία. Εσύ ξέρεις τι πληρώνεις και τι παίρνεις.",
      items: [
        {
          title: "Απεριόριστα revisions",
          text: "Ξεκινάμε με 30% προκαταβολή και κάνουμε όσα revisions χρειάζονται μέχρι να είσαι 100% ικανοποιημένος. Το υπόλοιπο 70% πληρώνεται με την παράδοση.",
        },
        {
          title: "Google-Ready σε 14 ημέρες",
          text: "Εγγυόμαστε ότι το site σου θα εμφανίζεται στο Google μέσα σε 14 ημέρες. Αν δεν εμφανιστεί, δουλεύουμε δωρεάν μέχρι να εμφανιστεί. Κανένας ανταγωνιστής δεν σου δίνει αυτήν την εγγύηση.",
        },
        {
          title: "6 μήνες bug-free εγγύηση",
          text: "Αν κάτι δεν λειτουργεί σωστά μέσα σε 6 μήνες, το φτιάχνουμε δωρεάν. Χωρίς ερωτήσεις, χωρίς χρεώσεις.",
        },
      ],
      ctaLink: "Ζητήστε Προσφορά",
    },
    faq: {
      sectionTitle: "Απαντήσεις που ψάχνεις",
      items: [
        {
          q: "Πόσο κοστίζει;",
          a: 'Κάθε κατάλυμα έχει διαφορετικές ανάγκες. Ζητήστε προσφορά και σας ετοιμάζουμε προσωπικό πλάνο. Ξεκινάμε με 30% προκαταβολή. <a href="/#pricing">Δες τα πακέτα</a>.',
        },
        {
          q: "Πόσο χρόνο χρειάζεται;",
          a: "2-5 εργάσιμες ημέρες από τη στιγμή που ξεκινάμε. Τα απλούστερα sites μπορεί να είναι έτοιμα σε 2 ημέρες.",
        },
        {
          q: "Χρειάζομαι domain;",
          a: "Αν δεν έχεις, σου βρίσκουμε και σου εγκαθιστούμε ένα (π.χ. www.villaeleni.gr ή www.rodavgiapartments.com). Κοστίζει ~€10-15/χρόνο.",
        },
        {
          q: "Μπορώ να αλλάζω μόνος μου πράγματα στο site;",
          a: "Ναι, αν θέλεις. Αλλά οι περισσότεροι πελάτες μας μας στέλνουν τι θέλουν να αλλάξει και το κάνουμε εμείς. Για 3 μήνες μετά την παράδοση οι αλλαγές είναι ΔΩΡΕΑΝ. Μετά καλύπτονται από την ετήσια συντήρηση (€200/χρόνο, 1ος χρόνος δωρεάν) ή χρεώνονται ανά αλλαγή.",
        },
        {
          q: "Θα με βρίσκουν στο Google;",
          a: 'Εγγυόμαστε ότι το site σου θα είναι indexed στο Google μέσα σε 14 ημέρες. Δεν εγγυόμαστε #1 θέση, αλλά εγγυόμαστε ότι θα υπάρχεις - κάτι που τώρα δεν ισχύει. <a href="/portfolio/achilleas-peaceful-place">Δες ένα παράδειγμα</a>.',
        },
        {
          q: "Παίρνετε ποσοστό από τις κρατήσεις μου;",
          a: "ΟΧΙ. Ποτέ. 0%. Οι κρατήσεις είναι 100% δικές σου. Πληρώνεις μία φορά για το site και μετά €200/χρόνο ετήσια συντήρηση (1ος χρόνος δωρεάν). Τέλος.",
        },
        {
          q: "Τι γίνεται αν δεν μου αρέσει το αποτέλεσμα;",
          a: 'Κάνουμε απεριόριστα revisions μέχρι να είσαι 100% ικανοποιημένος. Ξεκινάμε με 30% προκαταβολή και το υπόλοιπο πληρώνεται με την παράδοση. Επιπλέον, 6 μήνες εγγύηση bug-free. <a href="/#contact">Ζητήστε Προσφορά</a>.',
        },
        {
          q: "Έχω ήδη site αλλά είναι παλιό. Μπορείτε να το ανανεώσετε;",
          a: "Φυσικά. Αναλαμβάνουμε redesign υπαρχόντων sites. Σου δίνουμε προσφορά αφού δούμε τι έχεις.",
        },
      ],
    },
    contact: {
      sectionTitle: "Πάρε τις κρατήσεις στα χέρια σου",
      subtitle: "Συμπληρώστε τη φόρμα ή στείλτε μας μήνυμα. Σας απαντάμε εντός 24 ωρών.",
      whatsappCta: "Στείλε μας στο WhatsApp",
      whatsappPrefill: "Γεια! Ενδιαφέρομαι για κατασκευή website. ",
      divider: "ή συμπλήρωσε",
      nameLabel: "Όνομα",
      namePlaceholder: "π.χ. Γιώργος Παπαδόπουλος",
      linkLabel: "Booking ή Airbnb link (προαιρετικό)",
      linkPlaceholder: "π.χ. booking.com/hotel/... ή rodavgiapartments.com",
      contactLabel: "Email ή τηλέφωνο",
      contactPlaceholder: "π.χ. info@villaeleni.gr ή 69XXXXXXXX",
      messageLabel: "Μήνυμα (προαιρετικό)",
      messagePlaceholder: "Πείτε μας λίγα λόγια για το κατάλυμά σας...",
      cta: "Ζητήστε Προσφορά",
      responseTime: "Απαντάμε σε λιγότερο από 24 ώρες",
      success: "Ευχαριστούμε! Θα επικοινωνήσουμε μαζί σας σύντομα.",
      error: "Κάτι πήγε στραβά. Στείλε μας απευθείας στο WhatsApp",
      infoPhone: "+30 697 458 5063",
      infoWhatsapp: "WhatsApp",
      infoEmail: "info@mystaysite.com",
      infoHours: "Δευτέρα - Σάββατο, 9:00 - 21:00",
    },
    footer: {
      tagline: "Websites για ενοικιαζόμενα δωμάτια & καταλύματα",
      quickLinks: "Σύνδεσμοι",
      quickLinkItems: ["Δείγματα", "Πακέτα", "FAQ", "Blog", "Επικοινωνία"],
      portfolio: "Portfolio",
      portfolioItems: [
        { label: "Villa Afroditi", url: "https://www.antiparos-afroditivillas.gr" },
        { label: "RODAVGI Apartments", url: "https://rodavgiapartments.com" },
        { label: "Achilleas Peaceful Place", url: "https://achilleasplace.gr" },
      ],
      legal: "Νομικά",
      legalList: ["Όροι Χρήσης", "Πολιτική Απορρήτου"],
      paymentMethods: "Τρόποι πληρωμής",
      paymentMethodsList: "Τραπεζική μεταφορά · Stripe · Viva Wallet · Crypto · Mastercard · Amex",
      paymentMethodsItems: [
        { key: "bank", label: "Τραπεζική μεταφορά" },
        { key: "stripe", label: "Stripe" },
        { key: "viva", label: "Viva Wallet" },
        { key: "crypto", label: "Crypto" },
        { key: "mastercard", label: "Mastercard" },
        { key: "amex", label: "Amex" },
      ],
      copyright:
        "© 2026 mystaysite.com - Φτιάχνουμε websites που φέρνουν κρατήσεις.",
    },
    whatsapp: {
      prefill: "Γεια σας! Ενδιαφέρομαι για κατασκευή website για το κατάλυμά μου.",
    },
    mobileCta: {
      whatsapp: "WhatsApp",
      sendLink: "Ζητήστε Προσφορά",
    },
    exitPopup: {
      title: "Θέλετε επαγγελματικό website;",
      text: "Δείτε πώς μπορούμε να σας βοηθήσουμε σε 2-5 μέρες. Ζητήστε προσφορά χωρίς δέσμευση.",
      cta: "Ζητήστε Προσφορά",
    },
    chatbot: {
      title: "Κύρος | MyStaySite",
      subtitle: "Απαντάμε σε < 1 λεπτό",
      greeting: "Γεια σου! Είμαι ο Κύρος από την MyStaySite. Φτιάχνουμε websites για ενοικιαζόμενα δωμάτια. Πώς μπορώ να σε βοηθήσω;",
      options: [
        "Θέλω προσφορά",
        "Πώς λειτουργεί;",
        "Δείτε δείγματα",
      ],
      askLink: "Τέλεια! Στείλε μου το Booking ή Airbnb link του καταλύματός σου και σου ετοιμάζουμε αναλυτική προσφορά σε 24 ώρες.",
      askContact: "Ωραία! Τώρα χρειάζομαι το email ή το τηλέφωνό σου για να επικοινωνήσουμε.",
      pricingReply: "Κάθε κατάλυμα έχει διαφορετικές ανάγκες, γι' αυτό δίνουμε προσωπική προσφορά. Θέλεις να σου ετοιμάσουμε μία;",
      howReply: "Η διαδικασία είναι πολύ απλή:\n\n1. Μας στέλνεις το Booking/Airbnb link σου\n2. Σε 24 ώρες λαμβάνεις αναλυτική προσφορά\n3. 30% προκαταβολή για να ξεκινήσουμε. Σε 2-5 ημέρες είσαι online.\n\nΘέλεις να ξεκινήσουμε;",
      samplesReply: "Δες τα live sites μας:\n\n• Villa Afroditi (Αντίπαρος): antiparos-afroditivillas.gr\n• RODAVGI Apartments (Χαλκιδική): rodavgiapartments.com\n• Achilleas Peaceful Place (Χαλκιδική): achilleasplace.gr\n\nΘέλεις να σου ετοιμάσουμε κάτι παρόμοιο;",
      yesOption: "Ναι, θέλω προσφορά!",
      thanksTitle: "Ευχαριστούμε!",
      thanks: "Τέλεια! Θα επικοινωνήσουμε σύντομα. Αν έχεις κάποια ερώτηση, στείλε μας στο WhatsApp!",
      linkPlaceholder: "π.χ. booking.com/hotel/...",
      contactPlaceholder: "Email ή τηλέφωνο",
      send: "Στείλε",
      inputPlaceholder: "Γράψε μήνυμα...",
    },
  },
  en: {
    nav: {
      why: "Why Us",
      how: "How It Works",
      portfolio: "Portfolio",
      pricing: "Packages",
      services: "Services",
      servicesItems: [
        { label: "Property Management", href: "/services/property-management" },
        { label: "Website Audit", href: "/services/website-audit" },
        { label: "Analytics & Consulting", href: "/services/analytics-consulting" },
        { label: "Google Ads", href: "/services/google-ads" },
        { label: "SEO", href: "/services/seo" },
        { label: "Social Media", href: "/services/social-media" },
      ],
      servicesAll: "All services →",
      faq: "FAQ",
      blog: "Blog",
      contact: "Contact",
      cta: "Get a Quote",
    },
    hero: {
      title: "Stop working for Booking.",
      titleHighlight: "Let Booking work for you.",
      subtitle:
        "Your property deserves its own place on Google. We build a professional website with reviews, photos and SEO. When someone searches, they find YOU.",
      cta: "Get a Quote",
      ctaSecondary: "See our work ↓",
    },
    trust: {
      delivery: "Delivered in 2-5 days",
      google: "On Google in 14 days",
      greek: "Personal support",
      mockup: "30% deposit to get started",
    },
    proof: {
      stat1: "9.5/10 Booking.com client score",
      stat2: "€0 commission on every booking",
    },
    urgency: {
      banner: "We accept 5 new projects per month. 3 spots available.",
      seasonal: "Guaranteed delivery before the 2026 season",
    },
    pain: {
      sectionTitle: "This is costing you money. Right now.",
      card1Title: "15-20% on every booking",
      card1Text:
        "Every time someone books through Booking.com, you lose €15-€30. On 100 bookings? That's €1,500-€3,000 per year. Money that could be YOURS.",
      card1Cost: "",
      card2Title: "You don't exist on Google",
      card2Text:
        "Someone searches 'vacation rentals Halkidiki'. They find Booking, Airbnb, TripAdvisor. Not YOU. You're losing 30-50 bookings per year from people who searched for you but couldn't find you.",
      card2Cost: "",
      card3Title: "Your reviews are scattered",
      card3Text:
        "9.0 on Booking. 4.8 on Airbnb. 5.0 on Google. Impressive. But nobody sees them together. Your competition has a website. You're sending them customers for free.",
      card3Cost: "",
      transition: "There's a simple way to change this.",
    },
    solution: {
      sectionTitle:
        "A website that works for you - not just a page that sits there",
      subtitle:
        "Every site we build has ONE goal: the visitor books directly with you.",
      features: [
        {
          title: "Booking System",
          text: "Visitors pick dates, check availability, book. You receive email + SMS. No Booking, no commission, no middlemen.",
        },
        {
          title: "Reviews From Everywhere in One Section",
          text: "We aggregate your reviews from Booking.com, Google Maps and Airbnb into one impressive section. Social proof that sells.",
        },
        {
          title: "Professional Gallery",
          text: "Full-screen photos: rooms, garden, view, beaches. Every image sells an experience. Lightbox, lazy-loaded, mobile-optimized.",
        },
        {
          title: "Map & Location",
          text: "Google Maps embed, distances to nearby beaches, access directions. Visitors know exactly where you are.",
        },
        {
          title: "Google SEO",
          text: "We optimize every page so your property appears on Google. 'Vacation rentals Lefkada' → your page.",
        },
        {
          title: "Multilingual",
          text: "Greek, English, German, Italian - tourists see their language. Automatically.",
        },
        {
          title: "Mobile-First",
          text: "82% of tourists search from mobile. Every site we build is designed for mobile first, desktop second.",
        },
        {
          title: "Fast & Secure",
          text: "SSL certificate, load time < 2 seconds, GDPR compliant. Professionalism in every detail.",
        },
      ],
    },
    portfolio: {
      sectionTitle: "Our Work",
      subtitle:
        "Every site is custom - designed for your property, your area, your aesthetic.",
      bottomText:
        "These are just samples. Your site will be built 100% for YOU.",
      cta: "I want something like this",
      seeMore: "See more",
      viewLive: "View live ↗",
      mockupViewLive: "View live site ↗",
      before: "Before",
      after: "After",
      projects: [
        {
          location: "Glyfa, Antiparos",
          features: ["Bookings", "Reviews", "SEO", "3 Languages", "Pools"],
          metricsBefore: "0 online presence",
          metricsAfter: "3-language site in 5 days",
        },
        {
          location: "Sykia Beach, Sithonia, Halkidiki",
          features: ["Bookings", "Reviews", "SEO", "Beaches"],
          metricsBefore: "0 direct bookings",
          metricsAfter: "12+/month",
        },
        {
          location: "Skala Sykias, Sithonia, Halkidiki",
          features: ["Bookings", "Reviews", "SEO", "6 Apartments"],
          metricsBefore: "Booking.com only",
          metricsAfter: "40% fewer commissions",
        },
      ],
    },
    howItWorks: {
      sectionTitle:
        "3 steps. 2 minutes of your time. We handle the rest.",
      steps: [
        {
          title: "Send us your links",
          text: "Send us your Booking + Airbnb link. We pull photos, reviews, descriptions - automatically. You don't need to send anything else.",
        },
        {
          title: "Get a personalized quote",
          text: "Within 24 hours you receive a detailed quote with the package that fits your property. Ask questions or request changes before deciding. No commitment, no pressure.",
        },
        {
          title: "You exist on Google",
          text: "With a 30% deposit we start. In 2-5 days your site is live, in 14 days you appear on Google. Unlimited revisions until you're 100% happy, plus 3 months of free edits after launch.",
        },
      ],
    },
    testimonials: {
      sectionTitle: "You don't have to trust us. Trust them.",
      reviews: [
        {
          text: "I didn't believe I needed a site. Now we get direct bookings without paying commission. The RODAVGI site brings guests who find us on Google!",
          name: "RODAVGI",
          property: "RODAVGI Apartments",
          location: "Halkidiki",
          url: "https://rodavgiapartments.com/",
        },
        {
          text: "They built my site in 6 days. Exactly what I asked for. And it already paid for itself the first season.",
          name: "Giorgos P.",
          property: "Studios Panorama",
          location: "Lefkada",
        },
        {
          text: "The best part was the reviews section. Visitors see the 9.5 on Booking along with the 5.0 on Google and book immediately.",
          name: "Eleni D.",
          property: "Villa Sunset",
          location: "Naxos",
        },
      ],
      googleRating: "5.0 on Google",
      caseStudyLink: "See detailed case study →",
    },
    pricing: {
      sectionTitle: "Choose your plan",
      subtitle:
        "Website | Website + Bookings | Website + Bookings + Marketing. You choose.",
      popular: "POPULAR",
      premiumBadge: "BEST VALUE",
      starter: {
        name: "STARTER",
        tagline: "Your first online presence",
        price: "From €349",
        priceSub: "one-time · 1st year maintenance FREE",
        target: "For 1-3 rooms",
        features: [
          "Custom responsive website",
          "Photos + content",
          "Google Maps & location",
          "Booking form (email notification)",
          "Basic SEO setup",
          "SSL + custom domain setup",
          "Google Business Profile setup",
          "Delivered in 2-5 days",
          "3 months of free edits after launch",
          "1st year maintenance free",
          "6 months guarantee",
        ],
        cta: "Start now",
        ctaSub: "No commitment",
      },
      professional: {
        name: "PROFESSIONAL",
        tagline: "The booking machine",
        price: "From €599",
        priceSub: "one-time · 1st year maintenance FREE",
        target: "For 3-10 rooms",
        includes: "Everything in Starter, PLUS:",
        features: [
          "Booking system (calendar + date picker)",
          "Reviews section (Booking + Google + Airbnb)",
          "Professional photo gallery",
          "2 languages (GR + EN)",
          "Google Analytics setup",
          "Social media covers",
          "3 months of free edits after launch",
          "1st year maintenance free",
          "6 months guarantee",
        ],
        cta: "Start now",
        ctaSub: "80% of our clients choose this",
      },
      premium: {
        name: "PREMIUM",
        tagline: "Complete digital setup",
        price: "Custom quote",
        priceSub: "Tailored pricing",
        target: "For villas & multiple properties",
        includes: "Everything in Professional, PLUS:",
        features: [
          "Online payments (Stripe / Viva Wallet)",
          "iCal availability sync (automatic availability updates)",
          "3+ languages (GR / EN / DE or IT)",
          "Blog section + 3 SEO articles written by us",
          "Professional copywriting in all languages",
          "Google Ads - 1st campaign setup + ad credit",
          "Facebook + Instagram setup + 5 posts with images",
          "Google Business Profile full optimization",
          "RoomLink PMS connection",
          "12 months priority support",
          "Monthly performance report",
        ],
        cta: "Request a Quote",
        ctaSub: "Website + Marketing + Content. Done-for-you.",
      },
      maintenance:
        "Maintenance: €200/year - 1st year FREE. Includes: updates, backups, security patches, minor text/pricing edits.",
      guarantee:
        "Unlimited revisions until you're happy. 6-month guarantee.",
      custom: "Need something custom? Talk to us",
      termsLink: "Terms of service & payments",
    },
    guarantee: {
      sectionTitle: "3 guarantees. Zero risk.",
      subtitle: "Fair collaboration. You know what you pay and what you get.",
      items: [
        {
          title: "Unlimited revisions",
          text: "We start with a 30% deposit and do as many revisions as needed until you're 100% happy. The remaining 70% is paid on delivery.",
        },
        {
          title: "Google-Ready in 14 days",
          text: "We guarantee your site will appear on Google within 14 days. If it doesn't, we work for free until it does. No competitor offers this guarantee.",
        },
        {
          title: "6 months bug-free guarantee",
          text: "If something doesn't work properly within 6 months, we fix it for free. No questions asked, no charges.",
        },
      ],
      ctaLink: "Get a Quote",
    },
    faq: {
      sectionTitle: "Answers you're looking for",
      items: [
        {
          q: "How much does it cost?",
          a: 'Every property has different needs. Request a quote and we\'ll prepare a personalized plan. We start with a 30% deposit. <a href="/#pricing">See packages</a>.',
        },
        {
          q: "How long does it take?",
          a: "2-5 business days from the moment we start. Simpler sites can be ready in 2 days.",
        },
        {
          q: "Do I need a domain?",
          a: "If you don't have one, we find and set up one for you (e.g. www.villaeleni.gr or www.rodavgiapartments.com). Costs ~€10-15/year.",
        },
        {
          q: "Can I edit the site myself?",
          a: "Yes, if you want. But most of our clients send us what they want changed and we do it. For 3 months after launch, edits are FREE. After that, edits are covered by yearly maintenance (€200/year, 1st year free) or charged per edit.",
        },
        {
          q: "Will people find me on Google?",
          a: 'We guarantee your site will be indexed on Google within 14 days. We can\'t guarantee #1 position, but we guarantee you\'ll exist - which right now you don\'t. <a href="/portfolio/achilleas-peaceful-place">See an example</a>.',
        },
        {
          q: "Do you take a percentage of my bookings?",
          a: "NO. Never. 0%. Bookings are 100% yours. You pay once for the site and then €200/year for yearly maintenance (1st year free). That's it.",
        },
        {
          q: "What if I don't like the result?",
          a: 'We do unlimited revisions until you\'re 100% happy. We start with a 30% deposit and the rest is paid on delivery. Plus, 6-month bug-free guarantee. <a href="/#contact">Get a Quote</a>.',
        },
        {
          q: "I have a site but it's old. Can you redesign it?",
          a: "Of course. We handle redesigns of existing sites. We'll give you a quote after seeing what you have.",
        },
      ],
    },
    contact: {
      sectionTitle: "Take your bookings into your own hands",
      subtitle: "Fill in the form or send us a message. We respond within 24 hours.",
      whatsappCta: "Message us on WhatsApp",
      whatsappPrefill: "Hi! I'm interested in building a website. ",
      divider: "or fill in",
      nameLabel: "Name",
      namePlaceholder: "e.g. John Smith",
      linkLabel: "Booking or Airbnb link (optional)",
      linkPlaceholder: "e.g. booking.com/hotel/... or rodavgiapartments.com",
      contactLabel: "Email or phone",
      contactPlaceholder: "e.g. info@villaeleni.gr or +30 69XXXXXXXX",
      messageLabel: "Message (optional)",
      messagePlaceholder: "Tell us a bit about your property...",
      cta: "Get a Quote",
      responseTime: "We respond in less than 24 hours",
      success: "Thank you! We'll get in touch with you shortly.",
      error: "Something went wrong. Message us directly on WhatsApp",
      infoPhone: "+30 697 458 5063",
      infoWhatsapp: "WhatsApp",
      infoEmail: "info@mystaysite.com",
      infoHours: "Monday - Saturday, 9:00 - 21:00",
    },
    footer: {
      tagline: "Websites for vacation rentals & accommodations",
      quickLinks: "Links",
      quickLinkItems: ["Portfolio", "Packages", "FAQ", "Blog", "Contact"],
      portfolio: "Portfolio",
      portfolioItems: [
        { label: "Villa Afroditi", url: "https://www.antiparos-afroditivillas.gr" },
        { label: "RODAVGI Apartments", url: "https://rodavgiapartments.com" },
        { label: "Achilleas Peaceful Place", url: "https://achilleasplace.gr" },
      ],
      legal: "Legal",
      legalList: ["Terms of Use", "Privacy Policy"],
      paymentMethods: "Payment methods",
      paymentMethodsList: "Bank transfer · Stripe · Viva Wallet · Crypto · Mastercard · Amex",
      paymentMethodsItems: [
        { key: "bank", label: "Bank transfer" },
        { key: "stripe", label: "Stripe" },
        { key: "viva", label: "Viva Wallet" },
        { key: "crypto", label: "Crypto" },
        { key: "mastercard", label: "Mastercard" },
        { key: "amex", label: "Amex" },
      ],
      copyright:
        "© 2026 mystaysite.com - We build websites that bring bookings.",
    },
    whatsapp: {
      prefill: "Hi! I'm interested in a website for my property.",
    },
    mobileCta: {
      whatsapp: "WhatsApp",
      sendLink: "Get a Quote",
    },
    exitPopup: {
      title: "Want a professional website?",
      text: "See how we can help you in 2-5 days. Get a quote with no commitment.",
      cta: "Get a Quote",
    },
    chatbot: {
      title: "Kyros | MyStaySite",
      subtitle: "We reply in < 1 minute",
      greeting: "Hi! I'm Kyros from MyStaySite. We build websites for vacation rentals. How can I help you?",
      options: [
        "I want a quote",
        "How does it work?",
        "See examples",
      ],
      askLink: "Great! Send me your Booking or Airbnb link and we'll prepare a detailed quote in 24 hours.",
      askContact: "Perfect! Now I need your email or phone number so we can get in touch.",
      pricingReply: "Every property has different needs, so we provide a personalized quote. Would you like us to prepare one for you?",
      howReply: "The process is very simple:\n\n1. Send us your Booking/Airbnb link\n2. In 24 hours you receive a detailed quote\n3. 30% deposit to get started. In 2-5 days you're online.\n\nWant to get started?",
      samplesReply: "Check out our live sites:\n\n• Villa Afroditi (Antiparos): antiparos-afroditivillas.gr\n• RODAVGI Apartments (Halkidiki): rodavgiapartments.com\n• Achilleas Peaceful Place (Halkidiki): achilleasplace.gr\n\nWant us to build something similar for you?",
      yesOption: "Yes, I want a quote!",
      thanksTitle: "Thank you!",
      thanks: "Perfect! We'll get in touch shortly. If you have any questions, message us on WhatsApp!",
      linkPlaceholder: "e.g. booking.com/hotel/...",
      contactPlaceholder: "Email or phone",
      send: "Send",
      inputPlaceholder: "Type a message...",
    },
  },
} as const;
