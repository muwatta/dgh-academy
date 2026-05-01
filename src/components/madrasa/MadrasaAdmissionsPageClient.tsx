"use client";

import { ArrowRight, Phone } from "lucide-react";
import MadrasaNavbar from "@/components/madrasa/MadrasaNavbar";
import MadrasaFooter from "@/components/madrasa/MadrasaFooter";
import { saveApplication } from "@/lib/application-store";
import { sanitizePhoneNumber } from "@/lib/phone";
import {
  madrasaInfo,
  madrasaAdmissionRequirements,
  madrasaClasses,
} from "@/data/madrasa";

export default function MadrasaAdmissionsPageClient() {
  const whatsappUrl = `https://wa.me/${sanitizePhoneNumber(madrasaInfo.phone)}`;

  return (
    <>
      <MadrasaNavbar />
      <main>
        <section className="relative madrasa-gradient pattern-geometric py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="container relative z-10">
            <div className="section-tag bg-[var(--madrasa-accent)]/15 text-[var(--madrasa-accent)]">
              Madrasa Admissions
            </div>
            <h1 className="font-amiri text-5xl font-bold text-papayawhip mt-4 mb-6">
              Join DGHIA Madrasa
            </h1>
            <p className="max-w-2xl text-sm text-[var(--madrasa-ivory)]/80 leading-relaxed">
              Enrol in our afternoon Madrasa programme, where Quranic learning,
              Arabic language and Islamic values are taught in a welcoming
              environment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--madrasa-accent)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--madrasa-accent)]/90 transition"
              >
                <Phone size={16} /> Contact on WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[var(--madrasa-ivory)]">
          <div className="container grid lg:grid-cols-2 gap-16">
            <div>
              <div className="section-tag bg-[var(--madrasa-primary)]/10 text-[var(--madrasa-primary)]">
                Requirements
              </div>
              <h2 className="font-amiri text-3xl font-bold text-[var(--madrasa-primary)] mt-6 mb-6">
                What You Need to Apply
              </h2>
              <ul className="space-y-4 text-[var(--madrasa-text-muted)]">
                {madrasaAdmissionRequirements.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--madrasa-primary)]"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card shadow-xl">
              <h2 className="font-amiri text-2xl font-bold text-[var(--madrasa-primary)] mb-6">
                Registration Form
              </h2>
              <form
                action="https://formspree.io/f/mdapylrr"
                method="POST"
                className="space-y-5"
                onSubmit={(event) => {
                  const form = event.currentTarget;
                  const formData = new FormData(form);
                  saveApplication({
                    section: "madrasa",
                    guardianName: String(
                      formData.get("guardianName") ?? "",
                    ).trim(),
                    phone: String(formData.get("phone") ?? "").trim(),
                    email:
                      String(formData.get("email") ?? "").trim() || undefined,
                    childName: String(formData.get("childName") ?? "").trim(),
                    childDob:
                      String(formData.get("childDob") ?? "").trim() ||
                      undefined,
                    childAge:
                      String(formData.get("childAge") ?? "").trim() ||
                      undefined,
                    gender:
                      String(formData.get("gender") ?? "").trim() || undefined,
                    classApplying:
                      String(formData.get("classApplying") ?? "").trim() ||
                      undefined,
                    quranLevel:
                      String(formData.get("quranLevel") ?? "").trim() ||
                      undefined,
                    previousSchool:
                      String(formData.get("previousSchool") ?? "").trim() ||
                      undefined,
                    additionalInfo:
                      String(formData.get("additionalInfo") ?? "").trim() ||
                      undefined,
                    additionalNotes:
                      String(formData.get("additionalNotes") ?? "").trim() ||
                      undefined,
                  });
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-[var(--madrasa-text-muted)]">
                    <span>Parent / Guardian Name *</span>
                    <input
                      name="guardianName"
                      required
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--madrasa-primary)] focus:ring-[var(--madrasa-primary)] transition"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-[var(--madrasa-text-muted)]">
                    <span>Phone / WhatsApp *</span>
                    <input
                      name="phone"
                      type="tel"
                      required
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--madrasa-primary)] focus:ring-[var(--madrasa-primary)] transition"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-[var(--madrasa-text-muted)]">
                    <span>Email</span>
                    <input
                      name="email"
                      type="email"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--madrasa-primary)] focus:ring-[var(--madrasa-primary)] transition"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-[var(--madrasa-text-muted)]">
                    <span>Child's Full Name *</span>
                    <input
                      name="childName"
                      required
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--madrasa-primary)] focus:ring-[var(--madrasa-primary)] transition"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-[var(--madrasa-text-muted)]">
                    <span>Date of Birth</span>
                    <input
                      name="childDob"
                      type="date"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--madrasa-primary)] focus:ring-[var(--madrasa-primary)] transition"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-[var(--madrasa-text-muted)]">
                    <span>Class Applying For</span>
                    <select
                      name="classApplying"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--madrasa-primary)] focus:ring-[var(--madrasa-primary)] transition"
                    >
                      <option value="">Select class</option>
                      {madrasaClasses.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="space-y-2 text-sm text-[var(--madrasa-text-muted)]">
                  <span>Additional Information</span>
                  <textarea
                    name="additionalInfo"
                    rows={4}
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--madrasa-primary)] focus:ring-[var(--madrasa-primary)] transition"
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--madrasa-primary)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--madrasa-primary)]/90 transition"
                >
                  Submit Application <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <MadrasaFooter />
    </>
  );
}
