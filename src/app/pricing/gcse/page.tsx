import Link from "next/link";
import { Pricing } from "@/components/Pricing";
import { plans } from "@/lib/data";

const gcsePlans = plans.filter((p) => p.badge.startsWith("GCSE"));

export default function GCSEPricingPage() {
  return (
    <main id="main-content">
      <div className="container flex items-center justify-between gap-3 pt-4 md:pt-6">
        <Link href="/pricing" className="btn btn-ghost btn-sm">
          ← Back to services
        </Link>
        <Link href="/pricing/a-level" className="btn btn-ghost btn-sm">
          A-Level services →
        </Link>
      </div>
      <Pricing
        items={gcsePlans}
        title="GCSE Services"
        description="GCSE Maths plans designed for consistent progress and exam-ready performance."
      />
    </main>
  );
}
