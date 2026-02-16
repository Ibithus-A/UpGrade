import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { makeModuleKey } from "@/lib/course-module-common";

export type StoredSubmission = {
  studentEmail: string;
  answerPdfPath: string;
  submittedAt: string;
  passed: boolean;
  reviewedAt?: string;
  reviewedBy?: string;
};

export type StoredModule = {
  chapterSlug: string;
  section: string;
  notePdfPath?: string;
  examPdfPath?: string;
  submissions: StoredSubmission[];
};

export type ChapterAssessment = {
  chapterSlug: string;
  examPdfPath?: string;
  submissions: StoredSubmission[];
};

export type CustomTopic = {
  id: string;
  title: string;
  sections: string[];
  available: boolean;
};

type StoreShape = {
  modules: Record<string, StoredModule>;
  chapterAssessments: Record<string, ChapterAssessment>;
  customTopics: CustomTopic[];
  manualChapterUnlocks: Record<string, boolean>;
};

const STORE_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(STORE_DIR, "course-modules.json");
const PUBLIC_FILES_DIR = path.join(process.cwd(), "public", "course-files");

function sanitizeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-");
}

function sanitizeTopicId(value: string) {
  const safe = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return safe || randomUUID();
}

async function ensureStoreDir() {
  await mkdir(STORE_DIR, { recursive: true });
}

export async function ensurePublicFilesDir() {
  await mkdir(PUBLIC_FILES_DIR, { recursive: true });
}

function normalizeStoreShape(input: unknown): StoreShape {
  const parsed = input as Partial<StoreShape> | null;
  return {
    modules: parsed?.modules && typeof parsed.modules === "object" ? parsed.modules : {},
    chapterAssessments:
      parsed?.chapterAssessments && typeof parsed.chapterAssessments === "object"
        ? parsed.chapterAssessments
        : {},
    customTopics: Array.isArray(parsed?.customTopics) ? parsed.customTopics : [],
    manualChapterUnlocks:
      parsed?.manualChapterUnlocks && typeof parsed.manualChapterUnlocks === "object"
        ? parsed.manualChapterUnlocks
        : {},
  };
}

async function readStore(): Promise<StoreShape> {
  await ensureStoreDir();
  try {
    const raw = await readFile(STORE_FILE, "utf8");
    return normalizeStoreShape(JSON.parse(raw));
  } catch {
    return {
      modules: {},
      chapterAssessments: {},
      customTopics: [],
      manualChapterUnlocks: {},
    };
  }
}

async function writeStore(store: StoreShape) {
  await ensureStoreDir();
  await writeFile(STORE_FILE, JSON.stringify(store, null, 2), "utf8");
}

function getOrInitModule(store: StoreShape, chapterSlug: string, section: string) {
  const key = makeModuleKey(chapterSlug, section);
  const existing = store.modules[key];
  if (existing) return { key, module: existing };
  const moduleRecord: StoredModule = {
    chapterSlug,
    section,
    submissions: [],
  };
  store.modules[key] = moduleRecord;
  return { key, module: moduleRecord };
}

function getOrInitChapterAssessment(store: StoreShape, chapterSlug: string) {
  const existing = store.chapterAssessments[chapterSlug];
  if (existing) return existing;
  const assessment: ChapterAssessment = {
    chapterSlug,
    submissions: [],
  };
  store.chapterAssessments[chapterSlug] = assessment;
  return assessment;
}

export async function savePdfFile(file: File) {
  await ensurePublicFilesDir();
  const original = sanitizeFileName(file.name || "document.pdf");
  const filename = `${Date.now()}-${randomUUID()}-${original}`;
  const absolutePath = path.join(PUBLIC_FILES_DIR, filename);
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(absolutePath, bytes);
  return `/course-files/${filename}`;
}

export async function listModules(chapterSlug?: string) {
  const store = await readStore();
  const all = Object.values(store.modules);
  if (!chapterSlug) return all;
  return all.filter((m) => m.chapterSlug === chapterSlug);
}

export async function upsertModuleAsset(
  chapterSlug: string,
  section: string,
  kind: "notes" | "exam",
  pdfPath: string,
) {
  const store = await readStore();
  const { module } = getOrInitModule(store, chapterSlug, section);
  if (kind === "notes") module.notePdfPath = pdfPath;
  if (kind === "exam") module.examPdfPath = pdfPath;
  await writeStore(store);
  return module;
}

export async function upsertStudentSubmission(
  chapterSlug: string,
  section: string,
  studentEmail: string,
  answerPdfPath: string,
) {
  const store = await readStore();
  const { module } = getOrInitModule(store, chapterSlug, section);
  const now = new Date().toISOString();
  const existing = module.submissions.find((s) => s.studentEmail === studentEmail);
  if (existing) {
    existing.answerPdfPath = answerPdfPath;
    existing.submittedAt = now;
    existing.passed = false;
    existing.reviewedAt = undefined;
    existing.reviewedBy = undefined;
  } else {
    module.submissions.push({
      studentEmail,
      answerPdfPath,
      submittedAt: now,
      passed: false,
    });
  }
  await writeStore(store);
  return module;
}

export async function markSubmissionPassed(
  chapterSlug: string,
  section: string,
  studentEmail: string,
  tutorEmail: string,
) {
  const store = await readStore();
  const { module } = getOrInitModule(store, chapterSlug, section);
  const entry = module.submissions.find((s) => s.studentEmail === studentEmail);
  if (!entry) return null;
  entry.passed = true;
  entry.reviewedAt = new Date().toISOString();
  entry.reviewedBy = tutorEmail;
  await writeStore(store);
  return module;
}

export async function upsertChapterExamPdf(chapterSlug: string, pdfPath: string) {
  const store = await readStore();
  const assessment = getOrInitChapterAssessment(store, chapterSlug);
  assessment.examPdfPath = pdfPath;
  await writeStore(store);
  return assessment;
}

export async function upsertChapterSubmission(
  chapterSlug: string,
  studentEmail: string,
  answerPdfPath: string,
) {
  const store = await readStore();
  const assessment = getOrInitChapterAssessment(store, chapterSlug);
  const now = new Date().toISOString();
  const existing = assessment.submissions.find((s) => s.studentEmail === studentEmail);
  if (existing) {
    existing.answerPdfPath = answerPdfPath;
    existing.submittedAt = now;
    existing.passed = false;
    existing.reviewedAt = undefined;
    existing.reviewedBy = undefined;
  } else {
    assessment.submissions.push({
      studentEmail,
      answerPdfPath,
      submittedAt: now,
      passed: false,
    });
  }
  await writeStore(store);
  return assessment;
}

export async function markChapterPassed(chapterSlug: string, studentEmail: string, tutorEmail: string) {
  const store = await readStore();
  const assessment = getOrInitChapterAssessment(store, chapterSlug);
  const entry = assessment.submissions.find((s) => s.studentEmail === studentEmail);
  if (!entry) return null;
  entry.passed = true;
  entry.reviewedAt = new Date().toISOString();
  entry.reviewedBy = tutorEmail;
  await writeStore(store);
  return assessment;
}

export async function listChapterAssessments() {
  const store = await readStore();
  return store.chapterAssessments;
}

export async function setManualChapterUnlock(chapterSlug: string, unlocked: boolean) {
  const store = await readStore();
  store.manualChapterUnlocks[chapterSlug] = unlocked;
  await writeStore(store);
  return store.manualChapterUnlocks;
}

export async function listManualChapterUnlocks() {
  const store = await readStore();
  return store.manualChapterUnlocks;
}

export async function listCustomTopics() {
  const store = await readStore();
  return store.customTopics;
}

export async function createCustomTopic(title: string, sections: string[]) {
  const store = await readStore();
  const id = sanitizeTopicId(`${title}-${Date.now()}`);
  const topic: CustomTopic = {
    id,
    title: title.trim(),
    sections: sections.filter(Boolean),
    available: true,
  };
  store.customTopics.push(topic);
  await writeStore(store);
  return topic;
}

export async function setCustomTopicAvailability(topicId: string, available: boolean) {
  const store = await readStore();
  const topic = store.customTopics.find((item) => item.id === topicId);
  if (!topic) return null;
  topic.available = available;
  await writeStore(store);
  return topic;
}

export async function getCustomTopic(topicId: string) {
  const store = await readStore();
  return store.customTopics.find((item) => item.id === topicId) ?? null;
}
