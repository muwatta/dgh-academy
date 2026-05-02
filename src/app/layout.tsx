import type { Metadata } from "next";
import { Amiri, Nunito_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const amiri = Amiri({
  subsets: ["latin", "arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dghacademy.com.ng"),
  title: {
    default: "Dr. Gambo Hamza Islamic Academy | DGH Academy Jos Nigeria",
    template: "%s | DGH Academy Jos",
  },
  description:
    "Dr. Gambo Hamza Islamic Academy (DGH Academy) is a private nursery and primary school in Gangare, Jos, Plateau State, Nigeria. Offering Nigerian & British curriculum, Islamic studies, Quran education and ICT. Enrol today.",
  keywords: [
    "DGH Academy",
    "DGH Academy Jos",
    "Dr Gambo Hamza Islamic Academy",
    "Dr Gambo Hamza Academy Jos",
    "Islamic school Jos",
    "Islamic school Gangare",
    "private school Jos Nigeria",
    "nursery school Jos Plateau State",
    "primary school Gangare Jos",
    "Islamic education Plateau State",
    "Madrasa Jos Nigeria",
    "Quran school Jos",
    "British curriculum school Jos",
    "Nigerian British curriculum Jos",
    "school Gangare Jos",
    "dghacademy.com.ng",
  ],
  authors: [{ name: "Dr. Gambo Hamza Islamic Academy" }],
  creator: "Dr. Gambo Hamza Islamic Academy",
  publisher: "Dr. Gambo Hamza Islamic Academy",
  category: "Education",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://www.dghacademy.com.ng",
    siteName: "DGH Academy — Dr. Gambo Hamza Islamic Academy",
    title: "DGH Academy Jos | Dr. Gambo Hamza Islamic Academy",
    description:
      "A distinguished private Islamic school in Gangare, Jos, Plateau State. Nigerian & British curriculum, Islamic studies, Quran education and ICT for Nursery and Primary pupils.",
    images: [
      {
        url: "https://www.dghacademy.com.ng/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DGH Academy — Dr. Gambo Hamza Islamic Academy, Gangare Jos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DGH Academy Jos | Dr. Gambo Hamza Islamic Academy",
    description:
      "Private nursery & primary school in Gangare, Jos. Nigerian & British curriculum with strong Islamic values.",
    images: ["https://www.dghacademy.com.ng/og-image.jpg"],
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
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.dghacademy.com.ng",
  },
  verification: {
    // Add your Google Search Console verification code here after setup
    // google: "your-verification-code",
  },
};

// Schema.org structured data for Google AI Overview
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Dr. Gambo Hamza Islamic Academy",
  alternateName: [
    "DGH Academy",
    "DGH Academy Jos",
    "DGHIA",
    "Dr Gambo Hamza Academy",
  ],
  url: "https://www.dghacademy.com.ng",
  logo: "https://www.dghacademy.com.ng/images/logo.jpg",
  image: "https://www.dghacademy.com.ng/images/school-1.jpg",
  description:
    "Dr. Gambo Hamza Islamic Academy is a private nursery and primary school located in Gangare, Jos, Plateau State, Nigeria. Founded in 2025, the school offers Nigerian and British curriculum alongside strong Islamic values, Quran education, Arabic language and ICT/Coding.",
  foundingDate: "2025",
  address: {
    "@type": "PostalAddress",
    streetAddress: "D12 Sabon Layi, Gangare",
    addressLocality: "Jos",
    addressRegion: "Plateau State",
    postalCode: "930001",
    addressCountry: "NG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "9.8965",
    longitude: "8.8583",
  },
  telephone: "+2348168369019",
  email: "drgambohamzaislamicacademy@gmail.com",
  sameAs: [
    "https://www.facebook.com/share/1L9JNy5zyr/",
    "https://www.dghacademy.com.ng",
  ],
  hasMap: "https://maps.app.goo.gl/WbqF2k7sDrw5i7yw8",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "14:00",
      description: "Morning School hours",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "16:00",
      closes: "19:00",
      description: "Evening Madrasa hours",
    },
  ],
  teaches: [
    "Nursery Education",
    "Primary Education",
    "Islamic Studies",
    "Quran Recitation and Memorisation",
    "Arabic Language",
    "ICT and Coding",
    "Nigerian Curriculum",
    "British Curriculum",
  ],
  educationalLevel: ["Nursery", "Primary"],
  numberOfStudents: {
    "@type": "QuantitativeValue",
    description: "Small class sizes for effective learning",
  },
  founder: {
    "@type": "Person",
    name: "Dr. Gambo Hamza",
    description:
      "The late Dr. Gambo Hamza, whose children founded the academy in 2025 to fulfil his lifelong vision of quality Islamic education.",
  },
  member: {
    "@type": "Person",
    name: "Sumayyah Hamza Muhammad",
    jobTitle: "Administrator",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.dghacademy.com.ng/#school",
  name: "DGH Academy — Dr. Gambo Hamza Islamic Academy",
  description:
    "Private Islamic nursery and primary school in Gangare, Jos offering Nigerian & British curriculum.",
  url: "https://www.dghacademy.com.ng",
  telephone: "+2348168369019",
  email: "drgambohamzaislamicacademy@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "D12 Sabon Layi, Gangare",
    addressLocality: "Jos",
    addressRegion: "Plateau State",
    addressCountry: "NG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "9.8965",
    longitude: "8.8583",
  },
  openingHours: "Mo-Fr 07:00-19:00",
  priceRange: "₦₦",
  currenciesAccepted: "NGN",
  paymentAccepted: "Cash, Bank Transfer",
  areaServed: {
    "@type": "City",
    name: "Jos",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${amiri.variable} ${nunitoSans.variable} theme-light`}
    >
      <head>
        {/* Schema.org — Educational Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* Schema.org — Local Business (for Google Maps AI) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className="font-nunito antialiased">
        {children}
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
