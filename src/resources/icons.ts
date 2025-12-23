import type { IconType } from "react-icons";

/* =========================
   HERO / UI / NAV
========================= */
import {
  HiArrowUpRight,
  HiOutlineLink,
  HiArrowTopRightOnSquare,
  HiEnvelope,
  HiCalendarDays,
  HiArrowRight,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineDocument,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";

/* =========================
   SECTIONS / LAYOUT
========================= */
import {
  PiHouseDuotone,
  PiUserCircleDuotone,
  PiGridFourDuotone,
  PiBookBookmarkDuotone,
  PiImageDuotone,
} from "react-icons/pi";

/* =========================
   FRONTEND / WEB
========================= */
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiCss3,
  SiFigma,
  SiSupabase,
} from "react-icons/si";

/* =========================
   PYTHON / DATA / ML
========================= */
import {
  SiPython,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiBoost,
} from "react-icons/si";

import { FaChartLine } from "react-icons/fa6"; // seaborn / matplotlib fallback

/* =========================
   BACKEND / DEVOPS
========================= */
import {
  SiFastapi,
  SiPostgresql,
  SiDocker,
} from "react-icons/si";

/* =========================
   AI / LLM / STRATEGY
========================= */
import {
  HiSparkles,
  HiChatBubbleLeftRight,
  HiCpuChip,
  HiUsers,
  HiChartBar,
  HiCog6Tooth,
} from "react-icons/hi2";

/* =========================
   SOCIAL
========================= */
import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaX,
  FaInstagram,
  FaXTwitter,
  FaFacebook,
  FaPinterest,
  FaWhatsapp,
  FaReddit,
  FaTelegram,
} from "react-icons/fa6";

/* =========================
   ICON LIBRARY
========================= */
export const iconLibrary: Record<string, IconType> = {
  /* UI */
  arrowUpRight: HiArrowUpRight,
  arrowRight: HiArrowRight,
  arrowUpRightFromSquare: HiArrowTopRightOnSquare,
  email: HiEnvelope,
  calendar: HiCalendarDays,
  globe: HiOutlineGlobeAsiaAustralia,
  eye: HiOutlineEye,
  eyeOff: HiOutlineEyeSlash,
  document: HiOutlineDocument,
  rocket: HiOutlineRocketLaunch,
  openLink: HiOutlineLink,

  /* Layout */
  home: PiHouseDuotone,
  person: PiUserCircleDuotone,
  grid: PiGridFourDuotone,
  book: PiBookBookmarkDuotone,
  gallery: PiImageDuotone,

  /* Frontend */
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  css: SiCss3,
  tailwind: SiTailwindcss,
  figma: SiFigma,
  supabase: SiSupabase,

  /* Python / Data / ML */
  python: SiPython,
  numpy: SiNumpy,
  pandas: SiPandas,
  scikit: SiScikitlearn,
  xgboost: SiBoost,
  seaborn: FaChartLine,
  matplotlib: FaChartLine,

  /* Backend */
  fastapi: SiFastapi,
  postgresql: SiPostgresql,
  docker: SiDocker,

  /* AI / LLM / Strategy */
  llms: HiSparkles,
  prompting: HiChatBubbleLeftRight,
  aiAgent: HiCpuChip,
  users: HiUsers,
  kpis: HiChartBar,
  pipeline: HiCog6Tooth,

  /* Social */
  github: FaGithub,
  linkedin: FaLinkedin,
  discord: FaDiscord,
  x: FaX,
  twitter: FaXTwitter,
  instagram: FaInstagram,
  facebook: FaFacebook,
  pinterest: FaPinterest,
  whatsapp: FaWhatsapp,
  reddit: FaReddit,
  telegram: FaTelegram,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;
