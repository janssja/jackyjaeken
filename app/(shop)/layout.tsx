import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-[88px] md:pt-[120px]">{children}</main>
      <Footer />
    </>
  );
}
