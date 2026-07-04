"use client";

import { useState } from "react";
import MicroCurve from "@/components/MicroCurve";
import ProjectIndexRow, { type ProjectRowData } from "@/components/ProjectIndexRow";

const ALL = "all_units";
const pad = (n: number) => String(n).padStart(2, "0");

export default function ProjectsIndex({
  projects,
  tags,
  lastSync,
}: {
  projects: ProjectRowData[];
  tags: string[];
  lastSync: string;
}) {
  const [activeTag, setActiveTag] = useState<string>(ALL);

  const visible =
    activeTag === ALL
      ? projects
      : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <>
      <header className="mb-16">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="font-display text-display-lg-mobile uppercase text-accent md:text-display-lg">
              Projects
            </h1>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2" aria-label="Filter by tag">
              {[ALL, ...tags].map((tag) => {
                const active = tag === activeTag;
                return (
                  <li key={tag}>
                    <button
                      type="button"
                      onClick={() => setActiveTag(tag)}
                      aria-pressed={active}
                      className={`font-mono text-utility transition-colors ${
                        active
                          ? "text-accent underline underline-offset-4"
                          : "text-muted hover:text-accent"
                      }`}
                    >
                      #{tag}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="shrink-0 text-left font-mono text-caps uppercase text-faint md:text-right">
            <p>ACTIVE_LOG_COUNT: {pad(visible.length)}</p>
            <p className="mt-1">LAST_SYNC: {lastSync}</p>
          </div>
        </div>
        <MicroCurve count={projects.length} className="mt-8 h-8 w-full opacity-30" />
      </header>

      <section className="flex flex-col border-t border-line" aria-live="polite">
        {visible.map((project, i) => (
          <ProjectIndexRow key={project.slug} project={project} index={i} />
        ))}
        {visible.length === 0 && (
          <p className="border-b border-line py-12 font-mono text-utility text-muted">
            NO_ENTRIES_FOR_TAG: #{activeTag}
          </p>
        )}
      </section>
    </>
  );
}
