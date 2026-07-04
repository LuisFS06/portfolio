const CONTACT = {
  email: "mailto:luisfersolanocoto@gmail.com",
  linkedin: "https://www.linkedin.com/",
  github: "https://github.com/LuisFS06",
};

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-7.9c0-1.88-.03-4.3-2.62-4.3-2.63 0-3.03 2.05-3.03 4.17V23H8V8z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.11-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.15c0 .3.21.66.8.55A11.53 11.53 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

/**
 * Rail de contacto persistente: fijo abajo-izquierda, montado una vez en
 * layout.tsx, visible en las 4 rutas (por encima del contenido y del
 * HeroDeck, por debajo de cualquier modal).
 */
export default function ContactRail() {
  return (
    <aside
      aria-label="Contacto"
      className="fixed bottom-16 left-4 z-40 flex items-center gap-1 border border-line bg-surface/70 px-2 py-2 backdrop-blur-md md:left-6"
    >
      <span className="hidden select-none px-2 font-mono text-caps uppercase text-faint sm:inline">
        Contactar
      </span>
      <a
        href={CONTACT.email}
        aria-label="Enviar correo"
        className="p-2 text-muted transition-colors hover:text-accent focus-visible:text-accent"
      >
        <MailIcon />
      </a>
      <a
        href={CONTACT.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Perfil de LinkedIn"
        className="p-2 text-muted transition-colors hover:text-accent focus-visible:text-accent"
      >
        <LinkedInIcon />
      </a>
      <a
        href={CONTACT.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Perfil de GitHub"
        className="p-2 text-muted transition-colors hover:text-accent focus-visible:text-accent"
      >
        <GitHubIcon />
      </a>
    </aside>
  );
}
