import Link from "next/link";
import { Algorithm } from "@/types/algorithm";

interface AlgorithmCardProps {
  algorithm: Algorithm;
  isSelectedForComparison?: boolean;
  isComparisonDisabled?: boolean;
  onToggleComparison?: (algorithmId: string) => void;
}

export function AlgorithmCard({
  algorithm,
  isSelectedForComparison = false,
  isComparisonDisabled = false,
  onToggleComparison,
}: AlgorithmCardProps) {
  const visibleTags = algorithm.tags?.slice(0, 4) ?? [];
  const hiddenTagsCount = Math.max(
    (algorithm.tags?.length ?? 0) - visibleTags.length,
    0
  );

  return (
    <article className="card algorithm-card">
      <div className="algorithm-card-header">
        <div>
          <span className="tag">{algorithm.category}</span>
          <h3>{algorithm.name}</h3>
        </div>

        <span className="algorithm-meta-pill">
          {algorithm.complexity ?? "Complexidade não informada"}
        </span>
      </div>

      <p className="muted algorithm-card-description">
        {algorithm.shortDescription}
      </p>

      <div className="algorithm-card-section">
        <strong>Aplicações principais</strong>

        <ul>
          {algorithm.applications.slice(0, 3).map((application) => (
            <li key={application}>{application}</li>
          ))}
        </ul>
      </div>

      <div className="algorithm-tags">
        {visibleTags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}

        {hiddenTagsCount > 0 && <span>+{hiddenTagsCount}</span>}
      </div>

      <div className="algorithm-card-actions">
        <Link href={`/algoritmos/${algorithm.slug}`} className="button-link">
          Ver detalhes
        </Link>

        {onToggleComparison && (
          <button
            type="button"
            className="secondary-button"
            disabled={isComparisonDisabled && !isSelectedForComparison}
            onClick={() => onToggleComparison(algorithm.id)}
          >
            {isSelectedForComparison ? "Remover" : "Comparar"}
          </button>
        )}
      </div>
    </article>
  );
}