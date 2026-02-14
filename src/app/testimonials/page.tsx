import { TestimonialSlider } from "@/components/TestimonialSlider";
import { testimonials } from "@/lib/data";

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

export default function TestimonialsPage() {
  return (
    <main className="section">
      <div className="container">
        <h1 className="h1 text-4xl md:text-5xl">Testimonials</h1>
        <p className="mt-2 lead max-w-2xl">
          A snapshot of what learners and parents say about UpGrade.
        </p>

        <div className="mt-8">
          <TestimonialSlider items={testimonials} compact />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {testimonials.map((t) => (
            <div key={`${t.name}-${t.role}`} className="card card-hover p-6">
              <p className="text-sm leading-relaxed">“{t.quote}”</p>

              <div className="mt-4 flex items-center gap-3">
                <Avatar name={t.name} />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="muted text-sm">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
