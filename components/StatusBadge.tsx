import type { ProjectStatus } from "@/lib/content";

// Único lugar donde se usan los tonos de señal funcional (--signal-*),
// según el design system: badges de estado, nunca navegación ni decoración.
const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; dot: string; text: string; pulse: boolean }
> = {
  prod: {
    label: "STATUS: PRODUCTION",
    dot: "bg-signal-ok-bright",
    text: "text-signal-ok",
    pulse: true,
  },
  experimental: {
    label: "STATUS: EXPERIMENTAL",
    dot: "bg-signal-warn",
    text: "text-signal-warn",
    pulse: false,
  },
  archived: {
    label: "STATUS: ARCHIVED",
    dot: "bg-line-strong",
    text: "text-muted",
    pulse: false,
  },
};

export default function StatusBadge({
  status,
  compact = false,
}: {
  status: ProjectStatus;
  compact?: boolean;
}) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-2 ${cfg.text}`}>
      <span
        className={`h-1.5 w-1.5 rounded-full ${cfg.dot} ${cfg.pulse ? "motion-safe:animate-pulse" : ""}`}
        aria-hidden="true"
      />
      <span className="font-mono text-caps uppercase">
        {compact ? cfg.label.replace("STATUS: ", "") : cfg.label}
      </span>
    </span>
  );
}
