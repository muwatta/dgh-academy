import type { Metadata } from "next";
import AboutPageClient from "@/components/school/AboutPageClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the history, vision, mission and values of Dr. Gambo Hamza Islamic Academy — Jos, Plateau State.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
