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
