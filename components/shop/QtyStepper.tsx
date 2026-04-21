"use client";

import { cn } from "@/lib/cn";

type Props = {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
};

export function QtyStepper({ value, onChange, min = 0, max = 999, label, className }: Props) {
  function set(n: number) {
    onChange(Math.max(min, Math.min(max, n)));
  }
  return (
    <div className={cn("flex items-center", className)}>
      {label && <span className="mr-4 text-small text-charcoal-soft">{label}</span>}
      <div className="inline-flex items-center border border-line">
        <button
          type="button"
          onClick={() => set(value - 1)}
          disabled={value <= min}
          aria-label="Verminder"
          className="w-10 h-10 flex items-center justify-center hover:bg-cream-deep disabled:opacity-30 transition-colors"
        >
          −
        </button>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => set(Number(e.target.value) || 0)}
          className="w-12 text-center bg-transparent font-serif text-h3 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={() => set(value + 1)}
          disabled={value >= max}
          aria-label="Verhoog"
          className="w-10 h-10 flex items-center justify-center hover:bg-cream-deep disabled:opacity-30 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
