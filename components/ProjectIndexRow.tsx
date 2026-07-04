"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import StatusBadge from "@/components/StatusBadge";
import StackTag from "@/components/StackTag";
import type { ProjectStatus } from "@/lib/content";

export interface ProjectRowData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  stack: string[];
  status: ProjectStatus;
  tags: string[];
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function ProjectIndexRow({
  project,
  index,
}: {
  project: ProjectRowData;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative grid grid-cols-1 items-center gap-4 border-b border-line py-8 transition-colors hover:bg-surface md:grid-cols-12"
    >
      <div className="flex items-center gap-2 font-mono text-muted md:col-span-2">
        <span className="text-utility opacity-40">.{pad(index + 1)}</span>
        <span className="text-caps uppercase">[{project.date.slice(0, 7)}]</span>
      </div>
      <h2 className="font-display text-headline-sm text-accent transition-transform duration-300 md:col-span-3 md:group-hover:translate-x-2">
        <Link
          href={`/projects/${project.slug}`}
          className="focus-visible:outline-2"
        >
          {project.title}
        </Link>
      </h2>
      <p className="font-serif text-body-md italic leading-relaxed text-muted md:col-span-4">
        {project.excerpt}
      </p>
      <div className="flex flex-wrap items-center gap-2 md:col-span-2">
        {project.stack.slice(0, 2).map((tech) => (
          <StackTag key={tech} label={tech} size="sm" />
        ))}
        <StatusBadge status={project.status} compact />
      </div>
      <div className="text-left md:col-span-1 md:text-right">
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`Read project: ${project.title}`}
          className="inline-flex items-center gap-1 font-mono text-utility text-accent"
        >
          Read{" "}
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </motion.article>
  );
}
