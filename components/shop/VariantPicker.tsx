"use client";

import type { ProductVariant } from "@/lib/types";
import { formatEUR } from "@/lib/format";
import { cn } from "@/lib/cn";

type Props = {
  variants: ProductVariant[];
  basePrice: number;
  selected?: string;
  onChange: (id: string) => void;
};

export function VariantPicker({ variants, basePrice, selected, onChange }: Props) {
  return (
    <div className="space-y-3">
      {variants.map((v) => {
        const isActive = selected === v.id;
        const price = basePrice + v.priceDelta;
        return (
          <button
            key={v.id}
            type="button"
            onClick={() => onChange(v.id)}
            className={cn(
              "w-full text-left border p-5 transition-all",
              isActive ? "border-charcoal bg-cream-deep" : "border-line hover:border-line-strong"
            )}
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-serif text-h3">{v.name}</span>
              <span className="font-sans text-small text-charcoal">{formatEUR(price)} /p.p.</span>
            </div>
            {v.description && (
              <p className="mt-1 text-small text-charcoal-soft">{v.description}</p>
            )}
            {isActive && v.includedItems && (
              <ul className="mt-4 grid gap-1 grid-cols-1 sm:grid-cols-2 text-small text-charcoal-soft">
                {v.includedItems.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-gold">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </button>
        );
      })}
    </div>
  );
}
