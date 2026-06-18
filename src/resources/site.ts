// Bilingual UI content — single source of truth for display strings (EN primary, FR from CV).
// Pure data (client-safe, no fs). Components read via useLang() + tr().
import type { Translatable } from "@/lib/i18n";

export interface SkillGroup {
  title: Translatable;
  description: Translatable;
  tags: string[];
}
export interface ExperienceItem {
  role: Translatable;
  org: Translatable;
  location: Translatable;
  timeframe: string; // dates are language-neutral
  bullets: Translatable[];
}
export interface StudyItem {
  degree: Translatable;
  institution: Translatable;
  location: Translatable;
  timeframe: string;
}

export const site = {
  person: {
    name: "Mario Montcho",
    role: { en: "Applied AI Engineer", fr: "Ingénieur IA" } as Translatable,
    location: { en: "Montréal, Canada", fr: "Montréal, Canada" } as Translatable,
    email: "montchomar@gmail.com",
    website: "https://mariomto.fr",
    avatar: "/images/moi.jpg",
    availability: { en: "Available", fr: "Disponible" } as Translatable,
  },

  // Header / nav
  nav: {
    work: { en: "Work", fr: "Projets" } as Translatable,
    about: { en: "About", fr: "À propos" } as Translatable,
    contact: { en: "Contact", fr: "Contact" } as Translatable,
  },

  // Hero
  hero: {
    eyebrow: { en: "Applied AI Engineer", fr: "Ingénieur IA" } as Translatable,
    title: {
      en: { pre: "Designing practical ", accent: "AI systems", post: " that ship." },
      fr: { pre: "Concevoir des ", accent: "systèmes d'IA", post: " concrets, en production." },
    },
    subline: {
      en: "I'm Mario, an AI engineer designing and shipping real-world solutions around LLMs, RAG and autonomous agents — from end-to-end ML pipelines to production APIs.",
      fr: "Je suis Mario, ingénieur IA. Je conçois et déploie des solutions concrètes autour des LLM, du RAG et des agents autonomes — des pipelines ML end-to-end aux APIs de production.",
    } as Translatable,
    scroll: { en: "Scroll", fr: "Défiler" } as Translatable,
  },

  // Manifesto + stats
  manifesto: {
    en: "I turn complex business problems into models and agents that run in production.",
    fr: "Je transforme des problèmes métier complexes en modèles et agents qui tournent en production.",
  } as Translatable,
  stats: [
    { to: 5, label: { en: "projects shipped", fr: "projets livrés" } as Translatable },
    { to: 4, label: { en: "domains · ML · LLMs · SaaS · frontend", fr: "domaines · ML · LLM · SaaS · frontend" } as Translatable },
    { to: 2, label: { en: "engineering degrees", fr: "diplômes d'ingénierie" } as Translatable },
  ],
  tools: ["Anthropic SDK", "Claude API", "MCP", "RAG", "LangChain", "Python", "FastAPI", "XGBoost", "PyTorch", "Next.js", "Supabase", "Docker", "Vercel"],

  // Sections headings
  headings: {
    selectedWork: { en: "Selected Work", fr: "Projets sélectionnés" } as Translatable,
    capabilities: { en: "Capabilities", fr: "Compétences" } as Translatable,
    deploymentLog: { en: "Deployment log", fr: "Journal de déploiement" } as Translatable,
    experience: { en: "Experience", fr: "Expérience" } as Translatable,
    education: { en: "Education", fr: "Formation" } as Translatable,
  },
  carouselHint: { en: "drag / scroll →", fr: "glisser / défiler →" } as Translatable,

  // Capabilities (from CV skill groups — factual summaries, tags verbatim from CV)
  skills: [
    {
      title: { en: "AI & LLMs", fr: "IA & LLM" },
      description: {
        en: "Building LLM applications with the Anthropic SDK and Claude API — MCP, RAG, prompt engineering and autonomous agents.",
        fr: "Applications LLM avec l'Anthropic SDK et l'API Claude — MCP, RAG, prompt engineering et agents autonomes.",
      },
      tags: ["Anthropic SDK", "Claude API", "Autonomous agents", "MCP", "RAG", "Prompt engineering", "LangChain"],
    },
    {
      title: { en: "Machine Learning & Deep Learning", fr: "Machine Learning & Deep Learning" },
      description: {
        en: "End-to-end ML: feature engineering, model training and tuning, computer vision and deep learning.",
        fr: "ML de bout en bout : feature engineering, entraînement et optimisation de modèles, vision par ordinateur et deep learning.",
      },
      tags: ["scikit-learn", "XGBoost", "RandomForest", "pandas", "NumPy", "TensorFlow", "PyTorch", "Computer Vision", "GridSearchCV", "Feature engineering"],
    },
    {
      title: { en: "Backend & Data", fr: "Backend & Data" },
      description: {
        en: "Production services and data layers exposing ML models and business logic via clean APIs.",
        fr: "Services de production et couches data exposant modèles ML et logique métier via des APIs propres.",
      },
      tags: ["Python", "FastAPI", "Node.js", "REST APIs", "Supabase", "PostgreSQL", "SQL"],
    },
    {
      title: { en: "Frontend & DevOps", fr: "Frontend & DevOps" },
      description: {
        en: "Modern web UIs and self-hosted infrastructure — from React/Next.js to Docker, VPS and CI/CD.",
        fr: "Interfaces web modernes et infrastructure self-hosted — de React/Next.js à Docker, VPS et CI/CD.",
      },
      tags: ["Next.js", "React", "TypeScript", "Tailwind", "Docker", "Linux/VPS", "Caddy", "Vercel", "Git/GitHub", "CI/CD"],
    },
  ] as SkillGroup[],

  // Experience (deployment log) — from CV, with dates + achievement bullets
  experience: [
    {
      role: { en: "Applied AI Engineer — Freelance", fr: "Ingénieur IA — Freelance" },
      org: { en: "Freelance", fr: "Freelance" },
      location: { en: "France", fr: "France" },
      timeframe: "09/2024 — Present",
      bullets: [
        {
          en: "Rental-pricing SaaS: designed and deployed an ML recommendation engine — end-to-end pipeline (data prep, feature engineering, GridSearchCV, Random Forest / XGBoost) served via FastAPI with monitoring.",
          fr: "SaaS de pricing immobilier : conception et déploiement d'un moteur ML de recommandation de prix — pipeline end-to-end (préparation des données, feature engineering, GridSearchCV, Random Forest / XGBoost) servi via FastAPI avec monitoring.",
        },
        {
          en: "menu-optimizer.com: pricing SaaS for restaurants — Next.js / Supabase / Vercel with authentication, payments, analytics dashboard and production deployment.",
          fr: "menu-optimizer.com : SaaS de pricing pour restaurateurs — Next.js / Supabase / Vercel avec authentification, paiement, dashboard analytics et déploiement en production.",
        },
        {
          en: "CRIBBZ: housing platform for newcomers to Canada — product architecture, landing page and B2B positioning around certified trust.",
          fr: "CRIBBZ : plateforme de logement pour les nouveaux arrivants au Canada — architecture produit, landing page et positionnement B2B autour de la confiance certifiée.",
        },
        {
          en: "Active exploration of the modern agentic ecosystem: MCPs, SKILL.md skills, OAuth flows and multi-channel integrations.",
          fr: "Veille et exploration active de l'écosystème agentique moderne : MCP, skills SKILL.md, flux OAuth et intégrations multi-canal.",
        },
      ],
    },
    {
      role: { en: "R&D Project Lead — 3D Morphological Analysis", fr: "Chef de projet R&D — Analyse morphologique 3D" },
      org: { en: "LIO", fr: "LIO" },
      location: { en: "Montréal, QC, Canada", fr: "Montréal, QC, Canada" },
      timeframe: "09/2024 — 04/2025",
      bullets: [
        {
          en: "Led a Python R&D project with researchers and clinicians: correlation between brain morphology and skull dimensions.",
          fr: "Pilotage d'un projet R&D Python avec chercheurs et cliniciens : corrélation entre morphologie cérébrale et dimensions crâniennes.",
        },
        {
          en: "Semi-automated 3D measurement pipeline from MRI (bounding boxes, RAS landmarks, 3D Slicer integration).",
          fr: "Pipeline semi-automatisée d'extraction de mesures 3D à partir d'IRM (bounding boxes, landmarks RAS, intégration 3D Slicer).",
        },
        {
          en: "Stakeholder coordination, sprints, technical documentation and scientific reporting — with Agile project-management practices.",
          fr: "Coordination des parties prenantes, sprints, documentation technique et restitution scientifique — avec mise en place de bonnes pratiques de gestion de projet Agile.",
        },
      ],
    },
  ] as ExperienceItem[],

  // Education — from CV, with dates
  studies: [
    {
      degree: { en: "Engineering Degree — Physics Engineering & Innovative Technologies", fr: "Diplôme d'Ingénieur — Génie Physique et Technologies Innovantes" },
      institution: { en: "Groupe INSA Rouen / ESITECH", fr: "Groupe INSA Rouen / ESITECH" },
      location: { en: "Saint-Étienne-du-Rouvray, France", fr: "Saint-Étienne-du-Rouvray, France" },
      timeframe: "09/2021 — 10/2025",
    },
    {
      degree: { en: "Master's — Software Engineering", fr: "Maîtrise — Génie Logiciel" },
      institution: { en: "École de Technologie Supérieure (ÉTS)", fr: "École de Technologie Supérieure (ÉTS)" },
      location: { en: "Montréal, QC, Canada", fr: "Montréal, QC, Canada" },
      timeframe: "09/2023 — 04/2025",
    },
  ] as StudyItem[],

  // About intro (from CV summary)
  about: {
    intro: {
      en: "Young AI engineer trained across Groupe INSA Rouen (physics engineering) and ÉTS Montréal (software engineering). I design and deploy concrete solutions around LLMs, RAG and autonomous agents: end-to-end ML pipelines, production APIs, self-hosted infrastructure. Author of a technical ebook on AI-assisted development and host of a French-speaking community of entrepreneurs.",
      fr: "Jeune ingénieur IA formé entre le groupe INSA Rouen (génie physique) et l'ÉTS Montréal (génie logiciel). Je conçois et déploie des solutions concrètes autour des LLM, du RAG et des agents autonomes : pipelines ML end-to-end, APIs de production, infrastructures self-hosted. Auteur d'un ebook technique sur le développement assisté par IA et animateur d'une communauté francophone d'entrepreneurs.",
    } as Translatable,
    workPermit: { en: "Valid post-graduation work permit", fr: "Permis de travail post-diplôme valide" } as Translatable,
  },

  // Contact
  contact: {
    heading: { en: "Let's build something that ships.", fr: "Construisons quelque chose qui tourne." } as Translatable,
    bookCall: { en: "Book a call", fr: "Réserver un appel" } as Translatable,
  },

  // Project detail chrome labels
  project: {
    status: { en: "status", fr: "statut" } as Translatable,
    role: { en: "role", fr: "rôle" } as Translatable,
    visit: { en: "Visit site ↗", fr: "Voir le site ↗" } as Translatable,
    github: { en: "View on GitHub ↗", fr: "Voir sur GitHub ↗" } as Translatable,
    prev: { en: "prev", fr: "précédent" } as Translatable,
    next: { en: "next", fr: "suivant" } as Translatable,
  },

  footerNote: { en: "Built from scratch · no template", fr: "Codé sur mesure · sans template" } as Translatable,

  // Social links (Instagram once-ui placeholder removed; website added)
  social: [
    { name: "GitHub", icon: "github", link: "https://github.com/Mario-mto", essential: true },
    { name: "LinkedIn", icon: "linkedin", link: "https://www.linkedin.com/in/mario-montcho-241598212/", essential: true },
    { name: "Website", icon: "globe", link: "https://mariomto.fr", essential: true },
    { name: "Email", icon: "email", link: "mailto:montchomar@gmail.com", essential: true },
  ],
};

export type Site = typeof site;
