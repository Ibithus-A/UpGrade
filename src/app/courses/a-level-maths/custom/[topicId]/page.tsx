import { notFound, redirect } from "next/navigation";
import { readSession } from "@/lib/auth";
import { CourseModuleWorkspace } from "@/components/CourseModuleWorkspace";
import { getCustomTopic } from "@/lib/course-module-store";

type CustomTopicPageProps = {
  params: Promise<{ topicId: string }>;
};

export default async function CustomTopicPage({ params }: CustomTopicPageProps) {
  const { topicId } = await params;
  const session = await readSession();
  if (!session) redirect("/login?next=/courses/a-level-maths");

  const topic = await getCustomTopic(topicId);
  if (!topic) notFound();
  if (!topic.available && session.role !== "tutor") notFound();

  return (
    <section className="card p-6 md:p-8">
      <p className="kicker">Custom topic</p>
      <h1 className="mt-4 h2">{topic.title}</h1>
      <p className="mt-2 text-sm text-black/60">
        Tutor-managed custom plan module.
      </p>

      <CourseModuleWorkspace
        chapter={{
          id: 1000,
          slug: `custom-${topic.id}`,
          title: topic.title,
          sections: topic.sections,
          noteStatus: "empty",
        }}
        role={session.role === "tutor" ? "tutor" : "student"}
      />
    </section>
  );
}
