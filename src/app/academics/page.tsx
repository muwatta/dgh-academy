import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import SchoolNavbar from "@/components/school/SchoolNavbar";
import SchoolFooter from "@/components/school/SchoolFooter";
import {
  academicPrograms,
  specialInitiatives,
  entryClasses,
} from "@/data/school";

export const metadata: Metadata = {
  title: "About DGH Academy Jos | Dr. Gambo Hamza Islamic Academy",
  description:
    "Learn about Dr. Gambo Hamza Islamic Academy — a private Islamic school in Gangare, Jos founded in 2025. Offering Nigerian & British curriculum for Nursery and Primary pupils.",
  keywords: [
    "DGH Academy Jos",
    "Islamic school Jos",
    "private school Gangare",
    "Dr Gambo Hamza Academy",
  ],
  openGraph: {
    title: "About DGH Academy — Gangare, Jos",
    description:
      "Founded in 2025 to honour the legacy of Dr. Gambo Hamza. Nursery & Primary school in Jos, Nigeria.",
    url: "https://www.dghacademy.com.ng/academics",
    images: [{ url: "https://www.dghacademy.com.ng/images/school-1.jpg" }],
  },
};

export default function AcademicsPage() {
  return (
    <>
      <SchoolNavbar />
      <main>
        {/* Hero */}
        <section className="relative school-gradient pattern-islamic py-24 overflow-hidden">
          {/* subtle overlay for readability */}
          <div className="absolute inset-0 bg-black/30"></div>

          <div className="container relative z-10">
            {/* Tag */}
            <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--school-accent)]/10 text-papayawhip text-sm font-medium tracking-wide">
              Learning & Excellence
            </div>

            {/* Heading */}
            <h1 className="font-amiri text-4xl md:text-5xl font-semibold text-[var(--school-cream)] mt-6 leading-tight max-w-2xl">
              Academic Programmes
            </h1>

            {/* Divider accent */}
            <div className="w-16 h-1 bg-[var(--school-accent)] mt-4 rounded-full"></div>

            {/* Description */}
            <p className="mt-6 text-base md:text-lg text-[var(--school-cream)]/80 max-w-xl leading-relaxed">
              A rigorous Nigerian and British dual curriculum from Toddler to
              Basic 5, integrating Islamic Education, ICT, coding, and real
              world learning strategies.
            </p>
          </div>
        </section>

        {/* Curriculum overview */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
              <div>
                <div className="section-tag bg-[var(--school-cream)] text-[var(--school-primary)]">
                  Curriculum
                </div>
                <h2 className="font-amiri text-4xl font-bold text-[var(--school-primary)] mb-6">
                  Nigerian & British Dual Curriculum
                </h2>
                <p className="text-[var(--school-text-muted)] leading-relaxed mb-4">
                  DGHIA delivers a carefully integrated dual curriculum
                  that meets Nigerian national standards while incorporating the
                  internationally respected British primary framework. This
                  gives our pupils the best of both worlds — local relevance and
                  global competitiveness.
                </p>
                <p className="text-[var(--school-text-muted)] leading-relaxed mb-6">
                  At every level, Islamic Education is woven into the academic
                  programme, ensuring that intellectual development and moral
                  growth happen together.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Nigerian National Curriculum",
                    "British Primary Framework",
                    "Islamic Education",
                    "ICT & Coding",
                    "Arabic Language",
                    "Physical Education",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-3 py-1.5 bg-[var(--school-cream)] text-[var(--school-primary)] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Class levels */}
              <div className="bg-[var(--school-cream)] rounded-2xl p-8">
                <h3 className="font-bold text-[var(--school-primary)] mb-5">
                  Class Structure
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      level: "Toddler",
                      ages: "Ages 2–3",
                      desc: "Play-based early learning",
                    },
                    {
                      level: "Nursery 1",
                      ages: "Ages 3–4",
                      desc: "Early literacy & numeracy",
                    },
                    {
                      level: "Nursery 2",
                      ages: "Ages 4–5",
                      desc: "School readiness skills",
                    },
                    {
                      level: "Basic 1",
                      ages: "Ages 5–6",
                      desc: "Foundation year",
                    },
                    {
                      level: "Basic 2",
                      ages: "Ages 6–7",
                      desc: "Core subject mastery",
                    },
                    {
                      level: "Basic 3",
                      ages: "Ages 7–8",
                      desc: "Independent learning",
                    },
                    {
                      level: "Basic 4",
                      ages: "Ages 8–9",
                      desc: "Advanced primary",
                    },
                    {
                      level: "Basic 5",
                      ages: "Ages 9–10",
                      desc: "Advanced primary",
                    },
                  ].map((item) => (
                    <div
                      key={item.level}
                      className="flex items-center gap-4 bg-white rounded-lg p-3"
                    >
                      <span className="w-20 text-xs font-bold text-[var(--school-primary)] shrink-0">
                        {item.level}
                      </span>
                      <span className="text-xs text-[var(--school-accent)] font-semibold w-16 shrink-0">
                        {item.ages}
                      </span>
                      <span className="text-xs text-[var(--school-text-muted)]">
                        {item.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Programmes */}
            <div className="section-tag bg-[var(--school-cream)] text-[var(--school-primary)]">
              Subjects
            </div>
            <h2 className="font-amiri text-4xl font-bold text-[var(--school-primary)] mb-8">
              Our Programmes
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {academicPrograms.map((prog) => (
                <div
                  key={prog.title}
                  className="card group hover:bg-[var(--school-primary)] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--school-cream)] group-hover:bg-[var(--school-accent)]/20 flex items-center justify-center text-[var(--school-primary)] group-hover:text-[var(--school-accent)] transition-all mb-4">
                    <BookOpen size={18} />
                  </div>
                  <h3 className="font-bold text-[var(--school-primary)] group-hover:text-white mb-2 transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-sm text-[var(--school-text-muted)] group-hover:text-white/70 leading-relaxed mb-3 transition-colors">
                    {prog.description}
                  </p>
                  {prog.levels && (
                    <div className="flex flex-wrap gap-1.5">
                      {prog.levels.map((l) => (
                        <span
                          key={l}
                          className="text-xs px-2 py-0.5 bg-[var(--school-cream)] group-hover:bg-white/10 text-[var(--school-primary)] group-hover:text-white/80 rounded-full font-medium transition-all"
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Initiatives */}
        <section className="py-16 bg-[var(--school-primary)] pattern-islamic">
          <div className="container">
            <div className="text-center mb-10">
              <div className="section-tag bg-white/10 text-[var(--school-accent)]">
                Our Approach
              </div>
              <h2 className="font-amiri text-4xl font-bold text-white">
                Special Academic Initiatives
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {specialInitiatives.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 bg-white/8 rounded-lg p-4"
                >
                  <CheckCircle2
                    size={16}
                    className="text-[var(--school-accent)] shrink-0 mt-0.5"
                  />
                  <span className="text-[var(--school-cream)] text-sm">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white text-center">
          <div className="container">
            <h2 className="font-amiri text-3xl font-bold text-[var(--school-primary)] mb-4">
              Ready to Enrol?
            </h2>
            <p className="text-[var(--school-text-muted)] mb-8">
              Applications are open for all classes from Toddler to Basic 4.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/admissions" className="btn-primary btn-school">
                Apply Now <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-primary btn-school-outline">
                Ask a Question
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SchoolFooter />
    </>
  );
}
