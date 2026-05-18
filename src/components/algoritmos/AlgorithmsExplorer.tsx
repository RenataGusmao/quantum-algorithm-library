"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Algorithm } from "@/types/algorithm";
import { useAlgorithms } from "@/lib/useAlgorithms";
import { AlgorithmCard } from "./AlgorithmCard";
import { AlgorithmFilters } from "./AlgorithmFilters";

const ALL = "Todos";
const MAX_COMPARISON = 3;

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, "pt-BR")
  );
}

function normalize(value: string) {
  return value
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function matchesSearch(algorithm: Algorithm, query: string) {
  if (!query.trim()) return true;

  const searchable = [
    algorithm.name,
    algorithm.category,
    algorithm.shortDescription,
    algorithm.fullDescription,
    algorithm.complexity ?? "",
    ...algorithm.applications,
    ...algorithm.characteristics,
    ...(algorithm.tags ?? []),
  ]
    .map(normalize)
    .join(" ");

  return searchable.includes(normalize(query));
}

export function AlgorithmsExplorer() {
  const { algorithms, loaded } = useAlgorithms();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [selectedComplexity, setSelectedComplexity] = useState(ALL);
  const [selectedApplication, setSelectedApplication] = useState(ALL);
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);

  const categories = useMemo(
    () => uniqueSorted(algorithms.map((algorithm) => algorithm.category)),
    [algorithms]
  );

  const complexities = useMemo(
    () => uniqueSorted(algorithms.map((algorithm) => algorithm.complexity ?? "")),
    [algorithms]
  );

  const applications = useMemo(
    () => uniqueSorted(algorithms.flatMap((algorithm) => algorithm.applications)),
    [algorithms]
  );

  const filteredAlgorithms = useMemo(() => {
    return algorithms.filter((algorithm) => {
      const categoryMatch =
        selectedCategory === ALL || algorithm.category === selectedCategory;

      const complexityMatch =
        selectedComplexity === ALL ||
        algorithm.complexity === selectedComplexity;

      const applicationMatch =
        selectedApplication === ALL ||
        algorithm.applications.includes(selectedApplication);

      return (
        matchesSearch(algorithm, search) &&
        categoryMatch &&
        complexityMatch &&
        applicationMatch
      );
    });
  }, [
    algorithms,
    search,
    selectedCategory,
    selectedComplexity,
    selectedApplication,
  ]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory(ALL);
    setSelectedComplexity(ALL);
    setSelectedApplication(ALL);
  };

  const toggleComparison = (algorithmId: string) => {
    setComparisonIds((current) => {
      if (current.includes(algorithmId)) {
        return current.filter((id) => id !== algorithmId);
      }

      if (current.length >= MAX_COMPARISON) {
        return current;
      }

      return [...current, algorithmId];
    });
  };

  const comparisonHref =
    comparisonIds.length > 0
      ? `/comparar?ids=${comparisonIds.join(",")}`
      : "/comparar";

  if (!loaded) {
    return (
      <section className="page-section">
        <div className="container">
          <div className="card">Carregando biblioteca de algoritmos...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="container algorithms-page">
        <div className="hero algorithms-hero">
          <span className="eyebrow">Biblioteca</span>
          <h1>Explore algoritmos quânticos</h1>
          <p>
            Pesquise, filtre e compare algoritmos quânticos para entender onde
            cada abordagem se encaixa melhor.
          </p>
        </div>

        <div className="algorithms-toolbar">
          <label className="search-field">
            <span>Buscar algoritmo</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Busque por nome, aplicação, tag ou descrição"
            />
          </label>

          <div className="result-summary">
            <strong>{filteredAlgorithms.length}</strong>
            <span>
              {filteredAlgorithms.length === 1
                ? "algoritmo encontrado"
                : "algoritmos encontrados"}
            </span>
          </div>
        </div>

        {comparisonIds.length > 0 && (
          <div className="comparison-tray">
            <div>
              <strong>{comparisonIds.length} selecionado(s)</strong>
              <span>
                Selecione até {MAX_COMPARISON} algoritmos para comparar.
              </span>
            </div>

            <div>
              <button
                type="button"
                className="secondary-button"
                onClick={() => setComparisonIds([])}
              >
                Limpar seleção
              </button>

              <Link href={comparisonHref} className="button-link">
                Comparar agora
              </Link>
            </div>
          </div>
        )}

        <div className="algorithms-layout">
          <AlgorithmFilters
            categories={categories}
            complexities={complexities}
            applications={applications}
            selectedCategory={selectedCategory}
            selectedComplexity={selectedComplexity}
            selectedApplication={selectedApplication}
            onCategoryChange={setSelectedCategory}
            onComplexityChange={setSelectedComplexity}
            onApplicationChange={setSelectedApplication}
            onClear={clearFilters}
          />

          <div className="algorithms-content">
            {filteredAlgorithms.length === 0 ? (
              <div className="empty-state card">
                <h2>Nenhum algoritmo encontrado</h2>
                <p className="muted">
                  Ajuste a busca ou remova filtros para ampliar os resultados.
                </p>

                <button
                  type="button"
                  className="button-link"
                  onClick={clearFilters}
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className="grid algorithms-grid">
                {filteredAlgorithms.map((algorithm) => (
                  <AlgorithmCard
                    key={algorithm.id}
                    algorithm={algorithm}
                    isSelectedForComparison={comparisonIds.includes(
                      algorithm.id
                    )}
                    isComparisonDisabled={
                      comparisonIds.length >= MAX_COMPARISON
                    }
                    onToggleComparison={toggleComparison}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}