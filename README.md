# ML_ENGINEER | Logbook

Portafolio profesional de un Data Scientist en transición a ML/AI Engineer.
Diseño "Technical Logbook" (Stitch): modo oscuro casi monocromo, tipografía
tri-rol (Inter / Newsreader / JetBrains Mono) y motivo de loss curve.

## Stack

- **Next.js (App Router) + TypeScript**, export estático (`output: 'export'`)
- **Tailwind CSS** mapeado a los tokens de [`styles/tokens.css`](styles/tokens.css)
- **MDX** (`next-mdx-remote`) — el contenido es data, no código
- **Framer Motion** — deck del Inicio, reveal on-scroll y marcador de la micro-curva
- **GitHub Pages** vía GitHub Actions

## Agregar contenido

- **Proyecto nuevo**: crear `content/projects/YYYY-MM-slug.mdx` con el
  frontmatter (`title`, `date`, `role`, `stack`, `status`, `tags`,
  `heroImage`, `heroImageAlt`, `thesis`, `excerpt`, `featured`). Nada más.
- **Publicación nueva**: crear `content/publications/slug.mdx`
  (`title`, `venue`, `type`, `date`, `doi`, `arxivId`, `links`).
- **Resume**: editar `content/resume.yaml`; el PDF vive en `public/resume.pdf`.

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # genera /out (export estático)
```

El deploy es automático: cada push a `main` publica en GitHub Pages.
