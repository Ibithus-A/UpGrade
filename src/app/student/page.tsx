import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth";
import { signOutAction } from "@/app/login/actions";
import { TaskCalendar } from "@/components/TaskCalendar";

export const metadata: Metadata = {
  title: "Student Portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function StudentPage() {
  const session = await readSession();
  if (!session) redirect("/login?role=student&next=/student");
  if (session.role !== "student") redirect("/tutor");

  return (
    <main id="main-content" className="section">
      <div className="container">
        <div className="mx-auto max-w-3xl card p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="kicker">Student portal</p>
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

          <div className="mt-6 rounded-2xl bg-black/[0.03] p-5">
            <p className="text-sm text-black/70">
              Your calendar is read-only. The tutor manages lesson scheduling,
              and you can view all lesson times and descriptions here.
            </p>
            <Link href="/" className="mt-4 btn btn-ghost btn-sm">
              Back to homepage
            </Link>
          </div>
        </div>
      </div>

      <TaskCalendar role="student" />
    </main>
  );
}
