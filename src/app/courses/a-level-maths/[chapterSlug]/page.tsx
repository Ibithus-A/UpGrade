import Link from "next/link";
import { notFound } from "next/navigation";
import { aLevelMathsCourse, getChapterBySlug } from "@/lib/course-content";

type ChapterPageProps = {
  params: Promise<{ chapterSlug: string }>;
};

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapterSlug } = await params;
  const chapter = getChapterBySlug(chapterSlug);

  if (!chapter) notFound();

  const index = aLevelMathsCourse.chapters.findIndex((c) => c.slug === chapter.slug);
  const previous = index > 0 ? aLevelMathsCourse.chapters[index - 1] : null;
  const next =
    index < aLevelMathsCourse.chapters.length - 1
      ? aLevelMathsCourse.chapters[index + 1]
      : null;

  return (
    <section className="card p-6 md:p-8">
      <p className="kicker">Course chapter</p>
      <h1 className="mt-4 h2">{chapter.title}</h1>
      <p className="mt-2 text-sm text-black/60">Chapter subtopics.</p>

      <div className="mt-6 rounded-2xl border border-dashed border-black/15 bg-black/[0.02] p-5">
        <p className="text-sm font-semibold">Contents</p>
        <ul className="mt-3 space-y-1 text-sm text-black/65">
          {chapter.sections.map((section) => (
            <li key={section}>{section}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        {previous ? (
          <Link
            href={`/courses/${aLevelMathsCourse.slug}/${previous.slug}`}
            className="btn btn-ghost btn-sm"
          >
            ← {previous.title}
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            href={`/courses/${aLevelMathsCourse.slug}/${next.slug}`}
            className="btn btn-ghost btn-sm"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </section>
  );
}
