import Link from "next/link";
import { algorithms } from "@/data/algorithms";

export default function GuidedSearchPage() {
  const categories = Array.from(
    new Set(algorithms.map((algorithm) => algorithm.category))
  );

  return (
    <section className="page-section">
      <div className="container">
        <div className="hero">
          <span className="tag">Busca Guiada</span>
          <h1>Encontre um algoritmo pelo tipo de problema</h1>
          <p>
            Comece escolhendo uma área de interesse. Esta versão inicial prepara
            o fluxo para recomendações mais detalhadas no futuro.
          </p>
        </div>

        <div className="grid">
          {categories.map((category) => {
            const relatedAlgorithms = algorithms.filter(
              (algorithm) => algorithm.category === category
            );

            return (
              <article key={category} className="card">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <span className="tag">{category}</span>

                  <h2 style={{ margin: 0, fontSize: "24px" }}>
                    {category}
                  </h2>

                  <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>
                    {relatedAlgorithms.length} algoritmo(s) disponível(is)
                    nesta categoria.
                  </p>

                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: "18px",
                      color: "var(--text-soft)",
                      lineHeight: 1.7,
                    }}
                  >
                    {relatedAlgorithms.slice(0, 3).map((algorithm) => (
                      <li key={algorithm.id}>{algorithm.name}</li>
                    ))}
                  </ul>

                  <Link href="/algoritmos" className="button-link">
                    Explorar algoritmos
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}