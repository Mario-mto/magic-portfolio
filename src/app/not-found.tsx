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
