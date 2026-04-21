import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { content } from "@/lib/content";
import { ProductCard } from "@/components/shop/ProductCard";

export const metadata: Metadata = {
  title: "Webshop",
  description: "BBQ-formules, broodjes-boxen en food boxes — rechtstreeks online bestellen.",
};

export default function ShopIndexPage() {
  const categories = content.categories();
  const featured = content.featured();

  return (
    <>
      <section className="pb-section">
        <div className="container-content">
          <p className="eyebrow mb-6">Webshop</p>
          <h1 className="font-serif text-display max-w-4xl">
            Bestel <em className="italic text-gold">vers</em> en betaal direct.
          </h1>
          <p className="mt-8 text-body text-charcoal-soft max-w-prose">
            Voor onze vaste formules — BBQ, broodjes-boxen en food boxes — hoeft u niet te
            wachten op een offerte. Kies, reken af met Bancontact en we zorgen voor de rest.
          </p>
        </div>
      </section>

      <section className="py-section bg-cream-deep">
        <div className="container-content">
          <p className="eyebrow mb-8">Categorieën</p>
          <div className="grid gap-8 md:grid-cols-3">
            {categories.map((cat, i) => (
              <Link key={cat.slug} href={`/shop/${cat.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                  <Image
                    src={cat.heroImage}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.04]"
                  />
                  <div className="absolute top-5 left-5 font-serif italic text-cream text-h3 drop-shadow-md">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <h2 className="mt-5 font-serif text-h2 group-hover:text-gold transition-colors">
                  {cat.title}
                </h2>
                <p className="mt-2 text-body text-charcoal-soft">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-section">
        <div className="container-content">
          <p className="eyebrow mb-8">Uitgelicht</p>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-section bg-cream-light">
        <div className="container-narrow text-center">
          <p className="eyebrow mb-6">Iets anders nodig?</p>
          <h2 className="font-serif text-h1">
            Maatwerk, buffetten of een volledig feest? <em className="italic text-gold">We denken graag mee.</em>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/diensten" className="btn-ghost">Alle diensten</Link>
            <Link href="/contact" className="btn-primary">Vraag een offerte</Link>
          </div>
        </div>
      </section>
    </>
  );
}
