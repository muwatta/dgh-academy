"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Mail, Sun, Moon } from "lucide-react";
import { schoolNav, schoolInfo as defaultSchoolInfo } from "@/data/school";
import { useSiteContent } from "@/lib/use-site-content";

export default function SchoolNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("dgh-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      return;
    }

    setTheme("light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("theme-light", "theme-dark");
    document.documentElement.classList.add(`theme-${theme}`);
    window.localStorage.setItem("dgh-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:block bg-[var(--school-primary-dark)] text-[var(--school-cream)] text-sm">
        <div className="container flex justify-between items-center py-2">
          <span className="font-amiri opacity-80 italic">
            {schoolInfo.motto}
          </span>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "navbar-glass shadow-lg shadow-[var(--school-primary)]/10"
            : "navbar-glass"
        }`}
      >
        <div className="container flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-[var(--school-primary)] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Image
                src={schoolInfo.logoUrl ?? "/images/logo_dgh.jpg"}
                alt={schoolInfo.shortName}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-amiri font-bold text-[var(--school-primary)] text-base leading-tight">
                DGHIA
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {schoolNav.map((link) =>
              link.label === "Madrasa →" ? (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="ml-2 btn-primary btn-school text-sm px-4 py-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="navbar-link font-semibold text-sm text-[var(--school-text)] hover:text-[var(--school-primary)] hover:bg-[var(--school-cream)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="hidden lg:inline-flex items-center gap-2 ml-4 px-3 py-2 border rounded-md text-sm font-semibold transition-all text-[var(--school-primary)] border-[var(--school-primary)] hover:bg-[var(--school-primary)] hover:text-[var(--school-cream)]"
            aria-label="Toggle light and dark mode"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            {theme === "light" ? "Dark" : "Light"}
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded text-[var(--school-primary)]"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-white border-t border-[var(--school-cream-dark)] px-4 pb-4 animate-fade-in">
            {schoolNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block py-3 px-2 font-semibold border-b border-[var(--school-cream)] text-sm ${
                  link.label === "Madrasa →"
                    ? "text-[var(--school-primary)] font-bold"
                    : "text-[var(--school-text)]"
                } navbar-link`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                toggleTheme();
                setOpen(false);
              }}
              className="w-full mt-3 inline-flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-sm font-semibold text-[var(--school-primary)] border-[var(--school-primary)] hover:bg-[var(--school-primary)] hover:text-[var(--school-cream)] transition-all"
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
