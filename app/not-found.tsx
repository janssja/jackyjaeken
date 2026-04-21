import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-[88px] md:pt-[120px] min-h-[70vh] flex items-center">
        <div className="container-narrow text-center py-section">
          <p className="eyebrow mb-6 text-gold">404</p>
          <h1 className="font-serif text-display leading-[1.02]">
            Deze pagina <em className="italic text-gold">bestaat niet</em>.
          </h1>
          <p className="mt-8 text-body text-charcoal-soft">
            Mogelijk is de link verouderd of is er iets verschoven. Probeer het via de navigatie
            of keer terug naar de startpagina.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/" className="btn-primary">Naar startpagina</Link>
            <Link href="/contact" className="btn-ghost">Contact opnemen</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
