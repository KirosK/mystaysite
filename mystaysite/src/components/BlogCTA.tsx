export default function BlogCTA({ locale = "el" }: { locale?: string }) {
  const isEn = locale === "en";
  const copy = {
    heading: isEn ? "Want a website that brings bookings?" : "Θέλετε website που φέρνει κρατήσεις;",
    subtitle: isEn ? "See samples of our work:" : "Δείτε δείγματα δουλειάς μας:",
    cta: isEn ? "Get a Quote" : "Ζητήστε Προσφορά",
    auditCta: isEn
      ? "Or get a free 5-minute video audit of your site →"
      : "Ή πάρε δωρεάν 5-λεπτο video audit του site σου →",
  };
  const prefix = isEn ? "/en" : "/el";

  return (
    <div className="my-12 rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#2d2d4e] p-8 md:p-10 text-center">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
        {copy.heading}
      </h3>
      <p className="text-gray-300 mb-6 text-lg">
        {copy.subtitle}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
        {[
          {
            label: "RODAVGI Apartments",
            url: "https://rodavgiapartments.com",
          },
          {
            label: "Achilleas Place",
            url: "https://achilleasplace.gr",
          },
          {
            label: "Villa Afroditi",
            url: "https://www.antiparos-afroditivillas.gr",
          },
        ].map((site) => (
          <a
            key={site.url}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f57c51] hover:text-orange-300 font-medium text-sm transition-colors"
          >
            → {site.label}
          </a>
        ))}
      </div>
      <a
        href={`${prefix}/#contact`}
        className="inline-block bg-[#f57c51] hover:bg-[#e06a42] text-white font-bold px-8 py-3.5 rounded-xl transition-colors text-lg"
      >
        {copy.cta}
      </a>
      <div className="mt-5">
        <a
          href={`${prefix}/free-audit`}
          className="text-sm font-medium text-gray-300 hover:text-white underline underline-offset-4 transition-colors"
        >
          {copy.auditCta}
        </a>
      </div>
    </div>
  );
}
