import Link from "next/link";
import { AlgorithmCard } from "@/components/algoritmos/AlgorithmCard";
import { algorithms } from "@/data/algorithms";

const featuredAlgorithms = algorithms.slice(0, 3);

export default function HomePage() {
  return (
    <>
      <section className="brand-hero">
        <div className="container brand-hero-inner">
          <div className="brand-hero-copy">
            <span className="eyebrow">Accenture Quantum</span>

            <h1>Biblioteca executiva de algoritmos quânticos.</h1>

            <p>
              Explore, compare e compreenda algoritmos quânticos com uma
              experiência clara, orientada a decisão e preparada para evolução.
            </p>

            <div className="hero-actions">
              <Link href="/algoritmos" className="button-link">
                Explorar algoritmos
              </Link>

              <Link href="/busca-guiada" className="secondary-button">
                Iniciar busca guiada
              </Link>
            </div>
          </div>

          <div className="hero-panel" aria-label="Resumo da biblioteca">
            <span className="panel-kicker">Quantum Algorithm Library</span>
            <strong>{algorithms.length}</strong>
            <span>algoritmos catalogados para análise comparativa</span>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container section-stack">
          <div className="section-heading">
            <span className="eyebrow">Destaques</span>

            <h2>Algoritmos para começar a análise</h2>

            <p>
              Cards objetivos com categoria, aplicações e caminho rápido para
              detalhes técnicos.
            </p>
          </div>

          <div className="grid">
            {featuredAlgorithms.map((algorithm) => (
              <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}