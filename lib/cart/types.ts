export type ProductCartLine = {
  id: string; // cart-local unique id
  kind: "product";
  productId: string;
  variantId?: string;
  qty: number;
  /** snapshot of price at add-time (revalidated server-side) */
  unitPrice: number;
  snapshot: {
    title: string;
    variantName?: string;
    image: string;
    unit: "per_person" | "per_box" | "per_item";
    minGuests?: number;
  };
};

export type BoxCartLine = {
  id: string;
  kind: "box-with-addons";
  productId: string;
  qty: number;
  unitPrice: number;
  addons: { productId: string; qty: number; unitPrice: number; title: string }[];
  snapshot: { title: string; image: string };
};

export type ZondagbuffetCartLine = {
  id: string;
  kind: "zondagbuffet";
  slotId: string;
  date: string;
  guests: { adult: number; youth: number; child: number; toddler: number };
  snapshot: {
    image: string;
    priceAdult: number;
    priceYouth: number;
    priceChild: number;
    priceToddler: number;
  };
};

export type CartLine = ProductCartLine | BoxCartLine | ZondagbuffetCartLine;

export type CartState = {
  lines: CartLine[];
  addLine: (line: CartLine) => void;
  updateQty: (id: string, qty: number) => void;
  removeLine: (id: string) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

export type CustomerDetails = {
  name: string;
  email: string;
  phone: string;
  notes?: string;
  fulfillment:
    | { type: "pickup"; date: string }
    | { type: "delivery"; date: string; address: string; postal: string; city: string };
};
