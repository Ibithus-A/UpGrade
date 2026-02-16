import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { readSession } from "@/lib/auth";
import { CourseModuleWorkspace } from "@/components/CourseModuleWorkspace";
import { aLevelMathsCourse, getChapterBySlug } from "@/lib/course-content";
import { buildChapterAccessMaps } from "@/lib/course-access";
import { listChapterAssessments, listManualChapterUnlocks } from "@/lib/course-module-store";

type ChapterPageProps = {
  params: Promise<{ chapterSlug: string }>;
};

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapterSlug } = await params;
  const session = await readSession();
  const chapter = getChapterBySlug(chapterSlug);

  if (!chapter) notFound();

  const assessments = await listChapterAssessments();
  const manualUnlocks = await listManualChapterUnlocks();
  const { chapterUnlockedMap } = buildChapterAccessMaps(
    session?.role === "tutor" ? "tutor" : "student",
    session?.email ?? "",
    assessments,
    manualUnlocks,
  );

  if (!chapterUnlockedMap[chapter.slug]) {
    redirect(`/courses/${aLevelMathsCourse.slug}`);
  }
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
      <p className="mt-2 text-sm text-black/60">
        Notes, exam practice, and module submissions.
      </p>

      <CourseModuleWorkspace
        chapter={chapter}
        role={session?.role === "tutor" ? "tutor" : "student"}
      />

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
