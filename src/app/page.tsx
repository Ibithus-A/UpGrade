import Link from "next/link";
import { Pricing } from "@/components/Pricing";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { FAQ } from "@/components/FAQ";
import { ContactForm } from "@/components/ContactForm";
import { testimonials } from "@/lib/data";

const steps = [
  { title: "Teach", desc: "Clear explanations & examples" },
  { title: "Practise", desc: "Targeted questions for accuracy" },
  { title: "Exam questions", desc: "Timed exam practice per section" },
  { title: "Track", desc: "Progress checks & accountability" },
];

function FlowStep({
  title,
  desc,
  isLast,
}: {
  title: string;
  desc: string;
  isLast?: boolean;
}) {
  return (
    <div className="relative pl-7">
      {/* Dot */}
      <span className="absolute left-0 top-[14px] h-3 w-3 rounded-full bg-black/20" />

      {/* Connector line */}
      {!isLast ? (
        <span className="absolute left-[5px] top-[26px] h-[calc(100%-16px)] w-px bg-black/10" />
      ) : null}

      <div className="min-w-0 rounded-3xl bg-black/[0.03] border hairline p-4">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-[13px] text-black/60 truncate">{desc}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="section">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="kicker">Premium STEM tuition • GCSE & A-Level</p>

              <h1 className="mt-4 h1">
                Upgrade your grades with{" "}
                <span className="text-black/70">structured</span>, exam-focused
                lessons.
              </h1>

              <p className="mt-4 lead max-w-xl">
                UpGrade delivers a clean, high-standards approach: clear
                teaching, consistent accountability, and exam questions for
                every topic.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/#contact"
                  className="btn btn-primary btn-lg w-full sm:w-auto"
                >
                  Book free 1-hour session
                </Link>
                <Link
                  href="/#pricing"
                  className="btn btn-secondary btn-lg w-full sm:w-auto"
                >
                  View pricing
                </Link>
              </div>

              <div className="mt-8">
                <div className="card card-hover p-4">
                  <p className="font-semibold">Exam boards</p>
                  <p className="mt-1 muted text-sm">AQA • Edexcel • OCR</p>
                </div>
              </div>
            </div>

            {/* Method */}
            <div className="card p-6 md:p-8 overflow-hidden">
              <p className="text-sm font-semibold">The UpGrade method</p>

              {/* Vertical flowchart only */}
              <div className="mt-5 grid gap-3">
                {steps.map((s, idx) => (
                  <FlowStep
                    key={s.title}
                    title={s.title}
                    desc={s.desc}
                    isLast={idx === steps.length - 1}
                  />
                ))}
              </div>

              <div className="mt-6 rounded-3xl bg-black/[0.03] p-4">
                <p className="text-sm font-semibold">Built for results</p>
                <p className="mt-1 muted text-sm">
                  Premium support, simple systems, consistent execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Pricing />

      {/* Testimonials */}
      <section id="testimonials" className="section scroll-mt-24">
        <div className="container">
          <TestimonialSlider items={testimonials} />
          <div className="mt-6">
            <Link href="/testimonials" className="btn btn-ghost btn-md">
              View all testimonials →
            </Link>
          </div>
        </div>
      </section>

      <FAQ />
      <ContactForm />
    </main>
  );
}
