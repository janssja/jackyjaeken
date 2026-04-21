import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatEUR } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const unitLabel =
    product.unit === "per_person" ? "/p.p." : product.unit === "per_box" ? "/box" : "/stuk";
  return (
    <Link
      href={`/shop/${product.categorySlug}/${product.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep">
        <Image
          src={product.heroImage}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.04]"
        />
        {product.minGuests && (
          <span className="absolute top-4 left-4 bg-cream/95 text-charcoal text-eyebrow uppercase tracking-[0.16em] px-3 py-1.5">
            vanaf {product.minGuests}
          </span>
        )}
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-h3 group-hover:text-gold transition-colors">
          {product.title}
        </h3>
        <span className="text-small text-muted shrink-0">
          vanaf {formatEUR(product.basePrice)}
          <span className="text-[0.75rem]">{unitLabel}</span>
        </span>
      </div>
      <p className="mt-2 text-small text-charcoal-soft line-clamp-2">{product.summary}</p>
    </Link>
  );
}
