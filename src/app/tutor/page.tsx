import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { TaskCalendar } from "@/components/TaskCalendar";
import { readSession } from "@/lib/auth";
import { signOutAction } from "@/app/login/actions";

export const metadata: Metadata = {
  title: "Tutor Workspace",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function TutorPage() {
  const session = await readSession();
  if (!session) redirect("/login?role=tutor&next=/tutor");
  if (session.role !== "tutor") redirect("/student");

  return (
    <main id="main-content">
      <section className="section">
        <div className="container">
          <div className="card p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="kicker">Tutor portal</p>
                <h1 className="mt-3 h2">Welcome back</h1>
                <p className="mt-2 text-sm text-black/60">
                  Signed in as {session.email}
                </p>
              </div>
              <form action={signOutAction}>
                <button type="submit" className="btn btn-secondary btn-sm">
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <TaskCalendar role="tutor" />
    </main>
  );
}
