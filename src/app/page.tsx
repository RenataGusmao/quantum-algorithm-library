import { AlgorithmCard } from "@/components/algoritmos/AlgorithmCard";
import { algorithms } from "@/data/algorithms";

export default function HomePage() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="hero">
          <h1>Explore Quantum Algorithms</h1>
          <p>
            Find, compare and understand the best quantum algorithm for your
            problem through a structured and intuitive experience.
          </p>
        </div>

        <div className="grid">
          {algorithms.map((algorithm) => (
            <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
          ))}
        </div>
      </div>
    </section>
  );
}