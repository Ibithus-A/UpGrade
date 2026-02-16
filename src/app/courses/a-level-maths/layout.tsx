import type { ReactNode } from "react";
import { CourseWorkspaceShell } from "@/components/CourseWorkspaceShell";
import { aLevelMathsCourse } from "@/lib/course-content";

export default function ALevelMathsCourseLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main id="main-content" className="section">
      <div className="container">
        <CourseWorkspaceShell course={aLevelMathsCourse}>
          {children}
        </CourseWorkspaceShell>
      </div>
    </main>
  );
}
