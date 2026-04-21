import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Traiteur Jacky Jaeken — home"
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src="/logo-jacky-jaeken.png"
        alt="Traiteurdienst Jacky Jaeken"
        width={512}
        height={178}
        className="h-10 w-auto md:h-12"
        priority
      />
    </Link>
  );
}
