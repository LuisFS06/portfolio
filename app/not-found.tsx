import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-container flex-col items-start justify-center gap-6 px-margin-mobile md:px-margin-desktop">
      <p className="font-mono text-caps uppercase text-faint">
        ERROR_404 {"//"} SEGMENT_NOT_FOUND
      </p>
      <h1 className="font-display text-display-lg-mobile text-accent md:text-display-lg">
        Ruta fuera del índice.
      </h1>
      <Link
        href="/"
        className="border border-line px-6 py-2 font-mono text-caps uppercase text-accent transition-colors hover:bg-panel"
      >
        ← VOLVER_AL_INICIO
      </Link>
    </div>
  );
}
