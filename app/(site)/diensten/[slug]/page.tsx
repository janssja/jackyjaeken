import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { content } from "@/lib/content";

export async function generateStaticParams() {
  return content.services().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = content.service(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = content.service(slug);
  if (!service) notFound();

  const allServices = content.services();
  const currentIndex = allServices.findIndex((s) => s.slug === service.slug);
  const next = allServices[(currentIndex + 1) % allServices.length];

  return (
    <>
      <Header transparent />

      <section className="relative min-h-[70vh] flex items-end text-cream">
        <Image
          src={service.heroImage}
          alt={service.title}
          fill
          priority
          sizes="100vw"
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-charcoal/10 -z-10" />
        <div className="container-content py-20 md:py-28">
          <p className="eyebrow text-gold-soft mb-6">
            {String(currentIndex + 1).padStart(2, "0")} · Diensten
          </p>
          <h1 className="font-serif text-display max-w-3xl">{service.title}</h1>
          <p className="mt-6 text-h3 font-serif italic text-cream/85 max-w-2xl">
            {service.summary}
          </p>
        </div>
      </section>

      <section className="py-section">
        <div className="container-content grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <div
              className="rich-text text-body text-charcoal-soft"
              dangerouslySetInnerHTML={{ __html: service.bodyHtml }}
            />
          </div>
          <aside className="md:col-span-4 md:col-start-9">
            <div className="bg-cream-deep p-8">
              <p className="eyebrow text-gold-muted mb-2">Richtprijs</p>
              <p className="font-serif text-h2">{service.priceIndication}</p>

              <div className="rule my-6" />

              <p className="eyebrow mb-3">In detail</p>
              <ul className="space-y-2 text-small">
                {service.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="text-gold">—</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="rule my-6" />

              {service.ctaType === "phone" ? (
                <a href="tel:089563182" className="btn-primary w-full">{service.ctaLabel}</a>
              ) : (
                <Link href="/contact" className="btn-primary w-full">{service.ctaLabel}</Link>
              )}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line py-12">
        <div className="container-content flex flex-wrap items-center justify-between gap-6">
          <Link href="/diensten" className="text-small uppercase tracking-[0.16em] link-underline">
            ← Alle diensten
          </Link>
          {next && (
            <Link
              href={`/diensten/${next.slug}`}
              className="text-right"
            >
              <span className="eyebrow block">Volgende dienst</span>
              <span className="font-serif text-h3 link-underline">{next.title} →</span>
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
