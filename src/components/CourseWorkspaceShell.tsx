"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { Course } from "@/lib/course-content";
import { CourseSidebar } from "@/components/CourseSidebar";
import { QuickLearnWidget } from "@/components/QuickLearnWidget";

export function CourseWorkspaceShell({
  course,
  children,
}: {
  course: Course;
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (!sidebarOpen) return;
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setSidebarOpen(false);
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEsc);
    };
  }, [sidebarOpen]);

  return (
    <div className="relative flex min-w-0 flex-col gap-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => !chatOpen && setSidebarOpen((v) => !v)}
          className={[
            "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white/90 text-black/80 shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-[background-color,color,opacity] ui-motion hover:bg-white hover:text-black",
            chatOpen ? "pointer-events-none opacity-40" : "",
          ].join(" ")}
          aria-expanded={sidebarOpen}
          aria-controls="course-sidebar-drawer"
          aria-label="Toggle course menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => {
            setSidebarOpen(false);
            setChatOpen((v) => !v);
          }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-[background-color,opacity] ui-motion hover:bg-black/90"
          aria-label="Toggle QuickLearn"
          aria-expanded={chatOpen}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3.5" y="4.5" width="17" height="13" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M3.5 8h17" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="6.5" cy="6.2" r="0.8" fill="currentColor" />
            <circle cx="9" cy="6.2" r="0.8" fill="currentColor" />
            <path d="M10 20h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-sm font-semibold text-black/75">Course content</p>
      </div>

      <div className="relative min-w-0">
        <div
          className={[
            "transition-[transform,opacity] ui-motion",
            chatOpen
              ? "pointer-events-none absolute inset-0 translate-y-2 opacity-0"
              : "relative translate-y-0 opacity-100",
          ].join(" ")}
        >
          {children}
        </div>
        <div
          className={[
            "transition-[transform,opacity] ui-motion",
            chatOpen
              ? "relative translate-y-0 opacity-100"
              : "pointer-events-none absolute inset-0 -translate-y-2 opacity-0",
          ].join(" ")}
        >
          <QuickLearnWidget
            studentMode
            open={chatOpen}
            onClose={() => setChatOpen(false)}
          />
        </div>
      </div>

      <div
        className={[
          "fixed inset-0 z-40 bg-black/25 transition-opacity ui-motion",
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <div
        id="course-sidebar-drawer"
        className={[
          "fixed top-0 left-0 z-50 h-dvh w-[min(92vw,380px)] overflow-y-auto overscroll-y-contain p-3 transition-transform ui-motion",
          sidebarOpen ? "translate-x-0" : "pointer-events-none -translate-x-[105%]",
        ].join(" ")}
      >
        <CourseSidebar course={course} drawerMode showCloseButton onClose={() => setSidebarOpen(false)} />
      </div>
    </div>
  );
}
