"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { CourseChapter } from "@/lib/course-content";

type SubmissionView = {
  studentEmail: string;
  answerPdfPath: string;
  submittedAt: string;
  passed: boolean;
  reviewedAt: string | null;
};

type ModuleView = {
  chapterSlug: string;
  section: string;
  notePdfPath: string | null;
  examPdfPath: string | null;
  status: {
    submitted: boolean;
    passed: boolean;
  };
  mySubmission: {
    answerPdfPath: string;
    submittedAt: string;
    passed: boolean;
  } | null;
  submissions: SubmissionView[];
};

type ChapterAssessmentView = {
  examPdfPath?: string;
  submissions: SubmissionView[];
};

type ModuleResponse = {
  ok: boolean;
  modules?: ModuleView[];
  chapterAssessments?: Record<string, ChapterAssessmentView>;
};

function EmptyPdfPanel({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="rounded-xl border border-dashed border-black/15 bg-white/80 p-4">
      <p className="text-sm font-semibold">{title}</p>
      <div className="mt-3 flex h-36 items-center justify-center rounded-lg bg-black/[0.02] text-xs text-black/45">
        {hint}
      </div>
    </div>
  );
}

function sectionIndexFromParam(sections: string[], param: string | null) {
  if (!param) return 0;
  const idx = Number(param);
  if (Number.isInteger(idx) && idx >= 1 && idx <= sections.length) return idx - 1;
  return 0;
}

export function CourseModuleWorkspace({
  chapter,
  role,
}: {
  chapter: CourseChapter;
  role: "student" | "tutor";
}) {
  const searchParams = useSearchParams();
  const [modules, setModules] = useState<Record<string, ModuleView>>({});
  const [chapterAssessment, setChapterAssessment] = useState<ChapterAssessmentView | null>(null);
  const [busyKey, setBusyKey] = useState<string | null>(null);

  const sectionIndex = sectionIndexFromParam(chapter.sections, searchParams.get("section"));
  const activeSection = chapter.sections[sectionIndex] ?? chapter.sections[0];

  const applyModuleData = useCallback(
    (data: ModuleResponse) => {
      const nextModules = (data.modules ?? []).reduce<Record<string, ModuleView>>((acc, module) => {
        acc[module.section] = module;
        return acc;
      }, {});
      setModules(nextModules);
      setChapterAssessment(data.chapterAssessments?.[chapter.slug] ?? { submissions: [] });
    },
    [chapter.slug],
  );

  const fetchModuleData = useCallback(
    async (signal?: AbortSignal) => {
      const res = await fetch(`/api/course/module?chapterSlug=${encodeURIComponent(chapter.slug)}`, {
        cache: "no-store",
        signal,
      });
      const data = (await res.json()) as ModuleResponse;
      if (!res.ok || !data.ok) return null;
      return data;
    },
    [chapter.slug],
  );

  const refresh = useCallback(async () => {
    const data = await fetchModuleData();
    if (!data) return false;
    applyModuleData(data);
    return true;
  }, [applyModuleData, fetchModuleData]);

  useEffect(() => {
    const controller = new AbortController();
    void fetchModuleData(controller.signal)
      .then((data) => {
        if (data) applyModuleData(data);
      })
      .catch(() => {});
    return () => {
      controller.abort();
    };
  }, [applyModuleData, fetchModuleData]);

  const activeModule = useMemo(() => {
    return (
      modules[activeSection] ?? {
        chapterSlug: chapter.slug,
        section: activeSection,
        notePdfPath: null,
        examPdfPath: null,
        status: { submitted: false, passed: false },
        mySubmission: null,
        submissions: [],
      }
    );
  }, [activeSection, chapter.slug, modules]);

  async function uploadPdf(
    kind: "notes" | "exam" | "answer" | "chapter-test" | "chapter-answer",
    file: File | null,
    section?: string,
  ) {
    if (!file) return;
    const key = `${kind}:${section ?? chapter.slug}`;
    setBusyKey(key);
    try {
      const formData = new FormData();
      formData.set("chapterSlug", chapter.slug);
      formData.set("section", section ?? "chapter-assessment");
      formData.set("kind", kind);
      formData.set("file", file);
      await fetch("/api/course/module/upload", { method: "POST", body: formData });
      await refresh();
    } finally {
      setBusyKey(null);
    }
  }

  async function markSectionPassed(studentEmail: string) {
    const key = `pass-section:${activeSection}:${studentEmail}`;
    setBusyKey(key);
    try {
      await fetch("/api/course/module/pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "section",
          chapterSlug: chapter.slug,
          section: activeSection,
          studentEmail,
        }),
      });
      await refresh();
    } finally {
      setBusyKey(null);
    }
  }

  async function markChapterPassed(studentEmail: string) {
    const key = `pass-chapter:${studentEmail}`;
    setBusyKey(key);
    try {
      await fetch("/api/course/module/pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "chapter",
          chapterSlug: chapter.slug,
          studentEmail,
        }),
      });
      await refresh();
    } finally {
      setBusyKey(null);
    }
  }

  const prevHref =
    sectionIndex > 0
      ? `?section=${sectionIndex}`
      : null;
  const nextHref =
    sectionIndex < chapter.sections.length - 1
      ? `?section=${sectionIndex + 2}`
      : null;

  const chapterSubmissions = chapterAssessment?.submissions ?? [];

  return (
    <div className="mt-6 flex flex-col gap-4">
      <article
        className={[
          "rounded-2xl border border-black/10 bg-black/[0.015] p-4",
          activeModule.status.passed ? "opacity-60" : "",
        ].join(" ")}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold">{activeSection}</p>
          <span
            className={[
              "rounded-full px-2 py-1 text-xs",
              activeModule.status.passed
                ? "bg-emerald-100 text-emerald-700"
                : activeModule.status.submitted
                  ? "bg-amber-100 text-amber-700"
                  : "bg-black/5 text-black/55",
            ].join(" ")}
          >
            {activeModule.status.passed ? "Passed" : activeModule.status.submitted ? "Submitted" : "Not submitted"}
          </span>
        </div>

        <div className="mt-3 flex flex-col gap-3 md:flex-row">
          <div className="min-w-0 flex-1 space-y-2">
            {activeModule.notePdfPath ? (
              <div className="rounded-xl border border-black/10 bg-white p-4">
                <p className="text-sm font-semibold">Notes PDF</p>
                <a href={activeModule.notePdfPath} target="_blank" rel="noreferrer" className="mt-2 ui-link px-0">
                  Open notes PDF
                </a>
              </div>
            ) : (
              <EmptyPdfPanel title="Notes PDF" hint="No notes PDF uploaded yet." />
            )}

            {role === "tutor" ? (
              <label className="flex flex-col gap-2 text-xs text-black/60">
                Upload notes PDF
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={(e) => {
                    void uploadPdf("notes", e.target.files?.[0] ?? null, activeSection);
                    e.currentTarget.value = "";
                  }}
                  disabled={busyKey === `notes:${activeSection}`}
                />
              </label>
            ) : null}
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            {activeModule.examPdfPath ? (
              <div className="rounded-xl border border-black/10 bg-white p-4">
                <p className="text-sm font-semibold">Exam practice PDF</p>
                <a href={activeModule.examPdfPath} target="_blank" rel="noreferrer" className="mt-2 ui-link px-0">
                  Open exam practice PDF
                </a>
              </div>
            ) : (
              <EmptyPdfPanel title="Exam Practice" hint="No exam practice PDF uploaded yet." />
            )}

            {role === "tutor" ? (
              <label className="flex flex-col gap-2 text-xs text-black/60">
                Upload exam practice PDF
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={(e) => {
                    void uploadPdf("exam", e.target.files?.[0] ?? null, activeSection);
                    e.currentTarget.value = "";
                  }}
                  disabled={busyKey === `exam:${activeSection}`}
                />
              </label>
            ) : null}
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-black/10 bg-white p-4">
          <p className="text-sm font-semibold">Exam submission</p>

          {role === "student" ? (
            <div className="mt-2 flex flex-col gap-2">
              {activeModule.mySubmission ? (
                <a href={activeModule.mySubmission.answerPdfPath} target="_blank" rel="noreferrer" className="ui-link px-0">
                  Open your submitted answers PDF
                </a>
              ) : (
                <p className="text-xs text-black/55">No answer PDF submitted yet.</p>
              )}

              <label className="flex flex-col gap-2 text-xs text-black/60">
                Upload completed answers PDF
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={(e) => {
                    void uploadPdf("answer", e.target.files?.[0] ?? null, activeSection);
                    e.currentTarget.value = "";
                  }}
                  disabled={busyKey === `answer:${activeSection}`}
                />
              </label>
            </div>
          ) : (
            <div className="mt-2 flex flex-col gap-2">
              {activeModule.submissions.length === 0 ? (
                <p className="text-xs text-black/55">No student submissions yet.</p>
              ) : (
                activeModule.submissions.map((submission) => (
                  <div
                    key={`${activeSection}-${submission.studentEmail}`}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-black/10 px-3 py-2"
                  >
                    <div className="text-xs text-black/70">
                      <p>{submission.studentEmail}</p>
                      <p>Submitted: {new Date(submission.submittedAt).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={submission.answerPdfPath} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                        View PDF
                      </a>
                      <button
                        type="button"
                        onClick={() => void markSectionPassed(submission.studentEmail)}
                        disabled={submission.passed || busyKey === `pass-section:${activeSection}:${submission.studentEmail}`}
                        className="btn btn-primary btn-sm disabled:opacity-60"
                      >
                        {submission.passed ? "Passed ✓" : "Mark passed"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          {prevHref ? (
            <Link href={prevHref} className="btn btn-ghost btn-sm" scroll={false}>
              ← Previous subtopic
            </Link>
          ) : (
            <span />
          )}
          {nextHref ? (
            <Link href={nextHref} className="btn btn-ghost btn-sm" scroll={false}>
              Next subtopic →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </article>

      <article className="rounded-2xl border border-black/10 bg-white p-4">
        <p className="text-sm font-semibold">End-of-topic test</p>
        <p className="mt-1 text-xs text-black/60">
          This is the gate for unlocking the next chapter.
        </p>

        <div className="mt-3 flex flex-col gap-3 md:flex-row">
          <div className="min-w-0 flex-1">
            {chapterAssessment?.examPdfPath ? (
              <a href={chapterAssessment.examPdfPath} target="_blank" rel="noreferrer" className="ui-link px-0">
                Open end-of-topic test PDF
              </a>
            ) : (
              <p className="text-xs text-black/55">No end-of-topic test PDF uploaded yet.</p>
            )}

            {role === "tutor" ? (
              <label className="mt-2 flex flex-col gap-2 text-xs text-black/60">
                Upload end-of-topic test PDF
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={(e) => {
                    void uploadPdf("chapter-test", e.target.files?.[0] ?? null);
                    e.currentTarget.value = "";
                  }}
                  disabled={busyKey === `chapter-test:${chapter.slug}`}
                />
              </label>
            ) : null}

            {role === "student" ? (
              <label className="mt-3 flex flex-col gap-2 text-xs text-black/60">
                Upload end-of-topic answers PDF
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={(e) => {
                    void uploadPdf("chapter-answer", e.target.files?.[0] ?? null);
                    e.currentTarget.value = "";
                  }}
                  disabled={busyKey === `chapter-answer:${chapter.slug}`}
                />
              </label>
            ) : null}
          </div>

          <div className="min-w-0 flex flex-1 flex-col gap-2">
            {chapterSubmissions.length === 0 ? (
              <p className="text-xs text-black/55">No chapter test submissions yet.</p>
            ) : (
              chapterSubmissions.map((submission) => (
                <div
                  key={`${chapter.slug}-${submission.studentEmail}`}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-black/10 px-3 py-2"
                >
                  <div className="text-xs text-black/70">
                    <p>{submission.studentEmail}</p>
                    <p>Submitted: {new Date(submission.submittedAt).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={submission.answerPdfPath} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                      View PDF
                    </a>
                    {role === "tutor" ? (
                      <button
                        type="button"
                        onClick={() => void markChapterPassed(submission.studentEmail)}
                        disabled={submission.passed || busyKey === `pass-chapter:${submission.studentEmail}`}
                        className="btn btn-primary btn-sm disabled:opacity-60"
                      >
                        {submission.passed ? "Passed ✓" : "Mark chapter passed"}
                      </button>
                    ) : (
                      <span className="text-xs text-black/55">{submission.passed ? "Passed ✓" : "Pending review"}</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
