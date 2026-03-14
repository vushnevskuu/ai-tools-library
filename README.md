# AI Tools for Designers

A free, curated, visual-first library of working AI assets for real design tasks.

## Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- Framer Motion

## Getting started

```bash
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Note: Use `--webpack` flag if building from a path with non-ASCII characters (Turbopack has encoding issues).

## Structure

- `src/content/` — Tools, workflows, collections (JSON-like TS data)
- `src/lib/` — Data loading, constants
- `src/components/` — UI components
- `src/app/` — Routes and pages

## Routes

- `/` — Homepage
- `/explore` — Full catalog with filters
- `/explore/[category]` — Category page (e.g. `/explore/ui-ux`)
- `/tools/[slug]` — Tool detail
- `/workflows/[slug]` — Workflow detail
- `/collections/[slug]` — Collection detail
- `/about` — About page
