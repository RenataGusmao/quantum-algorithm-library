"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAlgorithms } from "@/lib/useAlgorithms";
import { AlgorithmCard } from "./AlgorithmCard";

interface AlgorithmDetailProps {
  slug: string;
}

export function AlgorithmDetail({ slug }: AlgorithmDetailProps) {
  const t = useTranslations("AlgorithmDetail");
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
            <h1>{t("notFoundTitle")}</h1>

            <p className="muted">{t("notFoundDescription")}</p>

            <Link href="/algoritmos" className="button-link">
              {t("backToAlgorithms")}
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
          <Link href="/algoritmos">{t("breadcrumb")}</Link>
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
              {t("prepareComparison")}
            </Link>

            <Link href="/algoritmos" className="button-link">
              {t("backToLibrary")}
            </Link>
          </div>
        </div>

        <div className="detail-summary-grid">
          <SummaryItem
            label={t("complexity")}
            value={algorithm.complexity ?? t("notInformed")}
          />

          <SummaryItem
            label={t("applications")}
            value={t("applicationsCount", {
              count: algorithm.applications.length,
            })}
          />

          <SummaryItem
            label={t("characteristics")}
            value={t("characteristicsCount", {
              count: algorithm.characteristics.length,
            })}
          />
        </div>

        <div className="detail-grid">
          <DetailList
            title={t("applications")}
            items={algorithm.applications}
            emptyText={t("missingInfo")}
          />

          <DetailList
            title={t("characteristics")}
            items={algorithm.characteristics}
            emptyText={t("missingInfo")}
          />

          <DetailList
            title={t("advantages")}
            items={algorithm.advantages ?? []}
            emptyText={t("missingInfo")}
          />

          <DetailList
            title={t("limitations")}
            items={algorithm.limitations ?? []}
            emptyText={t("missingInfo")}
          />
        </div>

        {algorithm.tags && algorithm.tags.length > 0 && (
          <div className="card detail-tags-card">
            <h2>{t("tags")}</h2>

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
              <span className="eyebrow">{t("relatedEyebrow")}</span>
              <h2>{t("relatedTitle")}</h2>
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
  emptyText: string;
}

function DetailList({ title, items, emptyText }: DetailListProps) {
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
        <p className="muted">{emptyText}</p>
      )}
    </section>
  );
}