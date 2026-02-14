"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { plans, type Plan } from "@/lib/data";

function PlanCard({ p }: { p: Plan }) {
  const [open, setOpen] = useState(false);
  const hasTerms = Boolean(p.termsTitle && p.terms?.length);

  return (
    <div
      className={[
        "card p-6 flex flex-col",
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

      <p className="mt-2 text-sm text-black/60">{p.details}</p>

      {/* Bullets */}
      <ul className="mt-5 space-y-2 text-sm text-black/75">
        {p.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full bg-black/60" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* Spacer pushes actions to the bottom so all cards align */}
      <div className="mt-auto" />

      {/* Actions: fixed vertical plane across plans */}
      <div className="mt-6 grid gap-3">
        <Link href="/#contact" className="btn btn-primary btn-md w-full">
          Enquire now
        </Link>

        {/* Always render this row to keep alignment consistent */}
        <button
          type="button"
          onClick={() => hasTerms && setOpen((v) => !v)}
          className={[
            "btn btn-ghost btn-md w-full",
            hasTerms ? "" : "pointer-events-none opacity-0", // invisible placeholder keeps spacing
          ].join(" ")}
          aria-expanded={hasTerms ? open : undefined}
        >
          {open ? "Hide terms & conditions" : "View terms & conditions"}
        </button>
      </div>

      {/* Expandable terms */}
      {hasTerms ? (
        <div
          className={[
            "grid transition-all duration-300 ease-out",
            open ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0",
          ].join(" ")}
        >
          <div className="overflow-hidden rounded-2xl bg-black/[0.03] p-4">
            <p className="text-sm font-semibold">{p.termsTitle}</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-black/70">
              {p.terms!.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function Pricing() {
  const items = useMemo(() => plans, []);

  return (
    <section id="pricing" className="section scroll-mt-24">
      <div className="container">
        <h2 className="h2">Pricing plans</h2>
        <p className="mt-2 max-w-2xl lead">
          Choose a plan that matches your timeline. Clear structure, consistent
          accountability, and exam-focused outcomes.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {items.map((p) => (
            <PlanCard key={p.name} p={p} />
          ))}
        </div>

        <div className="mt-8 card p-6">
          <p className="text-sm font-semibold">Free 1-hour taster session</p>
          <p className="mt-1 text-sm text-black/60">
            Meet your tutor, set goals, and get a quick diagnostic on what will
            move your grade fastest.
          </p>
          <Link href="/#contact" className="mt-4 btn btn-ghost btn-md">
            Book the free session
          </Link>
        </div>
      </div>
    </section>
  );
}
