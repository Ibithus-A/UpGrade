export function makeModuleKey(chapterSlug: string, section: string) {
  return `${chapterSlug}::${section}`;
}

export function makeChapterPassedKey(chapterSlug: string) {
  return `chapter-pass::${chapterSlug}`;
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
