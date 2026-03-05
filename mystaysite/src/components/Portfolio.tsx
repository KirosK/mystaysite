"use client";

import { useLang } from "@/lib/language-context";
import { useAnimateOnScroll } from "@/lib/use-animate-on-scroll";
import Image from "next/image";

interface Project {
  name: string;
  location: string;
  bookingScore: string;
  googleScore: string;
  features: string[];
  url: string;
  image: string;
  caseStudyUrl?: string;
}

const projects: Project[] = [
  {
    name: "RODAVGI Apartments",
    location: "Παραλία Συκιάς, Σιθωνία, Χαλκιδική",
    bookingScore: "9.5",
    googleScore: "5.0",
    features: ["Κρατήσεις", "Reviews", "SEO", "Παραλίες"],
    url: "https://rodavgiapartments.com/",
    image: "/portfolio/rodavgi/hero.png",
  },
  {
    name: "Achilleas Peaceful Place",
    location: "Σκάλα Συκιάς, Σιθωνία, Χαλκιδική",
    bookingScore: "9.7",
    googleScore: "5.0",
    features: ["Κρατήσεις", "Reviews", "SEO", "6 Διαμ/τα"],
    url: "https://achilleas-peaceful-place.vercel.app/",
    image: "/portfolio/achilleas/after-01-hero.png",
    caseStudyUrl: "/portfolio/achilleas-peaceful-place",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      {/* Browser frame */}
      <div className="bg-gray-100 px-3 py-2 flex items-center gap-2 border-b border-gray-200">
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 mx-2">
          <div className="bg-white rounded px-2 py-0.5 text-[10px] text-gray-400 text-center border border-gray-200 flex items-center justify-center gap-1">
            <svg className="w-2.5 h-2.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            {new URL(project.url).hostname}
          </div>
        </div>
      </div>

      {/* Screenshot */}
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden cursor-pointer">
        <Image
          src={project.image}
          alt={project.name}
          width={1440}
          height={900}
          className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          Live
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="bg-white/95 backdrop-blur text-sm font-bold text-gray-900 px-5 py-2.5 rounded-xl shadow-xl">
            Δες το live ↗
          </span>
        </div>
      </a>

      {/* Info */}
      <div className="px-4 py-4 border-t border-gray-100">
        <div className="mb-2">
          <div className="text-sm font-bold text-gray-900">{project.name}</div>
          <div className="text-[11px] text-gray-500">{project.location}</div>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded">
            Booking {project.bookingScore}
          </span>
          <span className="bg-yellow-50 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded">
            Google {project.googleScore}
          </span>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {project.features.map((f, i) => (
            <span key={i} className="bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { t } = useLang();
  const ref = useAnimateOnScroll();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-bg-light">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 animate-fade-in-up">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">
            {t.portfolio.sectionTitle}
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            {t.portfolio.subtitle}
          </p>
        </div>

        {/* Project cards */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} />
          ))}
        </div>

        <div className="text-center mt-4">
          <p className="text-text-secondary text-base mb-6">
            {t.portfolio.bottomText}
          </p>
          <a
            href="/#contact"
            onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
            className="inline-block bg-accent hover:bg-accent-dark text-white text-base font-semibold px-7 py-3 rounded-lg transition-colors shadow-lg shadow-accent/20"
          >
            {t.portfolio.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
