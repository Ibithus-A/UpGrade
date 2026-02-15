"use server";

import { redirect } from "next/navigation";
import {
  clearSession,
  createSession,
  isValidPasswordFormat,
  type UserRole,
  verifyCredentials,
} from "@/lib/auth";

function safeNextPath(raw: FormDataEntryValue | null) {
  if (typeof raw !== "string") return null;
  if (!raw.startsWith("/")) return null;
  if (raw.startsWith("//")) return null;
  return raw;
}

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "") as UserRole;
  const nextPath = safeNextPath(formData.get("next"));

  if (!email || !email.includes("@")) {
    redirect("/login?error=invalid_email");
  }
  if (!isValidPasswordFormat(password)) {
    redirect("/login?error=invalid_password");
  }
  if (role !== "student" && role !== "tutor") {
    redirect("/login?error=invalid_role");
  }
  if (!verifyCredentials(role, email, password)) {
    redirect("/login?error=invalid_credentials");
  }

  await createSession(role, email);

  if (nextPath && (role === "tutor" || nextPath !== "/tutor")) {
    redirect(nextPath);
  }
  redirect(role === "tutor" ? "/tutor" : "/student");
}

export async function signOutAction() {
  await clearSession();
  redirect("/login");
}
