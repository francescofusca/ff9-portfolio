# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — type-check (`tsc -b`) then produce a Vite production build into `dist/`
- `npm run lint` — run ESLint over the project
- `npm run preview` — serve the built `dist/` locally

There is no test setup in this repo.

## Architecture

This is a single-page personal portfolio (Francesco Fusca / "ff9") built with React 19 + TypeScript + Vite 7, styled with Tailwind v4 (via `@tailwindcss/vite`) plus a large hand-written stylesheet at `src/index.css`. Animation uses `framer-motion`; the 3D globe uses `three` + `three-globe`.

### Important: most of `src/` is dead code

`src/main.tsx` mounts only `App.tsx`, and `App.tsx` imports only two components: `Intro` and `Globe3D`. Everything else under `src/components/` (`Navigation.tsx`, `Footer.tsx`, `PixelatedImage.tsx`, `sections/Hero.tsx`, `sections/Projects.tsx`, `sections/Experience.tsx`, `sections/Contact.tsx`) and `src/constants/data.ts` is **legacy/unused**. Before editing any of those files, confirm whether they're actually wired up — the live page is rendered entirely from `App.tsx`.

### How `App.tsx` is structured

`src/App.tsx` is a ~700-line monolith that owns:
- **i18n** — `translations`, `projectsData`, `experiencesData` are inline objects keyed by `'en' | 'it'`. Language is component state (`lang`); switching it re-renders all section copy. Adding/changing copy means editing both the `en` and `it` branches in `App.tsx`, not `src/constants/data.ts` (which is unused).
- **Sections** — Hero / Projects / About / Contact / Globe / Footer are inline JSX inside the single default-exported `App` component, each in its own `<section id="...">` for hash-link nav.
- **Inline helpers** — `Typewriter` (used for the hero greeting, with a `startDelay` to wait out the intro) and `ProjectCard` (auto-rotating image carousel, "coming soon" badge handling).
- **Scroll/active-section logic** — a single scroll handler in `App` updates `scrolled` (header style) and `activeSection` (which nav link is highlighted) by hit-testing `getBoundingClientRect()` for the four section ids.

### Globe3D

`src/components/Globe3D.tsx` is non-trivial and worth understanding before editing:
- Uses `IntersectionObserver` to defer all Three.js setup until the globe scrolls into view.
- Dynamically `import('three-globe')` inside the effect so that devices without WebGPU/WebGL fail gracefully (caught and logged, loading spinner is dismissed).
- Country polygons are fetched at runtime from `cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json` and rendered via `topojson-client`. The loading overlay stays visible until that fetch resolves (or errors).
- Hard-codes a marker at Cosenza, Italy (lat/lng → cartesian on a 100-radius sphere, with depth-test disabled so the marker sits on top of the globe surface).
- Pointer drag disables auto-rotate; auto-rotate resumes 3s after the last pointer-up. Cleanup is gated by a `cleanupCalled` flag because the country fetch can resolve after unmount.

### Vite config notes

`vite.config.ts` sets `base: './'` (relative asset paths — required because `dist/` is deployed as static files, possibly not at the domain root) and aliases `@` → `/src` (the alias is configured but not currently used in imports).

### Static assets

Project screenshots and the profile photo live in `public/images/projects/` and are referenced by absolute path (e.g. `/images/projects/fotomia.JPG`). The favicon is `public/favicon.svg`. Adding a new project means dropping the image in that folder and adding entries to **both** `projectsData.en` and `projectsData.it` in `App.tsx`.
