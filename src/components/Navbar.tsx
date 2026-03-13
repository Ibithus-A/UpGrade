import { Logo } from "./Logo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      <div className="border-b hairline bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        <div className="container flex h-14 items-center">
          <Logo />
        </div>
      </div>
    </header>
  );
}
