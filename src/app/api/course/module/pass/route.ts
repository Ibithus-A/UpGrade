import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth";
import {
  markChapterPassed,
  markSubmissionPassed,
  setManualChapterUnlock,
} from "@/lib/course-module-store";

type Payload = {
  mode?: "section" | "chapter" | "unlock";
  chapterSlug: string;
  section?: string;
  studentEmail?: string;
  unlocked?: boolean;
};

export async function POST(req: Request) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (session.role !== "tutor") {
    return NextResponse.json({ ok: false, error: "Only tutors can mark modules as passed." }, { status: 403 });
  }

  const body = (await req.json()) as Payload;
  const chapterSlug = body.chapterSlug?.trim();
  const mode = body.mode ?? "section";
  const section = body.section?.trim();
  const studentEmail = body.studentEmail?.trim().toLowerCase();

  if (!chapterSlug) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  if (mode === "unlock") {
    await setManualChapterUnlock(chapterSlug, Boolean(body.unlocked));
    return NextResponse.json({ ok: true });
  }

  if (!studentEmail) {
    return NextResponse.json({ ok: false, error: "Missing student." }, { status: 400 });
  }

  if (mode === "chapter") {
    const updated = await markChapterPassed(chapterSlug, studentEmail, session.email);
    if (!updated) {
      return NextResponse.json({ ok: false, error: "Chapter submission not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  }

  if (!section) {
    return NextResponse.json({ ok: false, error: "Missing section." }, { status: 400 });
  }

  const updated = await markSubmissionPassed(chapterSlug, section, studentEmail, session.email);
  if (!updated) {
    return NextResponse.json({ ok: false, error: "Section submission not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
