import Link from "next/link";
import { content } from "@/lib/content";

export function Footer() {
  const s = content.siteSettings();
  return (
    <footer className="bg-charcoal text-cream mt-section">
      <div className="container-content py-section grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-h2 leading-tight max-w-md">
            {s.tagline}.<br />
            <span className="text-gold-soft italic">Warm ontvangen, zorgvuldig bereid.</span>
          </p>
        </div>
        <div>
          <h4 className="eyebrow text-gold-soft mb-4">Bezoek</h4>
          <address className="not-italic text-body text-cream/80 leading-relaxed">
            {s.address.street}
            <br />
            {s.address.postal} {s.address.city}
            <br />
            {s.address.country}
          </address>
          <div className="mt-6 space-y-1 text-body text-cream/80">
            <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="block link-underline">
              {s.phone}
            </a>
            <a href={`mailto:${s.email}`} className="block link-underline">
              {s.email}
            </a>
          </div>
        </div>
        <div>
          <h4 className="eyebrow text-gold-soft mb-4">Zo vindt u ons</h4>
          <ul className="space-y-1 text-body text-cream/80">
            {s.openingHours.map((h) => (
              <li key={h.day} className="flex justify-between max-w-[220px]">
                <span>{h.day}</span>
                <span className="text-cream/60 ml-4">{h.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="container-content py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-small text-cream/60">
          <p>© {new Date().getFullYear()} {s.name}</p>
          <div className="flex items-center gap-6">
            <Link href="/algemene-voorwaarden" className="link-underline">Voorwaarden</Link>
            <Link href="/privacy" className="link-underline">Privacy</Link>
            <Link href="/partners" className="link-underline">Partners</Link>
            <Link href="/vacatures" className="link-underline">Vacatures</Link>
          </div>
          <div className="flex gap-4">
            {s.social.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
