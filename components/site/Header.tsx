"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { cn } from "@/lib/cn";
import { useCart } from "@/lib/cart/store";

const navItems = [
  { href: "/diensten", label: "Diensten" },
  { href: "/shop", label: "Webshop" },
  { href: "/zondagbuffet", label: "Zondagbuffet" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
];

export function Header({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const cartCount = useCart((s) => s.lines.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showSolid = !transparent || scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-[background,border,color] duration-500",
        showSolid
          ? "bg-cream/95 backdrop-blur-sm border-b border-line text-charcoal"
          : "bg-transparent text-cream"
      )}
    >
      <div className="container-content flex items-center justify-between h-[72px] md:h-[88px]">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-small uppercase tracking-[0.16em] link-underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-current/30 hover:bg-current/10 transition-colors"
            aria-label={`Winkelmand (${cartCount} items)`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M3 4h2.5l2.2 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20.5 8H7.2" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-gold text-charcoal text-[0.65rem] w-5 h-5">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden p-2 -mr-2"
            aria-label="Open menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="block w-6 h-[1px] bg-current" />
            <span className="block w-6 h-[1px] bg-current mt-1.5" />
            <span className="block w-6 h-[1px] bg-current mt-1.5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-cream border-t border-line text-charcoal">
          <nav className="container-content py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 text-h3 font-serif"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
