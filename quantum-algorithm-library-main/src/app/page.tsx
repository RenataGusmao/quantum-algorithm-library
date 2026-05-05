import { AlgorithmCard } from "@/components/algoritmos/AlgorithmCard";
import { algorithms } from "@/data/algorithms";

export default function HomePage() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="hero">
          <h1>Explore Algoritmos Quânticos</h1>
          <p>
            Encontre, compare e compreenda o algoritmo quântico mais adequado
            para o seu problema por meio de uma experiência estruturada e
            intuitiva.
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