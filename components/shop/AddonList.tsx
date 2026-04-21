"use client";

import type { Product } from "@/lib/types";
import { formatEUR } from "@/lib/format";
import { QtyStepper } from "./QtyStepper";

type AddonValue = Record<string, number>; // productId → qty

type Props = {
  addons: Product[];
  value: AddonValue;
  onChange: (next: AddonValue) => void;
};

export function AddonList({ addons, value, onChange }: Props) {
  return (
    <div className="divide-y divide-line">
      {addons.map((addon) => {
        const qty = value[addon._id] ?? 0;
        return (
          <div key={addon._id} className="py-4 flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="font-serif text-body">{addon.title}</p>
              <p className="text-small text-muted">
                {formatEUR(addon.basePrice)} /stuk
                {addon.minGuests ? ` · min. ${addon.minGuests}` : ""}
              </p>
            </div>
            <QtyStepper
              value={qty}
              min={0}
              onChange={(n) => {
                const next = { ...value };
                if (n === 0) delete next[addon._id];
                else next[addon._id] = n;
                onChange(next);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
