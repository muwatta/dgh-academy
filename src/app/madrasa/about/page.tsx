import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Moon } from "lucide-react";
import {
  madrasaAbout,
  madrasaVision,
  madrasaMission,
  madrasaValues,
  madrasaInfo,
  madrasaMallam,
} from "@/data/madrasa";
import { Star, Award, BookOpen, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About the Madrasa",
  description:
    "Learn about DGHIA Madrasa — evening Quranic and Islamic education in Gangare, Jos.",
};

export default function MadrasaAboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="madrasa-gradient pattern-geometric py-20">
        <div className="container">
          <div className="font-amiri text-[var(--madrasa-accent)] text-xl mb-3">
            بسم الله الرحمن الرحيم
          </div>
          <div className="section-tag bg-[var(--madrasa-accent)]/15 text-[var(--madrasa-accent)]">
            About the Madrasa
          </div>
          <h1 className="font-amiri text-5xl font-bold text-papayawhip mt-2 mb-4">
            Our Story & Purpose
          </h1>
          <p className="text-[var(--madrasa-ivory)]/60 max-w-xl text-sm">
            The DGHI Madrasa — an afternoon and weekend Islamic school rooted in
            the same vision as the main Academy, dedicated entirely to Quranic
            and Islamic education.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-[var(--madrasa-ivory)]">
        <div className="container max-w-4xl">
          <div className="section-tag bg-[var(--madrasa-primary)]/10 text-[var(--madrasa-primary)]">
            Our Background
          </div>
          <h2 className="font-amiri text-4xl font-bold text-[var(--madrasa-primary)] mb-8">
            The Madrasa Story
          </h2>
          {madrasaAbout.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-[var(--madrasa-text-muted)] leading-relaxed mb-5"
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border-t-4 border-[var(--madrasa-primary)] bg-[var(--madrasa-ivory)] p-6 shadow-sm">
            <div className="section-tag bg-[var(--madrasa-primary)]/10 text-[var(--madrasa-primary)] text-xs">
              Vision
            </div>
            <p className="text-[var(--madrasa-text-muted)] text-sm leading-relaxed">
              {madrasaVision}
            </p>
          </div>
          <div className="rounded-2xl border-t-4 border-[var(--madrasa-accent)] bg-[var(--madrasa-primary)] p-6 shadow-sm">
            <div className="section-tag bg-[var(--madrasa-accent)]/15 text-[var(--madrasa-accent)] text-xs">
              Mission
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              {madrasaMission}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[var(--madrasa-primary)] pattern-geometric">
        <div className="container">
          <h2 className="font-amiri text-4xl font-bold text-[var(--madrasa-ivory)] text-center mb-10">
            Our Islamic Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {madrasaValues.map((v) => (
              <div
                key={v.title}
                className="rounded-xl bg-white/8 border border-white/10 p-6"
              >
                <h3 className="font-bold text-[var(--madrasa-accent)] font-amiri mb-2">
                  {v.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mallam */}
      <section className="py-16 bg-[var(--madrasa-ivory)]">
        <div className="container max-w-3xl text-center">
          <div className="section-tag bg-[var(--madrasa-primary)]/10 text-[var(--madrasa-primary)]">
            Leadership
          </div>
          <h2 className="font-amiri text-4xl font-bold text-[var(--madrasa-primary)] mb-8">
            Mudeer
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="w-20 h-20 rounded-full border-2 border-[var(--madrasa-accent)] overflow-hidden mx-auto mb-4">
              <Image
                src={madrasaMallam.imageUrl ?? "/images/logo_dgh.jpg"}
                alt={`${madrasaMallam.name} photo`}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="font-bold text-[var(--madrasa-primary)] text-xl mb-1">
              {madrasaMallam.name} 
            </div>
            <div className="text-sm text-[var(--madrasa-text-muted)] mb-6">
              {madrasaMallam.position}
            </div>
            {madrasaMallam.message
              ?.split("\n\n")
              .slice(0, 3)
              .map((para, i) => (
                <p
                  key={i}
                  className="text-[var(--madrasa-text-muted)] text-sm leading-relaxed mb-3 text-left"
                >
                  {para}
                </p>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--madrasa-primary-dark)] text-center">
        <div className="container">
          <Moon
            size={36}
            className="text-[var(--madrasa-accent)] mx-auto mb-4"
          />
          <h2 className="font-amiri text-3xl font-bold text-[var(--madrasa-ivory)] mb-4">
            Ready to Enrol in the Madrasa?
          </h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/madrasa/admissions"
              className="btn-primary btn-madrasa"
            >
              Enrol Now <ArrowRight size={16} />
            </Link>
            <Link
              href="/madrasa/curriculum"
              className="btn-primary btn-madrasa-outline"
            >
              View Curriculum
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
