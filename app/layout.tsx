import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  variable: "--font-source-serif",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Traiteur Jacky Jaeken — Ambachtelijke catering in Dilsen-Stokkem",
    template: "%s · Traiteur Jacky Jaeken",
  },
  description:
    "Ambachtelijke traiteurdienst en feestzaal in Dilsen-Stokkem. Buffetten, BBQ, koffietafel, babyborrel en zondagbuffet — warme gastvrijheid sinds decennia.",
  openGraph: {
    type: "website",
    locale: "nl_BE",
    siteName: "Traiteur Jacky Jaeken",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${sourceSerif.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
