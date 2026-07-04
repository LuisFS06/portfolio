import type { Metadata } from "next";
import Image from "next/image";
import MicroCurve from "@/components/MicroCurve";
import { getResume } from "@/lib/content";
import { withBasePath } from "@/lib/basePath";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Trayectoria, stack técnico y formación de un Machine Learning Engineer & Data Architect.",
};

const STACK_LABEL: Record<string, string> = {
  modelado: "MODELADO",
  cloud: "CLOUD",
  datos: "DATOS & BI",
  desarrollo: "DESARROLLO",
};

// El timeline dibuja la carrera como una loss curve ascendente: el hito más
// antiguo abajo-izquierda, el más reciente arriba-derecha.
const MILESTONE_OFFSETS = ["md:pt-64 pt-8", "md:pt-40 pt-8", "md:pt-8 pt-8"];

export default function ResumePage() {
  const resume = getResume();

  return (
    <div className="mx-auto w-full max-w-container px-margin-mobile pb-24 pt-16 md:px-margin-desktop">
      {/* Perfil */}
      <section className="mb-32 grid grid-cols-1 items-start gap-gutter md:grid-cols-12">
        <div className="group relative aspect-square overflow-hidden border border-line bg-panel md:col-span-4">
          <Image
            src={resume.photo}
            alt={`Retrato editorial de ${resume.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            className="object-cover opacity-80 grayscale transition-all duration-700 group-hover:grayscale-0"
            priority
          />
        </div>
        <div className="flex h-full flex-col justify-center md:col-span-8">
          <p className="mb-4 flex items-center gap-2 font-mono text-caps uppercase text-faint">
            <span className="h-2 w-2 rounded-full bg-signal-ok" aria-hidden="true" />
            LOG_FILE: PROFILE_TRANSMISSION
          </p>
          <h1 className="mb-8 font-display text-display-lg-mobile leading-tight text-foreground md:text-display-lg">
            {resume.role.split("&")[0].trim()}{" "}
            <span className="font-serif text-body-lg italic text-muted">&</span>{" "}
            {resume.role.split("&")[1]?.trim()}.
          </h1>
          <p className="max-w-2xl font-serif text-body-lg italic leading-relaxed text-muted">
            “{resume.bio.trim()}”
          </p>
          <div className="mt-8">
            <a
              href={withBasePath(resume.contact.cvFile)}
              download
              className="inline-block bg-accent px-6 py-3 font-mono text-caps uppercase text-accent-ink transition-opacity hover:opacity-90"
            >
              Descargar PDF
            </a>
          </div>
        </div>
      </section>

      {/* Experiencia — timeline sobre la micro-curva */}
      <section className="relative mb-32">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="mb-2 font-mono text-caps uppercase text-faint">
              EXPERIENCE_OPTIMIZATION_PATH
            </p>
            <h2 className="font-display text-display-md text-foreground">
              Hitos de Carrera
            </h2>
          </div>
          <p className="hidden font-mono text-utility text-muted md:block">
            METRIC: VAL_LOSS_MINIMIZED
          </p>
        </div>
        <div className="relative md:min-h-[400px]">
          <MicroCurve
            count={resume.experience.length}
            activeIndex={resume.experience.length - 1}
            aspect="panel"
            className="pointer-events-none absolute inset-0 hidden opacity-20 md:block"
          />
          <ol className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-3">
            {resume.experience.map((exp, i) => (
              <li
                key={`${exp.company}-${exp.start}`}
                className={`border-t border-line transition-colors duration-300 hover:border-accent ${MILESTONE_OFFSETS[i] ?? "pt-8"}`}
              >
                <p className="mb-4 mt-4 font-mono text-caps uppercase text-signal-ok">
                  {exp.start}_{exp.end === "presente" ? "RUNNING" : "CHECKPOINT"}
                </p>
                <h3 className="mb-2 font-display text-headline-sm text-foreground">
                  {exp.role}
                </h3>
                <p className="mb-1 font-mono text-utility text-muted">
                  {exp.company}
                </p>
                <p className="mb-4 font-mono text-caps uppercase text-faint">
                  {exp.start} — {exp.end}
                </p>
                <p className="font-serif text-body-md text-muted">
                  {exp.description.trim()}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Stack + Educación */}
      <section className="grid grid-cols-1 gap-gutter md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="mb-8 font-mono text-caps uppercase text-faint">
            SYSTEM_DEPENDENCIES_V2
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {Object.entries(resume.stack).map(([group, items]) => (
              <div key={group} className="border border-line bg-surface p-6">
                <h3 className="mb-6 font-mono text-utility font-bold uppercase text-foreground">
                  {STACK_LABEL[group] ?? group.toUpperCase()}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="bg-highest px-3 py-1 font-mono text-caps uppercase text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 md:col-span-4 md:mt-0">
          <p className="mb-8 font-mono text-caps uppercase text-faint">
            ACADEMIC_FOUNDATION
          </p>
          {resume.education.map((edu) => (
            <div key={edu.degree} className="relative border-l border-line pl-6">
              <span
                className="absolute -left-1 top-0 h-2 w-2 bg-accent"
                aria-hidden="true"
              />
              <h3 className="mb-1 font-display text-headline-sm text-foreground">
                {edu.degree}
              </h3>
              <p className="mb-4 font-mono text-utility uppercase text-signal-ok">
                {edu.period}
              </p>
              {edu.thesis && (
                <p className="mb-6 font-serif text-body-md italic text-muted">
                  Tesis: “{edu.thesis.trim()}”
                </p>
              )}
              <p className="flex items-center gap-3 font-mono text-caps uppercase text-muted">
                {edu.institution}
              </p>
            </div>
          ))}

          <a
            href={`mailto:${resume.contact.email}`}
            className="group mt-12 block border border-dashed border-line p-8 text-center transition-colors hover:border-accent"
          >
            <p className="font-mono text-caps uppercase text-faint transition-colors group-hover:text-accent">
              CONTACT_INIT_CMD
            </p>
            <p className="mt-2 font-display text-display-md text-accent">
              Hire the Stack.
            </p>
          </a>
        </div>
      </section>
    </div>
  );
}
