import { cn } from "@/lib/cn";

type Props = {
  number: string | number;
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function NumberedSection({
  number,
  eyebrow,
  title,
  lead,
  children,
  align = "left",
  className,
}: Props) {
  return (
    <section className={cn("py-section", className)}>
      <div className="container-content">
        <div className={cn("grid gap-12 md:grid-cols-12", align === "center" && "md:gap-8")}>
          <div
            className={cn(
              "md:col-span-4",
              align === "center" && "md:col-span-12 md:text-center"
            )}
          >
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-serif italic text-[2.4rem] text-gold leading-none">
                {String(number).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-line max-w-[120px]" />
            </div>
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            <h2 className="font-serif text-h1 max-w-xl">{title}</h2>
            {lead && (
              <p className="mt-6 text-body text-charcoal-soft max-w-prose">
                {lead}
              </p>
            )}
          </div>

          <div
            className={cn(
              "md:col-span-7 md:col-start-6",
              align === "center" && "md:col-span-12 md:col-start-auto"
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
