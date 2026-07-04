import type { Metadata } from "next";
import ProjectsIndex from "@/components/ProjectsIndex";
import { getAllProjects, getAllProjectTags } from "@/lib/content";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Índice de ingeniería: proyectos de ML/AI ordenados cronológicamente.",
};

export default function ProyectosPage() {
  const projects = getAllProjects();
  const tags = getAllProjectTags();
  const lastSync = projects[0]?.date.slice(0, 7).replace("-", ".") ?? "—";

  const rows = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    excerpt: p.excerpt,
    stack: p.stack,
    status: p.status,
    tags: p.tags,
  }));

  return (
    <div className="mx-auto w-full max-w-container px-margin-mobile pb-24 pt-16 md:px-margin-desktop">
      <ProjectsIndex projects={rows} tags={tags} lastSync={lastSync} />
    </div>
  );
}
