import type { Config } from "tailwindcss";

// Mapea los tokens de /styles/tokens.css (design system "Technical Logbook")
// a utilidades de Tailwind. Los componentes solo usan estas claves semánticas.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--bg-base)",
        lowest: "var(--bg-lowest)",
        surface: "var(--bg-surface)",
        panel: "var(--bg-container)",
        elevated: "var(--bg-elevated)",
        highest: "var(--bg-highest)",
        bright: "var(--bg-bright)",
        foreground: "var(--text-body)",
        muted: "var(--text-muted)",
        faint: "var(--text-faint)",
        line: "var(--border)",
        "line-strong": "var(--border-strong)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        "accent-10": "var(--accent-10)",
        "accent-20": "var(--accent-20)",
        "accent-50": "var(--accent-50)",
        "signal-ok": "var(--signal-ok)",
        "signal-ok-bright": "var(--signal-ok-bright)",
        "signal-warn": "var(--signal-warn)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Escala tipográfica del design system
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "700" }],
        "display-lg-mobile": ["32px", { lineHeight: "1.1", fontWeight: "700" }],
        "display-md": ["32px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-sm": ["20px", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["20px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["17px", { lineHeight: "1.6", fontWeight: "400" }],
        utility: ["13px", { lineHeight: "1.0", letterSpacing: "0.02em", fontWeight: "400" }],
        caps: ["11px", { lineHeight: "1.0", letterSpacing: "0.1em", fontWeight: "700" }],
      },
      spacing: {
        unit: "var(--unit)",
        gutter: "var(--gutter)",
        "margin-mobile": "var(--margin-mobile)",
        "margin-desktop": "var(--margin-desktop)",
      },
      maxWidth: {
        container: "var(--container-max)",
      },
      backgroundImage: {
        vignette: "var(--vignette)",
      },
    },
  },
  plugins: [],
};

export default config;
