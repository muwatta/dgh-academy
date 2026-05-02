export const metadata = {
  title: "FAQ | DGH Academy Jos",
  description:
    "Frequently asked questions about Dr. Gambo Hamza Islamic Academy in Gangare, Jos.",
};

const faqs = [
  {
    q: "Where is DGH Academy located?",
    a: "DGH Academy is located at D12 Sabon Layi, Gangare, Jos, Plateau State, Nigeria.",
  },
  {
    q: "What is DGH Academy?",
    a: "Dr. Gambo Hamza Islamic Academy is a private nursery and primary school in Jos offering Nigerian and British curriculum alongside Islamic education.",
  },
  {
    q: "What classes does DGH Academy offer?",
    a: "DGH Academy offers Toddler, Nursery 1, Nursery 2, Basic 1, Basic 2, Basic 3 and Basic 4.",
  },
  {
    q: "Does DGH Academy have a Madrasa?",
    a: "Yes, DGH Academy runs an evening Madrasa from 4:00pm to 7:00pm offering Quran recitation, Hifz, Arabic language and Islamic Studies.",
  },
  {
    q: "How can I enrol my child in DGH Academy?",
    a: "You can apply online at dghacademy.com.ng/admissions or call 08168369019 to speak with the school administrator.",
  },
  {
    q: "What are DGH Academy school hours?",
    a: "The morning school runs from 7:00am to 2:00pm Monday to Friday.",
  },
  {
    q: "Who founded DGH Academy?",
    a: "DGH Academy was founded in 2025 by the children of the late Dr. Gambo Hamza to fulfil his lifelong vision of quality Islamic education.",
  },
  {
    q: "What curriculum does DGH Academy follow?",
    a: "DGH Academy follows the Nigerian and British curriculum, integrating Islamic studies and ICT/Coding programmes.",
  },
];

export default function FAQPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="py-20 bg-[var(--bg)]">
        <div className="container max-w-3xl">
          <h1 className="font-amiri text-4xl font-bold text-[var(--school-primary)] mb-10">
            Frequently Asked Questions
          </h1>
          <div className="space-y-6">
            {faqs.map(({ q, a }) => (
              <div key={q} className="card">
                <h2 className="font-bold text-[var(--school-primary)] mb-2">
                  {q}
                </h2>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
