import styles from "./Badge.module.css";
import type { Badge as BadgeType } from "@/lib/projects";

const LABELS: Record<BadgeType, string> = {
  deployed: "deployed", live: "live", research: "research", design: "design",
};

export function Badge({ kind }: { kind?: BadgeType }) {
  if (!kind) return null;
  return <span className={styles.badge}><i />{LABELS[kind]}</span>;
}
