import type { Metadata } from "next";
import MadrasaAdmissionsPageClient from "@/components/madrasa/MadrasaAdmissionsPageClient";

export const metadata: Metadata = {
  title: "Madrasa Admissions",
  description:
    "Enrol your child in DGHIA Madrasa — evening Islamic education in Jos.",
};

export default function MadrasaAdmissionsPage() {
  return <MadrasaAdmissionsPageClient />;
}
