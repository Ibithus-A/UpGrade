import Link from "next/link";
import { plans, type Plan } from "@/lib/data";

function PlanCard({
  p,
  contactHref,
}: {
  p: Plan;
  contactHref: string;
}) {
  return (
    <div
      className={[
        "card h-full p-6 flex flex-col",
        p.highlighted ? "ring-1 ring-black/10" : "",
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{p.name}</p>
          <p className="text-xs text-black/55">{p.badge}</p>
        </div>

        {p.highlighted && (
          <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/80">
            Most popular
          </span>
        )}
      </div>

      {/* Price */}
      <div className="mt-5 flex items-end gap-2">
        <p className="text-3xl font-semibold tracking-[-0.03em]">{p.price}</p>
        <p className="pb-1 text-sm text-black/55">{p.cadence}</p>
      </div>

      <p className="mt-2 text-sm text-black/60">
        {p.badge.includes("1:1") ? "1:1 Tutoring" : "Structured Tutorial Format"}
      </p>

      {/* Bullets */}
      <ul className="mt-5 space-y-2 text-sm text-black/75">
        {p.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full bg-black/60" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* Spacer pushes action buttons to the bottom so all cards align */}
      <div className="mt-auto" />

      {/* Actions: fixed vertical plane across plans */}
      <div className="mt-6 flex min-h-[52px] flex-col gap-3">
        <Link
          href={contactHref}
          className="btn btn-primary btn-md h-11 min-h-11 w-full whitespace-nowrap leading-none ui-motion hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
        >
          Book your Call
        </Link>
      </div>
    </div>
  );
}

export function Pricing({
  items = plans,
  title = "Pricing plans",
  description = "Choose a plan that matches your timeline. Clear structure, consistent accountability, and exam-focused outcomes for GCSE and A-Level Maths only.",
  contactHref = "/#contact",
}: {
  items?: Plan[];
  title?: string;
  description?: string;
  contactHref?: string;
}) {
  return (
    <section id="pricing" className="scroll-mt-24 pt-4 pb-16 md:pt-6 md:pb-20">
      <div className="container">
        <h2 className="h2">{title}</h2>
        <p className="mt-2 max-w-2xl lead">{description}</p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <div key={p.name} className="flex min-w-0">
              <PlanCard p={p} contactHref={contactHref} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
