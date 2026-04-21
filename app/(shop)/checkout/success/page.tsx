import Link from "next/link";
import { getMollie } from "@/lib/mollie/client";
import {
  findOrderByToken,
  updateStatus,
  type OrderStatus,
} from "@/lib/orders/repository";
import { formatEURCents } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; dev?: string }>;
}) {
  const { token, dev } = await searchParams;
  if (!token) {
    return (
      <section className="py-section">
        <div className="container-narrow text-center">
          <p className="eyebrow mb-4">Bestelling</p>
          <h1 className="font-serif text-h1">Geen bestelling gevonden.</h1>
          <Link href="/shop" className="btn-primary mt-8 inline-flex">Naar webshop</Link>
        </div>
      </section>
    );
  }

  const order = findOrderByToken(token);
  if (!order) {
    return (
      <section className="py-section">
        <div className="container-narrow text-center">
          <p className="eyebrow mb-4">Bestelling</p>
          <h1 className="font-serif text-h1">Bestelling niet gevonden.</h1>
        </div>
      </section>
    );
  }

  // Dev bypass: mark as paid immediately (no Mollie configured)
  let status: OrderStatus = order.status;
  if (dev === "1" && status === "pending") {
    updateStatus(order.mollie_payment_id ?? "", "paid");
    status = "paid";
  }

  // If no webhook URL was set, poll Mollie directly for final status
  if (status === "pending" && order.mollie_payment_id) {
    const mollie = getMollie();
    if (mollie) {
      try {
        const payment = await mollie.payments.get(order.mollie_payment_id);
        const mapped =
          payment.status === "paid"
            ? "paid"
            : payment.status === "canceled"
            ? "canceled"
            : payment.status === "expired"
            ? "expired"
            : payment.status === "failed"
            ? "failed"
            : "pending";
        if (mapped !== status) {
          updateStatus(order.mollie_payment_id, mapped);
          status = mapped;
        }
      } catch (err) {
        console.error("[success] Mollie poll error", err);
      }
    }
  }

  const customer = JSON.parse(order.customer_json) as { name: string; email: string };

  return (
    <>
      <section className="py-section">
        <div className="container-narrow">
          {status === "paid" ? (
            <>
              <p className="eyebrow text-gold-muted mb-6">✓ Betaling ontvangen</p>
              <h1 className="font-serif text-display leading-[1.02]">
                Dank u, <em className="italic text-gold">{customer.name.split(" ")[0]}</em>.
              </h1>
              <p className="mt-8 text-body text-charcoal-soft">
                We hebben uw bestelling van <strong>{formatEURCents(order.amount_cents)}</strong> ontvangen en
                sturen een bevestigingsmail naar <strong>{customer.email}</strong>. Onze keuken gaat aan
                de slag — bij vragen bellen we u.
              </p>
            </>
          ) : status === "pending" ? (
            <>
              <p className="eyebrow mb-6">Betaling wordt verwerkt</p>
              <h1 className="font-serif text-h1">Een ogenblik geduld…</h1>
              <p className="mt-6 text-body text-charcoal-soft">
                We wachten op de bevestiging van Mollie. Herlaad deze pagina over een paar
                seconden, of we sturen u automatisch een e-mail bij afronding.
              </p>
            </>
          ) : (
            <>
              <p className="eyebrow text-[color:var(--color-error)] mb-6">Betaling niet voltooid</p>
              <h1 className="font-serif text-h1">Dat ging niet helemaal goed.</h1>
              <p className="mt-6 text-body text-charcoal-soft">
                Uw betaling is <strong>{status}</strong>. De bestelling is nog niet afgerekend — probeer
                opnieuw of neem contact op als het probleem zich herhaalt.
              </p>
            </>
          )}

          <div className="rule my-10" />

          <p className="eyebrow mb-4">Referentie</p>
          <p className="font-mono text-small text-muted">{order.id}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/shop" className="btn-ghost">Verder winkelen</Link>
            {status !== "paid" && (
              <Link href="/cart" className="btn-primary">Opnieuw proberen</Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
