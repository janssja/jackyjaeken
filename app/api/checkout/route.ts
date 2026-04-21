import { NextResponse } from "next/server";
import { z } from "zod";
import {
  validateProductLine,
  validateZondagbuffetLine,
} from "@/lib/content";
import { createOrder, attachMolliePayment } from "@/lib/orders/repository";
import { getMollie } from "@/lib/mollie/client";
import { env } from "@/lib/env";

const productLine = z.object({
  id: z.string(),
  kind: z.literal("product"),
  productId: z.string(),
  variantId: z.string().optional(),
  qty: z.number().int().positive(),
  unitPrice: z.number(),
  snapshot: z.any(),
});

const boxLine = z.object({
  id: z.string(),
  kind: z.literal("box-with-addons"),
  productId: z.string(),
  qty: z.number().int().positive(),
  unitPrice: z.number(),
  addons: z.array(
    z.object({
      productId: z.string(),
      qty: z.number().int().positive(),
      unitPrice: z.number(),
      title: z.string(),
    })
  ),
  snapshot: z.any(),
});

const zondagbuffetLine = z.object({
  id: z.string(),
  kind: z.literal("zondagbuffet"),
  slotId: z.string(),
  date: z.string(),
  guests: z.object({
    adult: z.number().int().min(0),
    youth: z.number().int().min(0),
    child: z.number().int().min(0),
    toddler: z.number().int().min(0),
  }),
  snapshot: z.any(),
});

const bodySchema = z.object({
  lines: z.array(z.discriminatedUnion("kind", [productLine, boxLine, zondagbuffetLine])).min(1),
  customer: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    notes: z.string().optional(),
  }),
  fulfillment: z.discriminatedUnion("type", [
    z.object({ type: z.literal("pickup"), date: z.string() }),
    z.object({
      type: z.literal("delivery"),
      date: z.string(),
      address: z.string(),
      postal: z.string(),
      city: z.string(),
    }),
  ]),
});

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = bodySchema.parse(await req.json());
  } catch (err) {
    return NextResponse.json(
      { error: "Ongeldige bestelgegevens", detail: String(err) },
      { status: 400 }
    );
  }

  // Server-side price revalidation — never trust client prices
  let totalCents = 0;
  const validatedLines: { id: string; label: string; amount: number }[] = [];
  for (const line of parsed.lines) {
    if (line.kind === "product" || line.kind === "box-with-addons") {
      const check = validateProductLine({
        productId: line.productId,
        variantId: line.kind === "product" ? line.variantId : undefined,
        qty: line.qty,
        addons: line.kind === "box-with-addons" ? line.addons : undefined,
      });
      if (!check.ok) return NextResponse.json({ error: check.error }, { status: 400 });
      totalCents += Math.round(check.lineTotal * 100);
      validatedLines.push({ id: line.id, label: check.label, amount: check.lineTotal });
    } else {
      const check = validateZondagbuffetLine({
        slotId: line.slotId,
        guests: line.guests,
      });
      if (!check.ok) return NextResponse.json({ error: check.error }, { status: 400 });
      totalCents += Math.round(check.lineTotal * 100);
      validatedLines.push({ id: line.id, label: check.label, amount: check.lineTotal });
    }
  }

  if (totalCents < 100) {
    return NextResponse.json({ error: "Minimumbedrag niet bereikt" }, { status: 400 });
  }

  // Persist order as pending
  const order = createOrder({
    amountCents: totalCents,
    customer: parsed.customer,
    lines: parsed.lines,
    fulfillment: parsed.fulfillment,
  });

  // Try Mollie; fall back to dev bypass if not configured
  const mollie = getMollie();
  if (!mollie) {
    console.info(
      `[checkout] Mollie not configured, dev bypass order=${order.id} total=${formatCents(totalCents)}`
    );
    return NextResponse.json({
      devBypass: true,
      orderId: order.id,
      token: order.token,
      total: totalCents / 100,
    });
  }

  const siteUrl = env.NEXT_PUBLIC_SITE_URL;
  const redirectUrl = `${siteUrl}/checkout/success?token=${order.token}`;
  const webhookUrl = env.PUBLIC_WEBHOOK_URL
    ? `${env.PUBLIC_WEBHOOK_URL}/api/webhooks/mollie`
    : undefined;

  try {
    const payment = await mollie.payments.create({
      amount: { currency: "EUR", value: (totalCents / 100).toFixed(2) },
      description: `Traiteur Jacky Jaeken · ${order.id}`,
      redirectUrl,
      webhookUrl,
      metadata: { orderId: order.id, token: order.token },
    });

    attachMolliePayment(order.id, payment.id);

    const checkoutUrl = payment.getCheckoutUrl();
    if (!checkoutUrl) {
      return NextResponse.json(
        { error: "Mollie gaf geen betalingslink terug" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      checkoutUrl,
      orderId: order.id,
      token: order.token,
    });
  } catch (err) {
    console.error("[checkout] Mollie error", err);
    return NextResponse.json(
      { error: "Betaling kon niet gestart worden. Probeer opnieuw of bel ons." },
      { status: 500 }
    );
  }
}

function formatCents(c: number) {
  return `${(c / 100).toFixed(2)}`;
}
