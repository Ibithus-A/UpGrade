import { NextResponse } from "next/server";

type Payload = {
  name: string;
  email: string;
  phone?: string;
  level: string;
  subject: string;
  notes?: string;
};

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    if (!body.name?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Name is required." },
        { status: 400 }
      );
    }
    if (!body.email?.trim() || !isEmail(body.email)) {
      return NextResponse.json(
        { ok: false, error: "A valid email is required." },
        { status: 400 }
      );
    }
    if (!body.level?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Level is required." },
        { status: 400 }
      );
    }
    if (!body.subject?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Subject is required." },
        { status: 400 }
      );
    }

    // Replace with Resend/Postmark/etc in production.
    console.log("New UpGrade enquiry:", body);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }
}
