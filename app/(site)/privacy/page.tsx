import type { Metadata } from "next";
import { Header } from "@/components/site/Header";

export const metadata: Metadata = {
  title: "Privacybeleid",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <section className="pt-[88px] md:pt-[120px] pb-section">
        <div className="container-narrow">
          <p className="eyebrow mb-6">Privacy</p>
          <h1 className="font-serif text-h1 mb-10">Privacybeleid</h1>

          <div className="rich-text text-body text-charcoal-soft">
            <h2>Welke gegevens verzamelen we?</h2>
            <p>
              Voor bestellingen en offertes: naam, e-mail, telefoon, leveradres, notities. Voor
              contactformulieren: naam, e-mail en uw bericht.
            </p>
            <h2>Waarvoor gebruiken we ze?</h2>
            <p>
              Uitsluitend voor de uitvoering van uw bestelling of het beantwoorden van uw vraag.
              We delen geen gegevens met derden, behalve wanneer strikt nodig (bijv. Mollie voor
              betalingsverwerking).
            </p>
            <h2>Hoelang bewaren we ze?</h2>
            <p>
              Bestelgegevens bewaren we 7 jaar (boekhoudkundige verplichting). Contactberichten
              bewaren we tot 2 jaar na laatste contact.
            </p>
            <h2>Uw rechten</h2>
            <p>
              U heeft altijd het recht op inzage, correctie of verwijdering. Mail hiervoor naar
              info@traiteurdienstjackyjaeken.be.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
