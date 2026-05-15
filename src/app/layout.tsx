import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dghacademy.com.ng"),
  title: {
    default: "Dr. Gambo Hamza Islamic Academy | DGHIA Jos",
    template: "%s | DGHIA",
  },
  description:
    "Dr. Gambo Hamza Islamic Academy — A distinguished private nursery and primary school in Gangare, Jos offering Nigerian & British curriculum alongside strong Islamic values. Enquire or apply today.",
  keywords: [
    "DGHIA",
    "Dr Gambo Hamza Islamic Academy",
    "Islamic school Jos",
    "private school Gangare",
    "nursery school Jos",
    "primary school Jos Nigeria",
    "Islamic education Plateau State",
    "Madrasa Jos",
    "dghacademy.com",
  ],
  authors: [{ name: "DGHIA" }],
  creator: "Dr. Gambo Hamza Islamic Academy",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://www.dghacademy.com.ng",
    siteName: "DGHIA",
    title: "Dr. Gambo Hamza Islamic Academy | DGHIA Jos",
    description:
      "A distinguished Academy where pupils excel academically, morally and spiritually — Gangare, Jos, Nigeria.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "DGHIA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Gambo Hamza Islamic Academy",
    description: "A distinguished Academy — Gangare, Jos, Nigeria.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: [
      { url: "/favicon/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/favicon/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}