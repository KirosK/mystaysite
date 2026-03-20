export default function BlogCTA() {
  return (
    <div className="my-12 rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#2d2d4e] p-8 md:p-10 text-center">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Θέλετε website που φέρνει κρατήσεις;
      </h3>
      <p className="text-gray-300 mb-6 text-lg">
        Δείτε δείγματα δουλειάς μας:
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
        href="/#contact"
        className="inline-block bg-[#f57c51] hover:bg-[#e06a42] text-white font-bold px-8 py-3.5 rounded-xl transition-colors text-lg"
      >
        Ζητήστε Demo
      </a>
    </div>
  );
}
