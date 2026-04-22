import { algorithms } from "@/data/algorithms";

interface AlgorithmDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AlgorithmDetailPage({
  params,
}: AlgorithmDetailPageProps) {
  const { id } = await params;

  const algorithm = algorithms.find((item) => item.slug === id);

  if (!algorithm) {
    return (
      <section className="page-section">
        <div className="container">
          <h1>Algoritmo não encontrado</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="container">
        <article className="card detail-card">
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span className="tag">{algorithm.category}</span>
            <h1 style={{ margin: 0, fontSize: "36px" }}>{algorithm.name}</h1>
            <p className="muted" style={{ margin: 0, lineHeight: 1.7 }}>
              {algorithm.fullDescription}
            </p>
          </div>

          <div className="list-block">
            <h2>Aplicações</h2>
            <ul>
              {algorithm.applications.map((application) => (
                <li key={application}>{application}</li>
              ))}
            </ul>
          </div>

          <div className="list-block">
            <h2>Características</h2>
            <ul>
              {algorithm.characteristics.map((characteristic) => (
                <li key={characteristic}>{characteristic}</li>
              ))}
            </ul>
          </div>

          <div className="list-block">
            <h2>Vantagens</h2>
            <ul>
              {algorithm.advantages?.map((advantage) => (
                <li key={advantage}>{advantage}</li>
              ))}
            </ul>
          </div>

          <div className="list-block">
            <h2>Limitações</h2>
            <ul>
              {algorithm.limitations?.map((limitation) => (
                <li key={limitation}>{limitation}</li>
              ))}
            </ul>
          </div>

          <div>
            <strong>Complexidade:</strong> {algorithm.complexity ?? "Não informado"}
          </div>
        </article>
      </div>
    </section>
  );
}