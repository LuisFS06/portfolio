import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import StatusBadge from "@/components/StatusBadge";
import StackTag from "@/components/StackTag";
import { getAllProjects, getProjectBySlug } from "@/lib/content";

// Export estático: todos los slugs se resuelven en build time.
export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return {
    title: project?.title ?? "Project",
    description: project?.excerpt,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto w-full max-w-container px-margin-mobile pb-24 pt-16 md:px-margin-desktop">
      <header className="mb-12">
        <Link
          href="/projects"
          className="mb-8 inline-block font-mono text-caps uppercase text-muted transition-colors hover:text-accent"
        >
          ← INDEX
        </Link>
        <p className="mb-2 font-mono text-caps uppercase text-faint">
          PROJECT {"//"} {project.slug.replace(/-/g, "_").toUpperCase()}
        </p>
        <h1 className="mb-6 max-w-3xl font-display text-display-lg-mobile text-accent md:text-display-lg">
          {project.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="font-mono text-utility uppercase text-muted">
            {project.date.slice(0, 7)} · {project.role}
          </span>
          <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
            {project.stack.map((tech) => (
              <li key={tech}>
                <StackTag label={tech} size="sm" />
              </li>
            ))}
          </ul>
          <StatusBadge status={project.status} />
        </div>
      </header>

      <div className="relative mb-16 h-64 w-full max-w-4xl border border-line md:h-96">
        <Image
          src={project.heroImage}
          alt={project.heroImageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover"
          priority
        />
      </div>

      <div className="prose-logbook">
        <MDXRemote source={project.body} />
      </div>

      <footer className="mt-24 border-t border-line pt-8">
        <Link
          href="/projects"
          className="font-mono text-caps uppercase text-muted transition-colors hover:text-accent"
        >
          ← BACK_TO_INDEX
        </Link>
      </footer>
    </article>
  );
}
