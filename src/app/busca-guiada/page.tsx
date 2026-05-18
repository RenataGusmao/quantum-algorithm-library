import Link from "next/link";
import { algorithms } from "@/data/algorithms";

export default function GuidedSearchPage() {
  const categories = Array.from(
    new Set(algorithms.map((algorithm) => algorithm.category))
  );

  return (
    <section className="page-section">
      <div className="container guided-page">
        <div className="page-hero">
          <span className="eyebrow">Busca Guiada</span>

          <h1>Encontre o algoritmo certo pelo contexto do problema.</h1>

          <p>
            Use esta visão orientada por categoria para sair de uma pergunta de
            negócio ou pesquisa e chegar rapidamente aos algoritmos mais
            relevantes da biblioteca.
          </p>
        </div>

        <div className="guided-layout">
          <aside className="guided-aside">
            <span className="panel-kicker">Como usar</span>

            <h2>Escolha uma trilha</h2>

            <p>
              Cada bloco representa uma área de aplicação. A próxima evolução
              pode transformar estas trilhas em perguntas dinâmicas.
            </p>

            <Link href="/algoritmos" className="button-link">
              Ver biblioteca completa
            </Link>
          </aside>

          <div className="guided-grid">
            {categories.map((category, index) => {
              const relatedAlgorithms = algorithms.filter(
                (algorithm) => algorithm.category === category
              );

              return (
                <article key={category} className="guided-card">
                  <div className="guided-card-index">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <span className="tag">{category}</span>

                    <h2>{category}</h2>

                    <p>
                      {relatedAlgorithms.length} algoritmo(s) disponível(is)
                      nesta trilha.
                    </p>
                  </div>

                  <ul>
                    {relatedAlgorithms.slice(0, 3).map((algorithm) => (
                      <li key={algorithm.id}>{algorithm.name}</li>
                    ))}
                  </ul>

                  <Link href="/algoritmos" className="secondary-button">
                    Explorar trilha
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}