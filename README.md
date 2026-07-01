# ff9 — Personal Portfolio

Personal portfolio of **Francesco Fusca** (ff9), a Software Engineer from Italy
working across web development, cybersecurity, and machine learning.

A single-page site with a bilingual (English / Italian) interface, smooth
motion, and an interactive 3D globe pinpointing my location.

🔗 **Live:** https://github.com/francescofusca/ff9-portfolio

## Features

- **Bilingual UI** — full English/Italian switch, all copy localized in-app.
- **Animated intro & typewriter hero** built with Framer Motion.
- **Selected Projects** — auto-rotating image carousels, "Coming Soon" badges,
  and cards that link straight to their repos.
- **University Projects** — a dedicated section for academic work (Student
  Dropout Prediction, Enoteca Mendoza, PL Judge), each linking to GitHub.
- **Interactive 3D globe** (`three` + `three-globe`) rendered lazily when it
  scrolls into view, with a marker on Cosenza, Italy.
- **Responsive** layout tuned for desktop and mobile.

## Tech Stack

| Area       | Tools                                             |
| ---------- | ------------------------------------------------- |
| Framework  | React 19 + TypeScript                             |
| Build      | Vite 7                                            |
| Styling    | Tailwind CSS v4 + hand-written CSS (`src/index.css`) |
| Animation  | Framer Motion                                     |
| 3D         | three, three-globe, topojson-client               |
| Linting    | ESLint                                            |

## Getting Started

```bash
# install dependencies
npm install

# start the dev server (with HMR)
npm run dev

# type-check and build for production into dist/
npm run build

# preview the production build locally
npm run preview

# lint
npm run lint
```

The dev server runs on the URL Vite prints (default `http://localhost:5173`).

## Project Structure

```
public/images/projects/   # project screenshots & profile photo
src/
  App.tsx                 # the whole page: i18n, sections, project data
  components/
    Intro.tsx             # animated intro overlay
    Globe3D.tsx           # lazy-loaded interactive 3D globe
  index.css               # global styles (Tailwind v4 + custom CSS)
  main.tsx                # app entry
```

The live page is rendered from `App.tsx`, which holds the translations,
the project/experience data, and every section inline.

### Adding a project

Add the screenshot to `public/images/projects/`, then add an entry to **both**
the `en` and `it` arrays of `projectsData` (or `universityProjectsData`) in
`src/App.tsx`.

## Deployment

The build outputs static files to `dist/` and uses relative asset paths
(`base: './'` in `vite.config.ts`), so it can be served from any static host.

---

Design inspired by Linus Rogge and Gazi Jarin.
