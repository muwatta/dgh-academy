"use client";

import { ArrowRight, Phone, Mail, MapPin, Clock, Facebook } from "lucide-react";
import SchoolNavbar from "@/components/school/SchoolNavbar";
import SchoolFooter from "@/components/school/SchoolFooter";
import { useSiteContent } from "@/lib/use-site-content";
import {
  schoolInfo as defaultSchoolInfo,
  schoolHero as defaultSchoolHero,
} from "@/data/school";

export default function ContactPageClient() {
  const { schoolInfo } = useSiteContent({
    schoolInfo: defaultSchoolInfo,
    schoolHero: defaultSchoolHero,
    schoolHistory: "",
    schoolVision: "",
    schoolMission: "",
  });

  return (
    <>
      <SchoolNavbar />
      <main>
        <section className="relative school-gradient pattern-islamic py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="container relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--school-accent)]/10 text-papayawhip text-sm font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[var(--school-accent)]"></span>
              Get in Touch
            </div>
            <h1 className="font-amiri text-4xl md:text-5xl font-semibold text-[var(--school-cream)] mt-6 leading-tight max-w-2xl">Contact Us</h1>
            <div className="w-14 h-[2px] bg-[var(--school-accent)] mt-4"></div>
            <p className="mt-6 text-base md:text-lg text-[var(--school-cream)]/80 max-w-xl leading-relaxed">
              We are happy to answer your questions and welcome you to visit the school. Reach us through any of the channels below.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[var(--school-accent)] text-white rounded-md text-sm font-medium hover:opacity-90 transition">Send a Message</button>
              <button className="px-6 py-3 border border-[var(--school-cream)]/40 text-[var(--school-cream)] rounded-md text-sm font-medium hover:bg-white/10 transition">Visit School</button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="font-amiri text-3xl font-bold text-[var(--school-primary)] mb-8">Our Contact Details</h2>
                <div className="space-y-5">
                  {[
                    {
                      icon: <Phone size={20} />,
                      label: "Phone / WhatsApp",
                      value: schoolInfo.phone,
                      href: `tel:${schoolInfo.phone}`,
                    },
                    {
                      icon: <Mail size={20} />,
                      label: "Email Address",
                      value: schoolInfo.email,
                      href: `mailto:${schoolInfo.email}`,
                    },
                    {
                      icon: <MapPin size={20} />,
                      label: "School Address",
                      value: schoolInfo.address,
                      href: schoolInfo.googleMapsUrl,
                    },
                    {
                      icon: <Clock size={20} />,
                      label: "Working Hours",
                      value: schoolInfo.workingHours,
                      href: undefined,
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4 p-5 bg-[var(--school-cream)] rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-[var(--school-primary)] text-white flex items-center justify-center shrink-0">{item.icon}</div>
                      <div>
                        <div className="text-xs font-bold text-[var(--school-text-muted)] uppercase tracking-wider mb-0.5">{item.label}</div>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="text-[var(--school-primary)] font-semibold hover:underline"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-[var(--school-primary)] font-semibold">{item.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                  {schoolInfo.facebook && (
                    <a
                      href={schoolInfo.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-5 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <Facebook size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-0.5">Facebook</div>
                        <div className="text-blue-700 font-semibold">Follow DGHIA on Facebook</div>
                      </div>
                    </a>
                  )}
                </div>

                <div className="mt-8 rounded-xl overflow-hidden border border-[var(--school-cream-dark)] h-64 bg-[var(--school-cream)] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={32} className="text-[var(--school-primary)] mx-auto mb-2" />
                    <a href={schoolInfo.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary btn-school text-sm">
                      Open in Google Maps <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="card shadow-xl">
                <h2 className="font-amiri text-2xl font-bold text-[var(--school-primary)] mb-6">Send Us a Message</h2>
                <form action="https://formspree.io/f/mdapylrr" method="POST" className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[var(--school-text-muted)] uppercase tracking-wider block mb-1.5">Your Name *</label>
                      <input type="text" name="name" required className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[var(--school-primary)] transition-colors" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[var(--school-text-muted)] uppercase tracking-wider block mb-1.5">Phone Number *</label>
                      <input type="tel" name="phone" required className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[var(--school-primary)] transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[var(--school-text-muted)] uppercase tracking-wider block mb-1.5">Subject *</label>
                    <input type="text" name="subject" required placeholder="e.g. Admission Enquiry" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[var(--school-primary)] transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[var(--school-text-muted)] uppercase tracking-wider block mb-1.5">Message *</label>
                    <textarea name="message" rows={6} required className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[var(--school-primary)] resize-none transition-colors" />
                  </div>
                  <button type="submit" className="btn-primary btn-school w-full justify-center">Send Message <ArrowRight size={16} /></button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SchoolFooter />
    </>
  );
}
