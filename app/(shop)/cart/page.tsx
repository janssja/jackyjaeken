"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/store";
import { CartLineRow } from "@/components/shop/CartLineRow";
import { formatEUR } from "@/lib/format";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default function CartPage() {
  const lines = useCart((s) => s.lines);
  const subtotal = useCart((s) => s.subtotal());

  return (
    <>
      <Header />
      <main className="pt-[88px] md:pt-[120px]">
        <section className="pb-section">
          <div className="container-content">
            <p className="eyebrow mb-6">Uw bestelling</p>
            <h1 className="font-serif text-display">Winkelmand.</h1>
          </div>
        </section>

        <section className="pb-section">
          <div className="container-content grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              {lines.length === 0 ? (
                <div className="py-20 text-center border border-line">
                  <p className="font-serif text-h2">Uw mand is leeg.</p>
                  <p className="mt-3 text-body text-muted">
                    Ontdek onze BBQ-formules, broodjes-boxen of food boxes.
                  </p>
                  <Link href="/shop" className="btn-primary mt-8 inline-flex">
                    Naar de webshop
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-line">
                  {lines.map((line) => (
                    <CartLineRow key={line.id} line={line} />
                  ))}
                </div>
              )}
            </div>

            {lines.length > 0 && (
              <aside className="md:col-span-4 md:col-start-9">
                <div className="bg-cream-deep p-8 md:sticky md:top-[120px]">
                  <p className="eyebrow mb-6">Samenvatting</p>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-body">Subtotaal</span>
                    <span className="font-serif text-h3">{formatEUR(subtotal)}</span>
                  </div>
                  <p className="text-small text-muted">
                    Leverkost en eventuele opties berekenen we bij afrekenen.
                  </p>
                  <div className="rule my-6" />
                  <Link href="/checkout" className="btn-primary w-full">
                    Afrekenen →
                  </Link>
                  <Link
                    href="/shop"
                    className="mt-4 block text-center text-small link-underline"
                  >
                    Verder bestellen
                  </Link>
                </div>
              </aside>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
