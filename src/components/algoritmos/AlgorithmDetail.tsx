"use client";

import Link from "next/link";
import { useAlgorithms } from "@/lib/useAlgorithms";
import { AlgorithmCard } from "./AlgorithmCard";

interface AlgorithmDetailProps {
  slug: string;
}

export function AlgorithmDetail({ slug }: AlgorithmDetailProps) {
  const { algorithms, loaded } = useAlgorithms();

  if (!loaded) {
    return (
      <section className="page-section">
        <div className="container">
          <div className="card">Carregando detalhes do algoritmo...</div>
        </div>
      </section>
    );
  }

  const algorithm = algorithms.find((item) => item.slug === slug);

  if (!algorithm) {
    return (
      <section className="page-section">
        <div className="container">
          <div className="card empty-state">
            <h1>Algoritmo não encontrado</h1>
            <p className="muted">
              O algoritmo solicitado não está disponível na biblioteca.
            </p>

            <Link href="/algoritmos" className="button-link">
              Voltar para algoritmos
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const relatedAlgorithms = algorithms
    .filter(
      (item) => item.id !== algorithm.id && item.category === algorithm.category
    )
    .slice(0, 3);

  return (
    <section className="page-section">
      <div className="container algorithm-detail-page">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/algoritmos">Algoritmos</Link>
          <span>/</span>
          <span>{algorithm.name}</span>
        </nav>

        <div className="detail-hero card">
          <div>
            <span className="tag">{algorithm.category}</span>
            <h1>{algorithm.name}</h1>
            <p className="muted">{algorithm.fullDescription}</p>
          </div>

          <div className="detail-actions">
            <Link
              href={`/comparar?ids=${algorithm.id}`}
              className="secondary-button"
            >
              Preparar comparação
            </Link>

            <Link href="/algoritmos" className="button-link">
              Voltar para biblioteca
            </Link>
          </div>
        </div>

        <div className="detail-summary-grid">
          <SummaryItem
            label="Complexidade"
            value={algorithm.complexity ?? "Não informado"}
          />
          <SummaryItem
            label="Aplicações"
            value={`${algorithm.applications.length} áreas`}
          />
          <SummaryItem
            label="Características"
            value={`${algorithm.characteristics.length} pontos`}
          />
        </div>

        <div className="detail-grid">
          <DetailList title="Aplicações" items={algorithm.applications} />
          <DetailList title="Características" items={algorithm.characteristics} />
          <DetailList title="Vantagens" items={algorithm.advantages ?? []} />
          <DetailList title="Limitações" items={algorithm.limitations ?? []} />
        </div>

        {algorithm.tags && algorithm.tags.length > 0 && (
          <div className="card detail-tags-card">
            <h2>Tags</h2>

            <div className="algorithm-tags">
              {algorithm.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        )}

        {relatedAlgorithms.length > 0 && (
          <section className="related-section">
            <div>
              <span className="eyebrow">Relacionados</span>
              <h2>Outros algoritmos da categoria</h2>
            </div>

            <div className="grid">
              {relatedAlgorithms.map((related) => (
                <AlgorithmCard key={related.id} algorithm={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}

interface SummaryItemProps {
  label: string;
  value: string;
}

function SummaryItem({ label, value }: SummaryItemProps) {
  return (
    <div className="card summary-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

interface DetailListProps {
  title: string;
  items: string[];
}

function DetailList({ title, items }: DetailListProps) {
  return (
    <section className="card list-block">
      <h2>{title}</h2>

      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="muted">Informação ainda não cadastrada.</p>
      )}
    </section>
  );
}