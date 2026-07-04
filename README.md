# ML_ENGINEER — Technical Logbook

**Live site → [luisfs06.github.io/portfolio](https://luisfs06.github.io/portfolio/)**

Personal portfolio of a Machine Learning Engineer & Data Architect, designed as a
*technical logbook*: a dark, near-monochrome editorial system where pure white is
reserved for high-priority actions and the only curves allowed are loss curves.

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Deployed on GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-222222?logo=github&logoColor=white)

## Design

The visual language follows a design system authored in Google Stitch —
graphite surfaces layered by tone instead of shadows, 1px hairline borders,
sharp 0px corners, and a tri-font strategy:

| Role | Typeface | Usage |
| --- | --- | --- |
| Display | Inter | Headlines, tight tracking |
| Editorial | Newsreader | Long-form project narratives |
| Utility | JetBrains Mono | Metadata, indices, status badges |

Every color, type role and spacing value lives in a single token sheet
([`styles/tokens.css`](styles/tokens.css)); components never hardcode values.

## Architecture

- **Static-first** — Next.js App Router exported as pure static HTML
  (`output: 'export'`), deployed to GitHub Pages through GitHub Actions on
  every push to `main`.
- **Content as data** — projects and publications are MDX files with
  frontmatter; the résumé is structured YAML. Publishing new work never
  touches a component.
- **One motion budget** — Framer Motion is used only where it earns its
  weight: the featured-work deck (crossfade, drag, keyboard), scroll reveals,
  and the loss-curve marker. Everything respects `prefers-reduced-motion`.
- **A single `<MicroCurve>`** — the descending loss-curve motif is one SVG
  component reused across the home deck, the project index and the career
  timeline.

## Highlights

- Featured-work deck with drag/swipe, arrow and keyboard navigation, and
  tilted side previews of adjacent projects that ease toward the center on
  hover.
- Project index with client-side tag filtering and on-scroll reveals.
- Academic-style publications archive (venue, DOI, arXiv metadata).
- Fully keyboard-navigable, AA contrast, semantic landmarks.

---

<sub>Built with Next.js · Typeset in Inter, Newsreader & JetBrains Mono ·
Deployed on GitHub Pages</sub>
