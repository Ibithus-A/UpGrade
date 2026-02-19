import Link from "next/link";
import { Pricing } from "@/components/Pricing";
import { plans } from "@/lib/data";

const aLevelPlans = plans.filter((p) => p.badge.startsWith("A-Level") && p.badge.includes("1:1"));

export default function ALevelPricingPage() {
  return (
    <main id="main-content">
      <div className="container flex items-center justify-between gap-3 pt-4 md:pt-6">
        <Link href="/pricing" className="btn btn-ghost btn-sm">
          ← Back to pricing
        </Link>
        <Link href="/pricing/gcse" className="btn btn-ghost btn-sm">
          GCSE pricing →
        </Link>
      </div>
      <Pricing
        items={aLevelPlans}
        title="A-Level Pricing"
        description="Currently available: A-Level Traditional Tutoring (1:1). 3 Month and 6 Month plans are In Progress."
      />
    </main>
  );
}
