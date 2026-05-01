import type { Metadata } from "next";
import AdmissionsPageClient from "@/components/school/AdmissionsPageClient";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Apply for admission to Dr. Gambo Hamza Islamic Academy. Open to Toddler through Basic 5.",
};

export default function AdmissionsPage() {
  return <AdmissionsPageClient />;
}
