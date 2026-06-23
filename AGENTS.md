# Workspace

## Cursor Cloud specific instructions

This repo is a single front-end product: a Vite + React 19 + TypeScript static
landing-page app located in `halles-lez-landings/`. There is no backend, no
database, and no test framework configured.

### Services

| Service | Dir | Command | Port |
|---------|-----|---------|------|
| Vite dev server (the app) | `halles-lez-landings` | `npm run dev` | `5173` |

- The app uses hash routing (e.g. `http://localhost:5173/#/rouge-beef`); the
  root `#/` is the Hub listing all proposals.
- Lint: `npm run lint` (currently emits 1 pre-existing warning in
  `src/hooks/useSeo.ts`, 0 errors — this is expected).
- Build: `npm run build` (runs `tsc -b && vite build`). `npm run build:pages`
  is the GitHub Pages build (sets base path `/Generation/`).
- `npm run preview` serves a production build on port `4173` (binds externally).
- The Python scripts under `halles-lez-landings/scripts/` are optional one-off
  media-fetch utilities (need `yt-dlp` + `ffmpeg`); they are not part of the
  runtime and have no dependency manifest.
