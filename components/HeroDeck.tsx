"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import MicroCurve from "@/components/MicroCurve";
import StatusBadge from "@/components/StatusBadge";
import StackTag from "@/components/StackTag";
import type { ProjectStatus } from "@/lib/content";

export interface HeroSlide {
  slug: string;
  title: string;
  date: string;
  role: string;
  stack: string[];
  status: ProjectStatus;
  heroImage: string;
  heroImageAlt: string;
  thesis: string;
}

const SWIPE_DISTANCE = 80;
const SWIPE_VELOCITY = 500;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Deck de proyectos destacados del Inicio. Componente controlado:
 * flechas siempre visibles, drag horizontal y teclado. Transición
 * crossfade + escala sutil; autoplay desactivado por defecto.
 */
export default function HeroDeck({ slides }: { slides: HeroSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const regionRef = useRef<HTMLElement>(null);

  const count = slides.length;
  const go = useCallback(
    (delta: number) => {
      setActiveIndex((i) => (i + delta + count) % count);
    },
    [count],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) {
      go(1);
    } else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) {
      go(-1);
    }
  };

  if (count === 0) return null;
  const active = slides[activeIndex];
  const year = active.date.slice(0, 4);
  const prevSlide = count >= 3 ? slides[(activeIndex - 1 + count) % count] : null;
  const nextSlide = count >= 2 ? slides[(activeIndex + 1) % count] : null;

  const variants = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, scale: 1.02 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.98 },
      };

  return (
    <section
      ref={regionRef}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Proyectos destacados"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="relative flex min-h-[60vh] w-full flex-col overflow-hidden border-b border-line bg-vignette md:min-h-[calc(100vh-7rem)]"
    >
      {/* Cabecera de metadatos, sincronizada con el slide activo */}
      <div className="z-10 flex flex-col justify-between gap-4 px-margin-mobile py-8 sm:flex-row sm:items-end md:px-margin-desktop">
        <div className="flex max-w-2xl flex-col">
          <span
            className="mb-2 font-mono text-caps uppercase text-faint"
            aria-hidden="true"
          >
            PROYECTO {"//"} {active.slug.replace(/-/g, "_").toUpperCase()}
          </span>
          <h1 className="font-display text-display-lg-mobile text-accent md:text-display-lg">
            {active.title}
          </h1>
        </div>
        <div className="shrink-0 text-left sm:text-right">
          <span className="font-mono text-headline-sm font-bold text-accent">
            {year} · {active.role}
          </span>
          <div
            className="mt-2 font-mono text-utility text-accent"
            aria-live="polite"
          >
            {pad(activeIndex + 1)} / {pad(count)}
          </div>
        </div>
      </div>

      {/* Escenario: slide activo con crossfade + escala, previews laterales inclinados */}
      <div className="relative flex flex-grow items-center justify-center px-margin-mobile [perspective:1500px] md:px-24">
        {/* Preview del proyecto anterior (izquierda): siempre visible,
            asoma por el borde y en hover se acerca al centro */}
        {prevSlide && (
          <div className="absolute left-0 z-10 flex h-72 w-[70%] max-w-[520px] -translate-x-[78%] sm:-translate-x-[60%] md:h-96 lg:-translate-x-[40%] xl:w-[520px] xl:-translate-x-[15%]">
            <motion.button
              type="button"
              onClick={() => go(-1)}
              aria-label={`Ir al proyecto anterior: ${prevSlide.title}`}
              initial={false}
              style={{ scale: 0.75, rotateY: 12 }}
              whileHover={
                prefersReducedMotion ? undefined : { x: 48, scale: 0.84, rotateY: 5 }
              }
              whileFocus={
                prefersReducedMotion ? undefined : { x: 48, scale: 0.84, rotateY: 5 }
              }
              whileTap={prefersReducedMotion ? undefined : { scale: 0.8 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="flex h-full w-full cursor-pointer items-center justify-center overflow-hidden border border-line bg-surface/40 p-8 opacity-60 blur-[1px] grayscale backdrop-blur-md transition-[filter,opacity,border-color] duration-500 hover:border-accent-50 hover:opacity-90 hover:blur-0 hover:grayscale-0 focus-visible:border-accent-50 focus-visible:opacity-90 focus-visible:blur-0 focus-visible:grayscale-0"
            >
              <span className="flex flex-col items-center gap-4 opacity-40">
                <span className="font-mono text-caps uppercase text-accent">
                  PREV: {prevSlide.title}
                </span>
                <span className="mt-2 hidden max-w-xs text-center font-serif text-body-md italic text-muted sm:block">
                  {prevSlide.thesis}
                </span>
              </span>
            </motion.button>
          </div>
        )}
        {/* Preview del proyecto siguiente (derecha) */}
        {nextSlide && (
          <div className="absolute right-0 z-10 flex h-72 w-[70%] max-w-[520px] translate-x-[78%] sm:translate-x-[60%] md:h-96 lg:translate-x-[40%] xl:w-[520px] xl:translate-x-[15%]">
            <motion.button
              type="button"
              onClick={() => go(1)}
              aria-label={`Ir al proyecto siguiente: ${nextSlide.title}`}
              initial={false}
              style={{ scale: 0.75, rotateY: -12 }}
              whileHover={
                prefersReducedMotion ? undefined : { x: -48, scale: 0.84, rotateY: -5 }
              }
              whileFocus={
                prefersReducedMotion ? undefined : { x: -48, scale: 0.84, rotateY: -5 }
              }
              whileTap={prefersReducedMotion ? undefined : { scale: 0.8 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="flex h-full w-full cursor-pointer items-center justify-center overflow-hidden border border-line bg-surface/40 p-8 opacity-60 blur-[1px] grayscale backdrop-blur-md transition-[filter,opacity,border-color] duration-500 hover:border-accent-50 hover:opacity-90 hover:blur-0 hover:grayscale-0 focus-visible:border-accent-50 focus-visible:opacity-90 focus-visible:blur-0 focus-visible:grayscale-0"
            >
              <span className="flex flex-col items-center gap-4 opacity-40">
                <span className="font-mono text-caps uppercase text-accent">
                  NEXT: {nextSlide.title}
                </span>
                <span className="mt-2 hidden max-w-xs text-center font-serif text-body-md italic text-muted sm:block">
                  {nextSlide.thesis}
                </span>
              </span>
            </motion.button>
          </div>
        )}
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={active.slug}
            {...variants}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
            className="relative z-20 h-72 w-full max-w-2xl cursor-grab border border-line bg-surface/40 backdrop-blur-md active:cursor-grabbing md:h-96"
          >
            <Link
              href={`/proyectos/${active.slug}`}
              className="block h-full w-full"
              draggable={false}
              aria-label={`Ver proyecto: ${active.title}`}
            >
              <Image
                src={active.heroImage}
                alt={active.heroImageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
                priority
                draggable={false}
              />
              <span className="absolute -top-3 left-8 border border-line bg-canvas px-2 font-mono text-[10px] uppercase text-faint">
                ARCH_VIEW_{pad(activeIndex + 1)}.SYS
              </span>
              <span className="absolute bottom-0 left-0 w-full border-t border-line/30 bg-panel/70 p-4 backdrop-blur-md md:p-6">
                <span className="block text-center font-serif text-body-md italic leading-relaxed text-muted md:text-body-lg">
                  “{active.thesis}”
                </span>
              </span>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Flechas — visibles siempre */}
        <div className="pointer-events-none absolute inset-x-2 top-1/2 z-30 flex -translate-y-1/2 justify-between md:inset-x-8">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Proyecto anterior"
            className="pointer-events-auto flex h-12 w-12 items-center justify-center border border-line bg-surface/40 text-accent backdrop-blur-md transition-colors hover:border-accent-50"
          >
            <span aria-hidden="true" className="font-mono text-body-lg">‹</span>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Proyecto siguiente"
            className="pointer-events-auto flex h-12 w-12 items-center justify-center border border-line bg-surface/40 text-accent backdrop-blur-md transition-colors hover:border-accent-50"
          >
            <span aria-hidden="true" className="font-mono text-body-lg">›</span>
          </button>
        </div>
      </div>

      {/* Barra de meta: STACK / ESTADO + índice sobre la micro-curva */}
      <div className="z-10 flex flex-col justify-between gap-6 border-t border-line/30 bg-lowest px-margin-mobile py-6 md:h-24 md:flex-row md:items-center md:gap-0 md:py-0 md:px-margin-desktop">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <ul className="flex flex-wrap gap-3" aria-label="Stack tecnológico">
            {active.stack.map((tech) => (
              <li key={tech}>
                <StackTag label={tech} />
              </li>
            ))}
          </ul>
          <StatusBadge status={active.status} />
        </div>
        <div className="flex items-end gap-4">
          <span className="pb-1 font-mono text-utility text-accent" aria-hidden="true">
            .{pad(activeIndex + 1)}
          </span>
          <MicroCurve
            count={count}
            activeIndex={activeIndex}
            topLabel={`VAL_LOSS: .${pad(count - activeIndex)}`}
            className="h-12 w-48"
          />
        </div>
      </div>
    </section>
  );
}
