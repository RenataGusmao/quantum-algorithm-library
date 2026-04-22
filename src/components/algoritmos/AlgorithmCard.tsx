import Link from "next/link";
import { Algorithm } from "@/types/algorithm";

interface AlgorithmCardProps {
  algorithm: Algorithm;
}

export function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
  return (
    <article
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        backgroundColor: "#ffffff",
      }}
    >
      <div>
        <span
          style={{
            display: "inline-block",
            fontSize: "12px",
            padding: "4px 8px",
            borderRadius: "999px",
            backgroundColor: "#eef2ff",
          }}
        >
          {algorithm.category}
        </span>
      </div>

      <div>
        <h3 style={{ margin: "0 0 8px 0" }}>{algorithm.name}</h3>
        <p style={{ margin: 0 }}>{algorithm.shortDescription}</p>
      </div>

      <div>
        <strong>Complexity:</strong> {algorithm.complexity ?? "Not informed"}
      </div>

      <Link href={`/algoritmos/${algorithm.slug}`}>Ver detalhes</Link>
    </article>
  );
}