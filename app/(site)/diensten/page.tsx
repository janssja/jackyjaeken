import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { ServiceCard } from "@/components/site/ServiceCard";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: "Onze diensten",
  description: "Buffetten, BBQ, koffietafel, babyborrel, feestzaal en meer. Zeven diensten, één traiteurdienst.",
};

export default function DienstenPage() {
  const services = content.services();
  return (
    <>
      <Header />
      <section className="pt-[88px] md:pt-[120px] pb-section">
        <div className="container-content">
          <p className="eyebrow mb-6">Aanbod</p>
          <h1 className="font-serif text-display max-w-4xl">
            Zeven diensten, <em className="italic text-gold">één traiteurdienst</em>.
          </h1>
          <p className="mt-8 text-body text-charcoal-soft max-w-prose">
            Elk moment verdient de juiste aandacht. Hieronder ziet u wat we doen — klik door voor
            details, inclusies en richtprijzen. Voor alle diensten stellen we graag een offerte op
            maat op.
          </p>
        </div>
      </section>

      <section className="pb-section">
        <div className="container-content grid gap-12 sm:grid-cols-2 md:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i + 1} />
          ))}
        </div>
      </section>
    </>
  );
}
