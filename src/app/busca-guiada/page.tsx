"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { algorithms } from "@/data/algorithms";
import { Algorithm } from "@/types/algorithm";

type AppArea =
  | ""
  | "database-search"
  | "cryptography"
  | "optimization"
  | "machine-learning"
  | "quantum-chemistry"
  | "materials-science"
  | "graph-search"
  | "ai"
  | "cryptanalysis"
  | "number-theory";

type ProblemType =
  | ""
  | "unstructured-search"
  | "factorization"
  | "combinatorial-optimization"
  | "eigenvalue-problems"
  | "phase-eigenvalue-estimation"
  | "graph-search"
  | "linear-systems"
  | "constrained-optimization"
  | "pattern-recognition"
  | "oracle-problems"
  | "period-finding"
  | "counting";

type Priority = "accuracy" | "speed" | "scalability" | "simplicity";

interface ScoredAlgorithm extends Algorithm {
  compatibility: number;
  complexityNote: string;
}

const KEYWORD_MAP: Record<string, string[]> = {
  "database-search":              ["database", "banco de dados", "busca", "search", "query", "unstructured"],
  "cryptography":                 ["criptografia", "cryptography", "segurança", "chave", "hash", "encryption", "secure"],
  "optimization":                 ["otimização", "optimization", "otimizar", "melhor", "minimizar", "maximizar"],
  "machine-learning":             ["machine learning", "aprendizado", "classificação", "treinar", "neural", "ml", "ai"],
  "quantum-chemistry":            ["química", "chemistry", "molecular", "simulação química", "quantum chemistry"],
  "materials-science":            ["materiais", "materials", "física", "simulação", "condensed matter"],
  "graph-search":                 ["grafo", "graph", "rede", "caminho", "nó", "aresta", "rota"],
  "ai":                           ["inteligência artificial", "ia", "ai", "aprendizado", "machine learning"],
  "cryptanalysis":                ["criptoanálise", "cryptanalysis", "quebrar", "fatoração", "rsa", "decryption"],
  "number-theory":                ["teoria dos números", "number theory", "fatoração", "primo", "period", "discrete log"],
  "unstructured-search":          ["busca não estruturada", "unstructured", "grover", "database search", "encontrar"],
  "factorization":                ["fatoração", "factorization", "shor", "primo", "rsa", "inteiros"],
  "combinatorial-optimization":   ["combinatorial", "combinatória", "caixeiro", "mochila", "qaoa", "scheduling"],
  "eigenvalue-problems":          ["autovalor", "eigenvalue", "eigenvalue problem", "hhl", "qpe"],
  "phase-eigenvalue-estimation":  ["phase estimation", "estimação de fase", "qpe", "eigenphase"],
  "linear-systems":               ["sistema linear", "linear systems", "hhl", "equações lineares", "matrix"],
  "constrained-optimization":     ["constrained", "restrição", "qaoa", "vqe", "otimização restrita"],
  "pattern-recognition":          ["reconhecimento", "pattern", "classificação", "qsvm", "quantum ml"],
  "oracle-problems":              ["oracle", "oráculo", "black-box", "deutsch", "simon", "bernstein"],
  "period-finding":               ["period finding", "periodicidade", "shor", "discrete log", "order finding"],
  "counting":                     ["contagem", "counting", "quantum counting", "amplitude estimation"],
};

function computeCompatibility(
  algo: Algorithm,
  query: string,
  area: AppArea,
  type: ProblemType,
  priority: Priority
): number {
  let score = 40;
  const fields = [
    algo.name ?? "",
    algo.description ?? "",
    ...(algo.tags ?? []),
    ...(algo.useCases ?? []),
    algo.category ?? "",
  ].join(" ").toLowerCase();

  if (area && KEYWORD_MAP[area]) {
    KEYWORD_MAP[area].forEach((kw) => { if (fields.includes(kw)) score += 8; });
  }
  if (type && KEYWORD_MAP[type]) {
    KEYWORD_MAP[type].forEach((kw) => { if (fields.includes(kw)) score += 8; });
  }
  query.toLowerCase().split(/\s+/).filter((t) => t.length > 2).forEach((token) => {
    if (fields.includes(token)) score += 5;
  });

  const t = algo.complexity?.time ?? "";
  if (priority === "speed" && (t.includes("log") || t === "O(n)")) score += 6;
  if (priority === "scalability" && algo.tags?.some((tag) => tag.toLowerCase().includes("scalab"))) score += 6;
  if (priority === "simplicity" && algo.difficulty === "Beginner") score += 6;
  if (priority === "accuracy" && algo.difficulty !== "Beginner") score += 4;

  return Math.min(score, 99);
}

function buildComplexityNote(algo: Algorithm, priority: Priority): string {
  const t = algo.complexity?.time ?? "";
  if (priority === "speed") return `Strong performance with ${t} complexity`;
  if (priority === "scalability") return `Scales well — ${t} time complexity`;
  if (priority === "simplicity") return `Difficulty: ${algo.difficulty ?? "varies"}`;
  return `High accuracy with ${t} complexity`;
}

function starsFromScore(score: number): number {
  if (score >= 90) return 5;
  if (score >= 75) return 4;
  if (score >= 60) return 3;
  if (score >= 45) return 2;
  return 1;
}

function DifficultyBadge({ level }: { level?: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Beginner:     { bg: "#14532d", color: "#86efac" },
    Intermediate: { bg: "#1e3a5f", color: "#93c5fd" },
    Advanced:     { bg: "#4c1d95", color: "#c4b5fd" },
    Expert:       { bg: "#7f1d1d", color: "#fca5a5" },
  };
  const d = level ?? "Intermediate";
  const s = map[d] ?? map["Intermediate"];
  return (
    <span style={{
      background: s.bg, color: s.color,
      fontSize: "0.7rem", fontWeight: 600,
      padding: "3px 10px", borderRadius: "6px",
      whiteSpace: "nowrap", flexShrink: 0,
    }}>
      {d}
    </span>
  );
}

function StarRating({ score }: { score: number }) {
  const filled = starsFromScore(score);
  return (
    <span style={{ display: "inline-flex", gap: "2px", verticalAlign: "middle" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1l1.545 3.13 3.455.502-2.5 2.437.59 3.44L7 8.885 3.91 10.51l.59-3.44L2 4.632l3.455-.502L7 1z"
            fill={i <= filled ? "#6366f1" : "#2d2f45"}
            stroke={i <= filled ? "#6366f1" : "#3d3f58"}
            strokeWidth="0.5"
          />
        </svg>
      ))}
    </span>
  );
}

export default function BuscaGuiadaPage() {
  const [query, setQuery]           = useState("");
  const [area, setArea]             = useState<AppArea>("");
  const [type, setType]             = useState<ProblemType>("");
  const [priority, setPriority]     = useState<Priority>("accuracy");
  const [hasSearched, setHasSearched] = useState(false);

  const results = useMemo<ScoredAlgorithm[]>(() => {
    if (!hasSearched) return [];
    return algorithms
      .map((algo) => ({
        ...algo,
        compatibility: computeCompatibility(algo, query, area, type, priority),
        complexityNote: buildComplexityNote(algo, priority),
      }))
      .sort((a, b) => b.compatibility - a.compatibility)
      .slice(0, 6);
  }, [hasSearched, query, area, type, priority]);

  function handleSearch() { setHasSearched(true); }
  function handleClear() {
    setQuery(""); setArea(""); setType(""); setPriority("accuracy");
    setHasSearched(false);
  }

  const FilterRow = () => (
    <div className="bq-filter-row">
      <div className="bq-filter-col">
        <label htmlFor="bq-area">Área de aplicação</label>
        <div className="bq-select-wrap">
          <select id="bq-area" value={area} onChange={(e) => setArea(e.target.value as AppArea)}>
            <option value="">All Areas</option>
            <option value="database-search">Database Search</option>
            <option value="cryptography">Cryptography</option>
            <option value="optimization">Optimization</option>
            <option value="machine-learning">Machine Learning</option>
            <option value="quantum-chemistry">Quantum Chemistry</option>
            <option value="materials-science">Materials Science</option>
            <option value="graph-search">Graph Search</option>
            <option value="ai">AI</option>
            <option value="cryptanalysis">Cryptanalysis</option>
            <option value="number-theory">Number Theory</option>
          </select>
          <span aria-hidden="true">▾</span>
        </div>
      </div>
      <div className="bq-filter-col">
        <label htmlFor="bq-type">Tipo de problema</label>
        <div className="bq-select-wrap">
          <select id="bq-type" value={type} onChange={(e) => setType(e.target.value as ProblemType)}>
            <option value="">All Types</option>
            <option value="unstructured-search">Unstructured Search</option>
            <option value="factorization">Factorization</option>
            <option value="combinatorial-optimization">Combinatorial Optimization</option>
            <option value="eigenvalue-problems">Eigenvalue Problems</option>
            <option value="phase-eigenvalue-estimation">Phase/Eigenvalue Estimation</option>
            <option value="graph-search">Graph Search</option>
            <option value="linear-systems">Linear Systems</option>
            <option value="constrained-optimization">Constrained Optimization</option>
            <option value="pattern-recognition">Pattern Recognition</option>
            <option value="oracle-problems">Oracle Problems</option>
            <option value="period-finding">Period Finding</option>
            <option value="counting">Counting</option>
          </select>
          <span aria-hidden="true">▾</span>
        </div>
      </div>
      <div className="bq-filter-col">
        <label htmlFor="bq-priority">Prioridade</label>
        <div className="bq-select-wrap">
          <select id="bq-priority" value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
            <option value="accuracy">Accuracy</option>
            <option value="speed">Speed</option>
            <option value="scalability">Scalability</option>
            <option value="simplicity">Simplicity</option>
          </select>
          <span aria-hidden="true">▾</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        .bq-page {
          min-height: 100vh;
          background: #0d0f1a;
          color: #e2e4f0;
          font-family: var(--font-sans, system-ui, sans-serif);
        }

        /* Header */
        .bq-header {
          position: sticky; top: 0; z-index: 50;
          background: rgba(13,15,26,0.88);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid #1e2035;
          padding: 0 2rem;
          height: 56px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .bq-logo {
          display: flex; align-items: center; gap: 10px;
          font-size: 0.9375rem; font-weight: 600; color: #e2e4f0;
          text-decoration: none;
        }
        .bq-nav { display: flex; align-items: center; gap: 2rem; list-style: none; }
        .bq-nav a { font-size: 0.875rem; color: #7b7e9a; text-decoration: none; transition: color 0.15s; }
        .bq-nav a:hover { color: #e2e4f0; }
        .bq-nav a.bq-nav-active { color: #e2e4f0; font-weight: 500; }
        .bq-header-actions { display: flex; align-items: center; gap: 1rem; }
        .bq-lang-btn {
          display: flex; align-items: center; gap: 4px;
          font-size: 0.8125rem; color: #7b7e9a; background: none;
          border: none; cursor: pointer; font-family: inherit;
        }
        .bq-user-btn {
          width: 30px; height: 30px; border-radius: 50%;
          background: none; border: 1px solid #2d2f45;
          display: flex; align-items: center; justify-content: center;
          color: #7b7e9a; cursor: pointer;
        }

        /* Hero */
        .bq-hero {
          text-align: center;
          padding: 4rem 2rem 2.5rem;
        }
        .bq-hero h1 {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 700; color: #f0f1ff; margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }
        .bq-hero p { font-size: 1rem; color: #7b7e9a; }

        /* Form section */
        .bq-section { max-width: 780px; margin: 0 auto; padding: 0 1.5rem; }
        .bq-card {
          background: #13162a;
          border: 1px solid #1e2140;
          border-radius: 14px;
          padding: 2rem;
          margin-bottom: 2.5rem;
        }
        .bq-field-label {
          font-size: 0.875rem; font-weight: 600; color: #c8cade;
          margin-bottom: 4px; display: block;
        }
        .bq-field-label .bq-req { color: #f87171; margin-left: 3px; }
        .bq-field-sub { font-size: 0.78rem; color: #5c5f7a; margin-bottom: 0.75rem; }
        .bq-textarea {
          width: 100%; min-height: 140px;
          padding: 0.875rem 1rem;
          font-size: 0.875rem; font-family: inherit;
          color: #c8cade; background: #0d0f1a;
          border: 1px solid #1e2140; border-radius: 10px;
          resize: vertical; line-height: 1.6; box-sizing: border-box;
          transition: border-color 0.15s;
        }
        .bq-textarea:focus { outline: none; border-color: #4f52a0; }
        .bq-textarea::placeholder { color: #3d3f58; }

        /* Filters */
        .bq-filter-row {
          display: grid; grid-template-columns: 1fr 1fr 1fr;
          gap: 1rem; margin-top: 1.25rem;
        }
        @media (max-width: 600px) { .bq-filter-row { grid-template-columns: 1fr; } }
        .bq-filter-col label {
          display: block; font-size: 0.75rem; font-weight: 600;
          color: #7b7e9a; margin-bottom: 6px;
        }
        .bq-select-wrap { position: relative; }
        .bq-select-wrap select {
          width: 100%; padding: 0.5rem 2rem 0.5rem 0.875rem;
          font-size: 0.8125rem; font-family: inherit;
          color: #c8cade; background: #0d0f1a;
          border: 1px solid #1e2140; border-radius: 8px;
          appearance: none; cursor: pointer;
          transition: border-color 0.15s;
        }
        .bq-select-wrap select:focus { outline: none; border-color: #4f52a0; }
        .bq-select-wrap span {
          position: absolute; right: 10px; top: 50%;
          transform: translateY(-50%); color: #5c5f7a;
          font-size: 10px; pointer-events: none;
        }

        /* Primary button */
        .bq-btn-primary {
          width: 100%; margin-top: 1.5rem; padding: 0.75rem;
          background: #4f46e5; color: #fff; border: none;
          border-radius: 10px; font-size: 0.9375rem; font-weight: 500;
          font-family: inherit; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.15s;
        }
        .bq-btn-primary:hover { background: #4338ca; }

        /* Sticky bar */
        .bq-sticky {
          position: sticky; top: 56px; z-index: 40;
          background: rgba(13,15,26,0.94);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid #1e2035;
          padding: 1rem 2rem;
        }
        .bq-sticky-inner { max-width: 780px; margin: 0 auto; }
        .bq-sticky .bq-btn-primary {
          margin-top: 1rem; padding: 0.5rem;
          font-size: 0.875rem; border-radius: 8px;
        }

        /* Results */
        .bq-results-header { margin-bottom: 1.5rem; }
        .bq-results-title { font-size: 1.25rem; font-weight: 700; color: #f0f1ff; margin-bottom: 4px; }
        .bq-results-sub { font-size: 0.8125rem; color: #5c5f7a; }

        /* Result card */
        .bq-result-card {
          background: #13162a; border: 1px solid #1e2140;
          border-radius: 12px; margin-bottom: 1rem; overflow: hidden;
        }
        .bq-card-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.75rem 1.25rem;
          border-bottom: 1px solid #1a1d35; background: #0f1122;
          flex-wrap: wrap; gap: 0.5rem;
        }
        .bq-card-header-left { display: flex; align-items: center; gap: 10px; }
        .bq-rank {
          width: 26px; height: 26px; border-radius: 50%; background: #4f46e5;
          color: #fff; font-size: 0.75rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .bq-compat-label { font-size: 0.75rem; color: #7b7e9a; }
        .bq-compat-pct { font-size: 0.75rem; font-weight: 700; color: #818cf8; margin-left: 6px; }
        .bq-compat-note { font-size: 0.75rem; color: #5c5f7a; }

        .bq-card-body { padding: 1.25rem; }
        .bq-algo-header {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 1rem; margin-bottom: 4px;
        }
        .bq-algo-name { font-size: 1rem; font-weight: 700; color: #f0f1ff; }
        .bq-algo-cat { font-size: 0.8125rem; color: #5c5f7a; margin-bottom: 0.75rem; }
        .bq-algo-desc {
          font-size: 0.8125rem; color: #9294aa;
          line-height: 1.6; margin-bottom: 0.875rem;
        }
        .bq-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1rem; }
        .bq-tag {
          font-size: 0.6875rem; color: #6366f1;
          background: #1a1d40; border: 1px solid #2d2f5a;
          padding: 3px 9px; border-radius: 20px;
        }
        .bq-view-btn {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          width: 100%; padding: 0.625rem;
          background: #4f46e5; color: #fff; border: none;
          border-radius: 8px; font-size: 0.875rem; font-weight: 500;
          font-family: inherit; cursor: pointer; text-decoration: none;
          transition: background 0.15s;
        }
        .bq-view-btn:hover { background: #4338ca; }

        /* Back link */
        .bq-back-link {
          display: block; text-align: center; margin-top: 1.5rem;
          background: none; border: none; color: #5c5f7a;
          font-size: 0.8125rem; cursor: pointer;
          text-decoration: underline; font-family: inherit;
        }
        .bq-back-link:hover { color: #9294aa; }
      `}</style>

      <div className="bq-page">
          <header className="bq-header">
          <Link href="/" className="bq-logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Quantum Algorithm Library
          </Link>
          <nav aria-label="Navegação principal">
            <ul className="bq-nav">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/busca-guiada" className="bq-nav-active">Busca Guiada</Link></li>
              <li><Link href="/comparar">Comparar</Link></li>
              <li><Link href="/sobre">Sobre</Link></li>
            </ul>
          </nav>
          <div className="bq-header-actions">
            <button className="bq-lang-btn" type="button" aria-label="Idioma">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1"/>
                <path d="M7 1c-2 2-2 8 0 12M7 1c2 2 2 8 0 12M1 7h12"
                  stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              </svg>
              PT
            </button>
            <button className="bq-user-btn" type="button" aria-label="Conta">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="5" r="3" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M1 13c0-3 2.7-5 6-5s6 2 6 5"
                  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </header>

        {!hasSearched && (
          <>
            <div className="bq-hero">
              <h1>Busca Guiada de Algoritmos</h1>
              <p>Descreva seu problema e receba recomendações personalizadas de algoritmos</p>
            </div>

            <div className="bq-section">
              <div className="bq-card">
                <label className="bq-field-label" htmlFor="bq-problem">
                  Descreva seu problema <span className="bq-req">*</span>
                </label>
                <p className="bq-field-sub">Fale sobre seu caso de uso, requisitos e restrições</p>
                <textarea
                  id="bq-problem"
                  className="bq-textarea"
                  placeholder="Exemplo: Preciso pesquisar em um banco de dados não estruturado de compostos moleculares para encontrar propriedades específicas. A velocidade é crítica e preciso de melhor desempenho do que abordagens clássicas..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) handleSearch(); }}
                />
                <FilterRow />
                <button className="bq-btn-primary" onClick={handleSearch} type="button">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1l1.5 3L13 4.5 10.5 7l.6 3.5L8 9 5.4 10.5l.6-3.5L3.5 4.5 7 3.7 8 1z"
                      fill="white" opacity="0.9"/>
                  </svg>
                  Obter Recomendações
                </button>
              </div>
            </div>
          </>
        )}
        
        {hasSearched && (
          <>
            <div className="bq-sticky" role="search" aria-label="Filtros de busca">
              <div className="bq-sticky-inner">
                <FilterRow />
                <button className="bq-btn-primary" onClick={handleSearch} type="button">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1l1.5 3L13 4.5 10.5 7l.6 3.5L8 9 5.4 10.5l.6-3.5L3.5 4.5 7 3.7 8 1z"
                      fill="white" opacity="0.9"/>
                  </svg>
                  Obter Recomendações
                </button>
              </div>
            </div>

                <main className="bq-section" style={{ paddingBottom: "4rem" }}>
              <div className="bq-results-header">
                <h1 className="bq-results-title">Algoritmos Recomendados</h1>
                <p className="bq-results-sub">
                  Com base nos seus requisitos, aqui estão as melhores correspondências ordenadas por compatibilidade
                </p>
              </div>

              {results.length === 0 ? (
                <p style={{ color: "#5c5f7a", textAlign: "center", padding: "2rem" }}>
                  Nenhum algoritmo encontrado. Tente ajustar os filtros ou descrever o problema com mais detalhes.
                </p>
              ) : (
                results.map((algo, index) => (
                  <article key={algo.id} className="bq-result-card">
                    <div className="bq-card-header">
                      <div className="bq-card-header-left">
                        <div className="bq-rank" aria-label={`Posição ${index + 1}`}>{index + 1}</div>
                        <span className="bq-compat-label">Pontuação de compatibilidade:</span>
                        <StarRating score={algo.compatibility} />
                        <span className="bq-compat-pct">{algo.compatibility}%</span>
                      </div>
                      <span className="bq-compat-note">{algo.complexityNote}</span>
                    </div>

                    <div className="bq-card-body">
                      <div className="bq-algo-header">
                        <div>
                          <p className="bq-algo-name">{algo.name}</p>
                          <p className="bq-algo-cat">{algo.category}</p>
                        </div>
                        <DifficultyBadge level={algo.difficulty} />
                      </div>

                      <p className="bq-algo-desc">{algo.description}</p>

                      {algo.tags && algo.tags.length > 0 && (
                        <div className="bq-tags">
                          {algo.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="bq-tag">{tag}</span>
                          ))}
                          {algo.tags.length > 4 && (
                            <span className="bq-tag">+{algo.tags.length - 4}</span>
                          )}
                        </div>
                      )}

                      <Link href={`/algoritmos/${algo.id}`} className="bq-view-btn">
                        Ver Detalhes →
                      </Link>
                    </div>
                  </article>
                ))
              )}

              <button className="bq-back-link" onClick={handleClear} type="button">
                ← Fazer nova busca
              </button>
            </main>
          </>
        )}
      </div>
    </>
  );
}
