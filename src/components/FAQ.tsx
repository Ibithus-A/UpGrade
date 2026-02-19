import { faqs } from "@/lib/data";

export function FAQ() {
  return (
    <section id="faq" className="section scroll-mt-24">
      <div className="container">
        <h2 className="h2">FAQ</h2>
        <p className="mt-2 max-w-2xl lead">
          Clear answers, simple expectations, and high standards.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          {faqs.map((item, i) => {
            return (
              <details key={item.q} className="card card-hover group p-5" open={i === 0}>
                <summary
                  className="flex cursor-pointer list-none items-center justify-between gap-4 text-left marker:content-none"
                  id={`faq-question-${i}`}
                >
                  <span className="text-sm font-semibold">{item.q}</span>
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-black/80 transition-transform ui-motion group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div
                  id={`faq-answer-${i}`}
                  className="overflow-hidden transition-all ui-motion group-open:mt-3"
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                >
                  <p className="text-sm leading-relaxed text-black/65">{item.a}</p>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
