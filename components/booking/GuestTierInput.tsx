"use client";

import { QtyStepper } from "../shop/QtyStepper";
import { formatEUR } from "@/lib/format";

export type Guests = {
  adult: number;
  youth: number;
  child: number;
  toddler: number;
};

type Props = {
  value: Guests;
  onChange: (next: Guests) => void;
  prices: { adult: number; youth: number; child: number; toddler: number };
};

const tiers: { key: keyof Guests; label: string; age: string }[] = [
  { key: "adult", label: "Volwassenen", age: "vanaf 18 jaar" },
  { key: "youth", label: "Jongeren", age: "12 — 17 jaar" },
  { key: "child", label: "Kinderen", age: "6 — 11 jaar" },
  { key: "toddler", label: "Peuters", age: "3 — 5 jaar" },
];

export function GuestTierInput({ value, onChange, prices }: Props) {
  return (
    <div className="space-y-4">
      {tiers.map((tier) => (
        <div key={tier.key} className="flex items-center justify-between gap-4">
          <div>
            <p className="text-body">{tier.label}</p>
            <p className="text-small text-muted">
              {tier.age} · {formatEUR(prices[tier.key])}
            </p>
          </div>
          <QtyStepper
            value={value[tier.key]}
            min={0}
            onChange={(n) => onChange({ ...value, [tier.key]: n })}
          />
        </div>
      ))}
    </div>
  );
}
