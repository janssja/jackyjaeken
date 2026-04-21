"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine, CartState } from "./types";
import { lineTotal } from "./pricing";

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      addLine: (line: CartLine) =>
        set((state) => {
          // Merge identical product lines (same productId + variant).
          if (line.kind === "product") {
            const existingIdx = state.lines.findIndex(
              (l) =>
                l.kind === "product" &&
                l.productId === line.productId &&
                l.variantId === line.variantId
            );
            if (existingIdx >= 0) {
              const copy = [...state.lines];
              const existing = copy[existingIdx] as CartLine & { kind: "product" };
              copy[existingIdx] = { ...existing, qty: existing.qty + line.qty };
              return { lines: copy };
            }
          }
          return { lines: [...state.lines, line] };
        }),
      updateQty: (id, qty) =>
        set((state) => ({
          lines: state.lines.map((l) => {
            if (l.id !== id) return l;
            if (l.kind === "zondagbuffet") return l; // qty not applicable
            return { ...l, qty: Math.max(1, qty) };
          }),
        })),
      removeLine: (id) => set((state) => ({ lines: state.lines.filter((l) => l.id !== id) })),
      clear: () => set({ lines: [] }),
      count: () => {
        const lines = get().lines;
        return lines.reduce((acc, l) => {
          if (l.kind === "zondagbuffet") {
            const g = l.guests;
            return acc + g.adult + g.youth + g.child + g.toddler;
          }
          return acc + l.qty;
        }, 0);
      },
      subtotal: () => get().lines.reduce((acc, l) => acc + lineTotal(l), 0),
    }),
    { name: "jj-cart-v1" }
  )
);

/** Stable cart-line id — avoid Date.now() collisions when multiple adds happen in one tick. */
export function newLineId(): string {
  return `ln_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}
