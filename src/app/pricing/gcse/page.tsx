import Link from "next/link";
import { Pricing } from "@/components/Pricing";
import { plans } from "@/lib/data";

const gcsePlans = plans.filter((p) => p.badge.startsWith("GCSE") && p.badge.includes("1:1"));

export default function GCSEPricingPage() {
  return (
    <main id="main-content">
      <div className="container flex items-center justify-between gap-3 pt-4 md:pt-6">
        <Link href="/pricing" className="btn btn-ghost btn-sm">
          ← Back to pricing
        </Link>
        <Link href="/pricing/a-level" className="btn btn-ghost btn-sm">
          A-Level pricing →
        </Link>
      </div>
      <Pricing
        items={gcsePlans}
        title="GCSE Pricing"
        description="Currently available: GCSE Traditional Tutoring (1:1). 3 Month and 6 Month plans are In Progress."
      />
    </main>
  );
}
