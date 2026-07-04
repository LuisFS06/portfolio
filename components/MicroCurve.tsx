"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

/**
 * Micro-curva tipo loss curve del design system. Un solo componente
 * reutilizable: HeroDeck (marcador por slide), índice de Proyectos
 * (motivo decorativo) y timeline de Resume (hitos posicionados).
 */
interface MicroCurveProps {
  /** Número de puntos posicionables sobre la curva. */
  count: number;
  /** Punto marcado con el círculo en --accent; omitir para modo decorativo. */
  activeIndex?: number;
  /** Etiqueta mono sobre la curva, p. ej. "VAL_LOSS: .01". */
  topLabel?: string;
  className?: string;
  /** Alto lógico del viewBox (el ancho es 200). */
  aspect?: "wide" | "panel";
}

const W = 200;

/** y(t) de la curva: pérdida decayendo de forma exponencial. */
function lossY(t: number, h: number): number {
  const k = 3;
  const decay = (1 - Math.exp(-k * t)) / (1 - Math.exp(-k));
  return h * 0.9 - h * 0.82 * decay;
}

export default function MicroCurve({
  count,
  activeIndex,
  topLabel,
  className = "",
  aspect = "wide",
}: MicroCurveProps) {
  const prefersReducedMotion = useReducedMotion();
  const gradientId = useId();
  const H = aspect === "wide" ? 50 : 120;

  const samples = 60;
  const d = Array.from({ length: samples + 1 }, (_, i) => {
    const t = i / samples;
    const x = t * W;
    const y = lossY(t, H);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  const pointAt = (i: number) => {
    const t = count > 1 ? i / (count - 1) : 1;
    return { x: t * W, y: lossY(t, H) };
  };

  const marker =
    activeIndex !== undefined && count > 0
      ? pointAt(Math.min(activeIndex, count - 1))
      : null;

  return (
    <div className={`relative ${className}`}>
      {topLabel && (
        <span className="absolute -top-4 right-0 font-mono text-[10px] tracking-[0.02em] text-accent">
          {topLabel}
        </span>
      )}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-full w-full overflow-visible"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.25" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d={d}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        {marker &&
          Array.from({ length: count }, (_, i) => {
            const p = pointAt(i);
            return (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="1.5"
                fill="var(--border-strong)"
              />
            );
          })}
        {marker && (
          <motion.circle
            r="3"
            fill="var(--accent)"
            initial={false}
            animate={{ cx: marker.x, cy: marker.y }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.4, ease: "easeInOut" }
            }
          />
        )}
      </svg>
    </div>
  );
}
