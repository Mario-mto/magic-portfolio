# Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio (currently the Once UI "Magic Portfolio" template) into a distinctive, Awwwards-level dark-tech site with a "ML pipeline" narrative, an interactive Latent Space hero, and tasteful motion — preserving all content while elevating key info.

**Architecture:** Keep Next.js (App Router) + MDX content loading; remove `@once-ui-system/core` entirely; build a small custom design system (CSS tokens + CSS Modules); add GSAP/ScrollTrigger + Lenis for motion, a Canvas 2D hero, and a draggable project carousel. Each home section is an isolated client component; animations are encapsulated in hooks with cleanup and `prefers-reduced-motion` fallbacks.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules + CSS custom properties, GSAP 3.13+ (ScrollTrigger, Draggable, InertiaPlugin — all free), Lenis, Canvas 2D, next/font (Space Grotesk + JetBrains Mono), Vitest + Testing Library (logic/hooks only).

---

## Decisions Locked

- **Styling:** CSS Modules + global tokens. **No Tailwind.**
- **Colors:** `--bg #070809`, `--bg-elev #0c0f15`, `--bg-elev-2 #11151c`, `--text #e9eef6`, `--text-dim #9aa6b6`, `--text-faint #5a6678`, `--border rgba(255,255,255,.08)`, `--border-strong rgba(255,255,255,.14)`, `--accent #5eead4` (teal), `--accent-2 #7c6cff` (violet, hero only).
- **Fonts:** Space Grotesk (display/body) + JetBrains Mono (data/labels) via `next/font/google`.
- **Motion lib:** GSAP 3.13+. Register plugins client-side once. Use `gsap.matchMedia()` for responsive + reduced-motion.
- **Smooth scroll:** Lenis, synced to ScrollTrigger.
- **Hero:** Canvas 2D point cloud (no WebGL/3D dep).
- **Carousel:** GSAP Draggable + InertiaPlugin on pointer devices; native CSS scroll-snap fallback on touch/reduced-motion.
- **Scramble:** custom hook (no plugin).
- **Theme:** dark only. Remove the Once UI theme-init script and theme switcher.
- **No fabricated metrics.** Project "metric" fields use truthful descriptors (status/stack) unless the owner supplies real KPIs.
- **Domains:** `ml | medical | saas | frontend`. **Badges:** `deployed | live | research | design`.
- **PipelineRail:** uses a lightweight **passive scroll listener** (reads scroll position, no tween) — inherently reduced-motion-safe; chosen over ScrollTrigger to stay cheap. This is the documented exception to the spec §8 "all anims via `gsap.matchMedia`" rule.
- **MagneticCursor & Counter are wired:** cursor mounted in the layout (Task 1.6); counters rendered in the manifesto stats row (Task 2.2). No dead exports.
- **cal.com link** (`about.calendar.link`) is **owner-supplied**: surfaced as a "Book a call" CTA in ContactCTA + About; the `https://cal.com` placeholder is flagged for replacement (Task 5.3).

### Domain / badge / metric mapping (truthful)

| slug | domain | badge | metric (truthful) |
|---|---|---|---|
| `saas_housing_pricing` | `ml` | `deployed` | `In production · CRM` |
| `health_technology_project` | `medical` | `research` | `Reproducible 3D` |
| `menu_optimizer` | `saas` | `live` | `Live SaaS` |
| `sites` | `frontend` | `design` | `React · Next.js` |

> Owner may replace `metric` with real KPIs (e.g. real R²/MAE) later — field is optional.

---

## File Structure

**Create:**
```
src/styles/tokens.css            # CSS variables (colors, type, spacing, easing)
src/styles/globals.css           # reset, base elements, grain, utilities
src/lib/gsap.ts                  # registerGsap() — plugin registration (client)
src/lib/useReducedMotion.ts      # hook: boolean for prefers-reduced-motion
src/lib/useScramble.ts           # hook: scramble-in text effect
src/lib/useReveal.ts             # hook: scroll reveal via ScrollTrigger
src/lib/projects.ts              # getProjects(), sortByDate(), filterByDomain(), Domain/Badge types
src/components/layout/SmoothScroll.tsx     # Lenis provider (client)
src/components/layout/MagneticCursor.tsx   # custom magnetic cursor (client)
src/components/layout/Header.tsx           # minimal fixed header (rewritten)
src/components/layout/Footer.tsx           # minimal footer (rewritten)
src/components/layout/PipelineRail.tsx     # scroll-linked pipeline rail (client)
src/components/ui/Reveal.tsx               # wrapper applying useReveal
src/components/ui/ScrambleText.tsx         # wrapper applying useScramble
src/components/ui/Counter.tsx              # animated number (client)
src/components/ui/Marquee.tsx              # infinite marquee (client)
src/components/ui/Badge.tsx                # status badge (deployed/live/...)
src/components/ui/Tag.tsx                  # tech tag chip
src/components/home/HeroLatentSpace.tsx    # canvas point-cloud hero (client)
src/components/home/ManifestoMarquee.tsx
src/components/home/SelectedWorkCarousel.tsx  # draggable carousel (client)
src/components/home/CapabilitiesGrid.tsx
src/components/home/DeploymentLog.tsx
src/components/home/ContactCTA.tsx
src/components/work/ProjectGrid.tsx
src/components/work/ProjectFilters.tsx     # client filter control
src/components/work/ProjectCard.tsx        # rewritten (no Once UI)
src/components/project/ProjectHero.tsx
src/components/project/MetricsBar.tsx
src/components/project/ImageCarousel.tsx   # client lightbox carousel
src/components/project/ProjectNav.tsx
*.module.css                     # co-located per component
src/components/mdx/MDXComponents.tsx       # restyled MDX mapping
vitest.config.ts
src/test/setup.ts
```

**Modify:**
- `src/app/layout.tsx` — strip Once UI, wire fonts + SmoothScroll + MagneticCursor + Header/Footer.
- `src/app/page.tsx` — compose home sections.
- `src/app/work/page.tsx` — ProjectGrid + ProjectFilters.
- `src/app/work/[slug]/page.tsx` — ProjectHero + MetricsBar + MDX + ImageCarousel + ProjectNav.
- `src/app/about/page.tsx` — rewritten sections.
- `src/utils/utils.ts` — extend `Metadata` type (domain/badge/metric/featured/order).
- `src/resources/content.tsx` — remove Once UI JSX (Line/Row/Text) from `home.featured`/`home.subline`.
- `src/components/index.ts` — update barrel exports.
- `src/app/work/projects/*.mdx` — add `domain/badge/metric` frontmatter.
- `package.json` — deps + scripts.

**Delete (Once UI / template cruft):**
- `src/resources/custom.css`, `src/resources/once-ui.config.ts`
- `src/components/Header.tsx` + `.scss`, `src/components/Footer.tsx` + `.scss`
- `src/components/ProjectCard.module.scss`, `src/components/work/Projects.tsx` + `.module.scss`
- `src/components/Providers.tsx`, `src/components/RouteGuard.tsx`, `src/components/ThemeToggle.*`
- `src/components/HeadingLink.*`, `src/components/ScrollToHash.tsx`, `src/components/about/*`, `src/components/breakpoints.scss`
- `src/components/gallery/GalleryView.tsx`
- (Keep `src/components/mdx.tsx`'s logic but replace with `mdx/MDXComponents.tsx`; remove old file.)
- Remove `protectedRoutes` usage. Leave `api/og/*` for a dedicated audit task (Task 5.4).

---

## Testing Approach

- **TDD (Vitest)** for pure logic & hooks: `lib/projects.ts`, `lib/useReducedMotion.ts`, `lib/useScramble.ts`, badge/domain mapping.
- **Build + visual verification** for canvas/scroll/visual components: each such task ends with `npm run build` passing AND a dev-server visual check (and a screenshot when a verification harness is available). This is intentional — unit-testing canvas rendering/scroll choreography yields low-value tests. Verification steps are explicit per task.
- Commit after every green task.

---

## PHASE 0 — Foundation & Teardown

> End state: site builds with the new design system, fonts, smooth scroll, and a minimal custom shell. Pages may be placeholder.

### Task 0.1: Install dependencies & scripts

**Files:** Modify `package.json`

- [ ] **Step 1: Add runtime + dev deps**

Run:
```bash
npm install gsap@^3.13.0 lenis@^1.1.13
npm install -D vitest@^2.1.0 @testing-library/react@^16.0.0 @testing-library/jest-dom@^6.5.0 jsdom@^25.0.0 @vitejs/plugin-react@^4.3.0
```

- [ ] **Step 2: Add test scripts to `package.json` `"scripts"`**

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Verify install**

Run: `npm run build`
Expected: builds (Once UI still present at this point — that's fine).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add gsap, lenis, vitest deps"
```

### Task 0.2: Vitest config + setup

**Files:** Create `vitest.config.ts`, `src/test/setup.ts`

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
});
```

- [ ] **Step 2: Create `src/test/setup.ts`**

```ts
import "@testing-library/jest-dom";
```

- [ ] **Step 3: Smoke test**

Create `src/test/smoke.test.ts`:
```ts
import { describe, it, expect } from "vitest";
describe("smoke", () => { it("runs", () => { expect(1 + 1).toBe(2); }); });
```

- [ ] **Step 4: Run**

Run: `npm test`
Expected: 1 passed.

- [ ] **Step 5: Commit**

```bash
git add vitest.config.ts src/test/
git commit -m "test: configure vitest + jsdom"
```

### Task 0.3: Design tokens

**Files:** Create `src/styles/tokens.css`

- [ ] **Step 1: Write `src/styles/tokens.css`**

```css
:root {
  /* color */
  --bg: #070809;
  --bg-elev: #0c0f15;
  --bg-elev-2: #11151c;
  --text: #e9eef6;
  --text-dim: #9aa6b6;
  --text-faint: #5a6678;
  --border: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.14);
  --accent: #5eead4;
  --accent-2: #7c6cff;
  --accent-ink: #0b0d12; /* text on accent fills */

  /* type */
  --font-display: var(--font-space-grotesk), system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;

  /* spacing scale (4px base) */
  --s1: 4px;  --s2: 8px;  --s3: 12px; --s4: 16px; --s5: 24px;
  --s6: 32px; --s7: 48px; --s8: 64px; --s9: 96px; --s10: 128px;

  /* layout */
  --maxw: 1280px;
  --gutter: clamp(20px, 5vw, 64px);

  /* motion */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --dur: 0.7s;

  /* radius */
  --r-sm: 8px; --r-md: 12px; --r-lg: 16px;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/tokens.css
git commit -m "feat: add design tokens"
```

### Task 0.4: Global styles + grain

**Files:** Create `src/styles/globals.css`

- [ ] **Step 1: Write `src/styles/globals.css`**

```css
@import "./tokens.css";

*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
html { -webkit-text-size-adjust: 100%; scroll-behavior: auto; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-display);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}
a { color: inherit; text-decoration: none; }
img, svg, video, canvas { display: block; max-width: 100%; }
button { font: inherit; color: inherit; background: none; border: none; cursor: pointer; }

::selection { background: var(--accent); color: var(--accent-ink); }

h1, h2, h3 { font-family: var(--font-display); letter-spacing: -0.03em; line-height: 0.95; font-weight: 600; }

.mono {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.72rem;
  color: var(--text-faint);
}

.container { width: 100%; max-width: var(--maxw); margin-inline: auto; padding-inline: var(--gutter); }

/* grain overlay — applied to <body> via ::after */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/globals.css
git commit -m "feat: add global styles + grain overlay"
```

### Task 0.5: `useReducedMotion` hook (TDD)

**Files:** Create `src/lib/useReducedMotion.ts`, Test `src/lib/useReducedMotion.test.ts`

- [ ] **Step 1: Write failing test**

```ts
import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useReducedMotion } from "./useReducedMotion";

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe("useReducedMotion", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("returns true when user prefers reduced motion", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("returns false when user does not prefer reduced motion", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });
});
```

- [ ] **Step 2: Run test, verify it fails**

Run: `npx vitest run src/lib/useReducedMotion.test.ts`
Expected: FAIL — `useReducedMotion` not found.

- [ ] **Step 3: Implement**

```ts
"use client";
import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    setReduced(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
```

- [ ] **Step 4: Run test, verify pass**

Run: `npx vitest run src/lib/useReducedMotion.test.ts`
Expected: 2 passed.

- [ ] **Step 5: Commit**

```bash
git add src/lib/useReducedMotion.ts src/lib/useReducedMotion.test.ts
git commit -m "feat: add useReducedMotion hook"
```

### Task 0.6: GSAP registration helper

**Files:** Create `src/lib/gsap.ts`

- [ ] **Step 1: Write `src/lib/gsap.ts`**

```ts
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);
  registered = true;
}

export { gsap, ScrollTrigger, Draggable, InertiaPlugin };
```

> Note: GSAP 3.13+ ships Draggable/InertiaPlugin in the public package. If `gsap/InertiaPlugin` import fails for the installed version, fall back to `npm i gsap@latest` and re-verify; the carousel has a native fallback regardless (Task 2.3).

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: builds (file unused yet, just compiles).

- [ ] **Step 3: Commit**

```bash
git add src/lib/gsap.ts
git commit -m "feat: add gsap registration helper"
```

### Task 0.7: Fonts + SmoothScroll provider

**Files:** Create `src/components/layout/SmoothScroll.tsx`

- [ ] **Step 1: Write `src/components/layout/SmoothScroll.tsx`**

```tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  useEffect(() => {
    registerGsap();
    if (reduced) return; // native scroll for reduced-motion users
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reduced]);
  return <>{children}</>;
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: builds.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/SmoothScroll.tsx
git commit -m "feat: add Lenis smooth scroll provider"
```

### Task 0.8: Rewrite root layout (strip Once UI)

**Files:** Modify `src/app/layout.tsx`; Create `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx` (+ `.module.css`)

- [ ] **Step 1: Write `src/components/layout/Header.tsx`**

```tsx
import Link from "next/link";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>MM<span>.</span></Link>
      <nav className={styles.nav}>
        <Link href="/work">01 Work</Link>
        <Link href="/about">02 About</Link>
        <Link href="/#contact">03 Contact</Link>
      </nav>
      <span className={styles.status}><i />Available · Montréal</span>
    </header>
  );
}
```

- [ ] **Step 2: Write `src/components/layout/Header.module.css`**

```css
.header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px var(--gutter);
  font-family: var(--font-mono); text-transform: uppercase;
  font-size: 0.7rem; letter-spacing: 0.14em; color: var(--text-dim);
  mix-blend-mode: difference;
}
.logo { color: var(--text); font-weight: 700; }
.logo span { color: var(--accent); }
.nav { display: flex; gap: 26px; }
.nav a:hover { color: var(--accent); }
.status { display: flex; align-items: center; gap: 7px; }
.status i { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px var(--accent); }
@media (max-width: 640px) { .nav { display: none; } }
```

- [ ] **Step 3: Write `src/components/layout/Footer.tsx` + `Footer.module.css`**

```tsx
import { person, social } from "@/resources";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} {person.name}</span>
      <nav>{social.filter((s) => s.essential).map((s) => (
        <a key={s.name} href={s.link} target="_blank" rel="noreferrer">{s.name}</a>
      ))}</nav>
      <span className="mono">Built from scratch · no template</span>
    </footer>
  );
}
```
```css
.footer {
  display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between;
  padding: 40px var(--gutter); border-top: 1px solid var(--border);
  font-size: 0.8rem; color: var(--text-faint);
}
.footer nav { display: flex; gap: 18px; }
.footer a:hover { color: var(--accent); }
```

- [ ] **Step 4: Rewrite `src/app/layout.tsx`**

```tsx
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { MagneticCursor } from "@/components/layout/MagneticCursor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { baseURL, home } from "@/resources";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(baseURL),
  title: home.title,
  description: home.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        <SmoothScroll>
          <MagneticCursor />
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
```

> Removes: Once UI CSS imports, `Background`, `RevealFx`, `Providers`, `RouteGuard`, theme-init script, `classNames`. `home.title`/`home.description` are plain strings (verify in content.tsx — they are).

- [ ] **Step 5: Verify build (expect Once UI references elsewhere to still break — that's Phase-ordering; build the layout in isolation by temporarily stubbing pages if needed). Minimum: typecheck the new files.**

Run: `npx tsc --noEmit`
Expected: no errors in `layout.tsx`, `Header.tsx`, `Footer.tsx`, `SmoothScroll.tsx`. (Errors may remain in not-yet-migrated pages; those are handled in later tasks.)

- [ ] **Step 6: Commit**

```bash
git add src/app/layout.tsx src/components/layout/
git commit -m "feat: rewrite root layout without Once UI (fonts, smooth scroll, shell)"
```

### Task 0.9: De-Once-UI the content resource

**Files:** Modify `src/resources/content.tsx`

- [ ] **Step 1: Replace the Once UI imports + JSX in `home.featured.title` and `home.subline`**

Remove `import { Line, Row, Text } from "@once-ui-system/core";`. Change `home.featured.title` to a plain string and `home.subline` to native JSX:

```tsx
// featured.title
title: "Featured work",
// subline
subline: (
  <>
    I'm Mario, a machine learning engineer working with <strong>Python &amp; AI</strong>,
    building scalable, real-world solutions.
  </>
),
```

> Keep `person`, `social`, `home.headline`, `about.*` as-is (they use only native elements or strings). Verify no other `@once-ui-system` import remains in this file.

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit src/resources/content.tsx` (or full `npx tsc --noEmit`)
Expected: no Once UI import errors from this file.

- [ ] **Step 3: Commit**

```bash
git add src/resources/content.tsx
git commit -m "refactor: remove Once UI JSX from content resource"
```

---

## PHASE 1 — Shared Primitives & Motion

> End state: reusable motion/UI primitives exist and are unit-tested where logic-bearing.

### Task 1.1: Projects data layer (TDD)

**Files:** Modify `src/utils/utils.ts` (extend `Metadata`); Create `src/lib/projects.ts`, Test `src/lib/projects.test.ts`

- [ ] **Step 1: Extend `Metadata` in `src/utils/utils.ts`**

Add optional fields to the `Metadata` type and `readMDXFile` mapping:
```ts
// in type Metadata { ... }
domain?: "ml" | "medical" | "saas" | "frontend";
badge?: "deployed" | "live" | "research" | "design";
metric?: string;
featured?: boolean;
order?: number;
```
```ts
// in readMDXFile metadata object
domain: data.domain,
badge: data.badge,
metric: data.metric || "",
featured: data.featured ?? false,
order: data.order ?? 0,
```

- [ ] **Step 2: Write failing test `src/lib/projects.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { sortByDate, filterByDomain, type Project } from "./projects";

const mk = (slug: string, date: string, domain: Project["domain"]): Project => ({
  slug, domain, badge: "deployed", metric: "", title: slug, summary: "",
  images: [], link: "", publishedAt: date, content: "", team: [],
});

describe("projects logic", () => {
  it("sorts newest first", () => {
    const out = sortByDate([mk("a", "2024-01-01", "ml"), mk("b", "2025-01-01", "saas")]);
    expect(out.map((p) => p.slug)).toEqual(["b", "a"]);
  });
  it("filters by domain, 'all' returns everything", () => {
    const list = [mk("a", "2024-01-01", "ml"), mk("b", "2025-01-01", "saas")];
    expect(filterByDomain(list, "ml").map((p) => p.slug)).toEqual(["a"]);
    expect(filterByDomain(list, "all").length).toBe(2);
  });
});
```

- [ ] **Step 3: Run, verify fail**

Run: `npx vitest run src/lib/projects.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 4: Implement `src/lib/projects.ts`**

```ts
import { getPosts } from "@/utils/utils";

export type Domain = "ml" | "medical" | "saas" | "frontend";
export type Badge = "deployed" | "live" | "research" | "design";

export interface Project {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  images: string[];
  link: string;
  content: string;
  team: { name: string; role: string; avatar: string; linkedIn: string }[];
  domain?: Domain;
  badge?: Badge;
  metric?: string;
}

const PROJECTS_PATH = ["src", "app", "work", "projects"];

export function getProjects(): Project[] {
  return getPosts(PROJECTS_PATH).map((p) => ({
    slug: p.slug,
    content: p.content,
    title: p.metadata.title,
    summary: p.metadata.summary,
    publishedAt: p.metadata.publishedAt,
    images: p.metadata.images,
    link: p.metadata.link || "",
    team: p.metadata.team || [],
    domain: p.metadata.domain,
    badge: p.metadata.badge,
    metric: p.metadata.metric,
  }));
}

export function sortByDate(list: Project[]): Project[] {
  return [...list].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function filterByDomain(list: Project[], domain: Domain | "all"): Project[] {
  return domain === "all" ? list : list.filter((p) => p.domain === domain);
}

export const DOMAIN_LABELS: Record<Domain | "all", string> = {
  all: "All", ml: "ML", medical: "Medical", saas: "SaaS", frontend: "Frontend",
};
```

- [ ] **Step 5: Run, verify pass**

Run: `npx vitest run src/lib/projects.test.ts`
Expected: 2 passed.

- [ ] **Step 6: Commit**

```bash
git add src/utils/utils.ts src/lib/projects.ts src/lib/projects.test.ts
git commit -m "feat: projects data layer with domain/badge/metric"
```

### Task 1.2: Add frontmatter to the 4 MDX projects

**Files:** Modify `src/app/work/projects/{saas_housing_pricing,health_technology_project,menu_optimizer,sites}.mdx`

- [ ] **Step 1: Add fields to each frontmatter** (per the mapping table)

`saas_housing_pricing.mdx`:
```yaml
domain: "ml"
badge: "deployed"
metric: "In production · CRM"
featured: true
order: 1
```
`health_technology_project.mdx`:
```yaml
domain: "medical"
badge: "research"
metric: "Reproducible 3D"
featured: true
order: 2
```
`menu_optimizer.mdx`:
```yaml
domain: "saas"
badge: "live"
metric: "Live SaaS"
featured: true
order: 3
```
`sites.mdx`:
```yaml
domain: "frontend"
badge: "design"
metric: "React · Next.js"
featured: true
order: 4
```

- [ ] **Step 2: Add a kept assertion that the loader reads the frontmatter**

Append to `src/lib/projects.test.ts`:
```ts
import { getProjects } from "./projects";

describe("getProjects frontmatter", () => {
  it("reads domain + badge for each of the 4 projects", () => {
    const bySlug = Object.fromEntries(getProjects().map((p) => [p.slug, p]));
    expect(bySlug["saas_housing_pricing"]?.domain).toBe("ml");
    expect(bySlug["saas_housing_pricing"]?.badge).toBe("deployed");
    expect(bySlug["health_technology_project"]?.domain).toBe("medical");
    expect(bySlug["menu_optimizer"]?.badge).toBe("live");
    expect(bySlug["sites"]?.domain).toBe("frontend");
  });
});
```
Run: `npx vitest run src/lib/projects.test.ts`
Expected: all pass (catches frontmatter typos/quoting now, not at visual time).

- [ ] **Step 3: Early image-path audit (moved up from Task 5.3 so broken covers don't surface during Phase 2/4 visual checks)**

Run:
```bash
grep -rho "/images/[^\")' ]*" src/ | sort -u > /tmp/refs.txt
( cd public && find images -type f | sed 's#^#/#' ) | sort -u > /tmp/have.txt
comm -23 /tmp/refs.txt /tmp/have.txt
```
Expected: prints referenced-but-missing image paths. For each, fix the path to an existing file or remove the reference in the MDX/`content.tsx`. Confirm `person.avatar` (`/images/moi.jpg`) resolves; if missing, set it to `/images/avatar.jpg`. (Task 5.3 keeps a final re-verification.)

> `ProjectCard`/`ProjectHero` already guard the cover with `{cover && ...}`, so a missing first image renders an empty cover rather than crashing — but paths should still be fixed here.

- [ ] **Step 4: Commit**

```bash
git add src/app/work/projects/ src/lib/projects.test.ts
git commit -m "content: add domain/badge/metric frontmatter + audit image paths"
```

### Task 1.3: `useScramble` hook (TDD)

**Files:** Create `src/lib/useScramble.ts`, Test `src/lib/useScramble.test.ts`

- [ ] **Step 1: Write failing test** (test the pure step function, not timers)

```ts
import { describe, it, expect } from "vitest";
import { scrambleStep } from "./useScramble";

describe("scrambleStep", () => {
  it("reveals more characters as progress increases", () => {
    const target = "HELLO";
    const early = scrambleStep(target, 0.2);
    const late = scrambleStep(target, 0.8);
    const revealed = (s: string) => s.split("").filter((c, i) => c === target[i]).length;
    expect(revealed(late)).toBeGreaterThanOrEqual(revealed(early));
  });
  it("returns the exact target at progress 1", () => {
    expect(scrambleStep("SHIP", 1)).toBe("SHIP");
  });
  it("preserves spaces", () => {
    expect(scrambleStep("A B", 1)).toBe("A B");
  });
});
```

- [ ] **Step 2: Run, verify fail**

Run: `npx vitest run src/lib/useScramble.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement `src/lib/useScramble.ts`**

```ts
"use client";
import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*";

export function scrambleStep(target: string, progress: number): string {
  const reveal = Math.floor(target.length * progress);
  let out = "";
  for (let i = 0; i < target.length; i++) {
    const ch = target[i];
    if (ch === " ") { out += " "; continue; }
    if (i < reveal || progress >= 1) out += ch;
    else out += GLYPHS[(i * 7 + Math.floor(progress * 97)) % GLYPHS.length];
  }
  return out;
}

export function useScramble(target: string, enabled: boolean, durationMs = 900) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!enabled) { el.textContent = target; return; }
    let raf = 0; let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / durationMs, 1);
      el.textContent = scrambleStep(target, p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, enabled, durationMs]);
  return ref;
}
```

- [ ] **Step 4: Run, verify pass**

Run: `npx vitest run src/lib/useScramble.test.ts`
Expected: 3 passed.

- [ ] **Step 5: Commit**

```bash
git add src/lib/useScramble.ts src/lib/useScramble.test.ts
git commit -m "feat: add useScramble hook"
```

### Task 1.4: `Reveal` + `useReveal` (scroll reveal)

**Files:** Create `src/lib/useReveal.ts`, `src/components/ui/Reveal.tsx`

- [ ] **Step 1: Write `src/lib/useReveal.ts`**

```ts
"use client";
import { useEffect, useRef } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function useReveal<T extends HTMLElement>(stagger = 0.08) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    registerGsap();
    if (reduced) return; // visible by default via CSS
    const targets = el.dataset.revealChildren ? el.children : [el];
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y: 28, opacity: 0, duration: 0.8, ease: "expo.out", stagger,
        scrollTrigger: { trigger: el, start: "top 82%" },
      });
    }, el);
    return () => ctx.revert();
  }, [reduced, stagger]);
  return ref;
}
```

- [ ] **Step 2: Write `src/components/ui/Reveal.tsx`**

```tsx
"use client";
import { useReveal } from "@/lib/useReveal";

export function Reveal({ children, stagger, childrenStagger = false, className }: {
  children: React.ReactNode; stagger?: number; childrenStagger?: boolean; className?: string;
}) {
  const ref = useReveal<HTMLDivElement>(stagger);
  return <div ref={ref} className={className} data-reveal-children={childrenStagger ? "true" : undefined}>{children}</div>;
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build` (will still fail on un-migrated pages; instead) `npx tsc --noEmit` for these files.
Expected: no type errors in new files.

- [ ] **Step 4: Commit**

```bash
git add src/lib/useReveal.ts src/components/ui/Reveal.tsx
git commit -m "feat: add scroll reveal hook + component"
```

### Task 1.5: `Badge`, `Tag`, `Counter`, `Marquee`, `ScrambleText`

**Files:** Create `src/components/ui/{Badge,Tag,Counter,Marquee,ScrambleText}.tsx` (+ `.module.css` where needed)

- [ ] **Step 1: `Badge.tsx`**

```tsx
import styles from "./Badge.module.css";
import type { Badge as BadgeType } from "@/lib/projects";

const LABELS: Record<BadgeType, string> = {
  deployed: "deployed", live: "live", research: "research", design: "design",
};

export function Badge({ kind }: { kind?: BadgeType }) {
  if (!kind) return null;
  return <span className={styles.badge}><i />{LABELS[kind]}</span>;
}
```
```css
.badge { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono);
  text-transform: uppercase; font-size: 0.62rem; letter-spacing: 0.12em; color: var(--accent);
  border: 1px solid var(--border-strong); border-radius: 6px; padding: 4px 8px; }
.badge i { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 7px var(--accent); }
```

- [ ] **Step 2: `Tag.tsx`**

```tsx
import styles from "./Tag.module.css";
export function Tag({ children }: { children: React.ReactNode }) {
  return <span className={styles.tag}>{children}</span>;
}
```
```css
.tag { display: inline-block; font-family: var(--font-mono); font-size: 0.64rem; color: var(--text-dim);
  border: 1px solid var(--border); border-radius: 6px; padding: 5px 8px; background: rgba(255,255,255,0.03); }
```

- [ ] **Step 3: `Counter.tsx`** (animates to a numeric value when in view; respects reduced motion)

```tsx
"use client";
import { useEffect, useRef } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current; if (!el) return;
    registerGsap();
    if (reduced) { el.textContent = `${to}${suffix}`; return; }
    const obj = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, { v: to, duration: 1.4, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
        onUpdate: () => { el.textContent = `${Math.round(obj.v)}${suffix}`; } });
    }, el);
    return () => ctx.revert();
  }, [to, suffix, reduced]);
  return <span ref={ref}>0{suffix}</span>;
}
```

- [ ] **Step 4: `Marquee.tsx`**

```tsx
"use client";
import { useEffect, useRef } from "react";
import { registerGsap, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./Marquee.module.css";

export function Marquee({ items }: { items: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const track = trackRef.current; if (!track || reduced) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.to(track, { xPercent: -50, duration: 24, ease: "none", repeat: -1 });
    }, track);
    return () => ctx.revert();
  }, [reduced]);
  const doubled = [...items, ...items];
  return (
    <div className={styles.wrap}>
      <div ref={trackRef} className={styles.track}>
        {doubled.map((it, i) => <span key={i} className={styles.item}>{it}</span>)}
      </div>
    </div>
  );
}
```
```css
.wrap { overflow: hidden; width: 100%; -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
.track { display: flex; gap: 14px; width: max-content; }
.item { font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-dim);
  border: 1px solid var(--border); border-radius: 8px; padding: 8px 12px; white-space: nowrap; }
```

- [ ] **Step 5: `ScrambleText.tsx`**

```tsx
"use client";
import { useScramble } from "@/lib/useScramble";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function ScrambleText({ text, as: Tag = "span", className }: {
  text: string; as?: React.ElementType; className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useScramble(text, !reduced);
  return <Tag ref={ref as never} className={className}>{text}</Tag>;
}
```

- [ ] **Step 6: Typecheck + commit**

Run: `npx tsc --noEmit`
Expected: no errors in `src/components/ui/*`.
```bash
git add src/components/ui/
git commit -m "feat: add Badge, Tag, Counter, Marquee, ScrambleText primitives"
```

### Task 1.6: Magnetic cursor

**Files:** Create `src/components/layout/MagneticCursor.tsx` (+ `.module.css`)

> Resolves the phantom-component gap: the layout (Task 0.8) renders `<MagneticCursor />`; this task creates it. Spec §7.4 / §8.

- [ ] **Step 1: Write `src/components/layout/MagneticCursor.tsx`** (gsap `quickTo` follow; disabled on touch + reduced-motion)

```tsx
"use client";
import { useEffect, useRef } from "react";
import { registerGsap, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./MagneticCursor.module.css";

export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const dot = dotRef.current;
    if (!dot || reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // touch → native cursor
    registerGsap();
    const xTo = gsap.quickTo(dot, "x", { duration: 0.4, ease: "expo.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.4, ease: "expo.out" });
    const move = (e: PointerEvent) => { xTo(e.clientX); yTo(e.clientY); };
    const over = (e: PointerEvent) => {
      const interactive = (e.target as HTMLElement).closest("a,button,canvas");
      dot.classList.toggle(styles.hover, !!interactive);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerover", over); };
  }, [reduced]);
  return <div ref={dotRef} className={styles.cursor} aria-hidden="true" />;
}
```

- [ ] **Step 2: Write `src/components/layout/MagneticCursor.module.css`**

```css
.cursor { position: fixed; top: 0; left: 0; width: 14px; height: 14px; border-radius: 50%;
  border: 1px solid var(--accent); margin: -7px 0 0 -7px; pointer-events: none; z-index: 9998;
  transition: width .2s, height .2s, background .2s; mix-blend-mode: difference; }
.hover { width: 36px; height: 36px; margin: -18px 0 0 -18px; background: rgba(94, 234, 212, 0.12); }
@media (pointer: coarse) { .cursor { display: none; } }
```

- [ ] **Step 3: Typecheck + commit**

Run: `npx tsc --noEmit`
Expected: no errors in `MagneticCursor.tsx`.
```bash
git add src/components/layout/MagneticCursor.*
git commit -m "feat: add magnetic cursor"
```

---

## PHASE 2 — Home Page

> End state: `/` renders the full pipeline journey. Each section is a committed, building increment.

### Task 2.1: Hero — Latent Space (canvas)

**Files:** Create `src/components/home/HeroLatentSpace.tsx` (+ `.module.css`)

- [ ] **Step 1: Write `HeroLatentSpace.module.css`**

```css
.hero { position: relative; min-height: 100svh; display: flex; align-items: center; overflow: hidden; }
.canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; }
.glow { position: absolute; top: -120px; right: 8%; width: 360px; height: 360px;
  background: radial-gradient(circle, rgba(94,234,212,0.16), transparent 62%); filter: blur(16px); z-index: 0; }
.inner { position: relative; z-index: 1; }
.eyebrow { color: var(--accent); margin-bottom: 18px; }
.title { font-size: clamp(2.6rem, 8vw, 5.2rem); font-weight: 600; letter-spacing: -0.035em; line-height: 0.92; }
.title .stroke { color: var(--bg); -webkit-text-stroke: 1.4px var(--accent); }
.sub { margin-top: 22px; max-width: 460px; color: var(--text-dim); font-size: clamp(1rem, 2vw, 1.15rem); }
.cue { position: absolute; bottom: 28px; left: var(--gutter); }
.srLinks { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.srLinks a:focus { position: fixed; left: var(--gutter); bottom: 70px; width: auto; height: auto; clip: auto;
  color: var(--accent); background: var(--bg-elev); padding: 6px 10px; border: 1px solid var(--accent); border-radius: 6px; }
```

- [ ] **Step 2: Write `HeroLatentSpace.tsx`** (canvas point cloud + magnetic pointer; reduced-motion → static dots)

```tsx
"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { home } from "@/resources";
import styles from "./HeroLatentSpace.module.css";

interface Point { x: number; y: number; bx: number; by: number; r: number; c: string; slug?: string; label?: string; }
const HIT = 18; // px radius to register a project-point hover/click

export function HeroLatentSpace({ projects }: { projects: { slug: string; title: string }[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const router = useRouter();
  const hovered = useRef<Point | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf = 0; const mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let pts: Point[] = [];
    const projectPts = () => pts.filter((p) => p.slug);

    const seed = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = [];
      // project points (the 4 projects) — two clusters
      projects.forEach((p, i) => {
        const cluster = i % 2 === 0;
        const bx = w * (cluster ? 0.62 : 0.78) + (Math.sin(i) * 60);
        const by = h * (0.3 + (i / Math.max(projects.length, 1)) * 0.45);
        pts.push({ x: bx, y: by, bx, by, r: 5, c: cluster ? "#5eead4" : "#7c6cff", slug: p.slug, label: p.title });
      });
      // noise points
      for (let i = 0; i < 60; i++) {
        const bx = Math.random() * w, by = Math.random() * h;
        pts.push({ x: bx, y: by, bx, by, r: Math.random() * 1.6 + 0.4, c: "#5a6678" });
      }
    };

    const nearest = (): Point | null => {
      let best: Point | null = null, bd = HIT;
      for (const p of projectPts()) { const d = Math.hypot(p.x - mouse.x, p.y - mouse.y); if (d < bd) { bd = d; best = p; } }
      return best;
    };

    const draw = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      // connection lines: cursor → nearby project points (non-reduced only)
      if (!reduced) {
        for (const p of projectPts()) {
          const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (d < 220) {
            ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(94,234,212,${(1 - d / 220) * 0.35})`; ctx.lineWidth = 1; ctx.stroke();
          }
        }
      }
      const hov = hovered.current;
      for (const p of pts) {
        if (!reduced) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y, dist = Math.hypot(dx, dy);
          if (dist < 120) { const f = (120 - dist) / 120; p.x += (dx / dist) * f * 2; p.y += (dy / dist) * f * 2; }
          p.x += (p.bx - p.x) * 0.05; p.y += (p.by - p.y) * 0.05;
        }
        const big = p === hov;
        ctx.beginPath(); ctx.arc(p.x, p.y, big ? p.r + 3 : p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c; ctx.shadowBlur = p.slug ? 12 : 0; ctx.shadowColor = p.c; ctx.fill();
      }
      ctx.shadowBlur = 0;
      // hovered project label
      if (hov?.label) {
        ctx.font = "600 13px ui-monospace, monospace"; ctx.fillStyle = "#e9eef6";
        ctx.fillText(hov.label, hov.x + 14, hov.y - 10);
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    seed(); draw();
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      hovered.current = nearest();
      canvas.style.cursor = hovered.current ? "pointer" : "default";
      if (reduced) draw(); // reduced-motion: redraw on demand for hover label
    };
    const onClick = () => { const hv = hovered.current; if (hv?.slug) router.push(`/work/${hv.slug}`); };
    const onResize = () => { seed(); draw(); };
    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
    };
  }, [projects, reduced, router]);

  return (
    <section className={styles.hero} id="top">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={`mono ${styles.eyebrow}`}>Applied AI Engineer · Montréal · ● Available</div>
        <h1 className={styles.title}>
          Designing practical <ScrambleText text="AI systems" as="span" className={styles.stroke} /> that ship.
        </h1>
        <p className={styles.sub}>{home.subline}</p>
        <Link href="/work" className={`mono ${styles.cue}`}>Scroll ↓</Link>
      </div>
      {/* keyboard/SR-accessible equivalents of the canvas project points */}
      <ul className={styles.srLinks}>
        {projects.map((p) => (<li key={p.slug}><Link href={`/work/${p.slug}`}>{p.title}</Link></li>))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 3: Verify build + visual**

Run: `npm run build` then `npm run dev`, open `/`.
Expected: hero renders, points drift, cursor pushes nearby points; with OS reduced-motion on, points are static and title is plain. (Home page wiring is Task 2.6 — if `/` not yet composed, temporarily render `<HeroLatentSpace projects={...}/>` in `page.tsx`.)

- [ ] **Step 4: Commit**

```bash
git add src/components/home/HeroLatentSpace.tsx src/components/home/HeroLatentSpace.module.css
git commit -m "feat: Latent Space canvas hero"
```

### Task 2.2: Manifesto + skills marquee

**Files:** Create `src/components/home/ManifestoMarquee.tsx` (+ `.module.css`)

- [ ] **Step 1: Write component**

```tsx
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { Counter } from "@/components/ui/Counter";
import styles from "./ManifestoMarquee.module.css";

const TOOLS = ["Python", "XGBoost", "Scikit-learn", "FastAPI", "Docker", "PostgreSQL",
  "React", "Next.js", "TypeScript", "Supabase", "3D Slicer", "NumPy", "Pandas"];

// truthful integers — no fabricated metrics (see Decisions Locked)
const STATS = [
  { to: 4, label: "projects shipped" },
  { to: 4, label: "domains · ML / medical / SaaS / frontend" },
  { to: 2, label: "master's degrees" },
];

export function ManifestoMarquee() {
  return (
    <section className={styles.section}>
      <Reveal className="container">
        <p className={styles.manifesto}>
          I turn complex business problems into <em>models that run in production.</em>
        </p>
      </Reveal>
      <div className={`container ${styles.stats}`}>
        {STATS.map((s) => (
          <div key={s.label} className={styles.stat}>
            <span className={styles.num}><Counter to={s.to} /></span>
            <span className="mono">{s.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.marquee}><Marquee items={TOOLS} /></div>
    </section>
  );
}
```

- [ ] **Step 2: Write `.module.css`**

```css
.section { padding: var(--s9) 0; }
.manifesto { font-size: clamp(1.4rem, 4vw, 2.4rem); font-weight: 500; line-height: 1.25; max-width: 18ch; }
.manifesto em { color: var(--accent); font-style: normal; }
.stats { display: flex; flex-wrap: wrap; gap: var(--s7); margin-top: var(--s6); }
.stat { display: flex; flex-direction: column; gap: 4px; }
.num { font-size: clamp(2rem, 5vw, 3rem); font-weight: 600; color: var(--accent); letter-spacing: -0.02em; }
.marquee { margin-top: var(--s6); }
```

- [ ] **Step 3: Build + visual check, then commit**

Run: `npm run build`
Expected: builds.
```bash
git add src/components/home/ManifestoMarquee.*
git commit -m "feat: manifesto + skills marquee section"
```

### Task 2.3: Selected Work carousel

**Files:** Create `src/components/home/SelectedWorkCarousel.tsx` (+ `.module.css`), `src/components/work/ProjectCard.tsx` (+ `.module.css`)

- [ ] **Step 1: Write `src/components/work/ProjectCard.tsx`** (shared card, no Once UI)

```tsx
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/lib/projects";
import styles from "./ProjectCard.module.css";

export function ProjectCard({ project }: { project: Project }) {
  const cover = project.images[0];
  return (
    <Link href={`/work/${project.slug}`} className={styles.card}>
      <div className={styles.cover}>
        {cover && <Image src={cover} alt={project.title} fill sizes="(max-width:640px) 80vw, 360px" className={styles.img} />}
      </div>
      <div className={styles.body}>
        <div className={styles.top}><Badge kind={project.badge} />{project.metric && <span className="mono">{project.metric}</span>}</div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.summary}>{project.summary}</p>
      </div>
    </Link>
  );
}
```
```css
.card { display: block; border: 1px solid var(--border); border-radius: var(--r-md);
  background: var(--bg-elev); overflow: hidden; transition: border-color .2s, transform .2s; }
.card:hover { border-color: var(--border-strong); transform: translateY(-3px); }
.cover { position: relative; aspect-ratio: 16/10; background: var(--bg-elev-2); overflow: hidden; }
.img { object-fit: cover; transition: transform .6s var(--ease-out-expo); }
.card:hover .img { transform: scale(1.05); }
.body { padding: var(--s4); }
.top { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--s3); }
.title { font-size: 1.25rem; margin-bottom: var(--s2); }
.summary { color: var(--text-dim); font-size: 0.9rem; line-height: 1.5; }
```

- [ ] **Step 2: Write `SelectedWorkCarousel.tsx`** (Draggable + Inertia; native scroll fallback)

```tsx
"use client";
import { useEffect, useRef } from "react";
import { registerGsap, gsap, Draggable, InertiaPlugin } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ProjectCard } from "@/components/work/ProjectCard";
import type { Project } from "@/lib/projects";
import styles from "./SelectedWorkCarousel.module.css";

export function SelectedWorkCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current; if (!track || reduced) return;
    registerGsap();
    const max = () => Math.min(0, track.parentElement!.clientWidth - track.scrollWidth);
    const d = Draggable.create(track, {
      type: "x", inertia: true, edgeResistance: 0.85,
      bounds: { minX: max(), maxX: 0 },
    });
    return () => { d.forEach((x) => x.kill()); };
  }, [reduced, projects.length]);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.head}><h2>Selected Work</h2><span className="mono">drag / scroll →</span></div>
      </div>
      <div className={`${styles.viewport} ${reduced ? styles.native : ""}`}>
        <div ref={trackRef} className={styles.track}>
          {projects.map((p) => <div key={p.slug} className={styles.slide}><ProjectCard project={p} /></div>)}
        </div>
      </div>
    </section>
  );
}
```
```css
.section { padding: var(--s8) 0; }
.head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: var(--s5); }
.viewport { overflow: hidden; padding-inline: var(--gutter); }
.viewport.native { overflow-x: auto; scroll-snap-type: x mandatory; }
.track { display: flex; gap: var(--s4); width: max-content; }
.slide { width: clamp(280px, 70vw, 380px); scroll-snap-align: start; }
```

- [ ] **Step 3: Build + visual**

Run: `npm run build` then dev — drag the carousel (desktop), native scroll on touch/reduced-motion.
Expected: smooth drag with inertia; fallback scrolls/snaps.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/SelectedWorkCarousel.* src/components/work/ProjectCard.*
git commit -m "feat: selected work draggable carousel + ProjectCard"
```

### Task 2.4: Capabilities grid

**Files:** Create `src/components/home/CapabilitiesGrid.tsx` (+ `.module.css`)

- [ ] **Step 1: Write component** (reads `about.technical.skills`)

```tsx
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { about } from "@/resources";
import styles from "./CapabilitiesGrid.module.css";

export function CapabilitiesGrid() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.h}>Capabilities</h2>
        <Reveal className={styles.grid} childrenStagger>
          {about.technical.skills.map((skill) => (
            <article key={skill.title} className={styles.card}>
              <h3 className={styles.title}>{skill.title}</h3>
              <p className={styles.desc}>{skill.description}</p>
              <div className={styles.tags}>{skill.tags?.map((t) => <Tag key={t.name}>{t.name}</Tag>)}</div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
```
```css
.section { padding: var(--s8) 0; }
.h { margin-bottom: var(--s6); }
.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--s4); }
.card { border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--s5);
  background: var(--bg-elev); transition: border-color .2s, background .2s; }
.card:hover { border-color: var(--accent); background: var(--bg-elev-2); }
.title { font-size: 1.15rem; margin-bottom: var(--s3); }
.desc { color: var(--text-dim); font-size: 0.9rem; margin-bottom: var(--s4); }
.tags { display: flex; flex-wrap: wrap; gap: var(--s2); }
@media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 2: Build + commit**

Run: `npm run build`
```bash
git add src/components/home/CapabilitiesGrid.*
git commit -m "feat: capabilities grid section"
```

### Task 2.5: Deployment log (experience + studies)

**Files:** Create `src/components/home/DeploymentLog.tsx` (+ `.module.css`)

- [ ] **Step 1: Write component** (reads `about.work.experiences` + `about.studies.institutions`)

```tsx
import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/resources";
import styles from "./DeploymentLog.module.css";

export function DeploymentLog() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.h}>Deployment log</h2>
        <Reveal className={styles.log} childrenStagger>
          {about.work.experiences.map((exp) => (
            <div key={exp.company} className={styles.row}>
              <span className={styles.time}>{exp.timeframe}</span>
              <div><div className={styles.role}>{exp.role} — {exp.company}</div></div>
            </div>
          ))}
          {about.studies.institutions.map((inst) => (
            <div key={inst.name} className={styles.row}>
              <span className={styles.time}>studies</span>
              <div><div className={styles.role}>{inst.name}</div></div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
```
```css
.section { padding: var(--s8) 0; }
.h { margin-bottom: var(--s6); }
.log { border-left: 1px solid var(--border-strong); }
.row { display: grid; grid-template-columns: 130px 1fr; gap: var(--s4); padding: var(--s4) var(--s5);
  position: relative; }
.row::before { content: ""; position: absolute; left: -4px; top: var(--s5); width: 7px; height: 7px;
  border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px var(--accent); }
.time { font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent); text-transform: uppercase; }
.role { font-size: 1rem; }
@media (max-width: 640px) { .row { grid-template-columns: 1fr; } }
```

- [ ] **Step 2: Build + commit**

Run: `npm run build`
```bash
git add src/components/home/DeploymentLog.*
git commit -m "feat: deployment log (experience + studies) section"
```

### Task 2.6: Contact CTA + compose home page + PipelineRail

**Files:** Create `src/components/home/ContactCTA.tsx` (+ css), `src/components/layout/PipelineRail.tsx` (+ css); Modify `src/app/page.tsx`

- [ ] **Step 1: Write `ContactCTA.tsx`**

```tsx
import { person, social, about } from "@/resources";
import styles from "./ContactCTA.module.css";

export function ContactCTA() {
  return (
    <section className={styles.section} id="contact">
      <div className="container">
        <h2 className={styles.big}>Let's build something that ships.</h2>
        <div className={styles.links}>
          <a href={`mailto:${person.email}`} className={styles.primary}>{person.email}</a>
          {about.calendar?.display && about.calendar.link && (
            <a href={about.calendar.link} target="_blank" rel="noreferrer" className={styles.link}>Book a call ↗</a>
          )}
          {social.filter((s) => s.essential && s.name !== "Email").map((s) => (
            <a key={s.name} href={s.link} target="_blank" rel="noreferrer" className={styles.link}>{s.name}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
```
```css
.section { padding: var(--s10) 0; text-align: center; }
.big { font-size: clamp(2rem, 7vw, 4.5rem); letter-spacing: -0.03em; }
.links { margin-top: var(--s6); display: flex; flex-wrap: wrap; gap: var(--s4); justify-content: center; align-items: center; }
.primary { font-size: 1.1rem; color: var(--accent); border-bottom: 1px solid var(--accent); padding-bottom: 2px; }
.link { font-family: var(--font-mono); text-transform: uppercase; font-size: 0.75rem; color: var(--text-dim); }
.link:hover { color: var(--text); }
```

- [ ] **Step 2: Write `PipelineRail.tsx`** (fixed left rail; active node by scroll position; hidden on mobile + reduced motion safe)

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./PipelineRail.module.css";

const STAGES = ["Input", "Features", "Model", "Production", "Ship"];

export function PipelineRail() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const p = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
      setActive(Math.min(STAGES.length - 1, Math.floor(p * STAGES.length)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div ref={ref} className={styles.rail} aria-hidden="true">
      {STAGES.map((s, i) => (
        <div key={s} className={`${styles.node} ${i <= active ? styles.on : ""}`}>
          <i /><span>{s}</span>
        </div>
      ))}
    </div>
  );
}
```
```css
.rail { position: fixed; left: 18px; top: 50%; transform: translateY(-50%); z-index: 50;
  display: flex; flex-direction: column; gap: 18px; }
.node { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono);
  font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-faint); transition: color .3s; }
.node i { width: 8px; height: 8px; border-radius: 50%; border: 1px solid var(--text-faint); transition: all .3s; }
.node.on { color: var(--accent); }
.node.on i { background: var(--accent); border-color: var(--accent); box-shadow: 0 0 10px var(--accent); }
.node span { opacity: 0; transition: opacity .3s; }
.rail:hover .node span { opacity: 1; }
@media (max-width: 900px) { .rail { display: none; } }
```

> **Reduced-motion note (reconciles spec §8):** the rail uses a passive scroll listener and only toggles a CSS class per stage — there is **no tween/animation**, so it is inherently reduced-motion-safe and reflects the current stage statically. This is the documented exception to "all anims via `gsap.matchMedia`" (see Decisions Locked). The CSS `transition` on `.node` is decorative and already collapses under the global `prefers-reduced-motion` rule in `globals.css`.

- [ ] **Step 3: Rewrite `src/app/page.tsx`**

```tsx
import { getProjects, sortByDate } from "@/lib/projects";
import { HeroLatentSpace } from "@/components/home/HeroLatentSpace";
import { ManifestoMarquee } from "@/components/home/ManifestoMarquee";
import { SelectedWorkCarousel } from "@/components/home/SelectedWorkCarousel";
import { CapabilitiesGrid } from "@/components/home/CapabilitiesGrid";
import { DeploymentLog } from "@/components/home/DeploymentLog";
import { ContactCTA } from "@/components/home/ContactCTA";
import { PipelineRail } from "@/components/layout/PipelineRail";

export default function Home() {
  const projects = sortByDate(getProjects());
  return (
    <>
      <PipelineRail />
      <HeroLatentSpace projects={projects.map((p) => ({ slug: p.slug, title: p.title }))} />
      <ManifestoMarquee />
      <SelectedWorkCarousel projects={projects} />
      <CapabilitiesGrid />
      <DeploymentLog />
      <ContactCTA />
    </>
  );
}
```

- [ ] **Step 4: Build + full visual pass**

Run: `npm run build` then `npm run dev`, scroll the whole home page.
Expected: all sections render in order; pipeline rail lights up with scroll; no console errors; reduced-motion variant is calm.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/ContactCTA.* src/components/layout/PipelineRail.* src/app/page.tsx
git commit -m "feat: contact CTA + pipeline rail + compose home page"
```

---

## PHASE 3 — Work Page

> End state: `/work` lists all projects with animated domain filters.

### Task 3.1: Project grid + filters

**Files:** Create `src/components/work/ProjectGrid.tsx` (+ css), `src/components/work/ProjectFilters.tsx`; Modify `src/app/work/page.tsx`

- [ ] **Step 1: Write `ProjectFilters.tsx`** (client; controlled by parent grid)

```tsx
"use client";
import type { Domain } from "@/lib/projects";
import { DOMAIN_LABELS } from "@/lib/projects";
import styles from "./ProjectGrid.module.css";

const ORDER: (Domain | "all")[] = ["all", "ml", "medical", "saas", "frontend"];

export function ProjectFilters({ active, onChange }: { active: Domain | "all"; onChange: (d: Domain | "all") => void }) {
  return (
    <div className={styles.filters} role="tablist">
      {ORDER.map((d) => (
        <button key={d} role="tab" aria-selected={active === d}
          className={`${styles.filter} ${active === d ? styles.active : ""}`} onClick={() => onChange(d)}>
          {DOMAIN_LABELS[d]}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Write `ProjectGrid.tsx`** (client; holds filter state + FLIP-ish animation via GSAP)

```tsx
"use client";
import { useState, useRef, useLayoutEffect } from "react";
import { registerGsap, gsap } from "@/lib/gsap";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilters } from "./ProjectFilters";
import { filterByDomain, type Project, type Domain } from "@/lib/projects";
import styles from "./ProjectGrid.module.css";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [domain, setDomain] = useState<Domain | "all">("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const visible = filterByDomain(projects, domain);

  useLayoutEffect(() => {
    const grid = gridRef.current; if (!grid) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(grid.children, { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "expo.out", stagger: 0.05 });
    }, grid);
    return () => ctx.revert();
  }, [domain]);

  return (
    <div className="container">
      <ProjectFilters active={domain} onChange={setDomain} />
      <div ref={gridRef} className={styles.grid}>
        {visible.map((p) => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Write `ProjectGrid.module.css`**

```css
.filters { display: flex; flex-wrap: wrap; gap: var(--s2); margin: var(--s7) 0 var(--s6); }
.filter { font-family: var(--font-mono); text-transform: uppercase; font-size: 0.72rem; letter-spacing: 0.1em;
  color: var(--text-dim); border: 1px solid var(--border); border-radius: 999px; padding: 8px 16px; transition: all .2s; }
.filter:hover { border-color: var(--border-strong); }
.active { color: var(--accent-ink); background: var(--accent); border-color: var(--accent); }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s4); padding-bottom: var(--s9); }
@media (max-width: 960px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 4: Rewrite `src/app/work/page.tsx`**

```tsx
import type { Metadata } from "next";
import { getProjects, sortByDate } from "@/lib/projects";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { work } from "@/resources";

export const metadata: Metadata = { title: work.title, description: work.description };

export default function Work() {
  const projects = sortByDate(getProjects());
  return (
    <section style={{ paddingTop: "120px" }}>
      <div className="container"><h1>Work</h1></div>
      <ProjectGrid projects={projects} />
    </section>
  );
}
```

- [ ] **Step 5: Build + visual**

Run: `npm run build` then dev, open `/work`, click each filter.
Expected: cards filter + re-animate; "all" shows 4; each domain shows its project.

- [ ] **Step 6: Commit**

```bash
git add src/components/work/ProjectGrid.* src/components/work/ProjectFilters.tsx src/app/work/page.tsx
git commit -m "feat: work page with animated domain filters"
```

---

## PHASE 4 — Project Detail + MDX

> End state: `/work/[slug]` renders an immersive, restyled case study.

### Task 4.1: Restyle MDX components

**Files:** Create `src/components/mdx/MDXComponents.tsx` (+ `.module.css`); Delete old `src/components/mdx.tsx` usage

- [ ] **Step 1: Inspect old `src/components/mdx.tsx`** to preserve the `CustomMDX` (next-mdx-remote) wiring.

Run: `sed -n '1,60p' src/components/mdx.tsx` (read it).
Expected: note how `MDXRemote`/components map is exported.

- [ ] **Step 2: Write `src/components/mdx/MDXComponents.tsx`**

```tsx
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import Image from "next/image";
import styles from "./mdx.module.css";

const components = {
  h2: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className={styles.h2} {...p} />,
  h3: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className={styles.h3} {...p} />,
  p: (p: React.HTMLAttributes<HTMLParagraphElement>) => <p className={styles.p} {...p} />,
  ul: (p: React.HTMLAttributes<HTMLUListElement>) => <ul className={styles.ul} {...p} />,
  li: (p: React.HTMLAttributes<HTMLLIElement>) => <li className={styles.li} {...p} />,
  a: (p: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className={styles.a} target="_blank" rel="noreferrer" {...p} />,
  strong: (p: React.HTMLAttributes<HTMLElement>) => <strong className={styles.strong} {...p} />,
  hr: () => <hr className={styles.hr} />,
  img: (p: { src?: string; alt?: string }) => (
    <span className={styles.imgWrap}><Image src={p.src || ""} alt={p.alt || ""} width={1200} height={675} className={styles.img} /></span>
  ),
};

export function CustomMDX(props: MDXRemoteProps) {
  return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />;
}
```

- [ ] **Step 3: Write `src/components/mdx/mdx.module.css`**

```css
.h2 { font-size: 1.8rem; margin: var(--s7) 0 var(--s3); }
.h3 { font-size: 1.25rem; margin: var(--s5) 0 var(--s2); color: var(--text); }
.p { color: var(--text-dim); margin-bottom: var(--s4); line-height: 1.7; }
.ul { list-style: none; padding: 0; margin-bottom: var(--s4); }
.li { position: relative; padding-left: var(--s4); margin-bottom: var(--s2); color: var(--text-dim); }
.li::before { content: "▹"; position: absolute; left: 0; color: var(--accent); }
.a { color: var(--accent); border-bottom: 1px solid var(--border-strong); }
.strong { color: var(--text); font-weight: 600; }
.hr { border: none; border-top: 1px solid var(--border); margin: var(--s6) 0; }
.imgWrap { display: block; margin: var(--s5) 0; border-radius: var(--r-md); overflow: hidden; border: 1px solid var(--border); }
.img { width: 100%; height: auto; }
```

- [ ] **Step 4: Build + commit**

Run: `npm run build` (will be wired in Task 4.3).
```bash
git add src/components/mdx/
git commit -m "feat: restyled MDX components"
```

### Task 4.2: ProjectHero, MetricsBar, ImageCarousel, ProjectNav

**Files:** Create `src/components/project/{ProjectHero,MetricsBar,ImageCarousel,ProjectNav}.tsx` (+ css)

- [ ] **Step 1: `ProjectHero.tsx`**

```tsx
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/utils/formatDate";
import type { Project } from "@/lib/projects";
import styles from "./ProjectHero.module.css";

export function ProjectHero({ project }: { project: Project }) {
  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.meta}>
          <Badge kind={project.badge} />
          <span className="mono">{formatDate(project.publishedAt)}</span>
        </div>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.summary}>{project.summary}</p>
      </div>
      {project.images[0] && (
        <div className={styles.cover}>
          <Image src={project.images[0]} alt={project.title} fill priority sizes="100vw" className={styles.img} />
        </div>
      )}
    </header>
  );
}
```
```css
.hero { padding-top: 140px; }
.meta { display: flex; gap: var(--s4); align-items: center; margin-bottom: var(--s4); }
.title { font-size: clamp(2rem, 6vw, 3.6rem); max-width: 16ch; }
.summary { margin-top: var(--s4); max-width: 60ch; color: var(--text-dim); font-size: 1.05rem; }
.cover { position: relative; aspect-ratio: 16/9; margin-top: var(--s6); border-radius: var(--r-lg);
  overflow: hidden; border: 1px solid var(--border); }
.img { object-fit: cover; }
```

- [ ] **Step 2: `MetricsBar.tsx`** (truthful descriptors + GitHub link)

```tsx
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/lib/projects";
import styles from "./MetricsBar.module.css";

export function MetricsBar({ project }: { project: Project }) {
  return (
    <div className={`container ${styles.bar}`}>
      {project.metric && <div className={styles.item}><span className="mono">status</span><strong>{project.metric}</strong></div>}
      {project.team[0] && <div className={styles.item}><span className="mono">role</span><strong>{project.team[0].role}</strong></div>}
      {project.link && <a href={project.link} target="_blank" rel="noreferrer" className={styles.repo}>View on GitHub ↗</a>}
    </div>
  );
}
```
```css
.bar { display: flex; flex-wrap: wrap; gap: var(--s6); align-items: center; padding: var(--s5) var(--gutter);
  border-block: 1px solid var(--border); margin: var(--s7) auto; }
.item { display: flex; flex-direction: column; gap: 4px; }
.item strong { font-weight: 500; }
.repo { margin-left: auto; color: var(--accent); font-family: var(--font-mono); font-size: 0.8rem; }
```

- [ ] **Step 3: `ImageCarousel.tsx`** (client; remaining images, click → lightbox)

```tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./ImageCarousel.module.css";

export function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const rest = images.slice(1);
  if (rest.length === 0) return null;
  return (
    <>
      <div className={styles.row}>
        {rest.map((src) => (
          <button key={src} className={styles.thumb} onClick={() => setOpen(src)}>
            <Image src={src} alt={title} width={640} height={400} className={styles.img} />
          </button>
        ))}
      </div>
      {open && (
        <div className={styles.lightbox} onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          <Image src={open} alt={title} width={1600} height={900} className={styles.full} />
        </div>
      )}
    </>
  );
}
```
```css
.row { display: flex; gap: var(--s3); overflow-x: auto; scroll-snap-type: x mandatory; padding: var(--s5) var(--gutter); }
.thumb { flex: 0 0 auto; width: clamp(240px, 50vw, 420px); scroll-snap-align: start;
  border: 1px solid var(--border); border-radius: var(--r-md); overflow: hidden; }
.img { width: 100%; height: auto; display: block; }
.lightbox { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.9);
  display: flex; align-items: center; justify-content: center; padding: var(--s5); }
.full { max-width: 92vw; max-height: 88vh; width: auto; height: auto; border-radius: var(--r-md); }
```

- [ ] **Step 4: `ProjectNav.tsx`** (prev/next)

```tsx
import Link from "next/link";
import type { Project } from "@/lib/projects";
import styles from "./ProjectNav.module.css";

export function ProjectNav({ prev, next }: { prev?: Project; next?: Project }) {
  return (
    <nav className={`container ${styles.nav}`}>
      {prev ? <Link href={`/work/${prev.slug}`} className={styles.link}><span className="mono">← prev</span>{prev.title}</Link> : <span />}
      {next ? <Link href={`/work/${next.slug}`} className={`${styles.link} ${styles.right}`}><span className="mono">next →</span>{next.title}</Link> : <span />}
    </nav>
  );
}
```
```css
.nav { display: flex; justify-content: space-between; gap: var(--s5); padding-block: var(--s9); }
.link { display: flex; flex-direction: column; gap: 6px; color: var(--text-dim); }
.link:hover { color: var(--accent); }
.right { text-align: right; }
```

- [ ] **Step 5: Typecheck + commit**

Run: `npx tsc --noEmit`
```bash
git add src/components/project/
git commit -m "feat: project detail components"
```

### Task 4.3: Rewrite project detail page

**Files:** Modify `src/app/work/[slug]/page.tsx`

- [ ] **Step 1: Rewrite the page** (keep `generateStaticParams` + metadata; swap Once UI for new components)

```tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjects, sortByDate } from "@/lib/projects";
import { CustomMDX } from "@/components/mdx/MDXComponents";
import { ProjectHero } from "@/components/project/ProjectHero";
import { MetricsBar } from "@/components/project/MetricsBar";
import { ImageCarousel } from "@/components/project/ImageCarousel";
import { ProjectNav } from "@/components/project/ProjectNav";
import { work } from "@/resources";

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjects().find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.title} — ${work.title}`, description: p.summary };
}

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = sortByDate(getProjects());
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const project = all[idx];
  return (
    <article>
      <ProjectHero project={project} />
      <MetricsBar project={project} />
      <div className="container" style={{ maxWidth: "760px" }}>
        <CustomMDX source={project.content} />
      </div>
      <ImageCarousel images={project.images} title={project.title} />
      <ProjectNav prev={all[idx - 1]} next={all[idx + 1]} />
    </article>
  );
}
```

- [ ] **Step 2: Build + visual on every slug**

Run: `npm run build` then dev, open all 4 project pages.
Expected: immersive hero, metrics bar, styled MDX, image carousel + lightbox, prev/next nav. No Once UI.

- [ ] **Step 3: Commit**

```bash
git add src/app/work/[slug]/page.tsx
git commit -m "feat: rewrite project detail page"
```

---

## PHASE 5 — About, Cleanup, Perf, A11y

### Task 5.1: Rewrite About page

**Files:** Modify `src/app/about/page.tsx`

- [ ] **Step 1: Rewrite** reusing `CapabilitiesGrid` + `DeploymentLog` + intro

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { about, person } from "@/resources";
import { CapabilitiesGrid } from "@/components/home/CapabilitiesGrid";
import { DeploymentLog } from "@/components/home/DeploymentLog";
import { ContactCTA } from "@/components/home/ContactCTA";
import styles from "./about.module.css";

export const metadata: Metadata = { title: about.title, description: about.description };

export default function About() {
  return (
    <section style={{ paddingTop: "120px" }}>
      <div className={`container ${styles.intro}`}>
        <Image src={person.avatar} alt={person.name} width={120} height={120} className={styles.avatar} />
        <div>
          <h1>{person.name}</h1>
          <p className={styles.role}>{person.role} · {about.title.replace("About – ", "")}</p>
          <p className={styles.bio}>{about.intro.description}</p>
        </div>
      </div>
      <DeploymentLog />
      <CapabilitiesGrid />
      <ContactCTA />
    </section>
  );
}
```

- [ ] **Step 2: Write `src/app/about/about.module.css`**

```css
.intro { display: flex; gap: var(--s6); align-items: flex-start; margin-bottom: var(--s8); flex-wrap: wrap; }
.avatar { border-radius: 50%; border: 1px solid var(--border-strong); }
.role { font-family: var(--font-mono); color: var(--accent); text-transform: uppercase; font-size: 0.8rem; margin: var(--s2) 0 var(--s4); }
.bio { color: var(--text-dim); max-width: 60ch; }
```

> Note: confirm `person.avatar` path exists (`/images/moi.jpg`); if missing use `/images/avatar.jpg` (Task 5.3).

- [ ] **Step 3: Build + commit**

Run: `npm run build`
```bash
git add src/app/about/
git commit -m "feat: rewrite about page"
```

### Task 5.2: Relocate resources config, delete Once UI, verify zero references

> **Critical ordering:** `src/resources/index.ts` currently re-exports a whole block from `./once-ui.config` (`display, mailchimp, routes, protectedRoutes, baseURL, fonts, style, schema, sameAs, socialSharing, effects, dataStyle`), and `src/app/sitemap.ts` imports BOTH `baseURL` and `routes` from `@/resources`. Deleting `once-ui.config.ts` without first relocating `baseURL` + `routes` and rewriting the barrel **breaks every `@/resources` import at build time.** Do Steps 1–2 BEFORE any deletion.

**Files:** Create `src/resources/config.ts`; Modify `src/resources/index.ts`, `src/components/index.ts`, `src/app/not-found.tsx`; Delete template components.

- [ ] **Step 1: Create `src/resources/config.ts`** (relocate the only still-used config: `baseURL` + `routes`)

```ts
// Production domain — used for metadata/sitemap. TODO(owner): set the real domain.
export const baseURL = "https://mario-montcho.com";

export const routes: Record<string, boolean> = {
  "/": true,
  "/about": true,
  "/work": true,
};
```

- [ ] **Step 2: Rewrite `src/resources/index.ts`** so it no longer references the (soon-deleted) `once-ui.config`

```ts
export { person, social, home, about, work } from "./content";
export { baseURL, routes } from "./config";
```

> This drops the dead re-exports (`display, mailchimp, protectedRoutes, fonts, style, schema, sameAs, socialSharing, effects, dataStyle`) — none are imported anymore after the layout/page rewrites. Verify with: `grep -rnE "\\b(display|mailchimp|protectedRoutes|fonts|style|schema|sameAs|socialSharing|effects|dataStyle)\\b" src/app src/components | grep "@/resources"` → expect no hits.

- [ ] **Step 3: Rewrite `src/components/index.ts`** to a minimal/empty barrel (all new code imports via direct subpaths, e.g. `@/components/layout/Header`)

```ts
// Barrel intentionally minimal — components are imported via direct subpaths.
export {};
```
Then fix any remaining `from "@/components"` (non-subpath) importers:
Run: `grep -rn "from \"@/components\"" src/` → rewrite each to a direct subpath (e.g. `@/components/mdx/MDXComponents`).

- [ ] **Step 4: Rewrite `src/app/not-found.tsx`** without Once UI

```tsx
import Link from "next/link";
export default function NotFound() {
  return (
    <section style={{ paddingTop: "160px", textAlign: "center" }}>
      <h1>404</h1>
      <p className="mono">This route was not found.</p>
      <Link href="/" style={{ color: "var(--accent)" }}>← Home</Link>
    </section>
  );
}
```

- [ ] **Step 5: Delete legacy files (use `--ignore-unmatch` so a missing path can't abort the whole command)**

```bash
git rm --ignore-unmatch \
  src/resources/custom.css src/resources/once-ui.config.ts \
  src/components/Header.tsx src/components/Header.module.scss \
  src/components/Footer.tsx src/components/Footer.module.scss \
  src/components/ProjectCard.tsx src/components/ProjectCard.module.scss \
  src/components/work/Projects.tsx src/components/work/Projects.module.scss \
  src/components/Providers.tsx src/components/RouteGuard.tsx \
  src/components/ThemeToggle.tsx src/components/ThemeToggle.module.scss \
  src/components/HeadingLink.tsx src/components/HeadingLink.module.scss \
  src/components/ScrollToHash.tsx src/components/breakpoints.scss \
  src/components/mdx.tsx \
  src/components/about/about.module.scss src/components/about/TableOfContents.tsx \
  src/components/gallery/GalleryView.tsx
```

- [ ] **Step 6: Remove orphaned/empty template route + component dirs** (stale routes must not ship)

```bash
# remove only if present/empty — orphaned blog & gallery scaffolding from the template
for d in src/app/blog src/app/gallery src/components/gallery src/components/blog src/components/about; do
  [ -d "$d" ] && git rm -r --ignore-unmatch "$d"; rm -rf "$d";
done
```
Then verify no route references them: `grep -rn "/blog\|/gallery" src/app || echo "NO STALE ROUTES"`.

- [ ] **Step 7: Grep for any remaining Once UI imports + protectedRoutes usage**

Run: `grep -rn "@once-ui-system" src/ || echo "CLEAN"`
Expected: `CLEAN`.
Run: `grep -rn "protectedRoutes" src/ || echo "NO PROTECTED ROUTES"`
Expected: `NO PROTECTED ROUTES` (the demo protected route is dropped — spec §11).

- [ ] **Step 8: Remove the dependency**

Run: `npm uninstall @once-ui-system/core`

- [ ] **Step 9: Full build**

Run: `npm run build`
Expected: builds with zero Once UI references and resolvable `@/resources` imports.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: relocate resources config; remove Once UI + template cruft"
```

### Task 5.3: Asset + content audit

**Files:** verify `public/images/**`; Modify MDX/content if broken paths

- [ ] **Step 1: List referenced images vs files on disk**

Run:
```bash
grep -rho "/images/[^\")' ]*" src/ | sort -u > /tmp/refs.txt
( cd public && find images -type f | sed 's#^#/#' ) | sort -u > /tmp/have.txt
comm -23 /tmp/refs.txt /tmp/have.txt
```
Expected: prints any **referenced-but-missing** image paths (e.g. `pipeline_title.png`, `fastAPI.png`, `moi.jpg`).

- [ ] **Step 2: For each missing image**, either fix the path to an existing file or remove the reference. Confirm `person.avatar` resolves; if `/images/moi.jpg` is missing, set it to `/images/avatar.jpg` in `content.tsx`.

- [ ] **Step 3: Fix placeholder LinkedIn URLs** in MDX `team[].linkedIn` (`your-linkedin`) → `https://www.linkedin.com/in/mario-montcho-241598212/`.

- [ ] **Step 4: Build + commit**

Run: `npm run build`
```bash
git add -A
git commit -m "fix: resolve missing image paths and placeholder links"
```

### Task 5.4: SEO/OG/robots/sitemap audit

> `baseURL` + `routes` were already relocated in Task 5.2. This task only verifies the SEO surfaces and restyles OG.

**Files:** `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/api/og/generate/route.tsx`

- [ ] **Step 1: Verify `sitemap.ts` + `robots.ts`** resolve against the new resources barrel (`baseURL`, `routes`) and use `getProjects()` for project URLs (not a removed `getPosts` template path). Fix imports if they referenced deleted symbols.

Run: `npx tsc --noEmit` then `grep -n "getPosts\|@/resources" src/app/sitemap.ts src/app/robots.ts`
Expected: no unresolved imports; project routes derived from `getProjects()`.

- [ ] **Step 2: OG route — restyle in place, keep `runtime = "nodejs"`** (the existing `src/app/api/og/generate/route.tsx` already uses `next/og` and imports only `{ baseURL, person }` — NO Once UI, and loads Google fonts at runtime; do NOT switch to `edge`, which would break the font fetch).

Open the file, confirm `export const runtime = "nodejs"` and no `@once-ui-system` import, then restyle ONLY the `ImageResponse` JSX to the new system (dark `#070809`, teal `#5eead4` eyebrow, white title), preserving the existing font/avatar loading. Reference shape (adapt to the file's existing font-loading code — keep it):

```tsx
// inside the existing GET, keep runtime="nodejs" + the existing font loading;
// replace only the returned ImageResponse JSX:
<div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column",
  justifyContent: "center", padding: 80, background: "#070809", color: "#e9eef6" }}>
  <div style={{ color: "#5eead4", fontSize: 28, letterSpacing: 4, textTransform: "uppercase" }}>Applied AI Engineer</div>
  <div style={{ fontSize: 64, marginTop: 12 }}>{title}</div>
</div>
```

- [ ] **Step 3: Build + commit**

Run: `npm run build`
Expected: OG route builds on `runtime="nodejs"`; sitemap/robots resolve.
```bash
git add -A
git commit -m "chore: audit sitemap/robots; restyle OG image (nodejs)"
```

### Task 5.5: Performance & a11y pass

**Files:** various (targeted tweaks)

- [ ] **Step 1: LCP** — ensure hero `<h1>` text is not blocked by canvas; canvas is `aria-hidden`. Add `priority` to project cover images only (already done).

- [ ] **Step 2: Reduced-motion full sweep** — with OS "reduce motion" on, verify: no Lenis, static hero, no scramble, no marquee animation, carousel = native scroll, counters show final value. Fix any component that ignores `useReducedMotion`.

- [ ] **Step 3: Keyboard + focus** — add visible focus styles in `globals.css`:

```css
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 4px; }
```
Verify tab order through header, carousel cards, filters, lightbox (Esc closes — add `onKeyDown` Escape handler to `ImageCarousel` lightbox).

- [ ] **Step 4: Contrast** — verify body text uses `--text`/`--text-dim` (AA on `--bg`). Reserve `--accent` for large text/non-text only; do not use teal for small body copy.

- [ ] **Step 5: Lighthouse** (production build)

Run: `npm run build && npm start` then run Lighthouse on `/`, `/work`, a project page, `/about`.
Expected: Perf ≥ 90, A11y ≥ 95, Best-practices ≥ 95, SEO ≥ 95. Record scores; fix regressions.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "perf+a11y: focus styles, reduced-motion sweep, lighthouse fixes"
```

### Task 5.6: Final verification & branch wrap

- [ ] **Step 1: Full test + build**

Run: `npm test && npm run build`
Expected: all tests pass; production build succeeds.

- [ ] **Step 2: Manual acceptance vs spec §14 success criteria** — tick each box (no Once UI deps; 4 pages on the visual system; hero + carousel work + reduced-motion fallbacks; content preserved + key info elevated; Lighthouse targets; build clean).

- [ ] **Step 3: Commit any final fixes, then summarize** the branch for review (the user decides merge/PR via the finishing-a-development-branch skill).

---

## Self-Review (completed by plan author)

**Spec coverage:** §2 concept → Phases 2/2.6 (pipeline rail, hero, live-inference details via scramble/counter). §3 anti-slop → tokens (single accent), grain, fonts, no blobs. §4 visual system → Tasks 0.3/0.4 + per-component CSS. §5 IA/pages → Phases 2–5. §6 page designs → Tasks 2.x/3.1/4.x/5.1. §7 stack → Phase 0 + deletions in 5.2. §8 motion+reduced-motion → primitives + 5.5. §9 responsive/a11y → per-component media queries + 5.5. §10 perf → 5.5. §11 YAGNI → protectedRoutes/blog removed, Canvas (not WebGL). §12 assets → 5.3. §13 open questions → resolved (CSS Modules; custom scramble; baseURL relocate; image audit; LinkedIn fix). §14 success → 5.6.

**Placeholder scan:** No "TBD"/"add error handling"-style steps; every code step includes real code. `metric` truthful descriptors, not invented numbers. Real-domain `baseURL` and real KPI substitution are explicitly owner-supplied follow-ups, flagged as such.

**Type consistency:** `Project`, `Domain`, `Badge` defined in Task 1.1 and used consistently (1.5 Badge, 2.x, 3.1, 4.x). `getProjects/sortByDate/filterByDomain` names stable. `useReducedMotion`, `useScramble/scrambleStep`, `useReveal`, `registerGsap` names stable across tasks.

## Adversarial Review — incorporated (3-agent workflow, 2026-06-17)

A 3-lens review (spec-coverage · technical-feasibility · consistency) ran against the real codebase. Stack choices were **verified sound** (next-mdx-remote@6 `/rsc` string source, GSAP 3.13 free ScrollTrigger/Draggable/InertiaPlugin, lenis API, next/font, Canvas 2D, next/og). Fixes applied to this plan:

- **[blocker] `@/resources` barrel + `routes`:** Task 5.2 now relocates BOTH `baseURL` and `routes` into `config.ts` and rewrites `index.ts`/`components/index.ts` **before** any deletion (was build-breaking).
- **[blocker] MagneticCursor phantom:** added **Task 1.6** to create it; layout (0.8) now imports + renders `<MagneticCursor />`.
- **[major] `Reveal` sentinel bug:** `data-reveal-children` now `"true"` (empty string was falsy → stagger never fired).
- **[major] Hero Latent Space:** Task 2.1 now implements hover label, connection lines, click → `/work/[slug]`, plus SR/keyboard-accessible project links.
- **[major] PipelineRail / reduced-motion:** documented passive-listener decision (no tween → reduced-motion-safe), reconciled with §8.
- **[major] cal.com CTA:** "Book a call" added to ContactCTA + About; placeholder flagged owner-supplied.
- **[major] Carousel:** removed deprecated `throwProps`; keep `inertia: true`.
- **[major] OG route:** Task 5.4 keeps `runtime="nodejs"` + existing font loading, restyles in place (no `edge` regression).
- **[minor] Counter wired** into the manifesto stats (truthful integers); **Task 1.2** gains a real kept assertion + early image audit; orphaned `blog`/`gallery` dirs removed in 5.2.
