export default function Footer() {
  return (
    <footer className="fixed bottom-0 z-50 w-full border-t border-line bg-canvas/70 backdrop-blur-md">
      <div className="mx-auto flex h-12 w-full max-w-container items-center justify-between px-margin-mobile md:px-margin-desktop">
        <span className="font-mono text-caps uppercase text-muted opacity-70">
          ©2026 SYSTEM_LOG_ACTIVE
        </span>
        <div className="flex items-center gap-4 md:gap-8">
          <a
            href="#"
            className="font-mono text-caps uppercase text-muted opacity-70 transition-colors hover:text-accent hover:opacity-100"
          >
            Terms
          </a>
          <a
            href="#"
            className="font-mono text-caps uppercase text-muted opacity-70 transition-colors hover:text-accent hover:opacity-100"
          >
            Privacy
          </a>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-ok" aria-hidden="true" />
            <span className="font-mono text-caps uppercase text-accent">
              Status: Active
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
