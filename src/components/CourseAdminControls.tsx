"use client";

import { useCallback, useEffect, useState } from "react";
import type { Course } from "@/lib/course-content";

type CustomTopic = {
  id: string;
  title: string;
  sections: string[];
  available: boolean;
};

type ModuleResponse = {
  ok: boolean;
  manualChapterUnlocks?: Record<string, boolean>;
};

type CustomTopicsResponse = {
  ok: boolean;
  topics?: CustomTopic[];
};

export function CourseAdminControls({ course }: { course: Course }) {
  const [manualUnlocks, setManualUnlocks] = useState<Record<string, boolean>>({});
  const [customTopics, setCustomTopics] = useState<CustomTopic[]>([]);
  const [title, setTitle] = useState("");
  const [sectionsRaw, setSectionsRaw] = useState("");

  const refresh = useCallback(async () => {
    const [moduleRes, customRes] = await Promise.all([
      fetch("/api/course/module", { cache: "no-store" }),
      fetch("/api/course/custom-topic", { cache: "no-store" }),
    ]);
    const moduleData = (await moduleRes.json()) as ModuleResponse;
    const customData = (await customRes.json()) as CustomTopicsResponse;
    if (moduleRes.ok && moduleData.ok) {
      setManualUnlocks(moduleData.manualChapterUnlocks ?? {});
    }
    if (customRes.ok && customData.ok) {
      setCustomTopics(customData.topics ?? []);
    }
  }, []);

  useEffect(() => {
    let active = true;

    Promise.all([
      fetch("/api/course/module", { cache: "no-store" }),
      fetch("/api/course/custom-topic", { cache: "no-store" }),
    ])
      .then(async ([moduleRes, customRes]) => {
        if (!active) return;

        const moduleData = (await moduleRes.json()) as ModuleResponse;
        const customData = (await customRes.json()) as CustomTopicsResponse;
        if (!active) return;

        if (moduleRes.ok && moduleData.ok) {
          setManualUnlocks(moduleData.manualChapterUnlocks ?? {});
        }
        if (customRes.ok && customData.ok) {
          setCustomTopics(customData.topics ?? []);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  async function toggleUnlock(chapterSlug: string, unlocked: boolean) {
    await fetch("/api/course/module/pass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: "unlock", chapterSlug, unlocked }),
    });
    await refresh();
  }

  async function createTopic(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const sections = sectionsRaw
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    if (!title.trim() || sections.length === 0) return;
    await fetch("/api/course/custom-topic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create", title: title.trim(), sections }),
    });
    setTitle("");
    setSectionsRaw("");
    await refresh();
  }

  async function setAvailability(topicId: string, available: boolean) {
    await fetch("/api/course/custom-topic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "availability", topicId, available }),
    });
    await refresh();
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      <article className="rounded-2xl border border-black/10 bg-white p-4">
        <p className="text-sm font-semibold">Topic unlock controls</p>
        <p className="mt-1 text-xs text-black/55">
          Force unlock specific topics for custom plans.
        </p>
        <div className="mt-3 flex flex-col gap-2">
          {course.chapters.slice(1).map((chapter) => (
            <label
              key={chapter.slug}
              className="flex items-center justify-between rounded-lg border border-black/10 px-3 py-2 text-sm"
            >
              <span className="min-w-0 break-words pr-2 leading-tight">{chapter.title}</span>
              <input
                type="checkbox"
                checked={Boolean(manualUnlocks[chapter.slug])}
                onChange={(e) => void toggleUnlock(chapter.slug, e.target.checked)}
              />
            </label>
          ))}
        </div>
      </article>

      <article className="rounded-2xl border border-black/10 bg-white p-4">
        <p className="text-sm font-semibold">Custom topics</p>
        <form onSubmit={createTopic} className="mt-3 flex flex-col gap-3">
          <input
            className="field"
            placeholder="Custom topic title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="textarea"
            rows={4}
            placeholder="Subtopics (one per line)"
            value={sectionsRaw}
            onChange={(e) => setSectionsRaw(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-sm w-full sm:w-auto">
            Add custom topic
          </button>
        </form>

        {customTopics.length > 0 ? (
          <div className="mt-4 flex flex-col gap-2">
            {customTopics.map((topic) => (
              <div
                key={topic.id}
                className="flex items-center justify-between rounded-lg border border-black/10 px-3 py-2 text-sm"
              >
                <span className="min-w-0 break-words pr-2 leading-tight">{topic.title}</span>
                <label className="flex items-center gap-2 text-xs text-black/60">
                  Available
                  <input
                    type="checkbox"
                    checked={topic.available}
                    onChange={(e) => void setAvailability(topic.id, e.target.checked)}
                  />
                </label>
              </div>
            ))}
          </div>
        ) : null}
      </article>
    </div>
  );
}
