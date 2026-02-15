"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

type Lesson = {
  id: string;
  title: string;
  time: string;
  description: string;
};

type TaskCalendarProps = {
  role: "tutor" | "student";
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const minuteOptions = [
  "00",
  "05",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
];
const hourOptions = Array.from({ length: 12 }, (_, idx) =>
  String(idx + 1).padStart(2, "0"),
);
const calendarStorageKey = "upgrade_lessons_v1";

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function monthLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function dayLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function TaskCalendar({ role }: TaskCalendarProps) {
  const isTutor = role === "tutor";
  const today = useMemo(() => new Date(), []);
  const [viewMonth, setViewMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(today);
  const [lessonsByDate, setLessonsByDate] = useState<Record<string, Lesson[]>>({});
  const [hydrated, setHydrated] = useState(false);

  const [title, setTitle] = useState("");
  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingHour, setEditingHour] = useState("09");
  const [editingMinute, setEditingMinute] = useState("00");
  const [editingPeriod, setEditingPeriod] = useState<"AM" | "PM">("AM");
  const [editingDescription, setEditingDescription] = useState("");

  const monthStart = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  const monthEnd = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0);
  const daysInMonth = monthEnd.getDate();
  const firstDayIndex = monthStart.getDay();
  const selectedKey = dateKey(selectedDate);
  const todayKey = dateKey(today);
  const selectedLessons = lessonsByDate[selectedKey] ?? [];
  const formattedTime = `${hour}:${minute} ${period}`;
  const submitDisabled = !title.trim() || !description.trim();

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(calendarStorageKey);
      if (!raw) {
        setHydrated(true);
        return;
      }
      const parsed = JSON.parse(raw) as Record<string, Lesson[]>;
      if (parsed && typeof parsed === "object") {
        setLessonsByDate(parsed);
      }
    } catch {
      setLessonsByDate({});
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(calendarStorageKey, JSON.stringify(lessonsByDate));
  }, [lessonsByDate, hydrated]);

  function goToPreviousMonth() {
    setViewMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  }

  function goToNextMonth() {
    setViewMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  }

  function goToToday() {
    const nextToday = new Date();
    setSelectedDate(nextToday);
    setViewMonth(new Date(nextToday.getFullYear(), nextToday.getMonth(), 1));
  }

  function addLesson(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitDisabled) return;

    const nextLesson: Lesson = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: title.trim(),
      time: formattedTime,
      description: description.trim(),
    };

    setLessonsByDate((prev) => ({
      ...prev,
      [selectedKey]: [...(prev[selectedKey] ?? []), nextLesson],
    }));

    setTitle("");
    setHour("09");
    setMinute("00");
    setPeriod("AM");
    setDescription("");
  }

  function removeLesson(lessonId: string) {
    setLessonsByDate((prev) => {
      const filtered = (prev[selectedKey] ?? []).filter((t) => t.id !== lessonId);
      const next = { ...prev };
      if (filtered.length === 0) {
        delete next[selectedKey];
        return next;
      }
      next[selectedKey] = filtered;
      return next;
    });
  }

  function beginEdit(lesson: Lesson) {
    const [timePart, periodPart] = lesson.time.split(" ");
    const [lessonHour = "09", lessonMinute = "00"] = (timePart ?? "").split(":");
    setEditingId(lesson.id);
    setEditingHour(lessonHour);
    setEditingMinute(lessonMinute);
    setEditingPeriod(periodPart === "PM" ? "PM" : "AM");
    setEditingDescription(lesson.description);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingHour("09");
    setEditingMinute("00");
    setEditingPeriod("AM");
    setEditingDescription("");
  }

  function saveEdit(lessonId: string) {
    const nextDescription = editingDescription.trim();
    if (!nextDescription) return;
    const nextTime = `${editingHour}:${editingMinute} ${editingPeriod}`;
    setLessonsByDate((prev) => ({
      ...prev,
      [selectedKey]: (prev[selectedKey] ?? []).map((lesson) =>
        lesson.id === lessonId
          ? { ...lesson, time: nextTime, description: nextDescription }
          : lesson,
      ),
    }));
    cancelEdit();
  }

  return (
    <section id="lesson-calendar" className="section scroll-mt-24">
      <div className="container">
        <h2 className="h2">Lesson calendar</h2>
        <p className="mt-2 max-w-2xl lead">
          {isTutor
            ? "Manage lesson schedule with polished controls and quick edits."
            : "View your upcoming lessons, including time and lesson notes."}
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  className="btn btn-ghost btn-sm"
                  aria-label="Previous month"
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  onClick={goToNextMonth}
                  className="btn btn-ghost btn-sm"
                  aria-label="Next month"
                >
                  Next →
                </button>
              </div>
              <p className="text-sm font-semibold tracking-[-0.01em]">
                {monthLabel(viewMonth)}
              </p>
              <button
                type="button"
                onClick={goToToday}
                className="btn btn-secondary btn-sm"
              >
                Today
              </button>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-2 text-center text-xs text-black/55">
              {weekDays.map((day) => (
                <p key={day}>{day}</p>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-7 gap-2">
              {Array.from({ length: firstDayIndex }).map((_, idx) => (
                <div key={`blank-${idx}`} className="h-12 rounded-2xl" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const day = idx + 1;
                const dayDate = new Date(
                  viewMonth.getFullYear(),
                  viewMonth.getMonth(),
                  day,
                );
                const key = dateKey(dayDate);
                const isSelected = key === selectedKey;
                const isToday = key === todayKey;
                const count = lessonsByDate[key]?.length ?? 0;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedDate(dayDate)}
                    className={[
                      "h-12 rounded-2xl border text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 transition-all duration-200",
                      isSelected
                        ? "bg-black text-white border-black shadow-[0_8px_16px_rgba(0,0,0,0.18)]"
                        : "bg-white text-black/75 border-black/10 hover:bg-black/[0.03] hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(0,0,0,0.08)]",
                    ].join(" ")}
                    aria-label={`${dayLabel(dayDate)} (${count} lessons)`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>{day}</span>
                      {count > 0 ? (
                        <span
                          className={[
                            "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px]",
                            isSelected ? "bg-white/20 text-white" : "bg-black/10 text-black/70",
                          ].join(" ")}
                        >
                          {count}
                        </span>
                      ) : null}
                      {isToday && !isSelected ? (
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-black/40" />
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="card p-5 md:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">{dayLabel(selectedDate)}</p>
              {isTutor ? (
                <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/65">
                  {formattedTime}
                </span>
              ) : null}
            </div>

            {isTutor ? (
              <form
                onSubmit={addLesson}
                className="mt-4 grid gap-3 rounded-2xl border border-black/10 bg-black/[0.015] p-4"
              >
                <div>
                  <label htmlFor="lesson-title" className="label">
                    Lesson title
                  </label>
                  <input
                    id="lesson-title"
                    className="field mt-1"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Algebra fundamentals"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lesson-time-hour" className="label">
                    Time
                  </label>
                  <div className="mt-1 grid grid-cols-3 gap-2">
                    <select
                      id="lesson-time-hour"
                      className="select hover:bg-black/[0.02]"
                      value={hour}
                      onChange={(e) => setHour(e.target.value)}
                      aria-label="Hour"
                    >
                      {hourOptions.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                    <select
                      className="select hover:bg-black/[0.02]"
                      value={minute}
                      onChange={(e) => setMinute(e.target.value)}
                      aria-label="Minute"
                    >
                      {minuteOptions.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                    <select
                      className="select hover:bg-black/[0.02]"
                      value={period}
                      onChange={(e) => setPeriod(e.target.value as "AM" | "PM")}
                      aria-label="AM or PM"
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="lesson-description" className="label">
                    Description
                  </label>
                  <textarea
                    id="lesson-description"
                    className="textarea mt-1"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What will be covered in this lesson?"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitDisabled}
                  className={[
                    "btn btn-primary btn-md w-full",
                    submitDisabled ? "pointer-events-none opacity-60" : "",
                  ].join(" ")}
                >
                  Add lesson
                </button>
              </form>
            ) : null}

            <div className="mt-5">
              <p className="text-sm font-semibold">
                Lessons ({selectedLessons.length})
              </p>
              <div className="mt-3 grid gap-3">
                {!hydrated ? (
                  <div className="rounded-2xl border border-dashed border-black/15 bg-black/[0.02] px-4 py-6 text-center text-sm text-black/55">
                    Loading calendar...
                  </div>
                ) : selectedLessons.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-black/15 bg-black/[0.02] px-4 py-6 text-center text-sm text-black/55">
                    No lessons scheduled for this date.
                  </div>
                ) : (
                  selectedLessons.map((lesson) => {
                    const isEditing = editingId === lesson.id;
                    return (
                      <article
                        key={lesson.id}
                        className="animate-fadeUp rounded-2xl border border-black/10 bg-black/[0.02] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(0,0,0,0.06)]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold">{lesson.title}</p>
                            <p className="text-xs text-black/60">Time: {lesson.time}</p>
                          </div>
                          {isTutor ? (
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => (isEditing ? cancelEdit() : beginEdit(lesson))}
                                className="btn btn-ghost btn-sm shrink-0"
                              >
                                {isEditing ? "Cancel" : "Edit"}
                              </button>
                              <button
                                type="button"
                                onClick={() => removeLesson(lesson.id)}
                                className="btn btn-ghost btn-sm shrink-0"
                              >
                                Remove
                              </button>
                            </div>
                          ) : null}
                        </div>

                        {isTutor && isEditing ? (
                          <div className="mt-3 grid gap-3 rounded-2xl border border-black/10 bg-white p-3">
                            <div className="grid grid-cols-3 gap-2">
                              <select
                                className="select"
                                value={editingHour}
                                onChange={(e) => setEditingHour(e.target.value)}
                                aria-label="Edit hour"
                              >
                                {hourOptions.map((value) => (
                                  <option key={value} value={value}>
                                    {value}
                                  </option>
                                ))}
                              </select>
                              <select
                                className="select"
                                value={editingMinute}
                                onChange={(e) => setEditingMinute(e.target.value)}
                                aria-label="Edit minute"
                              >
                                {minuteOptions.map((value) => (
                                  <option key={value} value={value}>
                                    {value}
                                  </option>
                                ))}
                              </select>
                              <select
                                className="select"
                                value={editingPeriod}
                                onChange={(e) =>
                                  setEditingPeriod(e.target.value as "AM" | "PM")
                                }
                                aria-label="Edit period"
                              >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                              </select>
                            </div>
                            <textarea
                              className="textarea"
                              rows={3}
                              value={editingDescription}
                              onChange={(e) => setEditingDescription(e.target.value)}
                              placeholder="Lesson description"
                            />
                            <button
                              type="button"
                              onClick={() => saveEdit(lesson.id)}
                              disabled={!editingDescription.trim()}
                              className={[
                                "btn btn-primary btn-sm w-full",
                                !editingDescription.trim() ? "pointer-events-none opacity-60" : "",
                              ].join(" ")}
                            >
                              Save changes
                            </button>
                          </div>
                        ) : (
                          <p className="mt-2 text-sm text-black/70">{lesson.description}</p>
                        )}
                      </article>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
