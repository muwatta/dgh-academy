import type { Metadata } from "next";
import ContactPageClient from "@/components/school/ContactPageClient";


export const metadata: Metadata = {
  title: "About DGH Academy Jos | Dr. Gambo Hamza Islamic Academy",
  description:
    "Learn about Dr. Gambo Hamza Islamic Academy — a private Islamic school in Gangare, Jos founded in 2025. Offering Nigerian & British curriculum for Nursery and Primary pupils.",
  keywords: [
    "DGH Academy Jos",
    "Islamic school Jos",
    "private school Gangare",
    "Dr Gambo Hamza Academy",
  ],
  openGraph: {
    title: "Contact",
    description:
      "Founded in 2025 to honour the legacy of Dr. Gambo Hamza. Nursery & Primary school in Jos, Nigeria.",
    url: "https://www.dghacademy.com.ng/contact",
    images: [{ url: "https://www.dghacademy.com.ng/images/school-1.jpg" }],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
