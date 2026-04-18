import Link from "next/link";

const PHONE = "306974585063";

export default function AuthorBio({ locale = "el" }: { locale?: string }) {
  const isEn = locale === "en";
  const urlLocale = isEn ? "en" : "el";

  const copy = isEn
    ? {
        name: "Kyros",
        role: "Founder, MyStaySite",
        bio: "I design professional websites for vacation rentals in Greece. I help property owners grow direct bookings and reduce dependency on Booking.com and Airbnb.",
        location: "Antiparos, Greece",
        whatsapp: "WhatsApp",
        email: "Email",
        site: "mystaysite.com",
        whatsappMsg:
          "Hi! I read your blog and I'd like to learn more about your services.",
        about: "About the author",
      }
    : {
        name: "Κύρος",
        role: "Founder, MyStaySite",
        bio: "Σχεδιάζω επαγγελματικά websites για τουριστικά καταλύματα στην Ελλάδα. Βοηθάω ιδιοκτήτες να αυξήσουν τις direct bookings και να μειώσουν την εξάρτηση από Booking.com και Airbnb.",
        location: "Αντίπαρος, Ελλάδα",
        whatsapp: "WhatsApp",
        email: "Email",
        site: "mystaysite.com",
        whatsappMsg:
          "Γεια σας! Διάβασα το blog σας και θα ήθελα να μάθω περισσότερα για τις υπηρεσίες σας.",
        about: "Σχετικά με τον συγγραφέα",
      };

  const whatsappHref = `https://wa.me/${PHONE}?text=${encodeURIComponent(
    copy.whatsappMsg
  )}`;

  return (
    <aside className="my-12 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
        {copy.about}
      </p>
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
        <div className="shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#2d2d4e] flex items-center justify-center text-white font-extrabold text-2xl sm:text-3xl shadow-md ring-2 ring-white">
            {copy.name.charAt(0)}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-[#1a1a2e]">
            {copy.name}
          </h3>
          <p className="text-sm text-[#f57c51] font-semibold mb-3">
            {copy.role}
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {copy.bio}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{copy.location}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {copy.whatsapp}
            </a>
            <a
              href="mailto:hello@mystaysite.com"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-[#1a1a2e] transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16v12H4zM4 6l8 7 8-7" />
              </svg>
              {copy.email}
            </a>
            <Link
              href={`/${urlLocale}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-[#1a1a2e] transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              {copy.site}
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
