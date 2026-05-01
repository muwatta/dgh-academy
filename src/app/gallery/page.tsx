import type { Metadata } from "next";
import GalleryClient from "@/components/school/GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos of DGHIA — classrooms, students, events and school life.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
