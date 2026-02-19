import Link from "next/link";

export default function PricingHomePage() {
  return (
    <main id="main-content" className="section">
      <div className="container">
        <h1 className="h1 text-4xl md:text-5xl">Pricing</h1>
        <p className="mt-2 lead max-w-2xl">
          We specialise exclusively in GCSE and A-Level Maths. Choose your
          level to view plans and pricing.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/pricing/gcse"
            className="btn btn-primary btn-md ui-motion hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
          >
            GCSE
          </Link>
          <Link
            href="/pricing/a-level"
            className="btn btn-secondary btn-md ui-motion hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.08)]"
          >
            A-Level
          </Link>
        </div>
      </div>
    </main>
  );
}
