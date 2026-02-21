import Link from "next/link";
import { Logo } from "./Logo";

const navItems = [
  { label: "Pricing", href: "/pricing" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      <div className="border-b hairline bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        <div className="container flex h-14 items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {navItems.map((i) => (
              <Link key={i.href} href={i.href} className="ui-link">
                {i.label}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <Link href="/pricing" className="btn btn-primary btn-sm">
              Pricing
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
