"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SchoolNavbar from "@/components/school/SchoolNavbar";
import SchoolFooter from "@/components/school/SchoolFooter";
import { useSiteContent } from "@/lib/use-site-content";
import {
  schoolInfo as defaultSchoolInfo,
  schoolHero as defaultSchoolHero,
  administrator,
  director,
  schoolBursar,
  technicalManager,
  schoolHistory as defaultSchoolHistory,
  schoolVision as defaultSchoolVision,
  schoolMission as defaultSchoolMission,
  coreValues,
  specialInitiatives,
} from "@/data/school";

export default function AboutPageClient() {
  const { schoolHistory, schoolVision, schoolMission } = useSiteContent({
    schoolInfo: defaultSchoolInfo,
    schoolHero: defaultSchoolHero,
    schoolHistory: defaultSchoolHistory,
    schoolVision: defaultSchoolVision,
    schoolMission: defaultSchoolMission,
  });

  const leadershipTeam = [administrator, director, schoolBursar, technicalManager];

  return (
    <>
      <SchoolNavbar />
      <main>
        {/* Page hero */}
        <section className="relative overflow-hidden py-24 school-gradient pattern-islamic">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

          <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 bg-[url('/patterns/islamic-geometry.svg')] bg-cover bg-no-repeat" />

          <div className="relative container">
            <div className="inline-block px-4 py-1 rounded-full text-sm font-medium tracking-wide bg-[var(--school-accent)]/40 text-[var(--school-cream)] mb-4">
              About the School
            </div>

            <h1 className="font-amiri text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight max-w-2xl">
              Our Story <span className="text-[var(--school-accent)]">& Heritage</span>
            </h1>

            <div className="w-16 h-1 bg-[var(--school-accent)] mb-6 rounded-full" />

            <p className="text-lg md:text-xl text-[var(--school-cream)]/80 max-w-xl leading-relaxed">
              Founded in 2025 to honour the legacy of the late Dr. Gambo Hamza — a man who believed knowledge and character are inseparable.
            </p>
          </div>
        </section>

        {/* History */}
        <section className="py-20 bg-white">
          <div className="container max-w-4xl">
            <div className="section-tag bg-[var(--school-cream)] text-[var(--school-primary)]">Brief History</div>
            <h2 className="font-amiri text-4xl font-bold text-[var(--school-primary)] mb-8">The Story Behind the Academy</h2>
            {schoolHistory.split("\n\n").map((para, i) => (
              <p key={i} className="text-[var(--school-text-muted)] leading-relaxed mb-5">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 bg-[var(--school-cream)]">
          <div className="container max-w-4xl grid md:grid-cols-2 gap-8">
            <div className="card border-t-4 border-[var(--school-primary)]">
              <div className="section-tag bg-[var(--school-cream)] text-[var(--school-primary)] text-xs">Vision</div>
              <p className="text-[var(--school-text-muted)] leading-relaxed text-sm">{schoolVision}</p>
            </div>
            <div className="card border-t-4 border-[var(--school-accent)]">
              <div className="section-tag bg-[var(--school-cream)] text-[var(--school-primary)] text-xs">Mission</div>
              <p className="text-[var(--school-text-muted)] leading-relaxed text-sm">{schoolMission}</p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="font-amiri text-4xl font-bold text-[var(--school-primary)] mb-10 text-center">Core Values</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {coreValues.map((v) => (
                <div key={v.title} className="card text-center">
                  <div className="font-bold text-[var(--school-primary)] mb-1">{v.title}</div>
                  <p className="text-xs text-[var(--school-text-muted)] leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Initiatives */}
        <section className="py-16 bg-[var(--school-primary)] pattern-islamic">
          <div className="container">
            <h2 className="font-amiri text-4xl font-bold text-white mb-10 text-center">Special Academic Initiatives</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {specialInitiatives.map((item) => (
                <div key={item} className="flex items-start gap-3 bg-white/8 rounded-lg p-4">
                  <CheckCircle2 size={16} className="text-[var(--school-accent)] shrink-0 mt-0.5" />
                  <span className="text-[var(--school-cream)] text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-16 bg-[var(--school-cream)]">
          <div className="container max-w-6xl">
            <div className="section-tag bg-white text-[var(--school-primary)]">Leadership</div>
            <h2 className="font-amiri text-4xl font-bold text-[var(--school-primary)] mb-10 text-center">Meet Our School Leadership</h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {leadershipTeam.map((member) => (
                <div key={member.name} className="card shadow-xl text-center p-6">
                  {member.imageUrl ? (
                    <img src={member.imageUrl} alt={member.name} className="w-28 h-28 rounded-full object-cover mx-auto mb-4" />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-[var(--school-primary)] flex items-center justify-center text-white font-amiri font-bold text-3xl mx-auto mb-4">
                      {member.name?.[0]}
                    </div>
                  )}
                  <div className="font-bold text-[var(--school-primary)] text-xl mb-1">{member.name}</div>
                  <div className="text-sm text-[var(--school-text-muted)] mb-4">{member.position}</div>
                  {member.message && (
                    <p className="text-[var(--school-text-muted)] leading-relaxed text-sm">
                      {member.message.split("\n\n").slice(0, 2).join(" ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white text-center">
          <div className="container">
            <h2 className="font-amiri text-3xl font-bold text-[var(--school-primary)] mb-4">Ready to Join Our Academy?</h2>
            <p className="text-[var(--school-text-muted)] mb-8">Apply for admission or reach out with any questions.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/admissions" className="btn-primary btn-school">
                Apply Now <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-primary btn-school-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SchoolFooter />
    </>
  );
}
