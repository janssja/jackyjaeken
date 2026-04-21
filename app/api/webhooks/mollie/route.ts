import { NextResponse } from "next/server";
import { getMollie } from "@/lib/mollie/client";
import {
  updateStatus,
  findOrderByMollieId,
  type OrderStatus,
} from "@/lib/orders/repository";

/**
 * Mollie webhook. Mollie POSTs form-encoded `id=<paymentId>`; we then
 * call `payments.get(id)` to read the authoritative status.
 *
 * On paid: mark paid, stub email confirmation, log. Production would
 * also decrement zondagbuffet slot capacity here.
 */
export async function POST(req: Request) {
  const form = await req.formData();
  const paymentId = String(form.get("id") ?? "");
  if (!paymentId) return NextResponse.json({ ok: false }, { status: 400 });

  const mollie = getMollie();
  if (!mollie) {
    console.warn("[webhook] Mollie not configured, ignoring", paymentId);
    return NextResponse.json({ ok: true });
  }

  try {
    const payment = await mollie.payments.get(paymentId);
    const status = mapStatus(payment.status);
    updateStatus(paymentId, status);

    if (status === "paid") {
      const order = findOrderByMollieId(paymentId);
      console.info(`[webhook] order paid id=${order?.id} total=${payment.amount.value}€`);
      // TODO: send confirmation email (Resend/Nodemailer)
      // TODO: decrement zondagbuffetSlot.booked for any zondagbuffet lines
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[webhook] error", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

function mapStatus(mollieStatus: string): OrderStatus {
  switch (mollieStatus) {
    case "paid": return "paid";
    case "canceled": return "canceled";
    case "expired": return "expired";
    case "failed": return "failed";
    default: return "pending";
  }
}
