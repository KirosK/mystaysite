"use client";

import { useRef, useState } from "react";
import Script from "next/script";
import { trackLead } from "@/lib/analytics";
import { trackClarityEvent } from "@/lib/clarity";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

declare global {
  interface Window {
    turnstile?: {
      render: (
        selector: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "invisible";
          appearance?: "always" | "execute" | "interaction-only";
        },
      ) => string;
      reset: (widgetId?: string) => void;
      execute: (widgetId?: string) => void;
    };
  }
}

type Copy = {
  badge: string;
  title: string;
  subtitle: string;
  intro: string;
  audience: string;
  author: string;
  readTime: string;
  updated: string;
  formHeading: string;
  formSub: string;
  emailLabel: string;
  emailPlaceholder: string;
  nameLabel: string;
  namePlaceholder: string;
  consent: string;
  privacyLink: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  successPrint: string;
  errorBody: string;
  mistakesHeading: string;
  mistakes: { title: string; body: string; fix: string }[];
  bonusHeading: string;
  bonusBody: string;
  bonusBullets: string[];
  ctaBlockTitle: string;
  ctaBlockBody: string;
  ctaBlockButton: string;
  ctaBlockSecondary: string;
  printHint: string;
};

const EL: Copy = {
  badge: "Δωρεάν οδηγός",
  title:
    "10 λάθη που χάνουν κρατήσεις στα ελληνικά καταλύματα - και πώς να τα διορθώσεις σε 30 λεπτά",
  subtitle:
    "Ο οδηγός που έπρεπε να είχες δωρεάν πριν βάλεις το πρώτο listing στο Booking. Πρακτικά βήματα για περισσότερες direct κρατήσεις χωρίς προμήθειες.",
  intro:
    "Διάβασα 127 ελληνικά websites καταλυμάτων τους τελευταίους 6 μήνες. 9 στα 10 έκαναν τα ίδια 10 λάθη. Αυτά τα λάθη κοστίζουν μεταξύ €2.000 και €18.000 ανά σεζόν σε χαμένες κρατήσεις. Ο οδηγός αυτός τα δείχνει ένα-ένα, εξηγεί γιατί χάνεις λεφτά, και δίνει συγκεκριμένο τρόπο να τα διορθώσεις χωρίς developer ή agency.",
  audience:
    "Για ιδιοκτήτες βιλών, διαμερισμάτων, studios και ενοικιαζόμενων δωματίων στην Ελλάδα.",
  author: "Από τον Κύρο · MyStaySite",
  readTime: "~12 λεπτά διαβάσματος",
  updated: "Ενημερώθηκε: Μάρτιος 2026",
  formHeading: "Πάρ'τον στο email σου + ένα tip κάθε μήνα",
  formSub:
    "Στείλε μου το email σου, θα λάβεις τον οδηγό αμέσως και 1 πρακτικό email τον μήνα με tips για περισσότερες direct κρατήσεις. Χωρίς spam. Unsubscribe με ένα κλικ.",
  emailLabel: "Email",
  emailPlaceholder: "το@email.σου",
  nameLabel: "Το όνομά σου (προαιρετικό)",
  namePlaceholder: "π.χ. Μαρία",
  consent: "Συμφωνώ να λαμβάνω το email. Δες την",
  privacyLink: "Πολιτική Απορρήτου",
  submit: "Στείλε μου τον οδηγό",
  submitting: "Αποστολή...",
  successTitle: "Ο οδηγός είναι στο inbox σου",
  successBody:
    "Θα φτάσει σε λίγα λεπτά. Αν δεν τον βλέπεις, κοίτα τον φάκελο Spam/Promotions και σήμανέ τον ως 'not spam' για να βλέπεις και τα επόμενα emails.",
  successPrint:
    "Θες να τον κρατήσεις σαν PDF; Κάνε κλικ εδώ για εκτύπωση / αποθήκευση ως PDF.",
  errorBody:
    "Κάτι πήγε στραβά. Δοκίμασε ξανά ή στείλε μας στο WhatsApp (+30 697 458 5063).",
  mistakesHeading: "Τα 10 λάθη (με συγκεκριμένες διορθώσεις)",
  mistakes: [
    {
      title: "1. Στηρίζεσαι 100% στο Booking.com και στο Airbnb",
      body: "Αν όλες σου οι κρατήσεις έρχονται από δύο πλατφόρμες, δεν έχεις business - έχεις υπάλληλο του Booking. Πληρώνεις 15-20% προμήθεια σε κάθε κράτηση. Σε ένα κατάλυμα με τζίρο €40.000/σεζόν, αυτό είναι €6.000-8.000 που βγαίνουν από την τσέπη σου κάθε χρόνο. Και η σχέση είναι ασύμμετρη: το Booking αλλάζει τους κανόνες οποτεδήποτε θέλει, μπορεί να σε κατεβάσει στα αποτελέσματα αναζήτησης, και η βαθμολογία σου εξαρτάται από έναν αλγόριθμο που δεν ελέγχεις.",
      fix: "Διόρθωση: Απόκτησε ένα δικό σου website με booking form και πληρωμή. Βάλε το URL σε κάθε email, SMS, κάρτα, QR code στο κατάλυμα. Όταν κάποιος έχει μείνει μια φορά, η επόμενη κράτηση πρέπει να έρθει απευθείας. Χρυσός κανόνας: φτιάξε το κόστος να αποσβένεται σε 3 κρατήσεις.",
    },
    {
      title: "2. Τραβάς φωτογραφίες με κινητό, το απόγευμα, με χαμηλό φως",
      body: "Η φωτογραφία είναι το μόνο που βλέπει ο επισκέπτης πριν κάνει booking. Οι περισσότερες ελληνικές αγγελίες έχουν φωτογραφίες τραβηγμένες από κινητό, με φλας, ακατάστατο χώρο, και λάθος γωνία (στενό δωμάτιο μοιάζει πιο στενό όταν τραβάς από πόρτα). Το Booking το ξέρει και σε πετάει στο bottom των αποτελεσμάτων.",
      fix: "Διόρθωση: Τραβάς πάντα πρωί, με ανοιχτές κουρτίνες, όλα τα φώτα αναμμένα, wide-angle lens (ή mode panorama σε iPhone). Όχι φλας - ποτέ. Αν μπορείς, επένδυσε €150-300 σε επαγγελματία φωτογράφο μία φορά. Έχω δει κρατήσεις να διπλασιαστούν μέσα σε 2 εβδομάδες μόνο από αυτό.",
    },
    {
      title: "3. Δεν έχεις Google Business Profile (ή το έχεις άδειο)",
      body: "Όταν κάποιος γράφει στο Google 'villa [περιοχή]' ή 'rooms near [τοποθεσία]', τα πρώτα αποτελέσματα είναι maps + GBP cards. Αν δεν έχεις GBP, ΔΕΝ ΥΠΑΡΧΕΙΣ εκεί. Ακόμα χειρότερα: αν το έχεις άδειο (χωρίς φωτογραφίες, ώρες, reviews), ο αλγόριθμος σε θεωρεί ανενεργό.",
      fix: "Διόρθωση: Πήγαινε στο google.com/business, κάνε claim το listing του καταλύματός σου (ή δημιούργησε νέο). Συμπλήρωσε: ώρες λειτουργίας, τηλέφωνο, website URL, 10+ φωτογραφίες, full description. Κάνε 1 post την εβδομάδα (ακόμα και μια φωτογραφία). Ζήτα από ικανοποιημένους πελάτες να σε βαθμολογήσουν - αυτό είναι το #1 ranking signal.",
    },
    {
      title: "4. Το website σου δεν δείχνει τις κριτικές σου",
      body: "Έχεις 9.2 στο Booking, 4.8 στο Airbnb, 5.0 στο Google. Εντυπωσιακό. Αλλά κανείς δεν τα βλέπει μαζί. Ο επισκέπτης στο website σου δεν έχει ιδέα ότι 127 άνθρωποι έχουν μείνει και είναι ευχαριστημένοι. Social proof = conversion. Χωρίς αυτό, κάθε επισκέπτης νιώθει ότι είναι ο πρώτος που παίρνει ρίσκο.",
      fix: "Διόρθωση: Βάλε ένα reviews section στη αρχική σελίδα με τα 3 scores (Booking, Airbnb, Google) δίπλα-δίπλα, και 3-5 πραγματικές κριτικές με όνομα/αρχικά. Προσθεσε 'Schema Review' structured data (google.com/search/docs/appearance/structured-data/review-snippet) για να εμφανίζεσαι με αστεράκια στα Google results.",
    },
    {
      title: "5. Το site σου φορτώνει πάνω από 4 δευτερόλεπτα σε mobile",
      body: "Το 70% των bookings γίνεται από κινητό. Αν το site σου φορτώνει πάνω από 3 δευτερόλεπτα, το 53% των επισκεπτών φεύγει ΠΡΙΝ ΔΕΙ ΚΑΝ το κατάλυμα. Η Google σε τιμωρεί στα rankings. Τα περισσότερα ελληνικά sites είναι φτιαγμένα σε WordPress με 15 plugins και μη συμπιεσμένες εικόνες 8MB η μία.",
      fix: "Διόρθωση: Τρέξε το site σου στο pagespeed.web.dev. Αν παίρνεις σκορ κάτω από 80, έχεις πρόβλημα. Λύσεις: (α) Συμπίεσε όλες τις εικόνες σε WebP/AVIF format, max 500KB η μία. (β) Βγάλε τα plugins που δεν χρησιμοποιείς. (γ) Ενεργοποίησε lazy loading. (δ) Αν δεν τα καταφέρνεις, άλλαξε σε modern stack - θα γλιτώσεις χρόνο και λεφτά.",
    },
    {
      title: "6. Τα meta titles + descriptions σου είναι κενά ή γενικά",
      body: "Το meta title είναι το μπλε link στα Google results. Το meta description είναι το κείμενο από κάτω. Αν γράφει 'Home - Villa Eleni' ή είναι άδειο, η Google το αγνοεί και βάζει ό,τι θέλει - συνήθως το πρώτο paragraph. Αποτέλεσμα: πιο χαμηλό click-through rate, λιγότερες επισκέψεις.",
      fix: "Διόρθωση: Κάθε σελίδα θέλει: (α) Title με keyword + τοποθεσία + benefit (π.χ. 'Villa Eleni - Antiparos | Direct Bookings χωρίς προμήθεια'). (β) Description 150-160 χαρακτήρες με call-to-action. (γ) Keywords-based URLs (π.χ. /villa-antiparos όχι /page_1). Έλεγξε τα στο Search Console.",
    },
    {
      title: "7. Δεν συλλέγεις emails επισκεπτών",
      body: "Ο κάθε επισκέπτης που δεν κλείνει άμεσα είναι χαμένη κράτηση, εκτός αν τον ξαναπιάσεις. Χωρίς email list, τον χάνεις για πάντα. Ο ανταγωνισμός σου με 500 emails συλλεγμένα την προηγούμενη σεζόν, στέλνει μία καμπάνια τον Μάρτιο και γεμίζει τον Μάιο.",
      fix: "Διόρθωση: Βάλε ένα απλό newsletter form στη σελίδα με offer: '10% έκπτωση στην πρώτη κράτηση' ή 'Τα early bird deals για το καλοκαίρι'. Χρησιμοποίησε Mailchimp, Brevo ή ConvertKit (όλα έχουν free tier). Στείλε 1 email τον μήνα, 2-3 την εβδομάδα πριν το καλοκαίρι.",
    },
    {
      title: "8. Αγνοείς την off-season - και χάνεις 4 μήνες τζίρου",
      body: "Αν το κατάλυμά σου δουλεύει μόνο Ιούνιο-Σεπτέμβριο, χάνεις 8 μήνες του χρόνου. Και οι 8 αυτοί μήνες έχουν ζήτηση - διαφορετική. Digital nomads (monthly stays), weekend getaways, couples για mini-honeymoons, workations. Τα χειμωνιάτικα listings στην Πάρο ή τη Σίφνο γεμίζουν με digital nomads από Γερμανία/UK.",
      fix: "Διόρθωση: Φτιάξε μια 'Winter Escape' σελίδα με monthly discount 20-30% για διαμονές 28+ νύχτες. Τα κριτήρια για nomads: γρήγορο Wi-Fi, ήσυχο workspace, θέρμανση, κουζίνα. Βάλε τα στο site και στο listing σου. Κάνε ads Οκτώβριο-Φεβρουάριο για αυτό το target.",
    },
    {
      title: "9. Δεν έχεις structured data (Schema.org)",
      body: "Όταν κάποιος ψάχνει στο Google και βλέπει rich results (αστεράκια, τιμές, διαθεσιμότητα), αυτά είναι structured data. Χωρίς αυτά, το listing σου μοιάζει χλωμό δίπλα σε ανταγωνιστές που τα έχουν. CTR πέφτει 30-50%. Η Google σε θεωρεί λιγότερο αξιόπιστο.",
      fix: "Διόρθωση: Πρόσθεσε structured data τύπου 'LodgingBusiness' ή 'Accommodation' με: name, address, telephone, priceRange, image, aggregateRating. Εργαλεία: schema.org/docs/schemas.html + google's Rich Results Test. Αν είσαι σε WordPress, το plugin 'Yoast SEO' το κάνει αυτόματα. Αν έχεις custom site, 10 γραμμές JSON-LD αρκούν.",
    },
    {
      title: "10. Δεν μετράς τίποτα - δεν μπορείς να βελτιώσεις τίποτα",
      body: "Πόσοι επισκέπτες μπαίνουν στο site σου; Πόσοι φτάνουν στο booking form; Πόσοι το εγκαταλείπουν στο μέσο; Από πού έρχονται; Τι συσκευή χρησιμοποιούν; Αν δεν ξέρεις τις απαντήσεις, δεν μπορείς να αποφασίσεις πού θα επενδύσεις τα επόμενα €500. Το 95% των μικρών καταλυμάτων δεν έχει GA4.",
      fix: "Διόρθωση: (α) Στήσε Google Analytics 4 (δωρεάν) + Search Console. (β) Στήσε Microsoft Clarity (δωρεάν) για heatmaps και session recordings - θα δεις τι πραγματικά κάνουν οι επισκέπτες. (γ) Ορισε 3 conversion events: contact_form_submit, booking_link_click, phone_click. (δ) Κάθε Δευτέρα, 10 λεπτά, κοίτα τα metrics. Σε 8 εβδομάδες θα ξέρεις το business σου καλύτερα από όλον τον ανταγωνισμό.",
    },
  ],
  bonusHeading: "Bonus: 3 πράγματα που ΠΟΤΕ δεν πρέπει να κάνεις",
  bonusBody:
    "Αυτά τα 3 λάθη είναι τα πιο ακριβά. Τα έχω δει να σκοτώνουν businesses που κατά τα άλλα είχαν καλό προϊόν.",
  bonusBullets: [
    "Να δίνεις το ίδιο μήνυμα σε couples, families, και digital nomads. Ο κάθε τύπος πελάτη θέλει διαφορετικές εικόνες, διαφορετικά benefits, διαφορετικό tone. Segmentation = conversion.",
    "Να αγνοείς τα reviews 3-4 αστέρων. Αυτά είναι χρυσός - σου λένε ΑΚΡΙΒΩΣ τι να διορθώσεις. Τα 5-star reviews σε κάνουν να νιώθεις καλά, τα 3-star σε κάνουν πλουσιότερο.",
    "Να μην απαντάς στα reviews. Κάθε review θέλει απάντηση - ευγενική, γρήγορη, επαγγελματική. Επόμενος επισκέπτης βλέπει τον τρόπο που φέρεσαι και αποφασίζει να κλείσει ή όχι.",
  ],
  ctaBlockTitle: "Ας κάνω τη δουλειά για σένα",
  ctaBlockBody:
    "Αν δεν έχεις χρόνο να εφαρμόσεις όλα αυτά μόνος σου, αναλαμβάνω το στήσιμο του website από την αρχή. 2-5 μέρες, από €349. 3 μήνες δωρεάν αλλαγές μετά την παράδοση, 1ος χρόνος συντήρησης δωρεάν.",
  ctaBlockButton: "Ζήτησε προσφορά",
  ctaBlockSecondary: "Ή ζήτησε δωρεάν 5-λεπτο video audit του site σου",
  printHint:
    "Tip: Μπορείς να αποθηκεύσεις αυτή τη σελίδα ως PDF από Cmd+P (Mac) ή Ctrl+P (Windows) → Destination: 'Save as PDF'.",
};

const EN: Copy = {
  badge: "Free guide",
  title:
    "10 mistakes Greek vacation rentals make - and how to fix them in 30 minutes",
  subtitle:
    "The guide I wish someone had given me before my first Booking.com listing. Practical steps for more direct bookings, zero commission.",
  intro:
    "Over the past 6 months I've audited 127 Greek vacation rental websites. 9 out of 10 made the same 10 mistakes. These mistakes cost between €2,000 and €18,000 per season in lost bookings. This guide walks through each one, explains why it's costing you money, and gives you a concrete way to fix it without a developer or an agency.",
  audience:
    "For owners of villas, apartments, studios, and rental rooms in Greece.",
  author: "By Kyros · MyStaySite",
  readTime: "~12 minutes read",
  updated: "Updated: March 2026",
  formHeading: "Get it in your inbox + one tip a month",
  formSub:
    "Drop your email, you'll get the guide immediately and 1 practical email per month with tips for more direct bookings. No spam. Unsubscribe with one click.",
  emailLabel: "Email",
  emailPlaceholder: "your@email.com",
  nameLabel: "First name (optional)",
  namePlaceholder: "e.g. Maria",
  consent: "I agree to receive the email. See our",
  privacyLink: "Privacy Policy",
  submit: "Send me the guide",
  submitting: "Sending...",
  successTitle: "The guide is in your inbox",
  successBody:
    "It should arrive in a few minutes. If you don't see it, check your Spam/Promotions folder and mark it 'not spam' so you don't miss future emails.",
  successPrint:
    "Want to save it as a PDF? Click here to print / save as PDF.",
  errorBody:
    "Something went wrong. Please try again or message us on WhatsApp (+30 697 458 5063).",
  mistakesHeading: "The 10 mistakes (with concrete fixes)",
  mistakes: [
    {
      title: "1. You rely 100% on Booking.com and Airbnb",
      body: "If all your bookings come from two platforms, you don't have a business - you're Booking's employee. You pay 15-20% commission on every booking. For a property doing €40,000/season, that's €6,000-8,000 out of your pocket every year. And the relationship is asymmetric: Booking can change the rules whenever, drop you in search results, and your rating depends on an algorithm you don't control.",
      fix: "Fix: Get your own website with a booking form and payment option. Put the URL in every email, SMS, business card, QR code at the property. Once someone has stayed with you, the next booking should come directly. Rule of thumb: make the site pay for itself in 3 bookings.",
    },
    {
      title: "2. You shoot photos on your phone, in the afternoon, in low light",
      body: "Photos are all a guest sees before booking. Most Greek listings have phone-shot photos, with flash, messy rooms, and the wrong angle (a narrow room looks narrower when shot from the doorway). Booking's algorithm knows this and ranks you lower.",
      fix: "Fix: Always shoot in the morning, with curtains open, all lights on, wide-angle lens (or panorama mode on iPhone). No flash - ever. If you can, invest €150-300 in a professional photographer once. I've seen bookings double within 2 weeks from this alone.",
    },
    {
      title: "3. You don't have a Google Business Profile (or it's empty)",
      body: "When someone searches 'villa [location]' or 'rooms near [location]' on Google, the top results are maps + GBP cards. No GBP = YOU DON'T EXIST there. Worse: if it's empty (no photos, hours, reviews), the algorithm treats you as inactive.",
      fix: "Fix: Go to google.com/business, claim your property's listing (or create a new one). Fill in: opening hours, phone, website URL, 10+ photos, full description. Post once a week (even just a photo). Ask happy guests to leave a review - this is the #1 ranking signal.",
    },
    {
      title: "4. Your website doesn't showcase your reviews",
      body: "You have 9.2 on Booking, 4.8 on Airbnb, 5.0 on Google. Impressive. But nobody sees them together. A visitor to your website has no idea that 127 people have stayed and been happy. Social proof = conversion. Without it, every visitor feels like they're taking a risk.",
      fix: "Fix: Add a reviews section on the homepage with the 3 scores (Booking, Airbnb, Google) side by side, plus 3-5 real reviews with name/initials. Add 'Review' structured data (google.com/search/docs/appearance/structured-data/review-snippet) so you appear with stars in Google results.",
    },
    {
      title: "5. Your site loads in more than 4 seconds on mobile",
      body: "70% of bookings happen on mobile. If your site takes more than 3 seconds to load, 53% of visitors leave BEFORE THEY EVEN SEE your property. Google penalizes you in rankings. Most Greek sites are WordPress with 15 plugins and uncompressed 8MB images.",
      fix: "Fix: Run your site through pagespeed.web.dev. If you score below 80, you have a problem. Fixes: (a) Compress every image to WebP/AVIF, max 500KB each. (b) Remove unused plugins. (c) Enable lazy loading. (d) If none of this sticks, switch to a modern stack - you'll save time and money.",
    },
    {
      title: "6. Your meta titles + descriptions are empty or generic",
      body: "Meta title = the blue link in Google results. Meta description = the snippet below. If yours says 'Home - Villa Eleni' or is empty, Google ignores it and picks whatever - usually the first paragraph. Result: lower click-through rate, fewer visits.",
      fix: "Fix: Every page needs: (a) Title with keyword + location + benefit (e.g., 'Villa Eleni - Antiparos | Direct Bookings, No Commission'). (b) 150-160 character description with a call-to-action. (c) Keyword-based URLs (e.g., /villa-antiparos not /page_1). Check everything in Search Console.",
    },
    {
      title: "7. You don't collect visitor emails",
      body: "Every visitor who doesn't book immediately is a lost booking unless you re-engage them. Without an email list, they're gone forever. Your competitor with 500 emails collected last season sends one campaign in March and fills up May.",
      fix: "Fix: Put a simple newsletter form on the page with an offer: '10% off your first booking' or 'Early bird deals for summer'. Use Mailchimp, Brevo or ConvertKit (all have free tiers). Send 1 email a month, 2-3 the week before summer.",
    },
    {
      title: "8. You ignore off-season - and lose 4 months of revenue",
      body: "If your property only works June-September, you're losing 8 months of the year. And those 8 months have demand - different kinds. Digital nomads (monthly stays), weekend getaways, couples on mini-honeymoons, workations. Winter listings in Paros or Sifnos fill up with digital nomads from Germany/UK.",
      fix: "Fix: Create a 'Winter Escape' page with a 20-30% monthly discount for 28+ night stays. Nomad checklist: fast Wi-Fi, quiet workspace, heating, kitchen. Put them in the site and in your listing. Run ads October-February targeting this audience.",
    },
    {
      title: "9. You don't have structured data (Schema.org)",
      body: "When someone searches Google and sees rich results (stars, prices, availability), those are structured data. Without them, your listing looks pale next to competitors who have them. CTR drops 30-50%. Google treats you as less trustworthy.",
      fix: "Fix: Add structured data of type 'LodgingBusiness' or 'Accommodation' with: name, address, telephone, priceRange, image, aggregateRating. Tools: schema.org/docs/schemas.html + Google's Rich Results Test. On WordPress, the 'Yoast SEO' plugin does it automatically. On a custom site, 10 lines of JSON-LD is enough.",
    },
    {
      title: "10. You measure nothing - you can't improve anything",
      body: "How many visitors hit your site? How many reach the booking form? How many bounce halfway through? Where do they come from? What device? If you don't know the answers, you can't decide where to invest the next €500. 95% of small properties don't have GA4 set up.",
      fix: "Fix: (a) Set up Google Analytics 4 (free) + Search Console. (b) Set up Microsoft Clarity (free) for heatmaps and session recordings - you'll see what visitors actually do. (c) Define 3 conversion events: contact_form_submit, booking_link_click, phone_click. (d) Every Monday, spend 10 minutes reviewing metrics. In 8 weeks, you'll know your business better than any of your competitors.",
    },
  ],
  bonusHeading: "Bonus: 3 things you should NEVER do",
  bonusBody:
    "These 3 mistakes are the most expensive. I've seen them kill businesses that otherwise had a good product.",
  bonusBullets: [
    "Give the same message to couples, families, and digital nomads. Each type of guest wants different photos, different benefits, different tone. Segmentation = conversion.",
    "Ignore 3-4 star reviews. They're gold - they tell you EXACTLY what to fix. 5-star reviews make you feel good, 3-star reviews make you richer.",
    "Skip responding to reviews. Every review needs a reply - polite, fast, professional. The next guest watches how you handle feedback and decides whether to book or not.",
  ],
  ctaBlockTitle: "Let me do the work for you",
  ctaBlockBody:
    "If you don't have time to apply all this yourself, I can build your website from scratch. 2-5 days, from €349. 3 months of free edits after launch, 1st year of maintenance free.",
  ctaBlockButton: "Get a quote",
  ctaBlockSecondary: "Or get a free 5-minute video audit of your site",
  printHint:
    "Tip: You can save this page as a PDF using Cmd+P (Mac) or Ctrl+P (Windows) → Destination: 'Save as PDF'.",
};

export default function GuideLanding({ locale }: { locale: string }) {
  const isEn = locale === "en";
  const t = isEn ? EN : EL;
  const prefix = `/${locale}`;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [mountedAt] = useState<number>(() => Date.now());
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const canSubmit =
    email.trim() !== "" &&
    consent &&
    !submitting &&
    (!TURNSTILE_SITE_KEY || turnstileToken !== "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "newsletter",
          email,
          ...(name && { name }),
          source: "guide-10-mistakes",
          locale,
          _gotcha: honeypotRef.current?.value ?? "",
          _ts: mountedAt,
          turnstileToken,
        }),
      });
      if (res.ok) {
        trackLead("guide_10_mistakes");
        trackClarityEvent("guide_lead_submitted");
        setStatus("success");
        setEmail("");
        setName("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  const honeypotField = (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-5000px",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    >
      <label>
        Leave this field empty
        <input
          ref={honeypotRef}
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </label>
    </div>
  );

  function SignupForm({ idSuffix }: { idSuffix: string }) {
    return (
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg shadow-primary/5 p-6 sm:p-8">
        {status === "success" ? (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-500/20 mb-4">
              <svg
                className="w-7 h-7 text-emerald-600 dark:text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="text-xl font-extrabold mb-2 text-text-primary">
              {t.successTitle}
            </h3>
            <p className="text-sm text-text-secondary mb-4">{t.successBody}</p>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark underline underline-offset-4"
            >
              {t.successPrint}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3" noValidate>
            <h3 className="text-xl sm:text-2xl font-extrabold text-text-primary">
              {t.formHeading}
            </h3>
            <p className="text-sm text-text-secondary">{t.formSub}</p>
            {honeypotField}
            <div className="space-y-3 pt-1">
              <div>
                <label
                  htmlFor={`guide-name-${idSuffix}`}
                  className="text-xs font-semibold text-text-secondary block mb-1"
                >
                  {t.nameLabel}
                </label>
                <input
                  id={`guide-name-${idSuffix}`}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full rounded-lg bg-bg-light dark:bg-white/5 border border-gray-300 dark:border-white/15 text-text-primary placeholder:text-gray-400 dark:placeholder:text-gray-500 text-base px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  autoComplete="given-name"
                />
              </div>
              <div>
                <label
                  htmlFor={`guide-email-${idSuffix}`}
                  className="text-xs font-semibold text-text-secondary block mb-1"
                >
                  {t.emailLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  id={`guide-email-${idSuffix}`}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="w-full rounded-lg bg-bg-light dark:bg-white/5 border border-gray-300 dark:border-white/15 text-text-primary placeholder:text-gray-400 dark:placeholder:text-gray-500 text-base px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  autoComplete="email"
                />
              </div>
            </div>
            <label className="flex items-start gap-2 text-xs text-text-secondary leading-snug pt-1">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 shrink-0 accent-primary"
              />
              <span>
                {t.consent}{" "}
                <a
                  href={`${prefix}/privacy`}
                  className="underline hover:text-text-primary"
                >
                  {t.privacyLink}
                </a>
                .
              </span>
            </label>
            {TURNSTILE_SITE_KEY && (
              <div id={`cf-turnstile-guide-${idSuffix}`} className="flex justify-center pt-1" />
            )}
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-3 rounded-lg transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? t.submitting : t.submit}
            </button>
            {status === "error" && (
              <p className="text-xs text-red-600 dark:text-red-400 text-center">
                {t.errorBody}
              </p>
            )}
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC] dark:bg-[#0B0F1A]">
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="lazyOnload"
          onReady={() => {
            if (typeof window === "undefined") return;
            if (!window.turnstile) return;
            const topEl = document.getElementById("cf-turnstile-guide-top");
            const bottomEl = document.getElementById("cf-turnstile-guide-bottom");
            const render = (el: HTMLElement | null) => {
              if (!el || el.children.length > 0 || !window.turnstile) return;
              window.turnstile.render(el, {
                sitekey: TURNSTILE_SITE_KEY,
                callback: (token) => setTurnstileToken(token),
                "expired-callback": () => setTurnstileToken(""),
                "error-callback": () => setTurnstileToken(""),
                appearance: "interaction-only",
                theme: "auto",
              });
            };
            render(topEl);
            render(bottomEl);
          }}
        />
      )}

      {/* Print-only stylesheet: hide chrome, show full guide */}
      <style jsx global>{`
        @media print {
          header,
          nav,
          footer,
          .print\\:hidden,
          [data-print-hide] {
            display: none !important;
          }
          body {
            background: white !important;
            color: black !important;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid;
          }
          a {
            color: black !important;
            text-decoration: none !important;
          }
        }
      `}</style>

      {/* Hero */}
      <section className="pt-12 pb-8 sm:pt-16 sm:pb-12 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {t.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary leading-[1.15] tracking-tight mb-4">
            {t.title}
          </h1>
          <p className="text-base sm:text-lg text-text-secondary max-w-3xl leading-relaxed">
            {t.subtitle}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-text-secondary">
            <span>{t.author}</span>
            <span>·</span>
            <span>{t.readTime}</span>
            <span>·</span>
            <span>{t.updated}</span>
          </div>
        </div>
      </section>

      {/* Intro + top signup form side-by-side */}
      <section className="py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-[1fr_360px] gap-8 md:gap-10">
          <div>
            <p className="text-base sm:text-lg text-text-primary leading-relaxed mb-3">
              {t.intro}
            </p>
            <p className="text-sm text-text-secondary italic">{t.audience}</p>
          </div>
          <div className="print:hidden" id="top-signup">
            <SignupForm idSuffix="top" />
          </div>
        </div>
      </section>

      {/* 10 mistakes */}
      <section className="pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-8">
            {t.mistakesHeading}
          </h2>
          <div className="space-y-10">
            {t.mistakes.map((m, i) => (
              <article
                key={i}
                className="print:break-inside-avoid"
              >
                <h3 className="text-xl sm:text-2xl font-extrabold text-text-primary mb-3 leading-snug">
                  {m.title}
                </h3>
                <p className="text-[15px] sm:text-base text-text-primary leading-relaxed mb-3">
                  {m.body}
                </p>
                <div className="border-l-4 border-accent bg-accent/5 dark:bg-accent/10 rounded-r-lg px-4 py-3">
                  <p className="text-[15px] text-text-primary leading-relaxed">
                    <strong className="text-accent">✓</strong> {m.fix}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bonus */}
      <section className="py-10 sm:py-14 bg-bg-light dark:bg-[#111827] border-y border-gray-200 dark:border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-3">
            {t.bonusHeading}
          </h2>
          <p className="text-text-secondary mb-5">{t.bonusBody}</p>
          <ul className="space-y-3">
            {t.bonusBullets.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[15px] text-text-primary leading-relaxed"
              >
                <span className="shrink-0 mt-1 w-6 h-6 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 font-bold text-xs flex items-center justify-center">
                  ✗
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bottom CTA block */}
      <section className="py-12 sm:py-16 print:hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1a1a2e] text-white p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
              {t.ctaBlockTitle}
            </h2>
            <p className="text-gray-300 mb-6">{t.ctaBlockBody}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`${prefix}/#contact`}
                className="bg-accent hover:bg-accent-dark text-white font-bold px-6 py-3 rounded-lg transition-colors text-center"
              >
                {t.ctaBlockButton}
              </a>
              <a
                href={`${prefix}/free-audit`}
                className="text-white/80 hover:text-white font-semibold px-6 py-3 underline underline-offset-4 text-center"
              >
                {t.ctaBlockSecondary}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom signup form */}
      <section className="pb-16 sm:pb-24 print:hidden">
        <div className="max-w-xl mx-auto px-4 sm:px-6" id="bottom-signup">
          <SignupForm idSuffix="bottom" />
          <p className="text-xs text-text-secondary text-center mt-4">
            {t.printHint}
          </p>
        </div>
      </section>
    </div>
  );
}
