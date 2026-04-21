import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/shop/ProductDetail";
import { content } from "@/lib/content";

export async function generateStaticParams() {
  return content.products().map((p) => ({
    category: p.categorySlug,
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = content.product(slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const product = content.product(slug);
  if (!product) notFound();

  const addons = (product.addonIds ?? [])
    .map((id) => content.productById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return <ProductDetail product={product} addons={addons} />;
}
