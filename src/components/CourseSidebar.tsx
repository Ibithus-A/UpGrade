"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Course } from "@/lib/course-content";

export function CourseSidebar({ course }: { course: Course }) {
  const pathname = usePathname();

  return (
    <aside className="card p-4 md:p-5 lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-black/45">
        {course.subtitle}
      </p>
      <h2 className="mt-1 text-base font-semibold">{course.title}</h2>

      <nav className="mt-4 grid gap-1.5" aria-label="Course chapters">
        {course.chapters.map((chapter) => {
          const href = `/courses/${course.slug}/${chapter.slug}`;
          const active = pathname === href;

          return (
            <Link
              key={chapter.slug}
              href={href}
              className={[
                "rounded-2xl border px-3 py-2 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
                active
                  ? "border-black bg-black text-white shadow-[0_8px_16px_rgba(0,0,0,0.18)]"
                  : "border-black/10 bg-white text-black/70 hover:-translate-y-0.5 hover:bg-black/[0.03] hover:text-black hover:shadow-[0_6px_14px_rgba(0,0,0,0.08)]",
              ].join(" ")}
            >
              {chapter.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
