"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Moon,
  Send,
} from "lucide-react";
import { useMemo, useState } from "react";
import { schoolInfo as defaultSchoolInfo, schoolNav } from "@/data/school";
import { sanitizePhoneNumber } from "@/lib/phone";
import { useSiteContent } from "@/lib/use-site-content";

export default function SchoolFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const emailValid = useMemo(() => /^\S+@\S+\.\S+$/.test(email), [email]);

  const { schoolInfo } = useSiteContent({
    schoolInfo: defaultSchoolInfo,
    schoolHero: {
      headline: "",
      subheadline: "",
      ctaPrimary: { label: "", href: "/" },
      ctaSecondary: { label: "", href: "/" },
    },
    schoolHistory: "",
    schoolVision: "",
    schoolMission: "",
  });

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailValid) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 700);
  };

  // Convert phone number to WhatsApp international format
  const whatsappUrl = `https://wa.me/${sanitizePhoneNumber(schoolInfo.phone)}`;

  const socialLinks = [
    {
      icon: <Facebook size={17} />,
      href: schoolInfo.facebook || "#",
      label: "Facebook",
    },
    { icon: <Instagram size={17} />, href: "#", label: "Instagram" },
    { icon: <Twitter size={17} />, href: "#", label: "Twitter" },
    { icon: <Youtube size={17} />, href: "#", label: "YouTube" },
  ];

  const contactItems = [
    {
      icon: <MapPin size={14} />,
      value: schoolInfo.address,
      href: schoolInfo.googleMapsUrl,
    },
    {
      icon: <Phone size={14} />,
      value: schoolInfo.phone,
      href: whatsappUrl,
      isWhatsApp: true,
    },
    {
      icon: <Mail size={14} />,
      value: schoolInfo.email,
      href: `mailto:${schoolInfo.email}`,
    },
    {
      icon: <Clock size={14} />,
      value: schoolInfo.workingHours,
      href: undefined,
    },
  ];

  return (
    <footer className="relative bg-[var(--school-primary-dark)] p-5 overflow-hidden text-white">
      {/* Islamic star pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C4955A' fill-rule='evenodd'%3E%3Cpath d='M40 0L50 20H70L55 32L60 52L40 40L20 52L25 32L10 20H30L40 0z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main footer content */}
      <div className="relative container py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        {/* Brand column */}
        <div className="lg:col-span-4 space-y-5">
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[var(--school-primary)] shadow-lg shadow-black/25 shrink-0">
              <Image
                src={schoolInfo.logoUrl ?? "/images/logo_dgh.jpg"}
                alt={schoolInfo.shortName}
                height={56}
                width={56}
                className="object-cover"
              />
              <div className="absolute inset-0 rounded-full border border-white/10" />
            </div>
            <div>
              <div className="font-amiri font-bold text-white text-base leading-snug">
                {schoolInfo.fullName}
              </div>
              <div className="text-white/60 text-[13px] mt-0.5 font-medium">
                {schoolInfo.type} · Est. {schoolInfo.established}
              </div>
            </div>
          </div>

          <p className="text-white/60 text-sm leading-relaxed max-w-sm">
            A distinguished Academy where pupils excel academically, morally and
            spiritually — rooted in the teachings of Islam, serving the Gangare
            community in Jos.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {socialLinks.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-white/60 hover:bg-[var(--school-accent)] hover:text-white hover:border-[var(--school-accent)] transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-[var(--school-accent)] text-white text-sm font-semibold shadow-lg shadow-[var(--school-accent)]/20 hover:bg-[var(--school-accent)]/95 transition-all"
          >
            <Phone size={14} /> Chat on WhatsApp
          </a>
        </div>

        <div className="hidden lg:block lg:col-span-1" />

        {/* Quick Links */}
        <div className="lg:col-span-2">
          <h4 className="flex items-center gap-2 text-white font-bold text-[15px] uppercase tracking-[0.20em] mb-5">
            <span className="w-5 h-px bg-[var(--school-accent)]" />
            Quick Links
          </h4>
          <ul className="space-y-3">
            {schoolNav
              .filter((l) => l.label !== "Madrasa →")
              .map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[var(--school-accent)] transition-all duration-200 overflow-hidden shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            <li className="pt-2 border-t border-white/[0.07] mt-1">
              <Link
                href="/madrasa"
                className="flex items-center gap-2 text-sm text-white/65 hover:text-white transition-colors font-semibold"
              >
                <Moon size={12} /> Evening Madrasa
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:col-span-3">
          <h4 className="flex items-center gap-2 text-white font-bold text-[10px] uppercase tracking-[0.16em] mb-5">
            <span className="w-5 h-px bg-[var(--school-accent)]" />
            Contact Us
          </h4>
          <ul className="space-y-4">
            {contactItems.map(({ icon, value, href, isWhatsApp }) => (
              <li key={value}>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-start gap-3 text-sm text-white/50 hover:text-white transition-colors group"
                  >
                    <span className="mt-0.5 text-white/55 group-hover:text-white transition-colors shrink-0">
                      {icon}
                    </span>
                    <span className="leading-relaxed break-all">{value}</span>
                    {isWhatsApp && (
                      <span className="text-[10px] text-white/30 group-hover:text-[var(--school-accent)] transition-colors">
                        (WhatsApp)
                      </span>
                    )}
                  </a>
                ) : (
                  <div className="flex items-start gap-3 text-sm text-white/50">
                    <span className="mt-0.5 text-white/55 shrink-0">
                      {icon}
                    </span>
                    <span className="leading-relaxed">{value}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <a
            href={schoolInfo.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 text-xs font-semibold px-4 py-2 rounded-lg border border-[var(--school-accent)]/20 text-white/60 hover:border-[var(--school-accent)]/50 hover:text-white hover:bg-[var(--school-accent)]/[0.06] transition-all"
          >
            <MapPin size={11} /> View on Google Maps
          </a>
        </div>

        {/* Newsletter */}
        <div className="lg:col-span-2">
          <h4 className="flex items-center gap-2 text-white font-bold text-[10px] uppercase tracking-[0.16em] mb-5">
            <span className="w-5 h-px bg-[var(--school-accent)]" />
            Newsletter
          </h4>
          <p className="text-sm text-white/50 leading-relaxed mb-4">
            Stay updated with school news, events and announcements.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus("idle");
              }}
              placeholder="your@email.com"
              className="w-full bg-white/[0.07] border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-[var(--school-accent)]/50 focus:bg-white/[0.09] transition-all"
            />
            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="w-full flex items-center justify-center gap-2 bg-[var(--school-accent)] hover:brightness-110 text-white font-bold text-sm py-2.5 rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? (
                <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
              ) : status === "success" ? (
                "✓ Subscribed!"
              ) : (
                <>
                  <Send size={13} /> Subscribe
                </>
              )}
            </button>
            {status === "error" && (
              <p className="text-xs text-red-400/80">
                Please enter a valid email.
              </p>
            )}
            {status === "success" && (
              <p className="text-xs text-green-400/80">
                Subscribed! JazakAllahu Khayran.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/[0.07]">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <p className="text-xs text-white/25">
              © {new Date().getFullYear()} Dr. Gambo Hamza Islamic Academy. All
              rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/20">
            <span>www.dghacademy.com.ng</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
