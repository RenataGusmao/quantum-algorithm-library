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
    return <h1>Algoritmo não encontrado</h1>;
  }

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <span>{algorithm.category}</span>
        <h1>{algorithm.name}</h1>
        <p>{algorithm.fullDescription}</p>
      </div>

      <div>
        <h2>Applications</h2>
        <ul>
          {algorithm.applications.map((application) => (
            <li key={application}>{application}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Characteristics</h2>
        <ul>
          {algorithm.characteristics.map((characteristic) => (
            <li key={characteristic}>{characteristic}</li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Complexity:</strong> {algorithm.complexity ?? "Not informed"}
      </div>
    </section>
  );
}