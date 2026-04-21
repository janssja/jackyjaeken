"use client";

import Image from "next/image";
import type { CartLine } from "@/lib/cart/types";
import { lineLabel, lineTotal } from "@/lib/cart/pricing";
import { formatEUR } from "@/lib/format";
import { QtyStepper } from "./QtyStepper";
import { useCart } from "@/lib/cart/store";

export function CartLineRow({ line }: { line: CartLine }) {
  const updateQty = useCart((s) => s.updateQty);
  const removeLine = useCart((s) => s.removeLine);

  const image =
    line.kind === "zondagbuffet"
      ? line.snapshot.image
      : line.kind === "box-with-addons"
      ? line.snapshot.image
      : line.snapshot.image;

  return (
    <div className="grid grid-cols-[80px_1fr_auto] gap-4 py-6">
      <div className="relative aspect-square bg-cream-deep">
        <Image src={image} alt="" fill sizes="80px" className="object-cover" />
      </div>

      <div>
        <p className="font-serif text-h3">{lineLabel(line)}</p>

        {line.kind === "zondagbuffet" && (
          <p className="text-small text-muted mt-1">
            {line.guests.adult} volw · {line.guests.youth} jong · {line.guests.child} kind · {line.guests.toddler} peuter
          </p>
        )}

        {line.kind === "product" && (
          <div className="mt-2">
            <QtyStepper
              value={line.qty}
              min={line.snapshot.minGuests ?? 1}
              onChange={(n) => updateQty(line.id, n)}
            />
          </div>
        )}

        {line.kind === "box-with-addons" && (
          <>
            <div className="mt-2">
              <QtyStepper value={line.qty} min={1} onChange={(n) => updateQty(line.id, n)} />
            </div>
            {line.addons.length > 0 && (
              <ul className="mt-3 text-small text-muted space-y-0.5">
                {line.addons.map((a) => (
                  <li key={a.productId}>
                    + {a.qty}× {a.title} ({formatEUR(a.unitPrice * a.qty)})
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        <button
          type="button"
          onClick={() => removeLine(line.id)}
          className="mt-3 text-small text-muted link-underline"
        >
          Verwijder
        </button>
      </div>

      <div className="text-right">
        <span className="font-serif text-h3">{formatEUR(lineTotal(line))}</span>
      </div>
    </div>
  );
}
