import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { NumberedSection } from "@/components/site/NumberedSection";
import { ServiceCard } from "@/components/site/ServiceCard";
import { SplitSection } from "@/components/site/SplitSection";
import { Testimonial } from "@/components/site/Testimonial";
import { content } from "@/lib/content";
import { formatEUR, formatDateNL } from "@/lib/format";

export default function HomePage() {
  const services = content.services();
  const featured = content.featured();
  const nextSlot = content.slots().find((s) => s.status === "open");

  return (
    <>
      <Header transparent />
      <Hero
        eyebrow="Traiteur Jacky Jaeken · Dilsen-Stokkem"
        title={
          <>
            Ambachtelijke catering,
            <br />
            warm ontvangen.
          </>
        }
        subtitle="We koken sinds decennia voor families, verenigingen en bedrijven in Limburg — met verse producten, verzorgde presentatie en rust aan tafel."
        image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2400&auto=format&fit=crop"
        imageAlt="Eettafel met schotels"
        primaryCta={{ href: "/zondagbuffet", label: "Boek het zondagbuffet" }}
        secondaryCta={{ href: "/shop", label: "Ontdek de webshop" }}
      />

      <section className="py-section">
        <div className="container-narrow text-center">
          <p className="eyebrow mb-6">Sinds decennia</p>
          <h2 className="font-serif text-h1 leading-tight">
            Een traiteurdienst <em className="italic text-gold">zoals vroeger</em> —
            met de toewijding van vandaag.
          </h2>
          <p className="mt-8 text-body text-charcoal-soft max-w-prose mx-auto">
            Van koude buffetten tot bruiloften, van koffietafels tot zondag-middagen in onze
            feestzaal: we verzorgen het moment, u geniet. Alles vers in eigen keuken, niets uit
            een doos.
          </p>
          <Link href="/over-ons" className="mt-8 inline-block btn-ghost">
            Maak kennis met het huis
          </Link>
        </div>
      </section>

      <NumberedSection
        number="01"
        eyebrow="Ons aanbod"
        title="Zeven diensten. Eén zorg."
        lead="Van klein familiemoment tot bedrijfsevent — we zetten onze hele keuken en ons team in om het goed te doen."
      >
        <div className="grid gap-10 sm:grid-cols-2">
          {services.slice(0, 4).map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i + 1} />
          ))}
        </div>
        <div className="mt-10 text-right">
          <Link href="/diensten" className="text-small uppercase tracking-[0.16em] link-underline">
            Alle diensten →
          </Link>
        </div>
      </NumberedSection>

      <section className="bg-cream-deep py-section">
        <div className="container-content">
          <div className="grid gap-12 md:grid-cols-12 items-end mb-12">
            <div className="md:col-span-6">
              <span className="font-serif italic text-gold text-h3">02</span>
              <p className="eyebrow mt-2 mb-4">Webshop</p>
              <h2 className="font-serif text-h1">Direct bestellen, vers geleverd.</h2>
            </div>
            <div className="md:col-span-5 md:col-start-8">
              <p className="text-body text-charcoal-soft">
                Onze BBQ-formules, broodjes-boxen en food boxes zijn online te bestellen en
                betalen — met Bancontact, in een paar klikken.
              </p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {featured.map((product) => (
              <Link
                key={product._id}
                href={`/shop/${product.categorySlug}/${product.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] bg-cream overflow-hidden">
                  <Image
                    src={product.heroImage}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <h3 className="font-serif text-h3">{product.title}</h3>
                  <span className="text-small text-muted">
                    vanaf {formatEUR(product.basePrice)}
                    {product.unit === "per_person" && " /p.p."}
                  </span>
                </div>
                <p className="mt-1 text-small text-charcoal-soft">{product.summary}</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/shop" className="btn-primary">Ga naar de webshop</Link>
          </div>
        </div>
      </section>

      <SplitSection
        eyebrow="03 · Iedere zondag"
        title="Het zondagbuffet — een traditie."
        lead="Elke zondag tussen 12u en 15u in onze feestzaal. Een wisselend menu, kinderen welkom, ruime parking en buitenspeeltuin. Reserveer uw plek online."
        image="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Zondagbuffet"
      >
        <div className="space-y-6">
          {nextSlot && (
            <div className="bg-cream-deep p-6 max-w-sm">
              <p className="eyebrow text-gold-muted">Eerstvolgende</p>
              <p className="mt-2 font-serif text-h3">{formatDateNL(nextSlot.date)}</p>
              <p className="text-small text-muted mt-1">
                Vanaf {formatEUR(nextSlot.priceAdult)} per volwassene
              </p>
            </div>
          )}
          <Link href="/zondagbuffet" className="btn-primary">
            Reserveer een tafel
          </Link>
        </div>
      </SplitSection>

      <section className="py-section bg-cream-light">
        <div className="container-content">
          <p className="eyebrow mb-10">04 · Wat gasten zeggen</p>
          <Testimonial
            quote="We hebben ons vijfenzestigste huwelijksjubileum bij Jacky gevierd — zestig gasten, alles verzorgd tot in de puntjes, en vooral warm."
            author="Familie Mertens"
            context="Jubileum, 2025"
          />
        </div>
      </section>

      <section className="py-section">
        <div className="container-narrow text-center">
          <p className="eyebrow mb-6">Tot ziens aan tafel</p>
          <h2 className="font-serif text-h1 leading-tight">
            Vertel ons over <em className="italic text-gold">uw moment</em>.
          </h2>
          <p className="mt-6 text-body text-charcoal-soft max-w-prose mx-auto">
            Een feest gepland? Een vereniging die hulp zoekt? Bel ons of stuur een bericht — we
            denken graag mee en maken een offerte op maat.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">Contacteer ons</Link>
            <a href="tel:089563182" className="btn-ghost">089 56 31 82</a>
          </div>
        </div>
      </section>
    </>
  );
}
