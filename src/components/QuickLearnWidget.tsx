"use client";

import { useMemo, useState } from "react";

type QuickLearnWidgetProps = {
  studentMode?: boolean;
  open: boolean;
  onClose: () => void;
};

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

const starterPrompts = [
  "Explain this step in simpler terms",
  "Why did I lose marks here?",
  "Give me a similar practice question",
];

export function QuickLearnWidget({
  studentMode = true,
  open,
  onClose,
}: QuickLearnWidgetProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "QuickLearn preview is ready. AI responses are disabled for now.",
    },
  ]);

  const title = useMemo(
    () => (studentMode ? "QuickLearn" : "QuickLearn (Preview)"),
    [studentMode],
  );

  function sendMessage(nextText: string) {
    const text = nextText.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", text },
      {
        id: `a-${Date.now()}-preview`,
        role: "assistant",
        text: "Placeholder mode: connect your AI logic here.",
      },
    ]);
    setInput("");
  }

  return (
    <aside
      id="quicklearn-panel"
      className={[
        "flex h-full min-h-[70vh] flex-col overflow-hidden rounded-2xl border border-black/10 bg-[#f7f7f8] shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-[transform,opacity] duration-300",
        open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3",
      ].join(" ")}
      role="complementary"
      aria-label="QuickLearn chat assistant preview"
    >
      <div className="flex items-center justify-between border-b border-black/10 bg-white px-4 py-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-black/55">Course helper UI scaffold</p>
        </div>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          Close
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={[
                "max-w-[90%] rounded-2xl px-3 py-2 text-sm",
                m.role === "assistant"
                  ? "bg-white text-black/85 border border-black/10"
                  : "ml-auto bg-[#202123] text-white",
              ].join(" ")}
            >
              {m.text}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-black/10 bg-white px-4 py-3">
        <div className="mb-2 flex flex-wrap gap-2">
          {starterPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => sendMessage(prompt)}
              className="rounded-full bg-black/[0.04] px-3 py-1 text-xs text-black/70 hover:bg-black/[0.07]"
            >
              {prompt}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask QuickLearn…"
            className="field flex-1"
          />
          <button type="submit" className="btn btn-primary btn-sm">
            Send
          </button>
        </form>
      </div>
    </aside>
  );
}
