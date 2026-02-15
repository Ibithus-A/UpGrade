"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const navItems = [
  { label: "Courses", href: "/login?next=/courses/a-level-maths" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
  { label: "Portal", href: "/login" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    router.prefetch("/courses/a-level-maths");
    router.prefetch("/login");
    router.prefetch("/student");
    router.prefetch("/tutor");
  }, [router]);

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
                className="ui-link"
                scroll={i.href.includes("#")}
              >
                {i.label}
              </Link>
            ))}
            <Link href="/login" className="btn btn-primary btn-sm" scroll={false}>
              Sign in
            </Link>
          </nav>

          <div className="md:hidden">
            <Link href="/login" className="btn btn-primary btn-sm" scroll={false}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
