import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth";
import { signInAction } from "./actions";

type LoginPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: "Sign In",
  robots: {
    index: false,
    follow: false,
  },
};

function pickString(
  value: string | string[] | undefined,
  fallback: string,
): string {
  if (typeof value === "string") return value;
  return fallback;
}

function safeNextPath(raw: string | string[] | undefined) {
  if (typeof raw !== "string") return null;
  if (!raw.startsWith("/")) return null;
  if (raw.startsWith("//")) return null;
  return raw;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = (await searchParams) ?? {};
  const session = await readSession();

  const role = pickString(params.role, session?.role ?? "student");
  const nextPath = pickString(params.next, role === "tutor" ? "/tutor" : "/student");
  const error = pickString(params.error, "");
  const safeNext = safeNextPath(params.next);

  if (session && !error && safeNext) {
    redirect(safeNext);
  }

  return (
    <main id="main-content" className="section">
      <div className="container">
        <div className="mx-auto max-w-xl">
          <section className="card p-6 md:p-8">
            <p className="kicker">Portal access</p>
            <h1 className="mt-4 h2">Sign in as Student or Tutor</h1>
            <p className="mt-2 text-sm text-black/60">
              Enter your details to continue.
            </p>

            {error ? (
              <p className="mt-4 rounded-2xl border border-black/15 bg-black/[0.03] px-4 py-3 text-sm text-black/70">
                {error === "invalid_email" && "Enter a valid email address."}
                {error === "invalid_password" &&
                  "Password must be at least 8 characters."}
                {error === "invalid_role" && "Choose a valid role."}
                {error === "invalid_credentials" &&
                  "Email or password is incorrect for this role."}
              </p>
            ) : null}

            <form action={signInAction} className="mt-5 grid gap-4">
              <div>
                <p className="label">Role</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <label className="cursor-pointer rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm hover:bg-black/[0.02]">
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      defaultChecked={role !== "tutor"}
                      className="mr-2 align-middle"
                    />
                    <span className="align-middle">Student</span>
                  </label>
                  <label className="cursor-pointer rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm hover:bg-black/[0.02]">
                    <input
                      type="radio"
                      name="role"
                      value="tutor"
                      defaultChecked={role === "tutor"}
                      className="mr-2 align-middle"
                    />
                    <span className="align-middle">Tutor</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="field mt-1"
                  placeholder="name@example.com"
                  defaultValue={session?.email ?? ""}
                />
              </div>

              <div>
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  minLength={8}
                  className="field mt-1"
                  placeholder="At least 8 characters"
                />
              </div>

              <input type="hidden" name="next" value={nextPath} />

              <button type="submit" className="btn btn-primary btn-md w-full">
                Sign in
              </button>
            </form>

            <div className="mt-4 rounded-2xl bg-black/[0.03] p-4 text-xs text-black/60">
              Need help signing in? Use the contact form on the homepage.
            </div>
          </section>

          <div className="mt-5 text-center text-sm text-black/60">
            <Link href="/" className="ui-link">
              Return to main site
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
