import type { Metadata } from "next";
import ContactPageClient from "@/components/school/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Dr. Gambo Hamza Islamic Academy. Call, email or visit us in Gangare, Jos.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
