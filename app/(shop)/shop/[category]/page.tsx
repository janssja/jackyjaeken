import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/shop/ProductCard";
import { content } from "@/lib/content";

export async function generateStaticParams() {
  return content.categories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = content.category(category);
  return cat ? { title: cat.title, description: cat.description } : {};
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = content.category(category);
  if (!cat) notFound();

  const products = content.productsByCategory(category);

  return (
    <>
      <section className="pb-section">
        <div className="container-content">
          <Link href="/shop" className="eyebrow link-underline">← Webshop</Link>
          <h1 className="mt-6 font-serif text-display max-w-3xl">{cat.title}</h1>
          <p className="mt-6 text-body text-charcoal-soft max-w-prose">{cat.description}</p>
        </div>
      </section>

      <section className="pb-section">
        <div className="container-content grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
        {products.length === 0 && (
          <div className="container-content">
            <p className="text-body text-muted">Geen producten in deze categorie.</p>
          </div>
        )}
      </section>
    </>
  );
}
