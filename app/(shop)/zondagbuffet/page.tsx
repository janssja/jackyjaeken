import type { Metadata } from "next";
import Image from "next/image";
import { ZondagbuffetCalendar } from "@/components/booking/ZondagbuffetCalendar";
import { content } from "@/lib/content";
import { Header } from "@/components/site/Header";

export const metadata: Metadata = {
  title: "Zondagbuffet reserveren",
  description: "Reserveer uw plek voor het zondagbuffet in onze feestzaal — elke zondag tussen 12u en 15u.",
};

export default function ZondagbuffetPage() {
  const slots = content.slots();
  const nextOpen = slots.find((s) => s.status === "open");

  return (
    <>
      <Header transparent />
      <section className="relative min-h-[60vh] flex items-end text-cream">
        <Image
          src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2400&auto=format&fit=crop"
          alt="Zondagbuffet"
          fill
          priority
          sizes="100vw"
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-charcoal/10 -z-10" />
        <div className="container-content py-20 md:py-28">
          <p className="eyebrow text-gold-soft mb-6">Iedere zondag · 12u — 15u</p>
          <h1 className="font-serif text-display max-w-3xl">
            Het <em className="italic">zondagbuffet</em>.
          </h1>
          <p className="mt-6 text-h3 font-serif italic text-cream/85 max-w-2xl">
            Een wisselend menu in onze feestzaal. Familie welkom, buitenspeeltuin voor de kleinsten.
          </p>
        </div>
      </section>

      <section className="py-section">
        <div className="container-content grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow mb-4">Zo werkt het</p>
            <h2 className="font-serif text-h2 mb-6">Kies, reserveer, kom langs.</h2>
            <ol className="space-y-4 text-body text-charcoal-soft">
              <li>
                <span className="font-serif italic text-gold mr-2">01</span>
                Kies een zondag uit de agenda hiernaast.
              </li>
              <li>
                <span className="font-serif italic text-gold mr-2">02</span>
                Geef uw gezelschap op per leeftijdscategorie.
              </li>
              <li>
                <span className="font-serif italic text-gold mr-2">03</span>
                Reken af via Bancontact — uw tafel is gereserveerd.
              </li>
              <li>
                <span className="font-serif italic text-gold mr-2">04</span>
                Kom zondag langs tussen 12u en 15u.
              </li>
            </ol>
            <p className="mt-8 text-small text-muted">
              Liever telefonisch? Bel <a className="link-underline" href="tel:089563182">089 56 31 82</a>.
            </p>
          </div>

          <div className="md:col-span-8">
            <ZondagbuffetCalendar slots={slots} />
          </div>
        </div>
      </section>

      {nextOpen && (
        <section className="py-section bg-cream-deep">
          <div className="container-content">
            <p className="eyebrow mb-4">Deze zondag op de kaart</p>
            <h2 className="font-serif text-h1 mb-8">
              {new Date(nextOpen.date).toLocaleDateString("nl-BE", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </h2>
            <div
              className="rich-text text-body text-charcoal-soft max-w-3xl"
              dangerouslySetInnerHTML={{ __html: nextOpen.menuHtml }}
            />
          </div>
        </section>
      )}
    </>
  );
}
