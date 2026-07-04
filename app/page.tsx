import Image from "next/image";
import Link from "next/link";
import HeroDeck from "@/components/HeroDeck";
import { getFeaturedProjects, getAllPublications, getResume } from "@/lib/content";
import { withBasePath } from "@/lib/basePath";

function formatLogDate(date: string): string {
  const [y, m, d] = date.split("-");
  return `${d}.${m}.${y}`;
}

export default function HomePage() {
  const featured = getFeaturedProjects();
  const resume = getResume();
  const lastPublication = getAllPublications()[0];

  const slides = featured.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    role: p.role,
    stack: p.stack,
    status: p.status,
    heroImage: p.heroImage,
    heroImageAlt: p.heroImageAlt,
    thesis: p.thesis,
  }));

  return (
    <>
      <HeroDeck slides={slides} />

      {/* Bio corta + preview del último log */}
      <section className="mx-auto grid w-full max-w-container grid-cols-1 gap-gutter px-margin-mobile py-16 md:grid-cols-12 md:px-margin-desktop md:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8 md:col-span-7">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border border-line p-1">
            <Image
              src={resume.photo}
              alt={`Retrato de ${resume.name}`}
              width={96}
              height={96}
              className="h-full w-full rounded-full object-cover contrast-125 grayscale"
            />
          </div>
          <div>
            <h2 className="mb-4 font-display text-headline-sm text-accent">
              Engineer_Bio.log
            </h2>
            <p className="mb-6 max-w-xl font-serif text-body-lg italic leading-relaxed text-muted">
              “{resume.bio.trim()}”
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${resume.contact.email}`}
                className="bg-accent px-6 py-2 font-mono text-caps uppercase text-accent-ink transition-opacity hover:opacity-90"
              >
                Contact_Me
              </a>
              <a
                href={withBasePath(resume.contact.cvFile)}
                className="border border-line px-6 py-2 font-mono text-caps uppercase text-accent transition-colors hover:bg-panel"
              >
                CV_Download
              </a>
            </div>
          </div>
        </div>

        {lastPublication && (
          <div className="md:col-span-5">
            <Link
              href="/publicaciones"
              className="group block border border-line bg-surface p-6 transition-colors hover:bg-panel"
            >
              <span className="mb-2 block font-mono text-caps uppercase text-faint">
                LAST_LOG_ENTRY {"//"} {formatLogDate(lastPublication.date)}
              </span>
              <h3 className="mb-3 font-display text-headline-sm text-accent">
                {lastPublication.title}
              </h3>
              <p className="line-clamp-2 font-mono text-utility leading-relaxed text-muted opacity-70">
                {lastPublication.body.trim()}
              </p>
              <span className="mt-4 flex items-center justify-between">
                <span className="font-mono text-caps uppercase text-muted underline underline-offset-4 transition-colors group-hover:text-accent">
                  READ_FULL_LOG
                </span>
                <span aria-hidden="true" className="font-mono text-accent">
                  →
                </span>
              </span>
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
