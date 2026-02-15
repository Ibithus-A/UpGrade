"use client";

import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/lib/data";

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "";
  const b = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (a + b).toUpperCase();
}

function Avatar({ name }: { name: string }) {
  const initials = initialsFromName(name);
  return (
    <div className="h-10 w-10 rounded-full bg-black/5 border hairline flex items-center justify-center">
      <span className="text-xs font-semibold text-black/70">{initials}</span>
    </div>
  );
}

export function TestimonialSlider({
  items,
  compact = false,
}: {
  items: Testimonial[];
  compact?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const len = items.length;
  const hasMultiple = len > 1;
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!hasMultiple) return;

    if (timer.current) window.clearInterval(timer.current);
    if (!isHovering) {
      timer.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % len);
      }, 5500);
    }
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [hasMultiple, len, isHovering]);

  function prev() {
    setIndex((i) => (i - 1 + len) % len);
  }
  function next() {
    setIndex((i) => (i + 1) % len);
  }

  if (!len) return null;

  const safeIndex = index % len;
  const current = items[safeIndex];

  return (
    <div
      className={["card", compact ? "p-6" : "p-6 md:p-8"].join(" ")}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Student and parent testimonials"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold">Testimonials</p>
          <p className="mt-1 muted">
            Structure, accountability, and exam-focused practice — delivered
            consistently.
          </p>
        </div>

        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={prev}
            className="btn btn-ghost btn-sm"
            aria-label="Previous testimonial"
            disabled={!hasMultiple}
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            className="btn btn-ghost btn-sm"
            aria-label="Next testimonial"
            disabled={!hasMultiple}
          >
            →
          </button>
        </div>
      </div>

      <div className="mt-6">
        <div key={index} className="animate-fadeUp min-h-[160px]" aria-live="polite">
          <p className="text-[17px] leading-relaxed md:text-lg">
            “{current.quote}”
          </p>

          <div className="mt-5 flex items-center gap-3">
            <Avatar name={current.name} />
            <div>
              <p className="text-sm font-semibold">{current.name}</p>
              <p className="muted text-sm">{current.role}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex gap-1.5">
            {items.map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setIndex(i)}
                className={[
                  "h-2 w-2 rounded-full",
                  "transition-opacity duration-200",
                  i === safeIndex
                    ? "bg-black opacity-100"
                    : "bg-black/20 opacity-70 hover:opacity-100",
                ].join(" ")}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === safeIndex}
              />
            ))}
          </div>

          <div className="flex gap-2 sm:hidden">
            <button
              type="button"
              onClick={prev}
              className="btn btn-ghost btn-sm"
              aria-label="Previous testimonial"
              disabled={!hasMultiple}
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              className="btn btn-ghost btn-sm"
              aria-label="Next testimonial"
              disabled={!hasMultiple}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
