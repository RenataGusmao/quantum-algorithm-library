"use client";

interface AlgorithmFiltersProps {
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

const ALL = "Todos";

export function AlgorithmFilters({
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
  const hasActiveFilters =
    selectedCategory !== ALL ||
    selectedComplexity !== ALL ||
    selectedApplication !== ALL;

  return (
    <aside className="algorithm-filter-panel">
      <div className="algorithm-filter-header">
        <div>
          <span className="eyebrow">Filtros</span>
          <h2>Refinar biblioteca</h2>
        </div>

        {hasActiveFilters && (
          <button type="button" className="text-button" onClick={onClear}>
            Limpar
          </button>
        )}
      </div>

      <FilterGroup
        title="Categoria"
        options={[ALL, ...categories]}
        selected={selectedCategory}
        onChange={onCategoryChange}
      />

      <FilterGroup
        title="Complexidade"
        options={[ALL, ...complexities]}
        selected={selectedComplexity}
        onChange={onComplexityChange}
      />

      <FilterGroup
        title="Aplicação"
        options={[ALL, ...applications]}
        selected={selectedApplication}
        onChange={onApplicationChange}
      />
    </aside>
  );
}

interface FilterGroupProps {
  title: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

function FilterGroup({ title, options, selected, onChange }: FilterGroupProps) {
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

            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}