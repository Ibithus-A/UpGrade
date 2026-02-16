import type { CourseChapter } from "@/lib/course-content";

export type ChapterProgress = {
  completed: boolean;
  sections: Record<string, boolean>;
};

export type CourseProgressState = Record<string, ChapterProgress>;

export const COURSE_PROGRESS_STORAGE_KEY = "upgrade_course_progress_v1";
export const COURSE_PROGRESS_SYNC_EVENT = "upgrade-course-progress-sync";

function makeSectionMap(chapter: CourseChapter, source?: Record<string, boolean>) {
  return chapter.sections.reduce<Record<string, boolean>>((acc, section) => {
    acc[section] = Boolean(source?.[section]);
    return acc;
  }, {});
}

export function getChapterProgress(state: CourseProgressState, chapter: CourseChapter) {
  const current = state[chapter.slug];
  return {
    completed: Boolean(current?.completed),
    sections: makeSectionMap(chapter, current?.sections),
  };
}

export function readCourseProgressState(): CourseProgressState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(COURSE_PROGRESS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as CourseProgressState;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function writeCourseProgressState(next: CourseProgressState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(COURSE_PROGRESS_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(COURSE_PROGRESS_SYNC_EVENT));
}

export function sectionAnchorId(chapterId: number, section: string) {
  const prefix = section.split(" ")[0] ?? "";
  const numeric = prefix.replace(/\./g, "-").replace(/[^0-9-]/g, "");
  if (numeric) return `c${chapterId}-s${numeric}`;
  const fallback = section
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `c${chapterId}-s-${fallback}`;
}
