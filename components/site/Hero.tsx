import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type HeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  image: string;
  imageAlt?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  align?: "left" | "center";
  height?: "tall" | "regular";
};

export function Hero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = "",
  primaryCta,
  secondaryCta,
  align = "left",
  height = "tall",
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative flex items-end text-cream",
        height === "tall" ? "min-h-[88vh]" : "min-h-[60vh]"
      )}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/45 to-charcoal/25 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/45 to-transparent z-10" />

      <div
        className={cn(
          "container-content py-20 md:py-32 relative z-20",
          align === "center" && "text-center"
        )}
      >
        <div className={cn(align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl")}>
          {eyebrow && (
            <p className="eyebrow text-gold-soft mb-6 fade-in">{eyebrow}</p>
          )}
          <h1 className="font-serif text-display fade-in-up text-cream">
            {title}
          </h1>
          {subtitle && (
            <div className="mt-6 text-h3 font-serif italic text-cream/85 max-w-xl fade-in-up">
              {subtitle}
            </div>
          )}
          {(primaryCta || secondaryCta) && (
            <div className={cn(
              "mt-10 flex flex-wrap gap-4 fade-in-up",
              align === "center" && "justify-center"
            )}>
              {primaryCta && (
                <Link href={primaryCta.href} className="btn-gold">
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="btn-ghost border-cream/40 text-cream hover:bg-cream/10"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
