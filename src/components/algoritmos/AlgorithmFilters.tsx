"use client";

import { useTranslations } from "next-intl";

interface AlgorithmFiltersProps {
  allValue: string;
  categories: string[];
  complexities: string[];
  applications: string[];
  selectedCategory: string;
  selectedComplexity: string;
  selectedApplication: string;
  onCategoryChange: (value: string) => void;
  onComplexityChange: (value: string) => void;
  onApplicationChange: (value: string) => void;
  onClear: () => void;
}

export function AlgorithmFilters({
  allValue,
  categories,
  complexities,
  applications,
  selectedCategory,
  selectedComplexity,
  selectedApplication,
  onCategoryChange,
  onComplexityChange,
  onApplicationChange,
  onClear,
}: AlgorithmFiltersProps) {
  const t = useTranslations("Filters");

  const hasActiveFilters =
    selectedCategory !== allValue ||
    selectedComplexity !== allValue ||
    selectedApplication !== allValue;

  return (
    <aside className="algorithm-filter-panel">
      <div className="algorithm-filter-header">
        <div>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2>{t("title")}</h2>
        </div>

        {hasActiveFilters && (
          <button type="button" className="text-button" onClick={onClear}>
            {t("clear")}
          </button>
        )}
      </div>

      <FilterGroup
        title={t("category")}
        options={[allValue, ...categories]}
        optionLabels={{ [allValue]: t("all") }}
        selected={selectedCategory}
        onChange={onCategoryChange}
      />

      <FilterGroup
        title={t("complexity")}
        options={[allValue, ...complexities]}
        optionLabels={{ [allValue]: t("all") }}
        selected={selectedComplexity}
        onChange={onComplexityChange}
      />

      <FilterGroup
        title={t("application")}
        options={[allValue, ...applications]}
        optionLabels={{ [allValue]: t("all") }}
        selected={selectedApplication}
        onChange={onApplicationChange}
      />
    </aside>
  );
}

interface FilterGroupProps {
  title: string;
  options: string[];
  optionLabels?: Record<string, string>;
  selected: string;
  onChange: (value: string) => void;
}

function FilterGroup({
  title,
  options,
  optionLabels,
  selected,
  onChange,
}: FilterGroupProps) {
  return (
    <fieldset className="filter-group">
      <legend>{title}</legend>

      <div>
        {options.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name={title}
              value={option}
              checked={selected === option}
              onChange={(event) => onChange(event.target.value)}
            />

            <span>{optionLabels?.[option] ?? option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}