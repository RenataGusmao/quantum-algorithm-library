"use client";

import { useMemo, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Algorithm } from "@/types/algorithm";
import { useAlgorithms } from "@/lib/useAlgorithms";
import { AlgorithmCard } from "./AlgorithmCard";
import { AlgorithmFilters } from "./AlgorithmFilters";

const ALL = "__all__";
const MAX_COMPARISON = 3;
const PAGE_SIZE = 10;

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
  const t = useTranslations("Algorithms");
  const { algorithms, loaded } = useAlgorithms();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [selectedComplexity, setSelectedComplexity] = useState(ALL);
  const [selectedApplication, setSelectedApplication] = useState(ALL);
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search, selectedCategory, selectedComplexity, selectedApplication]);

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
  }, [algorithms, search, selectedCategory, selectedComplexity, selectedApplication]);

  const paginatedAlgorithms = filteredAlgorithms.slice(0, page * PAGE_SIZE);
  const hasMore = paginatedAlgorithms.length < filteredAlgorithms.length;

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
    return <div className="algorithm-loading card">{t("loading")}</div>;
  }

  return (
    <section className="page-section">
      <div className="container algorithms-page">
        <div className="hero algorithms-hero">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h1>{t("title")}</h1>
          <p>{t("description")}</p>
        </div>

        <div className="algorithms-toolbar">
          <label className="search-field">
            <span>{t("searchLabel")}</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("searchPlaceholder")}
            />
          </label>

          <div className="result-summary">
            <strong>{filteredAlgorithms.length}</strong>
            <span>
              {filteredAlgorithms.length === 1
                ? t("resultSingular")
                : t("resultPlural")}
            </span>
          </div>
        </div>

        {comparisonIds.length > 0 && (
          <div className="comparison-tray">
            <div>
              <strong>{t("selected", { count: comparisonIds.length })}</strong>
              <span>{t("selectionLimit", { max: MAX_COMPARISON })}</span>
            </div>
            <div>
              <button
                type="button"
                className="secondary-button"
                onClick={() => setComparisonIds([])}
              >
                {t("clearSelection")}
              </button>
              <Link href={comparisonHref} className="button-link">
                {t("compareNow")}
              </Link>
            </div>
          </div>
        )}

        <div className="algorithms-layout">
          <AlgorithmFilters
            allValue={ALL}
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
                <h2>{t("emptyTitle")}</h2>
                <p className="muted">{t("emptyDescription")}</p>
                <button
                  type="button"
                  className="button-link"
                  onClick={clearFilters}
                >
                  {t("clearFilters")}
                </button>
              </div>
            ) : (
              <>
                <div className="grid algorithms-grid">
                  {paginatedAlgorithms.map((algorithm) => (
                    <AlgorithmCard
                      key={algorithm.id}
                      algorithm={algorithm}
                      isSelectedForComparison={comparisonIds.includes(algorithm.id)}
                      isComparisonDisabled={comparisonIds.length >= MAX_COMPARISON}
                      onToggleComparison={toggleComparison}
                    />
                  ))}
                </div>

                {hasMore && (
                  <div className="flex justify-center mt-6">
                    <button
                      type="button"
                      className="button-link"
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Ver mais
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}