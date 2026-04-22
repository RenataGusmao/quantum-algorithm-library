import { AlgorithmCard } from "@/components/algoritmos/AlgorithmCard";
import { algorithms } from "@/data/algorithms";

export default function HomePage() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <div>
        <h1 style={{ marginBottom: "8px" }}>Explore Quantum Algorithms</h1>
        <p style={{ margin: 0 }}>
          Find, compare and understand the best quantum algorithm for your
          problem.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "16px",
        }}
      >
        {algorithms.map((algorithm) => (
          <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
        ))}
      </div>
    </section>
  );
}