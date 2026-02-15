"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const navItems = [
  { label: "Pricing", href: "/#pricing" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
  { label: "Portal", href: "/login" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={[
          "border-b hairline bg-white/70 backdrop-blur",
          scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.08)]" : "",
        ].join(" ")}
      >
        <div className="container flex h-14 items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {navItems.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="text-[13px] text-black/70 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-md px-1"
              >
                {i.label}
              </Link>
            ))}
            <Link href="/login" className="btn btn-primary btn-sm">
              Sign in
            </Link>
          </nav>

          <div className="md:hidden">
            <Link href="/login" className="btn btn-primary btn-sm">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
