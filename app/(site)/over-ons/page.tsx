import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { NumberedSection } from "@/components/site/NumberedSection";
import { SplitSection } from "@/components/site/SplitSection";

export const metadata: Metadata = {
  title: "Over ons",
  description: "Wij koken al decennia voor Limburg. Een blik in onze keuken, ons team en onze feestzaal.",
};

const values = [
  {
    number: "01",
    title: "Vers, in eigen keuken",
    text: "Alles wordt bij ons bereid — van salades en sauzen tot desserten en vlaaien. Geen tussenstappen, geen invriezerij.",
  },
  {
    number: "02",
    title: "Lokaal waar mogelijk",
    text: "We werken met vertrouwde Limburgse slagers, groentenboeren en bakkers. Bekende gezichten op elk bord.",
  },
  {
    number: "03",
    title: "Warm ontvangen",
    text: "Ons team staat klaar — geuniformeerd, professioneel en vriendelijk. Gastvrijheid is geen detail, het is het hele verhaal.",
  },
  {
    number: "04",
    title: "Meedenken met u",
    text: "Elk feest is anders. We stellen geen menu voor, we stellen er een samen. Met u, voor uw gasten.",
  },
];

export default function OverOnsPage() {
  return (
    <>
      <Header transparent />
      <Hero
        eyebrow="Over ons"
        title={<>Een huiselijke traiteur<br />met professioneel vakmanschap.</>}
        subtitle="Wij koken al decennia aan de Rijksweg in Dilsen-Stokkem. Voor trouwfeesten, koffietafels, verenigingen en iedere zondag voor families in onze feestzaal."
        image="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2400&auto=format&fit=crop"
        imageAlt="Chef aan het werk"
        height="regular"
      />

      <NumberedSection
        number="01"
        eyebrow="Ons verhaal"
        title="Een keuken die meegroeit."
        lead="Onze traiteurdienst begon kleinschalig, met zondagbuffetten in de familiezaal. Vandaag koken we voor vele honderden gasten per week, van koffietafels tot bruiloften. Wat gebleven is: de smaak van thuis."
      >
        <div className="rich-text text-body text-charcoal-soft">
          <p>
            De zaak combineert drie pijlers die naadloos op elkaar aansluiten: een volledig
            uitgeruste catering-keuken, een feestzaal met buitenspeeltuin en een team van
            ervaren medewerkers dat ook op externe locaties de bediening verzorgt.
          </p>
          <p>
            Onze bedienende medewerkers zijn geuniformeerd en professioneel opgeleid. Voor
            evenementen op uw locatie rekenen we €40 per uur per medewerker (excl. btw). Zij
            zorgen voor de ontvangst, het opscheppen, het afruimen en vooral — het gevoel dat
            u zelf ook gast mag zijn.
          </p>
        </div>
      </NumberedSection>

      <SplitSection
        eyebrow="02 · De feestzaal"
        title="Ruimte voor uw moment."
        lead="Onze feestzaal aan de Rijksweg is volledig aanpasbaar — van intieme koffietafels tot bruiloften met honderden gasten. Buitenspeeltuin voor de kinderen, parking op eigen terrein."
        image="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Feestzaal interieur"
        imageSide="left"
      />

      <section className="py-section bg-cream-light">
        <div className="container-content">
          <p className="eyebrow mb-4">03 · Waar we voor staan</p>
          <h2 className="font-serif text-h1 max-w-2xl mb-12">Vier vaste afspraken met onszelf.</h2>

          <div className="grid gap-10 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.number} className="border-t border-line pt-6">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-serif italic text-gold text-h3">{v.number}</span>
                  <h3 className="font-serif text-h2">{v.title}</h3>
                </div>
                <p className="text-body text-charcoal-soft max-w-prose">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
