import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  image: string;
  imageAlt?: string;
  imageSide?: "left" | "right";
  children?: React.ReactNode;
};

export function SplitSection({
  eyebrow,
  title,
  lead,
  image,
  imageAlt = "",
  imageSide = "right",
  children,
}: Props) {
  return (
    <section className="py-section">
      <div className="container-content grid gap-12 md:grid-cols-12 items-center">
        <div
          className={cn(
            "md:col-span-5",
            imageSide === "right" ? "md:col-start-1" : "md:col-start-8 md:row-start-1"
          )}
        >
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h2 className="font-serif text-h1 mb-5">{title}</h2>
          {lead && <p className="text-body text-charcoal-soft max-w-prose">{lead}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
        <div
          className={cn(
            "md:col-span-6 relative aspect-[4/5]",
            imageSide === "right" ? "md:col-start-7" : "md:col-start-1 md:row-start-1"
          )}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
