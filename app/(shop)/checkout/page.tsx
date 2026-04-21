import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutForm } from "@/components/shop/CheckoutForm";

export const metadata: Metadata = {
  title: "Afrekenen",
};

export default function CheckoutPage() {
  return (
    <>
      <section className="pb-section">
        <div className="container-content">
          <Link href="/cart" className="eyebrow link-underline">← Winkelmand</Link>
          <h1 className="mt-6 font-serif text-display">Afrekenen.</h1>
        </div>
      </section>

      <section className="pb-section">
        <div className="container-content">
          <CheckoutForm />
        </div>
      </section>
    </>
  );
}
