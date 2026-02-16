import { aLevelMathsCourse } from "@/lib/course-content";
import type { ChapterAssessment } from "@/lib/course-module-store";

export function buildChapterAccessMaps(
  role: "student" | "tutor",
  email: string,
  assessments: Record<string, ChapterAssessment>,
  manualUnlocks: Record<string, boolean>,
) {
  const chapterPassedMap = aLevelMathsCourse.chapters.reduce<Record<string, boolean>>(
    (acc, chapter) => {
      const submissions = assessments[chapter.slug]?.submissions ?? [];
      acc[chapter.slug] =
        role === "student"
          ? submissions.some((s) => s.studentEmail === email && s.passed)
          : submissions.some((s) => s.passed);
      return acc;
    },
    {},
  );

  const chapterUnlockedMap = aLevelMathsCourse.chapters.reduce<Record<string, boolean>>(
    (acc, chapter, index) => {
      if (index === 0) {
        acc[chapter.slug] = true;
        return acc;
      }

      const previous = aLevelMathsCourse.chapters[index - 1];
      acc[chapter.slug] =
        Boolean(chapterPassedMap[previous.slug]) || Boolean(manualUnlocks[chapter.slug]);
      return acc;
    },
    {},
  );

  return {
    chapterPassedMap,
    chapterUnlockedMap,
  };
}
