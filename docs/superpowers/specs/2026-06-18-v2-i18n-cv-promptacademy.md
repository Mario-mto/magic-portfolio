# Portfolio v2 — i18n (EN/FR) + CV content + Prompt Academy

**Date:** 2026-06-18 · **Branch:** `redesign/awwwards-portfolio`
**Goal:** Add an EN/FR toggle (EN primary), align all content with Mario's French CV (no invention), add the Prompt Academy project, and make the Deployment log clearer (roles + what was done + dates).

## Source of truth
`C:/Users/mario/Project/Porfolio/CV-ingenieurIA_MM-CA.pdf` (read). Only CV facts are used. Translation of existing English copy into French is allowed (it is translation, not invention).

## 1. i18n architecture (client toggle, no routing)
- `src/lib/i18n.tsx`: `type Lang = "en" | "fr"`, `LangProvider` (client, localStorage key `lang`, default `"en"`), `useLang() → { lang, setLang, toggle }`. Mounted in `layout.tsx` inside `<body>` (wraps everything).
- `LangToggle` component in the header (`EN / FR` pill, active state).
- **Structured content** (`content.tsx`): every translatable string becomes `{ en, fr }`. A helper `tr(lang, value)` returns the active string (handles plain strings + `{en,fr}`). Display components call `useLang()` and render the active language. Components that consume content become client components (they already mostly render small markup).
- **Default/SSR = EN** → static HTML + SEO unchanged; FR is applied client-side on toggle.

## 2. Project case studies bilingual
- Each project frontmatter gains `title_fr` and `summary_fr` (EN stays in `title`/`summary`). `Project`/`projects-utils` gain `titleFr`, `summaryFr`; cards/hero pick by lang.
- Each project gets a French MDX body: `src/app/work/projects/<slug>.fr.mdx` (EN stays `<slug>.mdx`). Loader returns `content` (EN) + `contentFr` (FR). The detail page renders BOTH via `CustomMDX` (server) and a client `LangBody` shows the active one (the other gets `hidden`). `generateStaticParams` unchanged.
- FR bodies are faithful translations of the EN case studies.

## 3. Content updates from CV
- **Role:** EN "Applied AI Engineer" / FR "Ingénieur IA".
- **Hero subline / about intro:** from the CV summary (EN translation + FR verbatim).
- **Skills (4 groups, exactly from CV):**
  - *AI & LLMs:* Anthropic SDK, Claude API, Autonomous agents, MCP, RAG, Prompt engineering, LangChain
  - *Machine Learning & Deep Learning:* scikit-learn, XGBoost, RandomForest, pandas, NumPy, TensorFlow, PyTorch, Computer Vision, GridSearchCV, Feature engineering
  - *Backend & Data:* Python, FastAPI, Node.js, REST APIs, Supabase, PostgreSQL, SQL
  - *Frontend & DevOps:* Next.js, React, TypeScript, Tailwind, Docker, Linux/VPS, Caddy, Vercel, Git/GitHub, CI/CD
- **Experience (deployment log):**
  1. **Applied AI Engineer — Freelance** / *Ingénieur IA — Freelance* · 09/2024 – Present · France. Bullets (from CV): rental-pricing SaaS ML engine (prep → feature eng → GridSearchCV → RF/XGBoost → FastAPI + monitoring); menu-optimizer.com pricing SaaS (Next.js/Supabase/Vercel, auth, payment, analytics, prod deploy); CRIBBZ housing platform for newcomers to Canada (product architecture, landing, B2B trust positioning); active exploration of the agentic ecosystem (MCPs, SKILL.md skills, OAuth, multi-channel).
  2. **R&D Project Lead — 3D Morphological Analysis, LIO** / *Chef de projet R&D — Analyse morphologique 3D, LIO* · 09/2024 – 04/2025 · Montréal, QC. Bullets: led a Python R&D project with researchers & clinicians (brain morphology / skull dimensions correlation); semi-automated 3D measurement pipeline from MRI (bounding boxes, RAS landmarks, 3D Slicer integration); stakeholder coordination, sprints, technical docs, scientific reporting; Agile practices.
- **Education (with dates):**
  1. *Diplôme d'Ingénieur — Génie Physique et Technologies Innovantes*, Groupe INSA Rouen / ESITECH · 09/2021 – 10/2025 · Saint-Étienne-du-Rouvray.
  2. *Maîtrise — Génie Technologie de la santé*, École de Technologie Supérieure (ÉTS) · 09/2023 – 04/2025 · Montréal, QC.
- **Person/links:** add website `mariomto.fr`. Remove the broken Once-UI placeholder Instagram link (`instagram.com/once_ui`). Keep GitHub (Mario-mto), LinkedIn, Email. (Phone not displayed.)

## 4. Prompt Academy project (new) — from CV
- Files: `src/app/work/projects/prompt_academy.mdx` (+ `.fr.mdx`). Images already in `public/images/projects/prompt-academy/` (hero, dashboard, ebook, guide, skills, communaute, parcours).
- Frontmatter: `domain: saas`, `badge: live`, `metric: "Live SaaS · 2,400+ downloads"`, `featured: true`, `order: 0` (newest/first), `link: https://prompt-academy.fr`, `publishedAt: 2025` (most recent).
- Title EN: "The Prompt Academy — Applied-AI Learning SaaS"; FR: "The Prompt Academy — SaaS de formation à l'IA appliquée".
- Body (EN + FR) from CV facts only: what it is (learning platform for applied AI / Claude Code agents), built solo (Next.js, Node.js, Supabase, Vercel; auth, subscriptions + lifetime payment, content library, private community), content produced (2 ebooks, 26 ready-to-use Claude Code skills, 29 step-by-step guides, 2,400+ downloads), status live. Images mapped to the gallery.

## 5. Deployment log redesign (clarity)
Show, per entry: role title, org, location, **date range**, and **bullets of what was done** (from CV). Visually clearer than the current one-line rows: each entry is a block with the timeframe (mono, accent) + role + a few concise achievement bullets. Studies shown with their date ranges + degree + institution.

## 6. Non-goals
- No `/fr` routing/middleware (client toggle only).
- Do not add VibeCoding / self-hosted-assistant / CRIBBZ / "sites" as NEW standalone case-study pages unless asked (CRIBBZ + agentic work appear as bullets under the Freelance role; the existing "sites" frontend project is kept as-is). No fabricated metrics.

## Success criteria
- EN/FR toggle works (header), EN default + persisted; all visible site text + all case studies switch language.
- Content matches the CV (roles, bullets, dates, studies, skills, summary) — verified against the PDF.
- Prompt Academy present (home carousel + /work + detail) with its real images and CV-sourced copy, EN+FR.
- Deployment log shows roles + achievements + dates clearly.
- Build clean, tests pass, no fabricated facts.
