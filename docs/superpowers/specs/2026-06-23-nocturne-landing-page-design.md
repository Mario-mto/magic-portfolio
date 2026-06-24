# NOCTURNE — landing-page project (design record)

Date: 2026-06-23 · Status: approved inline, implemented

## Goal

Add the Batman-themed landing page **NOCTURNE — Gotham After Dark** to the portfolio
as a bilingual (EN/FR) project, showcased with its screen-recording **video** as a
"landing-page mode" hero (autoplay showreel), consistent with the existing project
template.

## Decisions

- **Presentation:** video-as-hero. The project page opens on the recording autoplaying
  (muted, looped, `playsInline`); the grid card keeps a still image (`images[0]`) as cover.
- **Deployment/link:** none provided → `badge: "design"`, no "Visit" button. Adding
  `link: "<url>"` to the frontmatter later flips it to a live link (use `badge: "live"`).
- **Taxonomy:** `domain: frontend`, `metric: "GSAP · SVG · Canvas"`, `publishedAt: 2026-06-23`
  (newest → sorts first in the date-ordered work grid and home "Selected Work").
- **Title** kept identical EN/FR (creative/brand title); summary + body fully translated.

## Assets (`public/images/projects/nocturne/`)

- `nocturne.mp4` (~25 MB) — hero video. No ffmpeg locally, so not re-encoded; user may
  compress later. Loaded lightly: poster paints first, autoplay/pause driven by an
  IntersectionObserver so the file never streams off-screen.
- `nocturne.png` — still used as card cover + video poster + fallback.

## Implementation

New optional `video` field threaded through the data layer, plus a reduced-motion-aware
hero video component. No change to the grid card, carousel, metrics bar or MDX renderer.

| File | Change |
|---|---|
| `src/utils/utils.ts` | add `video?: string` to `Metadata` type + read `data.video` |
| `src/lib/projects-utils.ts` | add `video?: string` to `Project` |
| `src/lib/projects.ts` | map `video: p.metadata.video` |
| `src/resources/site.ts` | add bilingual `playVideo` / `pauseVideo` labels |
| `src/components/project/HeroVideo.tsx` | **new** — autoplay + `prefers-reduced-motion` fallback + off-screen pause + play/pause button (`aria-pressed`) |
| `src/components/project/ProjectHero.tsx` | render `HeroVideo` when `project.video` is set, else the existing `<Image>` |
| `src/components/project/ProjectHero.module.css` | `.video` + `.videoBtn` styles |
| `src/app/work/projects/nocturne.mdx` | **new** — frontmatter + EN body |
| `src/app/work/projects/nocturne.fr.mdx` | **new** — FR body (body-only, per convention) |
| `src/lib/projects.test.ts` | assert `nocturne` domain + video mapping |

## Verification

`npm test` (vitest) + `npm run build` (next build), then a multi-angle review
(code correctness, accessibility/reduced-motion, video performance, i18n/FR fidelity).
