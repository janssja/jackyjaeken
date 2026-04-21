import type { Metadata } from "next";
import { Header } from "@/components/site/Header";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
};

export default function VoorwaardenPage() {
  return (
    <>
      <Header />
      <section className="pt-[88px] md:pt-[120px] pb-section">
        <div className="container-narrow">
          <p className="eyebrow mb-6">Voorwaarden</p>
          <h1 className="font-serif text-h1 mb-10">Algemene voorwaarden</h1>

          <div className="rich-text text-body text-charcoal-soft">
            <h2>1. Reservering en offerte</h2>
            <p>
              Alle reserveringen worden pas definitief na schriftelijke bevestiging door beide
              partijen. Offertes blijven 30 dagen geldig. Aantallen gasten dienen uiterlijk
              zeven dagen voor het event doorgegeven.
            </p>
            <h2>2. Prijzen</h2>
            <p>
              Alle prijzen zijn inclusief btw tenzij anders vermeld. Personeelskost €40/uur (excl.
              btw) voor bediening op externe locatie.
            </p>
            <h2>3. Annulering</h2>
            <p>
              Annulering tot 14 dagen voor het event is kosteloos. Tussen 14 en 7 dagen wordt 50%
              aangerekend, binnen 7 dagen 100%.
            </p>
            <h2>4. Betaling</h2>
            <p>
              Voor webshop-bestellingen geldt betaling bij bestelling via Mollie (Bancontact,
              iDEAL, creditcard). Facturen voor diensten dienen binnen 14 dagen betaald.
            </p>
            <h2>5. Aansprakelijkheid</h2>
            <p>
              We zijn niet aansprakelijk voor schade ten gevolge van overmacht. Verhuurd materiaal
              blijft eigendom van Traiteurdienst Jacky Jaeken.
            </p>

            <p className="mt-10 text-small text-muted italic">
              Dit is een samenvatting. De volledige voorwaarden zijn op aanvraag beschikbaar.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
