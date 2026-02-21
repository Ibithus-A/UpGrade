import Link from "next/link";
import { Pricing } from "@/components/Pricing";
import { plans } from "@/lib/data";

const aLevelPlans = plans.filter((p) => p.badge.startsWith("A-Level"));

export default function ALevelPricingPage() {
  return (
    <main id="main-content">
      <div className="container flex items-center justify-between gap-3 pt-4 md:pt-6">
        <Link href="/pricing" className="btn btn-ghost btn-sm">
          ← Back to services
        </Link>
        <Link href="/pricing/gcse" className="btn btn-ghost btn-sm">
          GCSE services →
        </Link>
      </div>
      <Pricing
        items={aLevelPlans}
        title="A-Level Services"
        description="A-Level Maths plans built for ambitious grade targets and measurable improvement."
      />
    </main>
  );
}
