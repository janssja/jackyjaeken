import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vacatures",
  description: "We versterken ons team. Kijk hier voor openstaande vacatures in keuken en bediening.",
};

const vacatures = [
  {
    title: "Kok / koude keuken",
    type: "Voltijds",
    summary: "Je versterkt onze koude keuken — salades, broodjes, buffetopzet. Ervaring in traiteur of horeca is een plus.",
  },
  {
    title: "Bediening weekends",
    type: "Flexi / studenten",
    summary: "Voor onze zondagbuffetten en feesten op zaterdag. Vriendelijk, gastvrij en hands-on.",
  },
  {
    title: "Afwas & logistiek",
    type: "Parttime",
    summary: "Schoonhouden van de keuken, materiaal klaarzetten en afruimen.",
  },
];

export default function VacaturesPage() {
  return (
    <>
      <Header />
      <section className="pt-[88px] md:pt-[120px] pb-section">
        <div className="container-content">
          <p className="eyebrow mb-6">Werken bij ons</p>
          <h1 className="font-serif text-display max-w-3xl">
            Zin om <em className="italic text-gold">mee te koken</em>?
          </h1>
          <p className="mt-8 text-body text-charcoal-soft max-w-prose">
            We zoeken collega's die gastvrijheid begrijpen en die van koken houden. Hieronder
            onze openstaande vacatures. Geen match? Stuur gerust een spontane sollicitatie.
          </p>
        </div>
      </section>

      <section className="pb-section">
        <div className="container-content max-w-3xl">
          <ul className="divide-y divide-line">
            {vacatures.map((v) => (
              <li key={v.title} className="py-8 flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="sm:w-1/3">
                  <p className="font-serif text-h3">{v.title}</p>
                  <p className="eyebrow mt-1">{v.type}</p>
                </div>
                <p className="sm:w-2/3 text-body text-charcoal-soft">{v.summary}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <Link href="/contact" className="btn-primary">Solliciteren</Link>
          </div>
        </div>
      </section>
    </>
  );
}
