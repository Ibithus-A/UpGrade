"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      level: String(form.get("level") || ""),
      subject: String(form.get("subject") || ""),
      notes: String(form.get("notes") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("sent");
      setMessage("Thanks — we’ll get back to you shortly.");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section id="contact" className="section scroll-mt-24">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="h2">Contact UpGrade</h2>
            <p className="mt-2 max-w-lg lead">
              Tell us your goals and we’ll recommend the best plan. We also
              offer a <span className="font-semibold text-black">FREE 1-hour session</span>{" "}
              to get you started.
            </p>

            <div className="mt-6 card p-6">
              <p className="text-sm font-semibold">What you’ll get</p>
              <ul className="mt-3 space-y-2 text-sm text-black/70">
                <li>• A clear study plan aligned to your exam board</li>
                <li>• Structured practice + exam questions for each topic</li>
                <li>• High accountability through consistent check-ins</li>
              </ul>
              <p className="mt-4 text-sm text-black/60">
                Payments are handled via bank transfer after each lesson.
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="card p-6">
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1">
                  <label className="label" htmlFor="name">
                    Name
                  </label>
                  <input id="name" name="name" required className="field" placeholder="Your name" />
                </div>

                <div className="grid gap-1">
                  <label className="label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="field"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1">
                  <label className="label" htmlFor="phone">
                    Phone (optional)
                  </label>
                  <input id="phone" name="phone" className="field" placeholder="+44 ..." />
                </div>

                <div className="grid gap-1">
                  <label className="label" htmlFor="level">
                    Level
                  </label>
                  <select id="level" name="level" required className="select" defaultValue="">
                    <option value="" disabled>
                      Select
                    </option>
                    <option>GCSE</option>
                    <option>A-Level</option>
                    <option>International equivalent</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-1">
                <label className="label" htmlFor="subject">
                  Subject / Focus
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  className="field"
                  placeholder="e.g. A-Level Maths, GCSE Physics..."
                />
              </div>

              <div className="grid gap-1">
                <label className="label" htmlFor="notes">
                  Goals / Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  className="textarea"
                  placeholder="Target grade, exam board, weak topics, timeline..."
                />
              </div>

              <button disabled={status === "sending"} className="btn btn-primary btn-md w-full disabled:opacity-60">
                {status === "sending" ? "Sending..." : "Send enquiry"}
              </button>

              {message ? (
                <p className={["text-sm", status === "error" ? "text-red-600" : "text-black/70"].join(" ")}>
                  {message}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
