import Link from "next/link";
import { readSession } from "@/lib/auth";
import { CourseAdminControls } from "@/components/CourseAdminControls";
import { aLevelMathsCourse } from "@/lib/course-content";
import { buildChapterAccessMaps } from "@/lib/course-access";
import { listChapterAssessments, listManualChapterUnlocks } from "@/lib/course-module-store";

export default async function ALevelMathsCoursePage() {
  const session = await readSession();
  const assessments = await listChapterAssessments();
  const manualUnlocks = await listManualChapterUnlocks();
  const { chapterUnlockedMap } = buildChapterAccessMaps(
    session?.role === "tutor" ? "tutor" : "student",
    session?.email ?? "",
    assessments,
    manualUnlocks,
  );

  return (
    <section className="card p-6 md:p-8">
      <p className="kicker">Course contents</p>
      <h1 className="mt-4 h2">{aLevelMathsCourse.title}</h1>
      <p className="mt-2 text-sm text-black/60">
        Topic 1 is open by default. Next topics unlock only after tutor approval
        of the end-of-topic test.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        {aLevelMathsCourse.chapters.map((chapter) => (
          <article
            key={chapter.slug}
            className="min-w-0 rounded-2xl border border-black/10 bg-black/[0.02] p-4"
          >
            {chapterUnlockedMap[chapter.slug] ? (
              <Link
                href={`/courses/${aLevelMathsCourse.slug}/${chapter.slug}`}
                className="text-sm font-semibold text-black/85 hover:text-black"
              >
                {chapter.title}
              </Link>
            ) : (
              <p className="text-sm font-semibold text-black/45">
                {chapter.title} <span>🔒</span>
              </p>
            )}
            <ul className="mt-3 flex flex-col gap-1 text-sm text-black/65">
              {chapter.sections.map((section) => (
                <li key={section} className="break-words leading-tight">
                  {section}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {session?.role === "tutor" ? <CourseAdminControls course={aLevelMathsCourse} /> : null}
    </section>
  );
}
