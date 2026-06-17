# Refonte Portfolio — « Practical AI Systems » · Design Spec

**Date :** 2026-06-17
**Auteur :** Mario Montcho (Applied AI Engineer)
**Statut :** Validé — prêt pour le plan d'implémentation
**Branche :** `redesign/awwwards-portfolio`

---

## 1. Objectif

Refondre le portfolio actuel (template Once UI « Magic Portfolio », reconnaissable et générique) en un site **distinctif, niveau Awwwards**, dark-tech, **sans « AI slop »**. Le **contenu reste globalement le même** mais est réorganisé pour **mettre en avant les infos pertinentes** (déploiements en production, métriques réelles, diversité des domaines).

**Objectif d'image :** mix équilibré — impact créatif fort ET crédibilité professionnelle (cible : prospects consulting + recruteurs tech + pairs).

**Niveau d'ambition technique :** refonte **custom complète**. On retire le système de composants Once UI et on construit en CSS custom + animations.

---

## 2. Concept directeur

> **« Le portfolio comme pipeline ML »**

Le site se parcourt comme un système qui transforme une entrée en valeur livrée. Trois couches de concept se combinent :

1. **Pipeline (colonne vertébrale)** — La structure de l'accueil suit un pipeline : `Input → Features → Model → Production → Ship`. Un **rail pipeline** persistant s'illumine au scroll pour matérialiser la progression.
2. **Latent Space (moment hero)** — Le hero est un **nuage de points interactif** (façon projection t-SNE/UMAP) où chaque point lumineux = un projet. Curseur magnétique, points qui se connectent au survol.
3. **Live Inference (micro-détails)** — Le site « calcule » : compteurs qui tickent, titre en scramble, barre de statut `● available`, métriques live. Touches typographiques en monospace.

Le concept donne **du sens au mouvement** : c'est ce qui sépare l'Awwwards de l'AI slop. Aucune animation gratuite.

---

## 3. Principes anti-slop (garde-fous non négociables)

| ❌ À bannir | ✅ À faire |
|---|---|
| Blobs dégradés violet/bleu partout | **Un seul** accent (teal), utilisé avec retenue |
| Glassmorphism générique | Texture, grain, profondeur intentionnelle |
| Hero centré + texte dégradé + 2 CTA | Grille éditoriale asymétrique, discipline typographique |
| Particules « IA » décoratives | **Data réelle des projets** comme langage visuel |
| Motion gratuit | Motion qui raconte (pipeline, latent space) |
| Polices par défaut (Inter, Geist) | Space Grotesk + JetBrains Mono |

**Règle d'or :** si un effet ne sert pas le concept (pipeline / latent space / live inference), il dégage.

---

## 4. Système visuel

### 4.1 Couleurs
```
--bg            #070809   (near-black, fond principal)
--bg-elev       #0c0f15   (surfaces élevées, cartes)
--bg-elev-2     #11151c   (cartes internes)
--text          #e9eef6   (texte principal)
--text-dim      #9aa6b6   (texte secondaire)
--text-faint    #5a6678   (labels, méta)
--border        rgba(255,255,255,.08)
--border-strong rgba(255,255,255,.14)
--accent        #5eead4   (TEAL — accent unique principal)
--accent-2      #7c6cff   (VIOLET — secondaire, RÉSERVÉ au hero Latent Space)
```
- Discipline « un accent » partout sauf le hero Latent Space (deux clusters teal/violet).
- Grain : overlay SVG `feTurbulence` à ~5% d'opacité sur les grandes surfaces.

### 4.2 Typographie
- **Display / Headings :** **Space Grotesk** (500–700), tracking serré (`-0.03em`), line-height ~0.92–0.95.
- **Data / Labels / Méta :** **JetBrains Mono** (500–600), uppercase, letter-spacing `0.14–0.22em`.
- **Body :** Space Grotesk 400 (ou fallback system-sans) — line-height 1.5–1.6.
- Chargement via `next/font/google` (self-host, `display: swap`).

### 4.3 Espacement & grille
- Échelle d'espacement basée sur 4px (`4, 8, 12, 16, 24, 32, 48, 64, 96, 128`).
- Grille éditoriale : marges latérales visibles (lignes guide à ~48px), alignement asymétrique (hero ancré à gauche).
- Largeur de contenu max ~1200–1280px ; sections full-bleed autorisées.

### 4.4 Vocabulaire de motion
- **Reveals :** translateY + opacity, easing custom (`cubic-bezier(0.16,1,0.3,1)`), durée 0.6–0.9s, stagger.
- **Scroll-linked :** rail pipeline, timeline, tracé de lignes SVG (`stroke-dashoffset`).
- **Pointer :** curseur magnétique sur points/CTA, parallax léger sur images.
- **Texte :** scramble (titre hero), compteurs (métriques).
- Transforms GPU uniquement (`transform`, `opacity`). Jamais d'anim sur `width/top/left`.

---

## 5. Architecture de l'information (pages)

| Route | Rôle | Statut |
|---|---|---|
| `/` | Accueil — parcours pipeline (pièce maîtresse) | Refonte totale |
| `/work` | Galerie de tous les projets, filtrable par domaine | Refonte totale |
| `/work/[slug]` | Détail projet (MDX) : cover immersive, métriques, carrousel images | Refonte totale |
| `/about` | Intro, expérience, studies, skills — en « deployment log » | Refonte totale |

**Le contenu (texte, projets, expérience) est conservé** — repris de `src/resources/content.tsx` et des MDX. Réorganisation visuelle uniquement.

### 5.1 Inventaire des projets (4 — déjà existants en MDX)
| Projet | Slug MDX | Domaine | Badge | Highlight |
|---|---|---|---|---|
| AI-Powered Rental Pricing | `saas_housing_pricing` | ML / Data | `deployed` | FastAPI en prod + CRM, XGBoost |
| Automated Morphological Analysis | `health_technology_project` | Medical / Research | `research` | 3D Slicer, reproductibilité |
| Menu Optimizer | `menu_optimizer` | SaaS / Product | `live` | Next + Supabase, client embarqué |
| Frontend & Web Design | `sites` | Frontend / Design | `design` | React/Next, UI/UX |

Les **4 domaines distincts** servent le highlight « diversité » (recherche → produit → ML → frontend).

---

## 6. Design page par page

### 6.1 Accueil `/` — parcours pipeline

Header fixe minimal : monogramme `MM.`, nav `01 Work / 02 About / 03 Contact` (mono), statut `● Available · Montréal`. Rail pipeline vertical (gauche en desktop) qui s'illumine selon la section active.

**Section 01 — Input (Hero / Latent Space)**
- Plein écran. Nuage de points canvas (les 4 projets + points de bruit), deux clusters teal/violet, dérive subtile, curseur magnétique, connexion au survol, label projet au hover, clic → `/work/[slug]`.
- Eyebrow mono `Applied AI Engineer · Montréal · ● available`.
- Titre `Designing practical AI systems that ship.` (mot `AI systems` en contour teal), animation scramble à l'entrée.
- Subline (reprise du contenu actuel).
- Scroll cue.
- **Reduced-motion :** points statiques, pas de scramble (texte final direct).

**Section 02 — Features (Manifesto + skills marquee)**
- Phrase manifeste (reprise de l'intro `about.intro`).
- Marquee infini des outils (JetBrains Mono chips) : Python, XGBoost, FastAPI, Docker, React/Next, Supabase, 3D Slicer…
- Reveal ligne par ligne au scroll.

**Section 03 — Model (Selected Work — CARROUSEL)**
- Titre `Selected Work`, hint `drag / scroll →`.
- **Carrousel horizontal** (drag + inertie + scroll-linked) des 4 projets. Chaque carte : cover (parallax), titre, rôle, badge `deployed/live/research/design`, métrique clé, tech tags.
- Badges et métriques **mis en avant** visuellement (accent teal).

**Section 04 — Capabilities (Skills)**
- Grille des 4 familles de skills (reprise de `about.technical`) : AI Strategy/LLMs · Python/Data/ML · Backend/API · Frontend.
- Reveal en cascade, hover qui « active » la carte, compteur live optionnel.

**Section 05 — Production (Experience + Studies, « deployment log »)**
- Timeline scroll-linked façon log de déploiement (mono) : expériences + studies (reprises de `about.work` / `about.studies`).
- Ligne verticale qui se trace au scroll.

**Section 06 — Ship (Contact CTA)**
- Gros texte magnétique `Let's build something that ships.`
- Email, GitHub, LinkedIn, « Book a call » (cal.com).
- Le rail pipeline atteint `Ship` et pulse.

**Footer :** minimal — copyright, liens essentiels, mention « Built from scratch · no template ».

### 6.2 Work `/work`
- En-tête : titre + compteur projets.
- **Filtres** par domaine (`All · ML · Medical · SaaS · Frontend`) — transition de grille animée (FLIP/GSAP) au changement de filtre.
- Grille de cartes projet (mêmes cartes que le carrousel home), reveal au scroll.

### 6.3 Project detail `/work/[slug]`
- Cover immersive (image principale, parallax léger), titre, méta (date, rôle, lien GitHub, badge).
- **Bandeau métriques** mis en avant (ex : R², latence, stack).
- Corps MDX restylé (typographie custom : headings, listes, code, citations).
- **Carrousel d'images** du projet (les `images` du frontmatter MDX) avec lightbox.
- Navigation `← projet précédent / suivant →`.

### 6.4 About `/about`
- Intro (avatar + texte `about.intro`).
- Expérience + Studies en « deployment log » (cohérent avec la home).
- Skills détaillés (grille `about.technical`).
- CTA contact / calendrier.

---

## 7. Stack technique & architecture

### 7.1 On garde
- **Next.js (App Router)** + **TypeScript**.
- **MDX** pour les projets (le pipeline de lecture des `.mdx` et leur frontmatter).
- Routing, SEO/metadata, sitemap, RSS, OG (à adapter au nouveau design).
- Le contenu : `src/resources/content.tsx` + `src/app/work/projects/*.mdx`.

### 7.2 On retire
- **Tout `@once-ui-system/core`** (tous les imports `Column`, `Row`, `Heading`, `Text`, `RevealFx`, `Badge`, `Avatar`, etc.).
- Les composants/SCSS spécifiques au template devenus inutiles.
- `once-ui.config.ts` (remplacé par un design system custom léger).

### 7.3 On ajoute
- **CSS custom** : variables CSS globales (tokens du §4) + **CSS Modules** par composant. Pas de framework CSS lourd. (Tailwind possible mais optionnel — décision dans le plan ; défaut = CSS Modules + tokens.)
- **GSAP + ScrollTrigger** — scroll-driven, pin, scrub, tracé SVG, reveals.
- **Lenis** — smooth scroll (synchronisé avec ScrollTrigger).
- **Canvas 2D** — rendu du Latent Space (perf > WebGL pour ce besoin ; pas de dépendance 3D lourde).
- **next/font/google** — Space Grotesk + JetBrains Mono.

### 7.4 Structure de composants (cible)
```
src/
  app/
    layout.tsx            # fonts, providers, smooth-scroll, curseur, métadonnées
    page.tsx              # accueil (compose les sections)
    work/page.tsx         # galerie filtrable
    work/[slug]/page.tsx  # détail projet (MDX restylé)
    about/page.tsx
  components/
    layout/  Header, Footer, PipelineRail, SmoothScroll, MagneticCursor
    home/    HeroLatentSpace, ManifestoMarquee, SelectedWorkCarousel,
             CapabilitiesGrid, DeploymentLog, ContactCTA
    work/    ProjectCard, ProjectGrid, ProjectFilters
    project/ ProjectHero, MetricsBar, ImageCarousel, ProjectNav
    ui/      ScrambleText, Counter, Reveal, Marquee, Badge, Tag
    mdx/     MDX components mapping (restylés)
  lib/       gsap setup, useReducedMotion, content loaders, utils
  styles/    tokens.css, globals.css, grain
  resources/ content.tsx  (conservé), projets MDX (conservés)
```
**Principe :** chaque section = un composant isolé, testable, à responsabilité unique. Les animations GSAP encapsulées dans des hooks (`useGsap*`) avec cleanup au démontage.

---

## 8. Motion — spec détaillée

| Élément | Technique | Reduced-motion fallback |
|---|---|---|
| Hero point-cloud | Canvas 2D, rAF, magnetic pointer | Points statiques, pas de dérive |
| Titre hero | Scramble (ex. custom / SplitText) | Texte final immédiat |
| Rail pipeline | ScrollTrigger scrub, nodes actifs | Rail statique, état courant simple |
| Skills marquee | GSAP boucle infinie x-transform | Marquee figée (liste statique) |
| Carrousel work | Draggable + Inertia (ou scroll natif + snap) | Scroll horizontal natif, pas d'inertie |
| Reveals sections | ScrollTrigger + stagger | Opacité 1 d'emblée |
| Lignes SVG (log/pipeline) | `stroke-dashoffset` scrub | Tracé complet statique |
| Compteurs métriques | Tween numérique | Valeur finale directe |
| Curseur magnétique | pointer + quickTo | Curseur natif |

**Implémentation reduced-motion :** un hook `useReducedMotion()` central + `gsap.matchMedia()` avec `(prefers-reduced-motion: reduce)`. Toutes les anims passent par là.

---

## 9. Responsive & accessibilité

- **Mobile-first** sur le contenu. Breakpoints ~`640 / 900 / 1200`.
- **Hero Latent Space** simplifié en mobile (moins de points, interaction tactile réduite, ou fallback statique élégant).
- **Rail pipeline** : vertical latéral en desktop → indicateur compact (haut) en mobile.
- **Carrousel** : scroll tactile natif + snap en mobile.
- **Contraste AA** minimum (vérifier teal sur fond sombre pour le texte ; réserver le teal aux gros éléments / non-texte fin si besoin).
- **Navigation clavier** complète, focus visibles, `aria-*` sur éléments interactifs, `alt` sur images.
- **Respect `prefers-reduced-motion`** (cf. §8).

---

## 10. Performance

- **Cible :** 60fps sur les animations ; LCP rapide (le hero canvas ne doit pas bloquer le LCP — texte hero en priorité).
- Transforms GPU only ; `will-change` ciblé et temporaire.
- Images : `next/image`, formats modernes, lazy hors-viewport, `priority` sur le cover hero/cover projet.
- GSAP/ScrollTrigger : `kill()` au démontage, batching des reveals.
- Lighthouse cible : Perf ≥ 90, A11y ≥ 95, Best-practices ≥ 95, SEO ≥ 95.

---

## 11. Hors-périmètre (YAGNI)

- Pas de CMS, pas de back-office (le contenu reste en code/MDX).
- Pas de blog/newsletter (Mailchimp existant non réactivé).
- Pas de i18n runtime (le contenu reste en anglais ; FR de l'UI non requis).
- Pas de WebGL/3D lourd (le Latent Space reste en Canvas 2D).
- Pas de routes protégées (on retire la route protégée de démo du template).
- Pas de refonte du système OG/RSS au-delà de l'adaptation visuelle minimale.

---

## 12. Assets

- Avatar : `/images/moi.jpg` (référencé) — vérifier présence (sinon `/images/avatar.jpg`).
- Projets : images existantes sous `/public/images/projects/**` (housing-pricing, medical-imaging, menu-optimizer, sites_UI_UX). Certaines images référencées dans les MDX/`content.tsx` doivent être vérifiées (ex. `pipeline_title.png`, `fastAPI.png`).
- **Action plan :** auditer les chemins d'images manquants et fournir des placeholders propres si absents (ne pas casser les cartes).

---

## 13. Hypothèses & questions ouvertes

1. **Tailwind vs CSS Modules** : défaut = CSS Modules + tokens CSS. À trancher au début du plan (n'impacte pas le design).
2. **Scramble / SplitText** : SplitText est désormais gratuit ; sinon implémentation maison légère. Décision dans le plan.
3. **cal.com** : lien calendrier actuellement `https://cal.com` (placeholder) — à remplacer par le vrai lien si disponible.
4. **Images manquantes** : à auditer (cf. §12).
5. **Liens LinkedIn dans les MDX** : `your-linkedin` placeholder → remplacer par le vrai.

---

## 14. Critères de succès

- [ ] Aucune dépendance `@once-ui-system/*` restante.
- [ ] Les 4 pages refondues respectent le système visuel (§4) et les garde-fous anti-slop (§3).
- [ ] Hero Latent Space interactif + carrousel work fonctionnels (et dégradés proprement en reduced-motion / mobile).
- [ ] Contenu conservé, infos clés mises en avant (badges, métriques, diversité).
- [ ] Lighthouse aux cibles (§10), build Next.js sans erreur.
- [ ] Rendu « qui donne envie d'être regardé » — qualité de finition niveau Awwwards.
