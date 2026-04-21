import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/types";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={`/diensten/${service.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep">
        <Image
          src={service.heroImage}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.04]"
        />
        <div className="absolute top-5 left-5 font-serif italic text-cream text-h3 drop-shadow-md">
          {String(index).padStart(2, "0")}
        </div>
      </div>
      <div className="mt-5">
        <h3 className="font-serif text-h2 group-hover:text-gold transition-colors">
          {service.title}
        </h3>
        <p className="mt-3 text-body text-charcoal-soft max-w-prose">{service.summary}</p>
        <span className="mt-4 inline-block text-eyebrow uppercase tracking-[0.16em] text-gold link-underline">
          Ontdek meer →
        </span>
      </div>
    </Link>
  );
}
