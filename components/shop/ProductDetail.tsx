"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { formatEUR } from "@/lib/format";
import { VariantPicker } from "./VariantPicker";
import { AddonList } from "./AddonList";
import { QtyStepper } from "./QtyStepper";
import { useCart, newLineId } from "@/lib/cart/store";

export function ProductDetail({
  product,
  addons = [],
}: {
  product: Product;
  addons?: Product[];
}) {
  const addLine = useCart((s) => s.addLine);

  // State per kind
  const [variantId, setVariantId] = useState<string | undefined>(
    product.kind === "tiered" ? product.variants?.[0]?.id : undefined
  );
  const [qty, setQty] = useState<number>(product.minGuests ?? 1);
  const [addonQtys, setAddonQtys] = useState<Record<string, number>>({});
  const [added, setAdded] = useState(false);

  const selectedVariant = useMemo(
    () => product.variants?.find((v) => v.id === variantId),
    [product.variants, variantId]
  );

  const unitPrice = useMemo(() => {
    if (product.kind === "tiered" && selectedVariant) {
      return product.basePrice + selectedVariant.priceDelta;
    }
    return product.basePrice;
  }, [product, selectedVariant]);

  const addonsTotal = useMemo(() => {
    return Object.entries(addonQtys).reduce((acc, [id, q]) => {
      const a = addons.find((x) => x._id === id);
      return acc + (a?.basePrice ?? 0) * q;
    }, 0);
  }, [addonQtys, addons]);

  const total = unitPrice * qty + addonsTotal;

  const minGuests = product.minGuests ?? 1;
  const qtyTooLow = qty < minGuests;

  function handleAdd() {
    if (qtyTooLow) return;

    if (product.kind === "tiered" && selectedVariant) {
      addLine({
        id: newLineId(),
        kind: "product",
        productId: product._id,
        variantId: selectedVariant.id,
        qty,
        unitPrice,
        snapshot: {
          title: product.title,
          variantName: selectedVariant.name,
          image: product.heroImage,
          unit: product.unit,
          minGuests: product.minGuests,
        },
      });
    } else if (product.kind === "box-with-addons") {
      addLine({
        id: newLineId(),
        kind: "box-with-addons",
        productId: product._id,
        qty,
        unitPrice,
        addons: Object.entries(addonQtys)
          .filter(([, q]) => q > 0)
          .map(([id, q]) => {
            const a = addons.find((x) => x._id === id)!;
            return { productId: id, qty: q, unitPrice: a.basePrice, title: a.title };
          }),
        snapshot: { title: product.title, image: product.heroImage },
      });
    } else {
      // fixed
      addLine({
        id: newLineId(),
        kind: "product",
        productId: product._id,
        qty,
        unitPrice,
        snapshot: {
          title: product.title,
          image: product.heroImage,
          unit: product.unit,
          minGuests: product.minGuests,
        },
      });
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
  }

  const unitLabel =
    product.unit === "per_person" ? "personen" : product.unit === "per_box" ? "boxen" : "stuks";

  return (
    <div className="container-content py-section grid gap-12 md:grid-cols-12">
      <div className="md:col-span-6">
        <div className="relative aspect-[4/5] bg-cream-deep overflow-hidden">
          <Image
            src={product.heroImage}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        {product.gallery && product.gallery.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            {product.gallery.map((src) => (
              <div key={src} className="relative aspect-square bg-cream-deep">
                <Image src={src} alt="" fill sizes="25vw" className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="md:col-span-6 md:sticky md:top-[120px] md:self-start">
        <Link
          href={`/shop/${product.categorySlug}`}
          className="eyebrow link-underline"
        >
          ← {product.categorySlug.replace("-", " ")}
        </Link>
        <h1 className="mt-4 font-serif text-h1">{product.title}</h1>
        <p className="mt-4 text-body text-charcoal-soft">{product.summary}</p>

        <div className="rule my-8" />

        {product.kind === "tiered" && product.variants && (
          <div className="mb-8">
            <p className="eyebrow mb-4">Kies een formule</p>
            <VariantPicker
              variants={product.variants}
              basePrice={product.basePrice}
              selected={variantId}
              onChange={setVariantId}
            />
          </div>
        )}

        <div className="flex items-center gap-6 mb-4">
          <QtyStepper
            value={qty}
            onChange={setQty}
            min={1}
            label={`Aantal ${unitLabel}`}
          />
          {product.minGuests && (
            <span className="text-small text-muted">min. {product.minGuests}</span>
          )}
        </div>

        {qtyTooLow && (
          <p className="text-small text-[color:var(--color-error)] mb-4">
            Minimum {minGuests} {unitLabel} voor deze bestelling.
          </p>
        )}

        {product.kind === "box-with-addons" && addons.length > 0 && (
          <div className="mt-8 mb-6">
            <p className="eyebrow mb-3">Extra bijbestellen (optioneel)</p>
            <AddonList addons={addons} value={addonQtys} onChange={setAddonQtys} />
          </div>
        )}

        <div className="flex items-baseline justify-between border-t border-line pt-6 mt-4">
          <span className="eyebrow">Totaal</span>
          <span className="font-serif text-h2">{formatEUR(total)}</span>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={qtyTooLow}
          className="btn-primary w-full mt-6 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {added ? "Toegevoegd ✓" : "In winkelmand"}
        </button>

        <p className="mt-4 text-small text-muted">
          Levertijd: minimum {product.leadTimeDays} dag{product.leadTimeDays > 1 ? "en" : ""} op
          voorhand bestellen.
        </p>

        {product.allergens && product.allergens.length > 0 && (
          <p className="mt-2 text-small text-muted">
            Allergenen: {product.allergens.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}
