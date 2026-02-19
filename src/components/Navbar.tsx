import Link from "next/link";
import { Logo } from "./Logo";

const navItems = [
  { label: "Courses", href: "/login?next=/courses/a-level-maths/chapter-01%3Fsection%3D1" },
  { label: "Pricing", href: "/pricing" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
  { label: "Portal", href: "/login" },
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
