import Link from "next/link";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { FAQ } from "@/components/FAQ";
import { ContactForm } from "@/components/ContactForm";
import { faqs, testimonials } from "@/lib/data";
import { siteConfig } from "@/lib/site";

const steps = [
  { title: "Teach", desc: "Clear explanations & examples" },
  { title: "Practise", desc: "Targeted questions for accuracy" },
  { title: "Exam Questions", desc: "Timed exam practice per section" },
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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    areaServed: "United Kingdom",
    knowsAbout: ["GCSE Mathematics", "A-Level Mathematics"],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero */}
      <section className="section">
        <div className="container">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
            <div className="min-w-0 flex-1">
              <p className="kicker">Premium Maths Tuition • GCSE & A-Level</p>

              <h1 className="mt-4 h1">
                Upgrade your grades with{" "}
                <span className="text-black/70">structured</span>, exam-focused
                lessons.
              </h1>

              <p className="mt-4 lead max-w-xl">
                UpGrade delivers a clean, high-standards approach: clear
                teaching, consistent accountability, and exam questions for
                every topic. We specialise exclusively in GCSE and A-Level Maths.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#contact"
                  className="btn btn-primary btn-lg w-full sm:w-auto"
                >
                  Book Your Free Call
                </Link>
                <Link
                  href="/pricing"
                  className="btn btn-secondary btn-lg w-full sm:w-auto ui-motion hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.08)]"
                >
                  View Pricing
                </Link>
              </div>

              <div className="mt-8">
                <div className="card card-hover p-4">
                  <p className="font-semibold">Exam Boards</p>
                  <p className="mt-1 muted text-sm">AQA • Edexcel • OCR</p>
                </div>
              </div>
            </div>

            {/* Method */}
            <div className="card min-w-0 flex-1 overflow-hidden p-6 md:p-8">
              <p className="text-sm font-semibold">The UpGrade Method</p>

              {/* Vertical flowchart only */}
              <div className="mt-5 flex flex-col gap-3">
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
                <p className="text-sm font-semibold">Built for Results</p>
                <p className="mt-1 muted text-sm">
                  Premium support, simple systems, consistent execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section scroll-mt-24">
        <div className="container">
          <h2 className="sr-only">Testimonials</h2>
          <TestimonialSlider items={testimonials} />
          <div className="mt-6">
            <Link href="/testimonials" className="btn btn-ghost btn-md">
              View all testimonials →
            </Link>
          </div>
        </div>
      </section>

      <section id="courses" className="section scroll-mt-24">
        <div className="container">
          <div className="card p-6 md:p-8">
            <p className="text-sm font-semibold">Courses</p>
            <p className="mt-2 text-sm text-black/65">Coming soon..</p>
          </div>
        </div>
      </section>

      <FAQ />
      <ContactForm />
    </main>
  );
}
