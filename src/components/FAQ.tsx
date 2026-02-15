"use client";

import { useState } from "react";
import { faqs } from "@/lib/data";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section scroll-mt-24">
      <div className="container">
        <h2 className="h2">FAQ</h2>
        <p className="mt-2 max-w-2xl lead">
          Clear answers, simple expectations, and high standards.
        </p>

        <div className="mt-8 grid gap-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="card card-hover p-5">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <span className="text-sm font-semibold">{item.q}</span>

                  <span
                    className={[
                      "inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-black/80",
                      "transition-transform duration-300",
                      isOpen ? "rotate-45" : "rotate-0",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  id={`faq-answer-${i}`}
                  className={[
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  ].join(" ")}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  aria-hidden={!isOpen}
                >
                  <div className="overflow-hidden">
                    <p className="mt-3 text-sm leading-relaxed text-black/65">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
