"use client";

import { useLang } from "@/lib/language-context";
import { useAnimateOnScroll } from "@/lib/use-animate-on-scroll";
import Image from "next/image";

interface Project {
  name: string;
  bookingScore: string;
  googleScore: string;
  url: string;
  image: string;
  caseStudyUrl?: string;
  isNew?: boolean;
}

const projects: Project[] = [
  {
    name: "Villa Afroditi",
    bookingScore: "",
    googleScore: "",
    url: "https://www.antiparos-afroditivillas.gr/",
    image: "/portfolio/afroditi/hero.jpg",
    isNew: true,
  },
  {
    name: "RODAVGI Apartments",
    bookingScore: "9.5",
    googleScore: "5.0",
    url: "https://rodavgiapartments.com/",
    image: "/portfolio/rodavgi/hero.jpg",
  },
  {
    name: "Achilleas Peaceful Place",
    bookingScore: "9.7",
    googleScore: "5.0",
    url: "https://achilleasplace.gr/",
    image: "/portfolio/achilleas/after-01-hero.jpg",
    caseStudyUrl: "/portfolio/achilleas-peaceful-place",
  },
];

interface ProjectI18n {
  location: string;
  features: readonly string[];
  metricsBefore: string;
  metricsAfter: string;
}

function ProjectCard({
  project,
  i18n,
  viewLiveLabel,
  beforeLabel,
  afterLabel,
}: {
  project: Project;
  i18n: ProjectI18n;
  viewLiveLabel: string;
  beforeLabel: string;
  afterLabel: string;
}) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white dark:bg-[#111827] rounded-2xl shadow-sm dark:shadow-black/30 border border-gray-200 dark:border-white/10 overflow-hidden hover:shadow-xl dark:hover:shadow-black/60 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
    >
      <div className="bg-gray-100 dark:bg-[#0B0F1A] px-3 py-2 flex items-center gap-2 border-b border-gray-200 dark:border-white/10">
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 mx-2">
          <div className="bg-white dark:bg-[#111827] rounded px-2 py-0.5 text-[10px] text-gray-500 dark:text-gray-300 text-center border border-gray-200 dark:border-white/10 flex items-center justify-center gap-1">
            <svg className="w-2.5 h-2.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            {new URL(project.url).hostname}
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          width={800}
          height={500}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
          loading="lazy"
          className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {project.isNew && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
              NEW
            </span>
          )}
          <span className="bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Live
          </span>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <span className="bg-white/95 backdrop-blur text-sm font-bold text-gray-900 px-5 py-2.5 rounded-xl shadow-xl">
            {viewLiveLabel}
          </span>
          {(project.bookingScore || project.googleScore) && (
            <div className="flex gap-2">
              {project.bookingScore && (
                <span className="bg-white/90 backdrop-blur text-[11px] font-bold text-blue-700 px-3 py-1 rounded-lg">
                  Booking {project.bookingScore}
                </span>
              )}
              {project.googleScore && (
                <span className="bg-white/90 backdrop-blur text-[11px] font-bold text-yellow-700 px-3 py-1 rounded-lg">
                  Google {project.googleScore}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-4 border-t border-gray-100 dark:border-white/10">
        <div className="mb-2">
          <div className="text-sm font-bold text-gray-900 dark:text-white">{project.name}</div>
          <div className="text-[11px] text-gray-500 dark:text-gray-400">{i18n.location}</div>
        </div>
        {(project.bookingScore || project.googleScore) && (
          <div className="flex items-center gap-2 mb-3">
            {project.bookingScore && (
              <span className="bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded">
                Booking {project.bookingScore}
              </span>
            )}
            {project.googleScore && (
              <span className="bg-yellow-50 dark:bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 text-[10px] font-bold px-2 py-0.5 rounded">
                Google {project.googleScore}
              </span>
            )}
          </div>
        )}
        <div className="flex gap-1.5 flex-wrap">
          {i18n.features.map((f, i) => (
            <span key={i} className="bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-[10px] font-medium px-2 py-0.5 rounded-full">
              {f}
            </span>
          ))}
        </div>
        {(i18n.metricsBefore || i18n.metricsAfter) && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-white/10 flex items-center gap-2 text-[11px]">
            <span className="text-red-500 dark:text-red-400 font-semibold">{beforeLabel}: {i18n.metricsBefore}</span>
            <span className="text-gray-300 dark:text-gray-600">→</span>
            <span className="text-green-600 dark:text-green-400 font-semibold">{afterLabel}: {i18n.metricsAfter}</span>
          </div>
        )}
      </div>
    </a>
  );
}

export default function Portfolio() {
  const { t, lang } = useLang();
  const ref = useAnimateOnScroll();
  const urlLocale = lang === "en" ? "en" : "el";

  const scrollTo = (id: string): boolean => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return true;
    }
    return false;
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mb-10">
          {projects.map((p, i) => (
            <ProjectCard
              key={i}
              project={p}
              i18n={t.portfolio.projects[i]}
              viewLiveLabel={t.portfolio.viewLive}
              beforeLabel={t.portfolio.before}
              afterLabel={t.portfolio.after}
            />
          ))}
        </div>

        <div className="text-center mt-4">
          <p className="text-text-secondary text-base mb-6">
            {t.portfolio.bottomText}
          </p>
          <a
            href={`/${urlLocale}#contact`}
            onClick={(e) => { if (scrollTo("#contact")) e.preventDefault(); }}
            className="inline-block bg-accent hover:bg-accent-dark text-white text-base font-semibold px-7 py-3 rounded-lg transition-colors shadow-lg shadow-accent/20"
          >
            {t.portfolio.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
