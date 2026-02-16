import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth";
import { buildChapterAccessMaps } from "@/lib/course-access";
import {
  listChapterAssessments,
  listCustomTopics,
  listManualChapterUnlocks,
  listModules,
  type StoredModule,
} from "@/lib/course-module-store";

function toView(module: StoredModule, role: "student" | "tutor", email: string) {
  const mySubmission = module.submissions.find((s) => s.studentEmail === email) ?? null;
  return {
    chapterSlug: module.chapterSlug,
    section: module.section,
    notePdfPath: module.notePdfPath ?? null,
    examPdfPath: module.examPdfPath ?? null,
    status:
      role === "student"
        ? {
            submitted: Boolean(mySubmission),
            passed: Boolean(mySubmission?.passed),
          }
        : {
            submitted: module.submissions.length > 0,
            passed: module.submissions.some((s) => s.passed),
          },
    mySubmission:
      role === "student" && mySubmission
        ? {
            answerPdfPath: mySubmission.answerPdfPath,
            submittedAt: mySubmission.submittedAt,
            passed: mySubmission.passed,
          }
        : null,
    submissions:
      role === "tutor"
        ? module.submissions.map((s) => ({
            studentEmail: s.studentEmail,
            answerPdfPath: s.answerPdfPath,
            submittedAt: s.submittedAt,
            passed: s.passed,
            reviewedAt: s.reviewedAt ?? null,
          }))
        : [],
  };
}

export async function GET(req: Request) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const chapterSlug = searchParams.get("chapterSlug")?.trim() || undefined;
  const modules = await listModules(chapterSlug);
  const assessments = await listChapterAssessments();
  const manualUnlocks = await listManualChapterUnlocks();
  const customTopics = await listCustomTopics();
  const { chapterPassedMap, chapterUnlockedMap } = buildChapterAccessMaps(
    session.role,
    session.email,
    assessments,
    manualUnlocks,
  );

  return NextResponse.json({
    ok: true,
    modules: modules.map((module) => toView(module, session.role, session.email)),
    chapterPassedMap,
    chapterUnlockedMap,
    manualChapterUnlocks: manualUnlocks,
    chapterAssessments: assessments,
    customTopics:
      session.role === "tutor"
        ? customTopics
        : customTopics.filter((topic) => topic.available),
  });
}
