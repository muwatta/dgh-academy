"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Star,
  Award,
  BookOpen,
  Users,
  Shield,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SchoolNavbar from "@/components/school/SchoolNavbar";
import SchoolFooter from "@/components/school/SchoolFooter";
import { useSiteContent } from "@/lib/use-site-content";
import {
  schoolInfo as defaultSchoolInfo,
  schoolHero as defaultSchoolHero,
  schoolStats,
  coreValues,
  academicPrograms,
  facilities,
  admissionRequirements,
  entryClasses,
  administrator,
  director,
  schoolBursar,
  technicalManager,
  founder,
} from "@/data/school";

// Custom image loader to avoid next.config.js configuration
const customLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const iconMap: Record<string, React.ReactNode> = {
  star: <Star size={20} />,
  shield: <Shield size={20} />,
  award: <Award size={20} />,
  heart: <Heart size={20} />,
  users: <Users size={20} />,
  "book-open": <BookOpen size={20} />,
  handshake: <Users size={20} />,
};

const heroSlides = [
  {
    id: 1,
    title: "Welcome to Dr. Gambo Hamza Islamic Academy",
    subtitle:
      "Where knowledge meets faith — nurturing tomorrow's leaders today.",
    ctaText: "Explore Academy",
    ctaLink: "/about",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/v1775469629/enviroment_dgh_j4cvvi.jpg",
  },
  {
    id: 2,
    title: "Excellence in Education & Islamic Values",
    subtitle:
      "British & Nigerian curricula integrated with robust Islamic Education and ICT.",
    ctaText: "Academic Programs",
    ctaLink: "/academics",
    image: "/images/library-prep.jpg",
  },
  {
    id: 3,
    title: "Enrol for 2026/2027 Session",
    subtitle:
      "Limited seats available for Nursery & Primary levels. Join our learning community.",
    ctaText: "Admissions",
    ctaLink: "/admissions",
    image: "/images/ict-class.jpg",
  },
];

export default function HomePage() {
  const content = useSiteContent({
    schoolInfo: defaultSchoolInfo,
    schoolHero: defaultSchoolHero,
    schoolHistory: "",
    schoolVision: "",
    schoolMission: "",
  });

  const heroSlides = useMemo(
    () => [
      {
        id: 1,
        title:
          content.schoolHero.headline ||
          "Welcome to Dr. Gambo Hamza Islamic Academy",
        subtitle:
          content.schoolHero.subheadline ||
          "Where knowledge meets faith — nurturing tomorrow's leaders today.",
        ctaText: content.schoolHero.ctaPrimary.label || "Explore Academy",
        ctaLink: content.schoolHero.ctaPrimary.href || "/about",
        image:
          "https://res.cloudinary.com/dee5edoss/image/upload/v1775469629/enviroment_dgh_j4cvvi.jpg",
      },
      {
        id: 2,
        title: "Excellence in Education & Islamic Values",
        subtitle:
          "British & Nigerian curricula integrated with robust Islamic Education and ICT.",
        ctaText: "Academic Programs",
        ctaLink: "/academics",
        image: "/images/library-prep.jpg",
      },
      {
        id: 3,
        title: "Enrol for 2026/2027 Session",
        subtitle:
          "Limited seats available for Nursery & Primary levels. Join our learning community.",
        ctaText: "Admissions",
        ctaLink: "/admissions",
        image: "/images/ict-class.jpg",
      },
    ],
    [content.schoolHero],
  );

  const { schoolInfo } = content;

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);

  const leadershipTeam = [
    founder,
    administrator,
    director,
    schoolBursar,
    technicalManager,
  ];

  return (
    <>
      <SchoolNavbar />
      <main id="top">
        {/* ── HERO SLIDER ── */}
        <section className="relative h-[70vh] min-h-[450px] md:h-[85vh] md:min-h-[550px] w-full overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
                loader={customLoader}
                unoptimized={false}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 sm:px-6 md:px-8">
                  <div className="max-w-2xl text-white">
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase bg-[var(--school-accent)]/90 rounded-full backdrop-blur-sm">
                      Dr. Gambo Hamza Islamic Academy
                    </div>
                    <h1 className="font-amiri text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                      {slide.subtitle}
                    </p>
                    <Link
                      href={slide.ctaLink}
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all bg-white rounded-full text-[var(--school-primary)] hover:bg-[var(--school-accent)] hover:text-white group"
                    >
                      {slide.ctaText}
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white bg-black/30 rounded-full backdrop-blur-sm transition-all hover:bg-black/50"
            aria-label="Previous slide"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white bg-black/30 rounded-full backdrop-blur-sm transition-all hover:bg-black/50"
            aria-label="Next slide"
          >
            <ChevronRight size={28} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* ── STATS STRIP ── */}
        <section className="bg-[var(--school-cream)] border-b border-[var(--school-cream-dark)]">
          <div className="container py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {schoolStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold font-amiri text-[var(--school-primary)] mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-[var(--school-text-muted)] font-semibold uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ABOUT SNIPPET ── */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="section-tag bg-[var(--school-cream)] text-[var(--school-primary)]">
                  About the School
                </div>
                <h2 className="font-amiri text-4xl md:text-5xl font-bold text-[var(--school-primary)] mb-6 leading-tight">
                  Building Tomorrow's Leaders Today
                </h2>
                <p className="text-[var(--school-text-muted)] leading-relaxed mb-4">
                  Dr. Gambo Hamza Islamic Academy is a private educational
                  institution located in Gangare, Jos, Plateau State.
                  Established in 2025 by the children of the late Dr. Gambo
                  Hamza, the Academy fulfils his lifelong dream of building a
                  community grounded in knowledge, discipline, and upright
                  character.
                </p>
                <p className="text-[var(--school-text-muted)] leading-relaxed mb-8">
                  Our school offers the Nigerian & British curriculum for
                  Nursery and Primary levels, integrating robust Islamic
                  education and ICT/Coding programmes in a nurturing,
                  small-class environment.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {[
                    "Nigerian & British Curriculum",
                    "Small Class Sizes",
                    "ICT & Coding",
                    "Islamic Education",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-3 py-1.5 bg-[var(--school-cream)] text-[var(--school-primary)] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="/about" className="btn-primary btn-school">
                  Read Our Story <ArrowRight size={16} />
                </Link>
              </div>

              <div className="space-y-5">
                <div className="card border-l-4 border-[var(--school-primary)]">
                  <div className="section-tag bg-[var(--school-cream)] text-[var(--school-primary)] text-xs mb-2">
                    Our Vision
                  </div>
                  <p className="text-[var(--school-text-muted)] text-sm leading-relaxed">
                    To be a distinguished academy where students excel
                    academically, morally and spiritually, embodying the
                    teachings of Islam while contributing positively to their
                    local and global communities.
                  </p>
                </div>
                <div className="card border-l-4 border-[var(--school-accent)]">
                  <div className="section-tag bg-[var(--school-cream)] text-[var(--school-primary)] text-xs mb-2">
                    Our Mission
                  </div>
                  <p className="text-[var(--school-text-muted)] text-sm leading-relaxed">
                    To provide a nurturing and inclusive learning environment
                    that integrates high-quality conventional education with a
                    deep understanding of Islamic values, empowering students to
                    become knowledgeable, ethical and productive members of
                    society.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── LEADERSHIP PREVIEW ── */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <div className="section-tag bg-[var(--school-cream)] text-[var(--school-primary)]">
                Leadership
              </div>
              <h2 className="font-amiri text-4xl font-bold text-[var(--school-primary)] mb-3">
                Meet Our School Leadership
              </h2>
              <p className="text-[var(--school-text-muted)] max-w-2xl mx-auto">
                Our administration team guides the academy with strong values,
                academic excellence and caring leadership.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {leadershipTeam.map((member) => (
                <div key={member.name} className="card text-center p-6">
                  <div className="relative mx-auto mb-4 w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--school-accent)]">
                    <Image
                      src={member.imageUrl ?? "/images/logo_dgh.jpg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                      loader={customLoader}
                    />
                  </div>
                  <div className="font-bold text-[var(--school-primary)] text-lg mb-1">
                    {member.name}
                  </div>
                  <div className="text-sm text-[var(--school-text-muted)]">
                    {member.position}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CORE VALUES ── */}
        <section className="py-20 bg-[var(--school-cream)] pattern-islamic">
          <div className="container">
            <div className="text-center mb-12">
              <div className="section-tag bg-white text-[var(--school-primary)]">
                What We Stand For
              </div>
              <h2 className="font-amiri text-4xl font-bold text-[var(--school-primary)]">
                Our Core Values
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {coreValues.map((value) => (
                <div
                  key={value.title}
                  className="card text-center group hover:bg-[var(--school-primary)] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--school-cream)] group-hover:bg-[var(--school-accent)]/20 flex items-center justify-center mx-auto mb-4 text-[var(--school-primary)] group-hover:text-[var(--school-accent)] transition-colors">
                    {iconMap[value.icon] || <Star size={20} />}
                  </div>
                  <h3 className="font-bold text-[var(--school-primary)] group-hover:text-[var(--school-accent)] mb-2 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-xs text-[var(--school-text-muted)] group-hover:text-[var(--school-cream)]/70 leading-relaxed transition-colors">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ACADEMIC PROGRAMS ── */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <div className="section-tag bg-[var(--school-cream)] text-[var(--school-primary)]">
                Academics
              </div>
              <h2 className="font-amiri text-4xl font-bold text-[var(--school-primary)] mb-3">
                Academic Programmes
              </h2>
              <p className="text-[var(--school-text-muted)] max-w-xl mx-auto">
                From Toddler to Basic 5, our programmes blend academic rigour
                with strong Islamic foundations.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {academicPrograms.map((prog) => (
                <div key={prog.title} className="card group">
                  <div className="w-10 h-10 rounded-lg bg-[var(--school-cream)] flex items-center justify-center text-[var(--school-primary)] mb-4 group-hover:bg-[var(--school-primary)] group-hover:text-white transition-all">
                    <BookOpen size={18} />
                  </div>
                  <h3 className="font-bold text-[var(--school-primary)] mb-2">
                    {prog.title}
                  </h3>
                  <p className="text-sm text-[var(--school-text-muted)] leading-relaxed mb-3">
                    {prog.description}
                  </p>
                  {prog.levels && (
                    <div className="flex flex-wrap gap-1.5">
                      {prog.levels.map((l) => (
                        <span
                          key={l}
                          className="text-xs px-2 py-0.5 bg-[var(--school-cream)] text-[var(--school-primary)] rounded-full font-medium"
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

        {/* ── FACILITIES ── */}
        <section className="py-20 bg-[var(--school-cream)]">
          <div className="container">
            <div className="text-center mb-12">
              <div className="section-tag bg-white text-[var(--school-primary)]">
                Infrastructure
              </div>
              <h2 className="font-amiri text-4xl font-bold text-[var(--school-primary)]">
                School Facilities
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {facilities.map((f) => (
                <div key={f.name} className="facility-card">
                  <div className="facility-icon">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-sm font-semibold">{f.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ADMISSIONS & ENQUIRY ── */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="section-tag bg-[var(--school-cream)] text-[var(--school-primary)]">
                  How to Enrol
                </div>
                <h2 className="font-amiri text-4xl font-bold text-[var(--school-primary)] mb-6">
                  Admission Requirements
                </h2>
                <ul className="space-y-3 mb-8">
                  {admissionRequirements.map((req, i) => (
                    <li key={req} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[var(--school-primary)] text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-[var(--school-text-muted)] text-sm">
                        {req}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="p-4 bg-[var(--school-cream)] rounded-lg">
                  <div className="text-sm font-bold text-[var(--school-primary)] mb-2">
                    Entry Classes Available
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {entryClasses.map((c) => (
                      <span
                        key={c}
                        className="text-xs px-3 py-1 bg-white text-[var(--school-primary)] rounded-full font-semibold border border-[var(--school-cream-dark)]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card shadow-xl">
                <h3 className="font-amiri text-2xl font-bold text-[var(--school-primary)] mb-6">
                  Make an Enquiry
                </h3>
                <form
                  action="https://formspree.io/f/mdapylrr"
                  method="POST"
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[var(--school-text-muted)] uppercase tracking-wider block mb-1.5">
                        Parent Name *
                      </label>
                      <input
                        type="text"
                        name="parentName"
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[var(--school-primary)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[var(--school-text-muted)] uppercase tracking-wider block mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="08XXXXXXXXX"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[var(--school-primary)] transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[var(--school-text-muted)] uppercase tracking-wider block mb-1.5">
                      Child's Name *
                    </label>
                    <input
                      type="text"
                      name="childName"
                      placeholder="Child's full name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[var(--school-primary)] transition-colors"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[var(--school-text-muted)] uppercase tracking-wider block mb-1.5">
                        Child's Age *
                      </label>
                      <input
                        type="text"
                        name="childAge"
                        placeholder="e.g. 5 years"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[var(--school-primary)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[var(--school-text-muted)] uppercase tracking-wider block mb-1.5">
                        Class Interested In *
                      </label>
                      <select
                        name="classInterested"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[var(--school-primary)] transition-colors bg-white"
                      >
                        <option value="">Select class</option>
                        {entryClasses.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[var(--school-text-muted)] uppercase tracking-wider block mb-1.5">
                      Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Any questions or additional info..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[var(--school-primary)] transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary btn-school w-full justify-center"
                  >
                    Send Enquiry <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="py-16 bg-[var(--school-cream)]">
          <div className="container">
            <div className="grid sm:grid-cols-3 gap-6">
              <a
                href={`tel:${schoolInfo.phone}`}
                className="card text-center group hover:bg-[var(--school-primary)]"
              >
                <Phone
                  size={24}
                  className="text-[var(--school-primary)] group-hover:text-[var(--school-accent)] mx-auto mb-3 transition-colors"
                />
                <div className="font-bold text-[var(--school-primary)] group-hover:text-white mb-1 transition-colors">
                  Call / WhatsApp
                </div>
                <div className="text-sm text-[var(--school-text-muted)] group-hover:text-white/70 transition-colors">
                  {schoolInfo.phone}
                </div>
              </a>
              <a
                href={`mailto:${schoolInfo.email}`}
                className="card text-center group hover:bg-[var(--school-primary)]"
              >
                <Mail
                  size={24}
                  className="text-[var(--school-primary)] group-hover:text-[var(--school-accent)] mx-auto mb-3 transition-colors"
                />
                <div className="font-bold text-[var(--school-primary)] group-hover:text-white mb-1 transition-colors">
                  Email Us
                </div>
                <div className="text-xs text-[var(--school-text-muted)] group-hover:text-white/70 transition-colors break-all">
                  {schoolInfo.email}
                </div>
              </a>
              <a
                href={schoolInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card text-center group hover:bg-[var(--school-primary)]"
              >
                <MapPin
                  size={24}
                  className="text-[var(--school-primary)] group-hover:text-[var(--school-accent)] mx-auto mb-3 transition-colors"
                />
                <div className="font-bold text-[var(--school-primary)] group-hover:text-white mb-1 transition-colors">
                  Find Us
                </div>
                <div className="text-sm text-[var(--school-text-muted)] group-hover:text-white/70 transition-colors">
                  {schoolInfo.address}
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>
      <SchoolFooter />
    </>
  );
}
