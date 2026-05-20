import RentCalculator from "@/components/RentCalculator";
import NEIGHBOURHOODS from "@/lib/data";

const APT_LABELS = ["Studio", "1 Bedroom", "2 Bedrooms", "3 Bedrooms"];

function formatNaira(value: number): string {
  return "₦" + value.toLocaleString("en-NG");
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Lagos Rent Affordability Calculator",
  description:
    "Calculate how much rent you can afford in Lagos including agency fees, legal fees, and caution deposits.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://lagos-rent-calculator.vercel.app",
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "NGN",
  },
  areaServed: {
    "@type": "City",
    name: "Lagos",
    containedInPlace: {
      "@type": "Country",
      name: "Nigeria",
    },
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is rent paid in Lagos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most landlords require 1–2 years upfront. Monthly rent arrangements are rare outside serviced apartments.",
      },
    },
    {
      "@type": "Question",
      name: "What is agency fee in Lagos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agency fee is paid to the estate agent. It is typically 10% of annual rent and is paid once at signing, non-refundable.",
      },
    },
    {
      "@type": "Question",
      name: "What is a caution deposit in Lagos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A caution deposit (usually 10% of annual rent) held against damage. It is refundable at the end of the tenancy if the property is returned in good condition.",
      },
    },
    {
      "@type": "Question",
      name: "How much has rent increased in Lagos in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rents across Lagos are estimated to have risen 10–20% year-on-year in 2026, driven by naira depreciation and a shortage of quality housing stock, particularly in prime Island neighbourhoods. Figures are based on observed listings across PropertyPro and NaijaHouses.",
      },
    },
    {
      "@type": "Question",
      name: "Which part of Lagos is cheapest to rent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most affordable areas are Ikorodu, Ojodu, Festac, and Isolo on the Mainland, where a decent 1-bedroom can be found for ₦50,000–₦100,000 per month.",
      },
    },
  ],
};

const faqs = [
  {
    question: "How is rent paid in Lagos?",
    answer:
      "Most landlords require 1–2 years upfront. Monthly rent arrangements are rare outside serviced apartments.",
  },
  {
    question: "What is agency fee in Lagos?",
    answer:
      "Agency fee is paid to the estate agent. It is typically 10% of annual rent and is paid once at signing, non-refundable.",
  },
  {
    question: "What is a caution deposit in Lagos?",
    answer:
      "A caution deposit (usually 10% of annual rent) held against damage. It is refundable at the end of the tenancy if the property is returned in good condition.",
  },
  {
    question: "How much has rent increased in Lagos in 2026?",
    answer:
      "Rents across Lagos are estimated to have risen 10–20% year-on-year in 2026, driven by naira depreciation and a shortage of quality housing stock, particularly in prime Island neighbourhoods. Figures are based on observed listings across PropertyPro and NaijaHouses.",
  },
  {
    question: "Which part of Lagos is cheapest to rent?",
    answer:
      "The most affordable areas are Ikorodu, Ojodu, Festac, and Isolo on the Mainland, where a decent 1-bedroom can be found for ₦50,000–₦100,000 per month.",
  },
];

function FAQSection() {
  return (
    <div itemScope itemType="https://schema.org/FAQPage">
      {faqs.map((faq, i) => (
        <details key={i} className="group border-b border-border">
          <summary className="flex items-center justify-between cursor-pointer py-4 text-left">
            <div
              itemScope
              itemType="https://schema.org/Question"
              className="flex-1"
            >
              <h3 itemProp="name" className="text-sm font-semibold pr-4">
                {faq.question}
              </h3>
            </div>
            <span className="faq-icon shrink-0 text-foreground-muted">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M9 4v10M4 9h10" />
              </svg>
            </span>
          </summary>
          <div itemScope itemType="https://schema.org/Answer" className="pb-4">
            <p
              itemProp="text"
              className="text-sm leading-relaxed text-foreground-muted"
            >
              {faq.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}

// Group neighbourhoods by area
const areaOrder = [
  "Island Premium",
  "Island Mid",
  "Mainland Mid",
  "Mainland Affordable",
] as const;

const areaLabels: Record<string, string> = {
  "Island Premium": "Island — Premium",
  "Island Mid": "Island — Mid-range",
  "Mainland Mid": "Mainland — Mid-range",
  "Mainland Affordable": "Mainland — Affordable",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 pt-12 sm:pt-16 pb-8 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
            </span>
            <span className="text-xs font-medium text-foreground-muted">
              Updated for 2026 rent prices
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 leading-tight">
            Lagos Rent{" "}
            <span className="gradient-text">Affordability Calculator</span>
          </h1>
          <p className="text-base sm:text-lg font-medium mb-4 text-foreground-muted">
            Find out exactly what you can afford — and what you&rsquo;ll need in
            your account on signing day.
          </p>
          <p className="text-sm leading-relaxed max-w-xl mx-auto text-foreground-muted">
            Most Lagos rent guides miss the full picture. Landlords require one
            year&rsquo;s rent upfront, plus an agency fee of 10%, a legal fee of
            10%, and a caution deposit of 10%. That means the true move-in cost
            is typically{" "}
            <strong className="text-foreground">
              130% of your stated annual rent
            </strong>
            . This calculator gives you the real number.
          </p>
        </section>

        {/* Calculator Component */}
        <section className="px-4 sm:px-6 pb-12 max-w-2xl mx-auto">
          <RentCalculator />
        </section>

        {/* SEO Content Sections */}
        <div className="border-t border-border bg-background-secondary">
          <div className="px-4 sm:px-6 py-12 sm:py-16 max-w-2xl mx-auto space-y-12">
            {/* How much rent */}
            <section>
              <h2 className="text-xl font-bold mb-3">
                How much rent can you afford in Lagos?
              </h2>
              <p className="text-sm leading-relaxed text-foreground-muted">
                Most financial advisors recommend spending no more than 30% of
                your gross monthly income on rent. In Lagos, given the rising
                cost of living driven by inflation and naira depreciation, many
                residents end up spending between 30–40% of their income on
                housing. If you&rsquo;re moving in with a partner or housemate,
                you can pool both incomes to afford a better-located or larger
                apartment — use the &ldquo;2 people&rdquo; option in the
                calculator above.
              </p>
            </section>

            {/* Total package */}
            <section>
              <h2 className="text-xl font-bold mb-3">
                Understanding the Lagos total rent package
              </h2>
              <p className="text-sm leading-relaxed text-foreground-muted">
                In Lagos, quoting a monthly rent figure is misleading because
                landlords require full annual payment upfront. On top of that,
                tenants pay three additional fees at signing: an agency fee (10%
                of annual rent paid to the estate agent who found the property),
                a legal/agreement fee (10% covering the tenancy agreement
                prepared by the landlord&rsquo;s solicitor), and a caution
                deposit (10% held against potential property damage). This makes
                the true move-in cost approximately 1.3× the annual rent. For
                example, an apartment at ₦150,000 per month costs ₦1,800,000 per
                year — but the total amount you need to move in is{" "}
                <strong className="text-foreground">₦2,340,000</strong>.
              </p>
            </section>

            {/* Neighbourhood prices */}
            <section>
              <h2 className="text-xl font-bold mb-4">
                Lagos rent prices by neighbourhood (2026)
              </h2>
              <div className="space-y-6">
                {areaOrder.map((area) => {
                  const areaNeighbourhoods = NEIGHBOURHOODS.filter(
                    (n) => n.area === area,
                  );
                  return (
                    <div key={area}>
                      <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 text-foreground-muted">
                        {areaLabels[area]}
                      </h3>
                      <div className="rounded-xl border border-border bg-surface overflow-hidden">
                        {/* Header */}
                        <div
                          className="grid gap-0 text-xs font-semibold py-2.5 px-4 border-b border-border text-foreground-muted"
                          style={{
                            gridTemplateColumns: "1.5fr repeat(4, 1fr)",
                          }}
                        >
                          <span>Area</span>
                          {APT_LABELS.map((label) => (
                            <span key={label} className="text-right">
                              {label}
                            </span>
                          ))}
                        </div>
                        {/* Rows */}
                        {areaNeighbourhoods.map((n, idx) => (
                          <div
                            key={n.name}
                            className={`rent-table-row grid gap-0 text-xs py-2.5 px-4 ${
                              idx < areaNeighbourhoods.length - 1
                                ? "border-b border-border-light"
                                : ""
                            }`}
                            style={{
                              gridTemplateColumns: "1.5fr repeat(4, 1fr)",
                            }}
                          >
                            <span className="font-medium">{n.name}</span>
                            {n.rents.map(([min, max], i) => (
                              <span
                                key={i}
                                className="text-right text-foreground-muted"
                              >
                                {formatNaira(min)}–{formatNaira(max)}
                              </span>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Island vs Mainland */}
            <section>
              <h2 className="text-xl font-bold mb-3">
                Island vs Mainland Lagos: which is right for your budget?
              </h2>
              <p className="text-sm leading-relaxed mb-3 text-foreground-muted">
                Lagos Island — encompassing Victoria Island, Ikoyi, and Lekki —
                is the commercial and social hub of the city. It offers
                proximity to major corporate offices, fine dining, nightlife,
                and premium amenities. However, this comes at a steep price:
                rents on the Island can be two to five times higher than
                equivalent apartments on the Mainland. Traffic on key routes
                like the Lekki-Epe Expressway and Third Mainland Bridge can add
                hours to a daily commute, especially during rush hour.
              </p>
              <p className="text-sm leading-relaxed text-foreground-muted">
                Mainland areas such as Yaba, Surulere, Ikeja, and Ikorodu offer
                significantly more affordable housing. Yaba in particular has
                emerged as a tech hub, attracting young professionals with its
                mix of affordable rents and vibrant community. Ikeja GRA
                provides a middle ground — leafy, well-planned streets with
                reasonable amenities at roughly half the cost of Lekki Phase 1.
                If your workplace is on the Island but your budget fits the
                Mainland, factor in transport costs and commute time before
                deciding.
              </p>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-xl font-bold mb-4">
                Frequently asked questions
              </h2>
              <FAQSection />
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4 sm:px-6">
        <p className="text-xs text-center max-w-2xl mx-auto text-foreground-muted">
          © 2026 Lagos Rent Calculator. Built to help Nigerians make smarter
          housing decisions. Data is indicative and may vary by specific
          location and property condition.
        </p>
      </footer>
    </>
  );
}
