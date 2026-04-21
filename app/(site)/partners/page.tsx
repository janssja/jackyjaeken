import type { Metadata } from "next";
import { Header } from "@/components/site/Header";

export const metadata: Metadata = {
  title: "Partners",
  description: "We werken al vele jaren samen met vertrouwde partners in en rond Limburg.",
};

const partners = [
  "Slagerij Vanoppen", "Kaasspeciaalzaak Dilsen", "Bakkerij Neven",
  "Wijnhuis Lambert", "Brouwerij Cornelissen", "Groentenboer De Vries",
  "Bloemisterij Flora", "DJ Steven", "Photography Lens & Co.",
  "Catering Rental BV", "Linnenservice Limburg", "Feestverhuur Meuwissen",
];

export default function PartnersPage() {
  return (
    <>
      <Header />
      <section className="pt-[88px] md:pt-[120px] pb-section">
        <div className="container-content">
          <p className="eyebrow mb-6">Partners</p>
          <h1 className="font-serif text-display max-w-3xl">
            Mensen met wie we <em className="italic text-gold">lang</em> samenwerken.
          </h1>
          <p className="mt-8 text-body text-charcoal-soft max-w-prose">
            Een goed feest steunt op een netwerk van mensen die elkaar kennen. Dit is een
            selectie van leveranciers, bedienden en diensten waarmee we al jaren werken — in
            wederzijds respect en met een constante kwaliteit.
          </p>
        </div>
      </section>

      <section className="pb-section">
        <div className="container-content grid gap-[1px] sm:grid-cols-2 md:grid-cols-3 bg-line">
          {partners.map((p) => (
            <div key={p} className="bg-cream py-10 px-8 text-center">
              <p className="font-serif text-h3">{p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
