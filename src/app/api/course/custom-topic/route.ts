import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth";
import {
  createCustomTopic,
  listCustomTopics,
  setCustomTopicAvailability,
} from "@/lib/course-module-store";

type Payload = {
  action: "create" | "availability";
  title?: string;
  sections?: string[];
  topicId?: string;
  available?: boolean;
};

export async function GET() {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const topics = await listCustomTopics();
  return NextResponse.json({
    ok: true,
    topics: session.role === "tutor" ? topics : topics.filter((topic) => topic.available),
  });
}

export async function POST(req: Request) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (session.role !== "tutor") {
    return NextResponse.json({ ok: false, error: "Only tutors can manage custom topics." }, { status: 403 });
  }

  const body = (await req.json()) as Payload;
  if (body.action === "create") {
    const title = body.title?.trim() ?? "";
    const sections = Array.isArray(body.sections)
      ? body.sections.map((item) => item.trim()).filter(Boolean)
      : [];
    if (!title || sections.length === 0) {
      return NextResponse.json({ ok: false, error: "Add a title and at least one subtopic." }, { status: 400 });
    }
    const topic = await createCustomTopic(title, sections);
    return NextResponse.json({ ok: true, topic });
  }

  if (body.action === "availability") {
    const topicId = body.topicId?.trim() ?? "";
    if (!topicId) {
      return NextResponse.json({ ok: false, error: "Missing topic id." }, { status: 400 });
    }
    const topic = await setCustomTopicAvailability(topicId, Boolean(body.available));
    if (!topic) {
      return NextResponse.json({ ok: false, error: "Topic not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, topic });
  }

  return NextResponse.json({ ok: false, error: "Invalid action." }, { status: 400 });
}
