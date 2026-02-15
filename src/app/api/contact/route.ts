import { NextResponse } from "next/server";

type Payload = {
  name: string;
  email: string;
  phone?: string;
  level: string;
  subject: string;
  notes?: string;
  website?: string;
};

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const level = body.level?.trim();
    const subject = body.subject?.trim();
    const phone = body.phone?.trim();
    const notes = body.notes?.trim();

    if (body.website?.trim()) {
      return NextResponse.json({ ok: true });
    }
    if (!name) {
      return NextResponse.json(
        { ok: false, error: "Name is required." },
        { status: 400 }
      );
    }
    if (!email || !isEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "A valid email is required." },
        { status: 400 }
      );
    }
    if (!level) {
      return NextResponse.json(
        { ok: false, error: "Level is required." },
        { status: 400 }
      );
    }
    if (!subject) {
      return NextResponse.json(
        { ok: false, error: "Subject is required." },
        { status: 400 }
      );
    }
    if ((name?.length ?? 0) > 120 || subject.length > 150 || (notes?.length ?? 0) > 2500) {
      return NextResponse.json(
        { ok: false, error: "Please shorten your response and try again." },
        { status: 400 }
      );
    }

    // Replace with Resend/Postmark/etc in production.
    if (process.env.NODE_ENV !== "production") {
      console.log("New UpGrade enquiry:", {
        name,
        email,
        level,
        subject,
        phone,
        hasNotes: Boolean(notes),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }
}
