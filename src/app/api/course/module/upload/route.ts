import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth";
import {
  savePdfFile,
  upsertChapterExamPdf,
  upsertChapterSubmission,
  upsertModuleAsset,
  upsertStudentSubmission,
} from "@/lib/course-module-store";

function isPdf(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

export async function POST(req: Request) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const chapterSlug = String(formData.get("chapterSlug") ?? "").trim();
  const section = String(formData.get("section") ?? "").trim();
  const kind = String(formData.get("kind") ?? "").trim();
  const file = formData.get("file");

  if (!chapterSlug || !section) {
    return NextResponse.json({ ok: false, error: "Missing module details." }, { status: 400 });
  }
  if (!(file instanceof File) || !isPdf(file)) {
    return NextResponse.json({ ok: false, error: "Please upload a PDF file." }, { status: 400 });
  }

  if (
    (kind === "notes" || kind === "exam" || kind === "chapter-test") &&
    session.role !== "tutor"
  ) {
    return NextResponse.json({ ok: false, error: "Only tutors can upload module PDFs." }, { status: 403 });
  }
  if ((kind === "answer" || kind === "chapter-answer") && session.role !== "student") {
    return NextResponse.json({ ok: false, error: "Only students can submit answer PDFs." }, { status: 403 });
  }
  if (
    kind !== "notes" &&
    kind !== "exam" &&
    kind !== "answer" &&
    kind !== "chapter-test" &&
    kind !== "chapter-answer"
  ) {
    return NextResponse.json({ ok: false, error: "Invalid upload type." }, { status: 400 });
  }

  const pdfPath = await savePdfFile(file);

  if (kind === "answer") {
    await upsertStudentSubmission(chapterSlug, section, session.email, pdfPath);
  } else if (kind === "chapter-test") {
    await upsertChapterExamPdf(chapterSlug, pdfPath);
  } else if (kind === "chapter-answer") {
    await upsertChapterSubmission(chapterSlug, session.email, pdfPath);
  } else {
    await upsertModuleAsset(chapterSlug, section, kind, pdfPath);
  }

  return NextResponse.json({ ok: true, pdfPath });
}
