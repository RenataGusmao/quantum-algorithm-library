import Link from "next/link";
import { Algorithm } from "@/types/algorithm";

interface AlgorithmCardProps {
  algorithm: Algorithm;
}

export function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
  return (
    <article className="card">
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div>
          <span className="tag">{algorithm.category}</span>
        </div>

        <div>
          <h3 style={{ margin: "0 0 10px 0", fontSize: "22px", fontWeight: 700 }}>
            {algorithm.name}
          </h3>
          <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>
            {algorithm.shortDescription}
          </p>
        </div>

        <div className="muted" style={{ fontSize: "14px" }}>
          <strong style={{ color: "var(--text)" }}>Complexidade:</strong>{" "}
          {algorithm.complexity ?? "Não informado"}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {algorithm.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "12px",
                padding: "6px 10px",
                borderRadius: "999px",
                background: "#f1f5f9",
                color: "#334155",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div style={{ marginTop: "8px" }}>
          <Link href={`/algoritmos/${algorithm.slug}`} className="button-link">
            Ver detalhes
          </Link>
        </div>
      </div>
    </article>
  );
}