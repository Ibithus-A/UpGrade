import Link from "next/link";
import { aLevelMathsCourse } from "@/lib/course-content";

export default function ALevelMathsCoursePage() {
  return (
    <section className="card p-6 md:p-8">
      <p className="kicker">Course contents</p>
      <h1 className="mt-4 h2">{aLevelMathsCourse.title}</h1>
      <p className="mt-2 text-sm text-black/60">
        Full chapter structure and subtopics.
      </p>

      <div className="mt-6 grid gap-4">
        {aLevelMathsCourse.chapters.map((chapter) => (
          <article
            key={chapter.slug}
            className="rounded-2xl border border-black/10 bg-black/[0.02] p-4"
          >
            <Link
              href={`/courses/${aLevelMathsCourse.slug}/${chapter.slug}`}
              className="text-sm font-semibold text-black/85 hover:text-black"
            >
              {chapter.title}
            </Link>
            <ul className="mt-3 space-y-1 text-sm text-black/65">
              {chapter.sections.map((section) => (
                <li key={section}>{section}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
