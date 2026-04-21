import type { CartLine } from "./types";

export function lineTotal(line: CartLine): number {
  if (line.kind === "product") {
    return line.unitPrice * line.qty;
  }
  if (line.kind === "box-with-addons") {
    const box = line.unitPrice * line.qty;
    const addons = line.addons.reduce((acc, a) => acc + a.unitPrice * a.qty, 0);
    return box + addons;
  }
  // zondagbuffet
  const g = line.guests;
  const s = line.snapshot;
  return (
    g.adult * s.priceAdult +
    g.youth * s.priceYouth +
    g.child * s.priceChild +
    g.toddler * s.priceToddler
  );
}

export function totalGuests(line: CartLine): number {
  if (line.kind === "zondagbuffet") {
    const g = line.guests;
    return g.adult + g.youth + g.child + g.toddler;
  }
  return 0;
}

export function lineLabel(line: CartLine): string {
  if (line.kind === "product") {
    return line.snapshot.variantName
      ? `${line.snapshot.title} — ${line.snapshot.variantName}`
      : line.snapshot.title;
  }
  if (line.kind === "box-with-addons") {
    return line.snapshot.title;
  }
  const d = new Date(line.date);
  return `Zondagbuffet ${d.toLocaleDateString("nl-BE", { weekday: "long", day: "numeric", month: "long" })}`;
}
