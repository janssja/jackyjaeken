/**
 * Content loader — single entrypoint for all CMS data.
 *
 * For the prototype this reads from ./fixtures.ts.
 * When Sanity credentials are configured (SANITY_PROJECT_ID set),
 * it would swap to GROQ queries. The shape is identical, so callers
 * don't change.
 */
import {
  categories,
  featuredProducts,
  findCategory,
  findProduct,
  findProductById,
  findService,
  findSlot,
  products,
  productsByCategory,
  services,
  siteSettings,
  zondagbuffetSlots,
} from "./fixtures";
import type { Product, ProductVariant, ZondagbuffetSlot } from "./types";

export const content = {
  siteSettings: () => siteSettings,

  services: () => [...services].sort((a, b) => a.order - b.order),
  service: (slug: string) => findService(slug),

  categories: () => [...categories].sort((a, b) => a.order - b.order),
  category: (slug: string) => findCategory(slug),

  products: () => products,
  productsByCategory: (categorySlug: string) => productsByCategory(categorySlug),
  product: (slug: string) => findProduct(slug),
  productById: (id: string) => findProductById(id),
  featured: () => featuredProducts(),

  slots: () => [...zondagbuffetSlots].sort((a, b) => a.date.localeCompare(b.date)),
  slot: (id: string) => findSlot(id),
};

// --- Server-side re-validation helpers used by /api/checkout ---

export type ServerValidatedLinePrice =
  | { ok: true; unitPrice: number; lineTotal: number; label: string }
  | { ok: false; error: string };

export function validateProductLine(args: {
  productId: string;
  variantId?: string;
  qty: number;
  addons?: { productId: string; qty: number }[];
}): ServerValidatedLinePrice {
  const product = content.productById(args.productId);
  if (!product) return { ok: false, error: "Product niet gevonden" };
  if (!product.available) return { ok: false, error: `${product.title} is niet beschikbaar` };

  if (product.kind === "tiered") {
    const variant = product.variants?.find((v) => v.id === args.variantId);
    if (!variant) return { ok: false, error: `Kies een formule voor ${product.title}` };
    if (product.unit === "per_person" && product.minGuests && args.qty < product.minGuests) {
      return {
        ok: false,
        error: `${product.title} vraagt minstens ${product.minGuests} personen`,
      };
    }
    const unitPrice = product.basePrice + variant.priceDelta;
    return {
      ok: true,
      unitPrice,
      lineTotal: unitPrice * args.qty,
      label: `${product.title} — ${variant.name}`,
    };
  }

  if (product.kind === "box-with-addons") {
    const boxTotal = product.basePrice * args.qty;
    let addonTotal = 0;
    const addonLabels: string[] = [];
    for (const addon of args.addons ?? []) {
      const addonProduct = content.productById(addon.productId);
      if (!addonProduct) return { ok: false, error: "Onbekend supplement" };
      if (addonProduct.minGuests && addon.qty < addonProduct.minGuests) {
        return {
          ok: false,
          error: `${addonProduct.title} vraagt minstens ${addonProduct.minGuests} stuks`,
        };
      }
      addonTotal += addonProduct.basePrice * addon.qty;
      addonLabels.push(`${addon.qty}× ${addonProduct.title}`);
    }
    return {
      ok: true,
      unitPrice: product.basePrice,
      lineTotal: boxTotal + addonTotal,
      label: [product.title, ...addonLabels].join(" + "),
    };
  }

  // fixed
  if (product.unit === "per_person" && product.minGuests && args.qty < product.minGuests) {
    return {
      ok: false,
      error: `${product.title} vraagt minstens ${product.minGuests} personen`,
    };
  }
  if (product.unit === "per_item" && product.minGuests && args.qty < product.minGuests) {
    return {
      ok: false,
      error: `${product.title} vraagt minstens ${product.minGuests} stuks`,
    };
  }
  return {
    ok: true,
    unitPrice: product.basePrice,
    lineTotal: product.basePrice * args.qty,
    label: product.title,
  };
}

export function validateZondagbuffetLine(args: {
  slotId: string;
  guests: { adult: number; youth: number; child: number; toddler: number };
}): ServerValidatedLinePrice {
  const slot = content.slot(args.slotId);
  if (!slot) return { ok: false, error: "Deze zondag is niet langer beschikbaar" };
  if (slot.status !== "open") return { ok: false, error: "Dit zondagbuffet is gesloten" };

  const totalGuests =
    args.guests.adult + args.guests.youth + args.guests.child + args.guests.toddler;
  if (totalGuests === 0) return { ok: false, error: "Kies minstens één gast" };
  if (slot.booked + totalGuests > slot.capacity) {
    return { ok: false, error: `Slechts ${slot.capacity - slot.booked} plaatsen beschikbaar` };
  }

  const lineTotal =
    args.guests.adult * slot.priceAdult +
    args.guests.youth * slot.priceYouth +
    args.guests.child * slot.priceChild +
    args.guests.toddler * slot.priceToddler;

  return {
    ok: true,
    unitPrice: slot.priceAdult,
    lineTotal,
    label: `Zondagbuffet ${new Date(slot.date).toLocaleDateString("nl-BE")}`,
  };
}

export type { Product, ProductVariant, ZondagbuffetSlot };
