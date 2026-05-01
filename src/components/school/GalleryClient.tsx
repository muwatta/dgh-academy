"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import SchoolNavbar from "@/components/school/SchoolNavbar";
import SchoolFooter from "@/components/school/SchoolFooter";
import { DEFAULT_GALLERY_IMAGES, loadGalleryImages } from "@/lib/content-store";
import type { GalleryImage } from "@/lib/types";

export default function GalleryClient() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch("/api/gallery", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to load gallery");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setGalleryImages(data as GalleryImage[]);
          return;
        }
        throw new Error("Invalid gallery payload");
      } catch {
        setGalleryImages(loadGalleryImages());
      }
    };

    fetchGallery();
  }, []);

  const images = galleryImages.length ? galleryImages : DEFAULT_GALLERY_IMAGES;

  return (
    <>
      <SchoolNavbar />
      <main>
        <section className="relative school-gradient pattern-islamic py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/25"></div>

          <div className="container relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--school-accent)]/10 text-white text-sm font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[var(--school-accent)]"></span>
              Our School Life
            </div>

            <h1 className="font-amiri text-4xl md:text-5xl font-semibold text-[var(--school-cream)] mt-6 leading-tight max-w-2xl">
              Gallery
            </h1>

            <div className="w-12 h-[2px] bg-[var(--school-accent)] mt-4"></div>

            <p className="mt-6 text-base md:text-lg text-[var(--school-cream)]/80 max-w-lg leading-relaxed">
              A glimpse into the daily life, events, and learning environment of
              DGHIA.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-[var(--school-primary)]">
                Featured Moments
              </h2>
              <p className="text-[var(--school-text-muted)] mt-2 max-w-2xl mx-auto">
                Explore the best memories from our school community and events
                across the year.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {images.map((img, index) => (
                <div
                  key={img.id}
                  className="group relative overflow-hidden rounded-2xl border border-[var(--school-cream-dark)] hover:border-[var(--school-primary)] shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-72">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                      loading={index < 4 ? "eager" : "lazy"}
                      priority={index < 4}
                    />
                  </div>

                  <div className="p-4 bg-white">
                    <div className="flex items-center justify-between mb-2 text-xs text-[var(--school-text-muted)]">
                      <span className="font-semibold text-[var(--school-primary)]">
                        {img.tag}
                      </span>
                      <span>{img.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[var(--school-primary)] mb-1">
                      {img.title ?? img.caption}
                    </h3>
                    <p className="text-[var(--school-text-muted)] text-sm mb-3">
                      {img.description ?? img.caption}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--school-secondary)] text-xs">
                        {img.caption}
                      </span>
                      <span className="text-[var(--school-primary)] font-semibold text-xs">
                        View
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center bg-[var(--school-cream)] rounded-2xl p-8">
              <p className="text-[var(--school-text-muted)] text-sm">
                📸 More photos coming soon. Follow us on{" "}
                <a
                  href="https://www.facebook.com/share/1L9JNy5zyr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--school-primary)] font-bold hover:underline"
                >
                  Facebook
                </a>{" "}
                for regular updates.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SchoolFooter />
    </>
  );
}
