import type { Metadata } from "next";
import { getAllPublications } from "@/lib/content";

export const metadata: Metadata = {
  title: "Publicaciones",
  description:
    "Archivo cronológico de publicaciones técnicas y contribuciones revisadas por pares.",
};

const TYPE_LABEL: Record<string, string> = {
  preprint: "PREPRINT",
  workshop: "WORKSHOP",
  journal: "JOURNAL",
  conference: "CONFERENCE",
};

const pad = (n: number) => String(n).padStart(3, "0");

export default function PublicacionesPage() {
  const publications = getAllPublications();

  return (
    <div className="mx-auto w-full max-w-container px-margin-mobile pb-24 pt-16 md:px-margin-desktop">
      <section className="mb-24">
        <p className="mb-2 font-mono text-caps uppercase tracking-widest text-accent">
          RESEARCH_OUTPUT_V4.02
        </p>
        <h1 className="mb-4 font-display text-display-lg-mobile text-foreground md:text-display-lg">
          Selected Publications
        </h1>
        <p className="max-w-2xl font-serif text-body-lg italic text-muted">
          A chronological archive of technical explorations, peer-reviewed
          contributions, and architectural deep-dives in the field of machine
          learning engineering.
        </p>
        <div className="mt-8 h-px w-full bg-gradient-to-r from-accent-50 to-accent-10" />
      </section>

      <section className="flex flex-col gap-24">
        {publications.map((pub, i) => (
          <article
            key={pub.slug}
            className="group grid grid-cols-1 gap-gutter md:grid-cols-12"
          >
            <div className="md:col-span-2">
              <span className="mb-2 block font-mono text-caps uppercase text-muted opacity-40">
                ITEM_{pad(i + 1)}
              </span>
              <time
                dateTime={pub.date}
                className="block font-mono text-utility text-accent"
              >
                {pub.date.replace(/-/g, ".")}
              </time>
              <span className="mt-1 block font-mono text-caps uppercase text-signal-ok">
                {TYPE_LABEL[pub.type] ?? pub.type.toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col gap-4 md:col-span-10">
              <h2 className="font-display text-display-md text-foreground transition-colors duration-300 group-hover:text-accent">
                {pub.title}
              </h2>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <span className="font-mono text-utility uppercase text-muted">
                  Venue: {pub.venue}
                </span>
                {pub.doi && (
                  <span className="font-mono text-utility uppercase text-muted">
                    DOI: {pub.doi}
                  </span>
                )}
                {pub.arxivId && (
                  <span className="font-mono text-utility uppercase text-muted">
                    arXiv: {pub.arxivId}
                  </span>
                )}
              </div>
              <div className="mt-4 border-l border-line pl-8">
                <p className="max-w-3xl font-serif text-body-md leading-relaxed text-muted">
                  {pub.body.trim()}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                {pub.links.paper && (
                  <a
                    href={pub.links.paper}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-line-strong px-6 py-2 font-mono text-caps uppercase text-foreground transition-colors hover:border-accent"
                  >
                    View_Paper
                  </a>
                )}
                {pub.links.code && (
                  <a
                    href={pub.links.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-elevated px-6 py-2 font-mono text-caps uppercase text-foreground transition-colors hover:bg-accent hover:text-accent-ink"
                  >
                    Codebase_Repo
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mb-12 mt-48 border-t border-line pt-12">
        <div className="flex items-end justify-between gap-8">
          <div className="max-w-xs">
            <p className="mb-4 font-mono text-caps uppercase text-muted">
              REDACTED_DATA_LOG
            </p>
            <p className="font-serif text-body-md text-muted opacity-60">
              All research cited above is subject to the Open Access licensing
              agreements of their respective publishers.
            </p>
          </div>
          <p className="font-mono text-4xl text-accent opacity-20" aria-hidden="true">
            {"//"}_EO_FILE
          </p>
        </div>
      </section>
    </div>
  );
}
