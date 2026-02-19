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
          <Link href="/pricing/gcse" className="btn btn-primary btn-md">
            GCSE
          </Link>
          <Link href="/pricing/a-level" className="btn btn-secondary btn-md">
            A-Level
          </Link>
        </div>
      </div>
    </main>
  );
}
