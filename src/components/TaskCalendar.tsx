"use client";

import { useMemo, useState, type FormEvent } from "react";

type Task = {
  id: string;
  title: string;
  time: string;
  description: string;
  tags: string[];
};

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

export function TaskCalendar() {
  const today = useMemo(() => new Date(), []);
  const [viewMonth, setViewMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(today);
  const [tasksByDate, setTasksByDate] = useState<Record<string, Task[]>>({});
  const [title, setTitle] = useState("");
  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const [description, setDescription] = useState("");
  const [tagInput, setTagInput] = useState("");

  const monthStart = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  const monthEnd = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0);
  const daysInMonth = monthEnd.getDate();
  const firstDayIndex = monthStart.getDay();
  const selectedKey = dateKey(selectedDate);
  const selectedTasks = tasksByDate[selectedKey] ?? [];
  const formattedTime = `${hour}:${minute} ${period}`;

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

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;

    const tags = tagInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    const nextTask: Task = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: title.trim(),
      time: formattedTime,
      description: description.trim(),
      tags,
    };

    setTasksByDate((prev) => ({
      ...prev,
      [selectedKey]: [...(prev[selectedKey] ?? []), nextTask],
    }));
    setTitle("");
    setHour("09");
    setMinute("00");
    setPeriod("AM");
    setDescription("");
    setTagInput("");
  }

  function removeTask(taskId: string) {
    setTasksByDate((prev) => {
      const filtered = (prev[selectedKey] ?? []).filter((t) => t.id !== taskId);
      const next = { ...prev };
      if (filtered.length === 0) {
        delete next[selectedKey];
        return next;
      }
      next[selectedKey] = filtered;
      return next;
    });
  }

  return (
    <section id="task-calendar" className="section scroll-mt-24">
      <div className="container">
        <h2 className="h2">Task calendar</h2>
        <p className="mt-2 max-w-2xl lead">
          Pick a date, add tasks, and track time, description, and tags in one
          place.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card p-5 md:p-6">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={goToPreviousMonth}
                className="btn btn-ghost btn-sm"
                aria-label="Previous month"
              >
                Previous
              </button>
              <p className="text-sm font-semibold">{monthLabel(viewMonth)}</p>
              <button
                type="button"
                onClick={goToNextMonth}
                className="btn btn-ghost btn-sm"
                aria-label="Next month"
              >
                Next
              </button>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-2 text-center text-xs text-black/55">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
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
                const isToday = key === dateKey(today);
                const count = tasksByDate[key]?.length ?? 0;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedDate(dayDate)}
                    className={[
                      "h-12 rounded-2xl border text-sm font-medium",
                      isSelected
                        ? "bg-black text-white border-black"
                        : "bg-white text-black/75 border-black/10 hover:bg-black/[0.03]",
                    ].join(" ")}
                    aria-label={`${dayLabel(dayDate)} (${count} tasks)`}
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
            <p className="text-sm font-semibold">{dayLabel(selectedDate)}</p>

            <form onSubmit={addTask} className="mt-4 grid gap-3">
              <div>
                <label htmlFor="task-title" className="label">
                  Task
                </label>
                <input
                  id="task-title"
                  className="field mt-1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Finish chapter 5 questions"
                  required
                />
              </div>

              <div>
                <label htmlFor="task-time" className="label">
                  Time
                </label>
                <div id="task-time" className="mt-1 grid grid-cols-3 gap-2">
                  <select
                    className="select"
                    value={hour}
                    onChange={(e) => setHour(e.target.value)}
                    aria-label="Hour"
                  >
                    {Array.from({ length: 12 }).map((_, idx) => {
                      const value = String(idx + 1).padStart(2, "0");
                      return (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      );
                    })}
                  </select>

                  <select
                    className="select"
                    value={minute}
                    onChange={(e) => setMinute(e.target.value)}
                    aria-label="Minute"
                  >
                    {["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"].map(
                      (value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ),
                    )}
                  </select>

                  <select
                    className="select"
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
                <label htmlFor="task-description" className="label">
                  Description
                </label>
                <textarea
                  id="task-description"
                  className="textarea mt-1"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add notes for this task"
                />
              </div>

              <div>
                <label htmlFor="task-tags" className="label">
                  Tags
                </label>
                <input
                  id="task-tags"
                  className="field mt-1"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="comma-separated, e.g. maths, revision"
                />
              </div>

              <button type="submit" className="btn btn-primary btn-md w-full">
                Add task
              </button>
            </form>

            <div className="mt-5">
              <p className="text-sm font-semibold">Tasks ({selectedTasks.length})</p>
              <div className="mt-3 grid gap-3">
                {selectedTasks.length === 0 ? (
                  <p className="text-sm text-black/55">
                    No tasks yet for this date.
                  </p>
                ) : (
                  selectedTasks.map((task) => (
                    <article key={task.id} className="rounded-2xl border border-black/10 bg-black/[0.02] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold">{task.title}</p>
                          {task.time ? (
                            <p className="text-xs text-black/60">Time: {task.time}</p>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeTask(task.id)}
                          className="btn btn-ghost btn-sm"
                        >
                          Remove
                        </button>
                      </div>

                      {task.description ? (
                        <p className="mt-2 text-sm text-black/70">{task.description}</p>
                      ) : null}

                      {task.tags.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {task.tags.map((tag) => (
                            <span
                              key={`${task.id}-${tag}`}
                              className="rounded-full bg-black/10 px-2.5 py-1 text-xs text-black/70"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
