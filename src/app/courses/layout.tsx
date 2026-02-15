import type { Metadata } from "next";
import { type ReactNode } from "react";
import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CoursesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await readSession();
  if (!session) redirect("/login?next=/courses");

  return children;
}
