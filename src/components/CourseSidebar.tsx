"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Course } from "@/lib/course-content";
import { makeModuleKey } from "@/lib/course-module-common";

type ModuleStatus = {
  chapterSlug: string;
  section: string;
  status: {
    passed: boolean;
  };
};

type CustomTopic = {
  id: string;
  title: string;
  sections: string[];
  available: boolean;
};

export function CourseSidebar({
  course,
  drawerMode = false,
  showCloseButton = false,
  onClose,
}: {
  course: Course;
  drawerMode?: boolean;
  showCloseButton?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const [statusMap, setStatusMap] = useState<Record<string, boolean>>({});
  const [chapterUnlockedMap, setChapterUnlockedMap] = useState<Record<string, boolean>>({});
  const [customTopics, setCustomTopics] = useState<CustomTopic[]>([]);

  const activeChapterSlug = useMemo(
    () =>
      course.chapters.find((chapter) => pathname.startsWith(`/courses/${course.slug}/${chapter.slug}`))
        ?.slug ?? null,
    [course, pathname],
  );

  useEffect(() => {
    let mounted = true;
    async function load() {
      const res = await fetch("/api/course/module", { cache: "no-store" });
      const data = (await res.json()) as {
        ok: boolean;
        modules?: ModuleStatus[];
        chapterUnlockedMap?: Record<string, boolean>;
        customTopics?: CustomTopic[];
      };
      if (!mounted || !res.ok || !data.ok) return;

      const nextStatus = (data.modules ?? []).reduce<Record<string, boolean>>((acc, module) => {
        acc[makeModuleKey(module.chapterSlug, module.section)] = module.status.passed;
        return acc;
      }, {});

      setStatusMap(nextStatus);
      setChapterUnlockedMap(data.chapterUnlockedMap ?? {});
      setCustomTopics(data.customTopics ?? []);
    }
    void load();
    return () => {
      mounted = false;
    };
  }, []);

  function toggleChapter(slug: string) {
    setOpenMap((prev) => ({ ...prev, [slug]: !prev[slug] }));
  }

  const activeSectionIdx = Number(searchParams.get("section") ?? "1");
  const chapterLinkBase =
    "flex min-w-0 flex-1 items-center justify-between rounded-xl px-2 py-1.5 text-sm transition-all ui-motion focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20";
  const sectionLinkBase =
    "flex min-w-0 items-start justify-between gap-2 rounded-lg px-2 py-1 text-xs";

  return (
    <aside
      className={[
        "card w-full overflow-x-hidden p-4 md:p-5",
        drawerMode
          ? "min-h-full pb-6"
          : "lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:w-80 lg:shrink-0 lg:overflow-y-auto",
      ].join(" ")}
    >
      {drawerMode && showCloseButton ? (
        <div className="mb-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium text-black/60 transition-colors hover:bg-black/[0.05] hover:text-black"
            aria-label="Close course menu"
          >
            Close
          </button>
        </div>
      ) : null}
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-black/45">{course.subtitle}</p>
      <h2 className="mt-1 text-base font-semibold">{course.title}</h2>

      <nav className="mt-4 flex flex-col gap-2" aria-label="Course chapters">
        {course.chapters.map((chapter) => {
          const chapterHref = `/courses/${course.slug}/${chapter.slug}`;
          const active = pathname === chapterHref;
          const unlocked = chapterUnlockedMap[chapter.slug] ?? chapter.id === 1;
          const chapterDone = chapter.sections.every((section) =>
            Boolean(statusMap[makeModuleKey(chapter.slug, section)]),
          );
          const expanded = (openMap[chapter.slug] ?? chapter.slug === activeChapterSlug) && unlocked;

          return (
            <div key={chapter.slug} className="min-w-0 rounded-2xl border border-black/10 bg-white p-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleChapter(chapter.slug)}
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/[0.04] text-xs text-black/70 hover:bg-black/[0.08]"
                  aria-label={`${expanded ? "Collapse" : "Expand"} ${chapter.title}`}
                  aria-expanded={expanded}
                  disabled={!unlocked}
                >
                  {expanded ? "−" : "+"}
                </button>

                {unlocked ? (
                  <Link
                    href={chapterHref}
                    className={[
                      chapterLinkBase,
                      active ? "bg-black text-white" : "text-black/75 hover:bg-black/[0.03] hover:text-black",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "min-w-0 break-words pr-2 leading-tight",
                        chapterDone && !active ? "line-through opacity-55" : "",
                      ].join(" ")}
                    >
                      {chapter.title}
                    </span>
                    {chapterDone ? <span className={active ? "text-emerald-300" : "text-emerald-600"}>✓</span> : null}
                  </Link>
                ) : (
                  <div className="flex min-w-0 flex-1 items-center justify-between rounded-xl bg-black/[0.03] px-2 py-1.5 text-sm text-black/45">
                    <span className="min-w-0 break-words pr-2 leading-tight">{chapter.title}</span>
                    <span>🔒</span>
                  </div>
                )}
              </div>

              {expanded ? (
                <div className="mt-2 ml-9 flex min-w-0 flex-col gap-1">
                  {chapter.sections.map((section, index) => {
                    const done = Boolean(statusMap[makeModuleKey(chapter.slug, section)]);
                    const sectionHref = `${chapterHref}?section=${index + 1}`;
                    const sectionActive = active && activeSectionIdx === index + 1;
                    return (
                      <Link
                        key={section}
                        href={sectionHref}
                        className={[
                          sectionLinkBase,
                          sectionActive
                            ? "bg-black text-white"
                            : "text-black/65 hover:bg-black/[0.03] hover:text-black",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "min-w-0 break-words pr-2 leading-tight",
                            done && !sectionActive ? "line-through opacity-55" : "",
                          ].join(" ")}
                        >
                          {section}
                        </span>
                        {done ? <span className={sectionActive ? "text-emerald-300" : "text-emerald-600"}>✓</span> : null}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>

      {customTopics.length > 0 ? (
        <div className="mt-5 border-t border-black/10 pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-black/45">Custom Topics</p>
          <div className="mt-2 flex flex-col gap-1">
            {customTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/courses/${course.slug}/custom/${topic.id}`}
                className={[
                  "min-w-0 rounded-lg px-2 py-1 text-xs leading-tight hover:bg-black/[0.03]",
                  topic.available ? "text-black/70 hover:text-black" : "text-black/40",
                ].join(" ")}
              >
                {topic.title}
                {!topic.available ? " (hidden)" : ""}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  );
}
