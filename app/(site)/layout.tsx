import { Footer } from "@/components/site/Footer";

// Pages in this route group render their own Header (so the homepage can opt into
// a transparent-over-hero variant while sub-pages use the solid one).
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
