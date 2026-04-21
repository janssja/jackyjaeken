import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { content } from "@/lib/content";
import { ContactForm } from "@/components/site/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Kom langs, bel ons of stuur een bericht — we antwoorden op elke vraag.",
};

export default function ContactPage() {
  const s = content.siteSettings();
  return (
    <>
      <Header />
      <section className="pt-[88px] md:pt-[120px] pb-section">
        <div className="container-content grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow mb-6">Contact</p>
            <h1 className="font-serif text-display leading-[1.02]">
              Laten we <em className="italic text-gold">praten</em>.
            </h1>
            <p className="mt-8 text-body text-charcoal-soft">
              Heeft u een feest gepland, zoekt u een offerte of wilt u gewoon overleggen? Bel of
              schrijf — we antwoorden meestal binnen de dag.
            </p>

            <div className="mt-12 space-y-8">
              <div>
                <p className="eyebrow mb-2">Adres</p>
                <address className="not-italic text-body">
                  {s.address.street}
                  <br />
                  {s.address.postal} {s.address.city}
                </address>
              </div>
              <div>
                <p className="eyebrow mb-2">Direct contact</p>
                <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="block text-body link-underline">
                  {s.phone}
                </a>
                <a href={`mailto:${s.email}`} className="block text-body link-underline">
                  {s.email}
                </a>
              </div>
              <div>
                <p className="eyebrow mb-2">Openingsuren</p>
                <ul className="text-body space-y-1">
                  {s.openingHours.map((h) => (
                    <li key={h.day} className="flex justify-between max-w-[260px]">
                      <span>{h.day}</span>
                      <span className="text-muted">{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div className="bg-cream-light p-8 md:p-12 border border-line">
              <h2 className="font-serif text-h2 mb-6">Stuur een bericht</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
