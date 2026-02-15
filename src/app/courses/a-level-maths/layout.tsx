import type { ReactNode } from "react";
import { CourseSidebar } from "@/components/CourseSidebar";
import { aLevelMathsCourse } from "@/lib/course-content";

export default function ALevelMathsCourseLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main id="main-content" className="section">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <CourseSidebar course={aLevelMathsCourse} />
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </main>
  );
}
