// Core domain types — shared between fixtures, Sanity data, and the cart.

export type ProductKind = "fixed" | "tiered" | "box-with-addons";
export type ProductUnit = "per_person" | "per_box" | "per_item";

export type ProductVariant = {
  id: string;
  name: string;
  description?: string;
  /** EUR, added to basePrice */
  priceDelta: number;
  includedItems?: string[];
};

export type Product = {
  _id: string;
  kind: ProductKind;
  categorySlug: "bbq" | "broodjes-boxen" | "food-boxes" | "losse-broodjes";
  slug: string;
  title: string;
  summary: string;
  heroImage: string;
  gallery?: string[];
  bodyHtml?: string;
  basePrice: number;
  unit: ProductUnit;
  minGuests?: number;
  leadTimeDays: number;
  available: boolean;
  variants?: ProductVariant[];
  /** Add-on product IDs referenced by box-with-addons */
  addonIds?: string[];
  allergens?: string[];
  featured?: boolean;
};

export type Category = {
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  order: number;
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
  heroImage: string;
  features: string[];
  priceIndication: string;
  bodyHtml: string;
  ctaLabel: string;
  /** phone, email, or internal route */
  ctaType: "contact" | "phone";
  order: number;
};

export type ZondagbuffetSlot = {
  _id: string;
  /** ISO date (a Sunday) */
  date: string;
  capacity: number;
  booked: number;
  priceAdult: number;
  priceYouth: number;
  priceChild: number;
  priceToddler: number;
  menuHtml: string;
  status: "open" | "full" | "closed";
};

export type SiteSettings = {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    postal: string;
    country: string;
  };
  openingHours: { day: string; hours: string }[];
  social: { label: string; url: string }[];
};
