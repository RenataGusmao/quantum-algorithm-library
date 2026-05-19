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
  | "cryptanalysis"
  | "number-theory";

type ProblemType =
  | ""
  | "unstructured-search"
  | "factorization"
  | "combinatorial-optimization"
  | "eigenvalue-problems"
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
  "database-search":             ["database", "banco de dados", "busca", "search", "query", "unstructured"],
  "cryptography":                ["criptografia", "cryptography", "segurança", "chave", "hash", "encryption", "secure"],
  "optimization":                ["otimização", "optimization", "otimizar", "melhor", "minimizar", "maximizar"],
  "machine-learning":            ["machine learning", "aprendizado", "classificação", "treinar", "neural", "ml", "ai"],
  "quantum-chemistry":           ["química", "chemistry", "molecular", "simulação química", "quantum chemistry"],
  "materials-science":           ["materiais", "materials", "física", "simulação", "condensed matter"],
  "graph-search":                ["grafo", "graph", "rede", "caminho", "nó", "aresta", "rota"],
  "cryptanalysis":               ["criptoanálise", "cryptanalysis", "quebrar", "fatoração", "rsa", "decryption"],
  "number-theory":               ["teoria dos números", "number theory", "fatoração", "primo", "period", "discrete log"],
  "unstructured-search":         ["busca não estruturada", "unstructured", "grover", "database search", "encontrar"],
  "factorization":               ["fatoração", "factorization", "shor", "primo", "rsa", "inteiros"],
  "combinatorial-optimization":  ["combinatorial", "combinatória", "caixeiro", "mochila", "qaoa", "scheduling"],
  "eigenvalue-problems":         ["autovalor", "eigenvalue", "hhl", "qpe"],
  "linear-systems":              ["sistema linear", "linear systems", "hhl", "equações lineares", "matrix"],
  "constrained-optimization":    ["constrained", "restrição", "qaoa", "vqe", "otimização restrita"],
  "pattern-recognition":         ["reconhecimento", "pattern", "classificação", "qsvm", "quantum ml"],
  "oracle-problems":             ["oracle", "oráculo", "black-box", "deutsch", "simon", "bernstein"],
  "period-finding":              ["period finding", "periodicidade", "shor", "discrete log", "order finding"],
  "counting":                    ["contagem", "counting", "quantum counting", "amplitude estimation"],
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
    algo.shortDescription ?? "",
    algo.fullDescription ?? "",
    ...(algo.tags ?? []),
    ...(algo.applications ?? []),
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

  const t = algo.complexity ?? "";
  if (priority === "speed" && (t.toLowerCase().includes("log") || t.includes("O(n)"))) score += 6;
  if (priority === "scalability") score += 3;
  if (priority === "simplicity") score += 3;
  if (priority === "accuracy") score += 3;

  return Math.min(score, 99);
}

function buildComplexityNote(algo: Algorithm, priority: Priority): string {
  const t = algo.complexity ?? "N/A";
  if (priority === "speed")       return `Complexidade: ${t}`;
  if (priority === "scalability") return `Escalabilidade: ${t}`;
  if (priority === "simplicity")  return `Complexidade: ${t}`;
  return `Precisão alta · ${t}`;
}

function starsFromScore(score: number): number {
  if (score >= 90) return 5;
  if (score >= 75) return 4;
  if (score >= 60) return 3;
  if (score >= 45) return 2;
  return 1;
}

function StarRating({ score }: { score: number }) {
  const filled = starsFromScore(score);
  return (
    <span style={{ display: "inline-flex", gap: "2px", verticalAlign: "middle" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1l1.545 3.13 3.455.502-2.5 2.437.59 3.44L7 8.885 3.91 10.51l.59-3.44L2 4.632l3.455-.502L7 1z"
            fill={i <= filled ? "var(--primary)" : "#e2e8f0"}
            stroke={i <= filled ? "var(--primary)" : "#cbd5e1"}
            strokeWidth="0.5"
          />
        </svg>
      ))}
    </span>
  );
}

function FilterRow({
  area, setArea,
  type, setType,
  priority, setPriority,
}: {
  area: AppArea; setArea: (v: AppArea) => void;
  type: ProblemType; setType: (v: ProblemType) => void;
  priority: Priority; setPriority: (v: Priority) => void;
}) {
  const selectStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    fontSize: "14px",
    fontFamily: "inherit",
    color: "var(--text)",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "10px",
    appearance: "none" as const,
    cursor: "pointer",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 600,
    color: "var(--text-soft)",
    marginBottom: "6px",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "16px",
        marginTop: "20px",
      }}
    >
      <div>
        <label htmlFor="bq-area" style={labelStyle}>Área de aplicação</label>
        <select id="bq-area" style={selectStyle} value={area} onChange={(e) => setArea(e.target.value as AppArea)}>
          <option value="">Todas as Áreas</option>
          <option value="database-search">Busca em Banco de Dados</option>
          <option value="cryptography">Criptografia</option>
          <option value="optimization">Otimização</option>
          <option value="machine-learning">Machine Learning</option>
          <option value="quantum-chemistry">Química Quântica</option>
          <option value="materials-science">Ciência dos Materiais</option>
          <option value="graph-search">Busca em Grafos</option>
          <option value="cryptanalysis">Criptoanálise</option>
          <option value="number-theory">Teoria dos Números</option>
        </select>
      </div>

      <div>
        <label htmlFor="bq-type" style={labelStyle}>Tipo de problema</label>
        <select id="bq-type" style={selectStyle} value={type} onChange={(e) => setType(e.target.value as ProblemType)}>
          <option value="">Todos os Tipos</option>
          <option value="unstructured-search">Busca Não Estruturada</option>
          <option value="factorization">Fatoração</option>
          <option value="combinatorial-optimization">Otimização Combinatória</option>
          <option value="eigenvalue-problems">Problemas de Autovalor</option>
          <option value="linear-systems">Sistemas Lineares</option>
          <option value="constrained-optimization">Otimização com Restrições</option>
          <option value="pattern-recognition">Reconhecimento de Padrões</option>
          <option value="oracle-problems">Problemas de Oráculo</option>
          <option value="period-finding">Busca de Período</option>
          <option value="counting">Contagem</option>
        </select>
      </div>

      <div>
        <label htmlFor="bq-priority" style={labelStyle}>Prioridade</label>
        <select id="bq-priority" style={selectStyle} value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
          <option value="accuracy">Precisão</option>
          <option value="speed">Velocidade</option>
          <option value="scalability">Escalabilidade</option>
          <option value="simplicity">Simplicidade</option>
        </select>
      </div>
    </div>
  );
}

export default function BuscaGuiadaPage() {
  const [query, setQuery]             = useState("");
  const [area, setArea]               = useState<AppArea>("");
  const [type, setType]               = useState<ProblemType>("");
  const [priority, setPriority]       = useState<Priority>("accuracy");
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

  if (!hasSearched) {
    return (
      <section className="page-section">
        <div className="container">
          <div className="hero">
            <h1>Busca Guiada de Algoritmos</h1>
            <p>
              Descreva seu problema e receba recomendações personalizadas de
              algoritmos quânticos ordenadas por compatibilidade.
            </p>
          </div>

          <div
            className="card"
            style={{ maxWidth: "760px", padding: "32px" }}
          >
            <label
              htmlFor="bq-problem"
              style={{ display: "block", fontWeight: 700, fontSize: "15px", marginBottom: "6px" }}
            >
              Descreva seu problema <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <p className="muted" style={{ margin: "0 0 12px", fontSize: "13px" }}>
              Fale sobre seu caso de uso, requisitos e restrições
            </p>
            <textarea
              id="bq-problem"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) handleSearch(); }}
              placeholder="Exemplo: Preciso buscar em um banco de dados não estruturado de compostos moleculares para encontrar propriedades específicas. A velocidade é crítica e preciso de desempenho melhor do que abordagens clássicas..."
              style={{
                width: "100%",
                minHeight: "130px",
                padding: "14px",
                fontSize: "14px",
                fontFamily: "inherit",
                color: "var(--text)",
                background: "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                resize: "vertical",
                lineHeight: 1.6,
                boxSizing: "border-box",
              }}
            />

            <FilterRow
              area={area} setArea={setArea}
              type={type} setType={setType}
              priority={priority} setPriority={setPriority}
            />

            <button
              type="button"
              className="button-link"
              onClick={handleSearch}
              style={{ marginTop: "24px", width: "100%", padding: "12px", fontSize: "15px" }}
            >
              Obter Recomendações
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="container">

        <div
          style={{
            position: "sticky",
            top: "78px",
            zIndex: 10,
            background: "rgba(248,250,252,0.95)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid var(--border)",
            margin: "0 -24px 32px",
            padding: "16px 24px",
          }}
        >
          <FilterRow
            area={area} setArea={setArea}
            type={type} setType={setType}
            priority={priority} setPriority={setPriority}
          />
          <button
            type="button"
            className="button-link"
            onClick={handleSearch}
            style={{ marginTop: "16px", padding: "10px 24px", fontSize: "14px" }}
          >
            Atualizar Resultados
          </button>
        </div>

        <div className="hero" style={{ marginBottom: "24px" }}>
          <h1>Algoritmos Recomendados</h1>
          <p>
            Com base nos seus requisitos, aqui estão as melhores correspondências
            ordenadas por compatibilidade.
          </p>
        </div>

        {results.length === 0 ? (
          <p className="muted" style={{ textAlign: "center", padding: "48px 0" }}>
            Nenhum algoritmo encontrado. Tente ajustar os filtros ou descrever o problema com mais detalhes.
          </p>
        ) : (
          <div className="list-block">
            {results.map((algo, index) => (
              <article key={algo.id} className="card" style={{ padding: "0", overflow: "hidden" }}>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "8px",
                    padding: "10px 20px",
                    background: "var(--surface-soft)",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      style={{
                        width: "26px", height: "26px", borderRadius: "50%",
                        background: "var(--primary)", color: "#fff",
                        fontSize: "12px", fontWeight: 700,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {index + 1}
                    </span>

                    <span className="muted" style={{ fontSize: "13px" }}>
                      Compatibilidade:
                    </span>
                    <StarRating score={algo.compatibility} />
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--primary)" }}>
                      {algo.compatibility}%
                    </span>
                  </div>

                  <span className="muted" style={{ fontSize: "12px" }}>
                    {algo.complexityNote}
                  </span>
                </div>

                <div style={{ padding: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "12px",
                      marginBottom: "4px",
                    }}
                  >
                    <div>
                      <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: 700 }}>
                        {algo.name}
                      </h3>
                      <span className="tag">{algo.category}</span>
                    </div>
                  </div>

                  <p className="muted" style={{ margin: "12px 0", lineHeight: 1.6, fontSize: "14px" }}>
                    {algo.shortDescription}
                  </p>

                  {algo.tags && algo.tags.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                      {algo.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: "12px",
                            padding: "4px 10px",
                            borderRadius: "999px",
                            background: "#f1f5f9",
                            color: "#334155",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                      {algo.tags.length > 4 && (
                        <span
                          style={{
                            fontSize: "12px", padding: "4px 10px",
                            borderRadius: "999px", background: "#f1f5f9", color: "#94a3b8",
                          }}
                        >
                          +{algo.tags.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  <Link href={`/algoritmos/${algo.slug}`} className="button-link">
                    Ver Detalhes →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            type="button"
            onClick={handleClear}
            style={{
              background: "none", border: "none",
              color: "var(--text-soft)", fontSize: "14px",
              cursor: "pointer", textDecoration: "underline",
              fontFamily: "inherit",
            }}
          >
            ← Fazer nova busca
          </button>
        </div>
      </div>
    </section>
  );
}
