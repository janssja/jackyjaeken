"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart/store";
import { formatEUR } from "@/lib/format";
import { lineTotal } from "@/lib/cart/pricing";

export function CheckoutForm() {
  const router = useRouter();
  const lines = useCart((s) => s.lines);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);

  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">("pickup");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const customer = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      notes: String(form.get("notes") ?? ""),
    };

    const fulfillment =
      fulfillmentType === "pickup"
        ? { type: "pickup" as const, date: String(form.get("date") ?? "") }
        : {
            type: "delivery" as const,
            date: String(form.get("date") ?? ""),
            address: String(form.get("address") ?? ""),
            postal: String(form.get("postal") ?? ""),
            city: String(form.get("city") ?? ""),
          };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines, customer, fulfillment }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Fout bij afrekenen");

      if (data.checkoutUrl) {
        // Don't clear cart yet — we clear on success page, so back-button still works.
        window.location.href = data.checkoutUrl;
        return;
      }

      // Dev mode: no Mollie configured, redirect directly to success
      if (data.devBypass && data.token) {
        clear();
        router.push(`/checkout/success?token=${data.token}&dev=1`);
        return;
      }

      throw new Error("Onverwachte respons");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-12 md:grid-cols-12">
      <div className="md:col-span-7 space-y-10">
        <section>
          <p className="eyebrow mb-6">Uw gegevens</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="eyebrow block mb-2">Naam</label>
              <input id="name" name="name" type="text" required className="input-editorial" autoComplete="name" />
            </div>
            <div>
              <label htmlFor="email" className="eyebrow block mb-2">E-mail</label>
              <input id="email" name="email" type="email" required className="input-editorial" autoComplete="email" />
            </div>
            <div>
              <label htmlFor="phone" className="eyebrow block mb-2">Telefoon</label>
              <input id="phone" name="phone" type="tel" required className="input-editorial" autoComplete="tel" />
            </div>
          </div>
        </section>

        <section>
          <p className="eyebrow mb-6">Levering</p>
          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={() => setFulfillmentType("pickup")}
              className={`px-5 py-3 text-small uppercase tracking-[0.14em] border transition-colors ${
                fulfillmentType === "pickup" ? "bg-charcoal text-cream border-charcoal" : "border-line"
              }`}
            >
              Afhalen in Dilsen-Stokkem
            </button>
            <button
              type="button"
              onClick={() => setFulfillmentType("delivery")}
              className={`px-5 py-3 text-small uppercase tracking-[0.14em] border transition-colors ${
                fulfillmentType === "delivery" ? "bg-charcoal text-cream border-charcoal" : "border-line"
              }`}
            >
              Levering
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className={fulfillmentType === "pickup" ? "sm:col-span-2" : ""}>
              <label htmlFor="date" className="eyebrow block mb-2">Datum</label>
              <input id="date" name="date" type="date" required className="input-editorial" />
            </div>

            {fulfillmentType === "delivery" && (
              <>
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="eyebrow block mb-2">Adres</label>
                  <input id="address" name="address" type="text" required className="input-editorial" autoComplete="street-address" />
                </div>
                <div>
                  <label htmlFor="postal" className="eyebrow block mb-2">Postcode</label>
                  <input id="postal" name="postal" type="text" required className="input-editorial" autoComplete="postal-code" />
                </div>
                <div>
                  <label htmlFor="city" className="eyebrow block mb-2">Gemeente</label>
                  <input id="city" name="city" type="text" required className="input-editorial" autoComplete="address-level2" />
                </div>
              </>
            )}
          </div>
        </section>

        <section>
          <label htmlFor="notes" className="eyebrow block mb-2">Opmerkingen (optioneel)</label>
          <textarea id="notes" name="notes" rows={4} className="input-editorial resize-none" />
        </section>
      </div>

      <aside className="md:col-span-4 md:col-start-9">
        <div className="bg-cream-deep p-8 md:sticky md:top-[120px]">
          <p className="eyebrow mb-6">Uw bestelling</p>
          <ul className="divide-y divide-line text-small">
            {lines.map((line) => (
              <li key={line.id} className="py-3 flex justify-between gap-3">
                <span className="text-charcoal-soft">
                  {line.kind === "zondagbuffet"
                    ? `Zondagbuffet ${new Date(line.date).toLocaleDateString("nl-BE")}`
                    : "title" in line.snapshot
                    ? line.snapshot.title
                    : "Bestelling"}
                  {line.kind === "product" && ` · ${line.qty}×`}
                  {line.kind === "box-with-addons" && ` · ${line.qty}×`}
                </span>
                <span className="text-charcoal shrink-0">{formatEUR(lineTotal(line))}</span>
              </li>
            ))}
          </ul>
          <div className="rule my-6" />
          <div className="flex justify-between items-baseline mb-6">
            <span className="eyebrow">Totaal</span>
            <span className="font-serif text-h2">{formatEUR(subtotal)}</span>
          </div>

          {error && (
            <p className="mb-4 text-small text-[color:var(--color-error)]">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting || lines.length === 0}
            className="btn-primary w-full disabled:opacity-60"
          >
            {submitting ? "Bezig..." : "Betalen via Mollie"}
          </button>
          <p className="mt-3 text-[0.7rem] text-muted text-center">
            Veilig betalen met Bancontact, iDEAL of creditcard
          </p>
        </div>
      </aside>
    </form>
  );
}
