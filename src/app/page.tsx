import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { VideoTestimonialSlider } from "@/components/VideoTestimonialSlider";
import { FAQ } from "@/components/FAQ";
import { ContactForm } from "@/components/ContactForm";
import { faqs } from "@/lib/data";
import { siteConfig } from "@/lib/site";

const textMessageTestimonials = [
  { name: "Salman", level: "GCSE Maths", src: "/testimonials/Salman Testimony.png" },
  { name: "Saptansu", level: "A-Level Maths", src: "/testimonials/Saptansu Testimony.png" },
  { name: "Desmond", level: "A-Level Maths", src: "/testimonials/Desmond Testimony.png" },
  { name: "Adrianna", level: "GCSE Maths", src: "/testimonials/Adrianna Testimony.png" },
  { name: "Anika", level: "GCSE Maths", src: "/testimonials/Anika Testimony.png" },
  { name: "Leila", level: "GCSE Maths", src: "/testimonials/Leila Testimony.png" },
  { name: "Daniel", level: "A-Level Maths", src: "/testimonials/Daniel Testimony.png" },
  { name: "Eric", level: "A-Level Maths", src: "/testimonials/Eric Testimony.png" },
  { name: "Arren", level: "A-Level Maths", src: "/testimonials/Arren Testimony.png" },
];

const videoTestimonials = [
  {
    name: "Saptansu",
    role: "A-Level Maths Student",
    label: "Student video",
    videoSrc: "/Video%20Testimony/Saptansu%20Video%20Testimony.MOV",
    summary:
      "Saptansu reflects on how a clear A-Level roadmap, precise tutor guidance, and stronger exam confidence helped him turn consistent effort into real results.",
  },
  {
    name: "Desmond",
    role: "A-Level Maths Student",
    label: "Student video",
    videoSrc: "/Video%20Testimony/Desmond%20Video%20Testimony.MOV",
    summary:
      "Desmond talks through the structure behind his progress: focused teaching, a personalised plan for improvement, and the confidence to perform under exam pressure.",
  },
  {
    name: "Adrianna",
    role: "GCSE Maths Student",
    label: "Student video",
    videoSrc: "/Video%20Testimony/Adrianna%20Video%20Testimony.MP4",
    summary:
      "Adrianna shares how expert GCSE support, a step-by-step strategy, and consistent encouragement helped her approach Maths with more clarity and belief.",
  },
  {
    name: "Eesha",
    role: "Guardian",
    label: "Guardian video",
    videoSrc: "/Video%20Testimony/Eesha%20Video%20Testimony.MOV",
    summary:
      "Eesha explains the guardian perspective: visible structure, tailored academic direction, and the confidence-building support that made progress feel dependable.",
  },
];

const guaranteeCards = [
  {
    step: "01",
    title: "Expert Guidance from Proven STEM Tutors",
    body:
      "Students are supported by tutors with a strong track record in GCSE and A-Level Maths, combining technical clarity with focused, high-accountability delivery.",
  },
  {
    step: "02",
    title: "Personalised Roadmap To Achieving an A*",
    body:
      "Every student follows a structured plan built around their current level, target grade, and timeline, so revision stays efficient, measurable, and exam-led.",
  },
  {
    step: "03",
    title: "Mindset and Confidence Coaching",
    body:
      "We build exam resilience, sharper decision-making, and consistency under pressure so students can perform with confidence when it matters most.",
  },
];

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

      <section className="section">
        <div className="container">
          <Reveal className="mx-auto max-w-5xl">
            <div className="flex flex-col items-center text-center">
              <div className="max-w-full rounded-full border border-black px-4 py-3 text-center text-[11px] font-semibold uppercase leading-tight tracking-[0.12em] text-black/80 sm:px-10 sm:text-[13px] sm:tracking-[0.14em]">
                Only for parents of committed GCSE or A-Level students
              </div>

              <h1 className="mt-8 max-w-5xl text-balance text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
                We help GCSE &amp; A Level Maths students achieve an A / A* in 100
                days for competitive degrees like Medicine, Engineering,
                Economics, Maths &amp; Computer Science, or we work for free until
                you do.
              </h1>

              <div className="card mt-10 w-full overflow-hidden p-3 md:p-4">
                <div className="flex aspect-video w-full items-center justify-center rounded-[1.5rem] bg-black text-center text-white">
                  <div className="max-w-md px-6">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/12 text-2xl">
                      ▶
                    </div>
                    <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                      VSL Placeholder
                    </p>
                    <p className="mt-3 text-balance text-[17px] leading-relaxed text-white/85 md:text-lg">
                      Replace this panel with your embedded VSL video.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="testimonials" className="section scroll-mt-24">
        <div className="container">
          <Reveal className="mx-auto max-w-4xl text-center">
            <h2 className="mx-auto max-w-3xl text-balance text-2xl font-semibold tracking-[-0.03em] md:text-4xl">
              Hear how Excelora Empowered our Students
            </h2>
            <p className="mt-3 lead">
              Video proof and direct messages from students and parents who
              experienced the structure first-hand.
            </p>
          </Reveal>

          <Reveal className="mx-auto mt-8 max-w-5xl" delay={80}>
            <VideoTestimonialSlider items={videoTestimonials} />
          </Reveal>

          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-2 xl:grid-cols-3">
            {textMessageTestimonials.map((testimonial, index) => (
              <Reveal
                key={testimonial.name}
                delay={index * 50}
                className="h-full"
              >
                <article className="card card-hover flex h-full flex-col p-6 ring-1 ring-black/8">
                  <div className="overflow-hidden rounded-[1.5rem] border border-black/10 bg-black/[0.03] p-2">
                    <div className="overflow-hidden rounded-[1.1rem] bg-black shadow-[0_16px_40px_rgba(0,0,0,0.14)]">
                      <Image
                        src={testimonial.src}
                        alt={`${testimonial.name} guardian message`}
                        width={1200}
                        height={1500}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="mt-auto pt-5">
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-black/60">{testimonial.level}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-24 max-w-5xl md:mt-28" delay={120}>
            <div className="text-center">
              <h3 className="mx-auto max-w-3xl text-balance text-2xl font-semibold tracking-[-0.03em] md:text-4xl">
                How Excelora Guarantees Results
              </h3>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {guaranteeCards.map((card, index) => (
                <Reveal key={card.step} delay={index * 60} className="h-full">
                  <article className="card h-full p-6 md:p-7">
                    <div className="inline-flex rounded-full bg-black px-3 py-1 text-xs font-semibold tracking-[0.14em] text-white">
                      {card.step}
                    </div>

                    <h4 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[#1d1d1f] md:text-2xl">
                      {card.title}
                    </h4>

                    <p className="mt-4 text-sm leading-relaxed text-black/65">
                      {card.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <a
                href="https://course.excelora.co.uk/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-lg h-12 px-7 text-[15px] ui-motion hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
              >
                Start Your Free Crash Course
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <FAQ />
      <ContactForm />
    </main>
  );
}
