import { useState, useMemo } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

type Maturity = "Implementado" | "Teórico" | "NISQ-friendly";
type Category =
  | "Otimização"
  | "Criptografia"
  | "Simulação"
  | "Machine Learning"
  | "Busca";

interface Algorithm {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  maturity: Maturity[];
  complexity: string;
  description: string;
  whyUse: string;
  tags: string[];
}

// ── Data ─────────────────────────────────────────────────────────────────────

const ALGORITHMS: Algorithm[] = [
  {
    id: "grover",
    name: "Algoritmo de Grover",
    subtitle: "Busca em banco de dados não estruturado",
    category: "Busca",
    maturity: ["Implementado", "NISQ-friendly"],
    complexity: "O(√N)",
    description:
      "Fornece speedup quadrático para busca em espaços não ordenados. Aplicado em otimização combinatória e criptoanálise.",
    whyUse:
      "Ideal quando você precisa buscar em grandes espaços de solução sem estrutura. Reduz o tempo de busca de O(N) para O(√N) — eficaz já com hardware atual.",
    tags: ["speedup quadrático", "busca", "oráculo", "NISQ-friendly"],
  },
  {
    id: "shor",
    name: "Algoritmo de Shor",
    subtitle: "Fatoração de inteiros em tempo polinomial",
    category: "Criptografia",
    maturity: ["Teórico"],
    complexity: "O((log N)³)",
    description:
      "Fatora inteiros exponencialmente mais rápido que qualquer algoritmo clássico conhecido. Ameaça direta à criptografia RSA.",
    whyUse:
      "Relevante para análise de vulnerabilidades em sistemas criptográficos clássicos e planejamento de migração para criptografia pós-quântica.",
    tags: ["speedup exponencial", "fatoração", "RSA", "criptografia"],
  },
  {
    id: "qaoa",
    name: "QAOA",
    subtitle: "Quantum Approximate Optimization Algorithm",
    category: "Otimização",
    maturity: ["Implementado", "NISQ-friendly"],
    complexity: "O(p · |E|)",
    description:
      "Algoritmo variacional híbrido para problemas de otimização combinatória. Indicado para hardware NISQ atual.",
    whyUse:
      "Melhor escolha para problemas de otimização em hardware quântico atual. Funciona com circuitos rasos e pode ser combinado com otimizadores clássicos.",
    tags: ["variacional", "otimização", "NISQ-friendly", "híbrido"],
  },
  {
    id: "vqe",
    name: "VQE",
    subtitle: "Variational Quantum Eigensolver",
    category: "Simulação",
    maturity: ["Implementado", "NISQ-friendly"],
    complexity: "O(N⁴)",
    description:
      "Calcula o estado de menor energia de moléculas. Essencial para simulações em química computacional e novos materiais.",
    whyUse:
      "Primeira escolha para simulação molecular em hardware NISQ. Amplamente validado em moléculas pequenas — base para descoberta de novos materiais e fármacos.",
    tags: ["simulação molecular", "variacional", "química quântica", "NISQ-friendly"],
  },
  {
    id: "qsvm",
    name: "QSVM",
    subtitle: "Quantum Support Vector Machine",
    category: "Machine Learning",
    maturity: ["Teórico", "NISQ-friendly"],
    complexity: "O(log N)",
    description:
      "Versão quântica do SVM clássico com potencial de speedup exponencial em problemas de classificação de alta dimensão.",
    whyUse:
      "Promissor para classificação em espaços de features de altíssima dimensão, onde kernels quânticos podem superar métodos clássicos.",
    tags: ["classificação", "kernel quântico", "ML", "speedup exponencial"],
  },
  {
    id: "hhl",
    name: "Algoritmo HHL",
    subtitle: "Resolução de sistemas lineares",
    category: "Otimização",
    maturity: ["Teórico"],
    complexity: "O(log N)",
    description:
      "Resolve sistemas de equações lineares com speedup exponencial sobre algoritmos clássicos, dado acesso quântico aos dados.",
    whyUse:
      "Relevante para otimização em larga escala e aprendizado de máquina quando os dados podem ser carregados eficientemente em memória quântica.",
    tags: ["sistemas lineares", "speedup exponencial", "álgebra linear"],
  },
  {
    id: "qft",
    name: "Transformada Quântica de Fourier",
    subtitle: "Componente central de múltiplos algoritmos",
    category: "Simulação",
    maturity: ["Implementado"],
    complexity: "O(n²)",
    description:
      "Versão quântica da DFT, exponencialmente mais rápida. Bloco fundamental do algoritmo de Shor e estimativa de fase.",
    whyUse:
      "Não é usado sozinho, mas é o coração de vários algoritmos de alto impacto. Essencial entender para trabalhar com Shor, QPE e simulação quântica.",
    tags: ["transformada", "base", "fase", "speedup exponencial"],
  },
  {
    id: "qpe",
    name: "Estimativa de Fase Quântica",
    subtitle: "Estimação de autovalores de operadores unitários",
    category: "Simulação",
    maturity: ["Implementado"],
    complexity: "O(1/ε)",
    description:
      "Estima a fase de um autovetor de um operador unitário. Subrotina crítica em algoritmos de simulação quântica e HHL.",
    whyUse:
      "Fundamental para simulação de sistemas físicos e químicos com precisão controlada. Base do VQE e do algoritmo de Shor.",
    tags: ["autovalores", "fase", "simulação", "base"],
  },
];

const CATEGORIES: Category[] = [
  "Otimização",
  "Criptografia",
  "Simulação",
  "Machine Learning",
  "Busca",
];

const MATURITIES: Maturity[] = ["Implementado", "Teórico", "NISQ-friendly"];

const ALL_TAGS = Array.from(
  new Set(ALGORITHMS.flatMap((a) => a.tags))
).sort();

// ── Sub-components ────────────────────────────────────────────────────────────

function MaturityBadge({ value }: { value: Maturity }) {
  const styles: Record<Maturity, string> = {
    Implementado:
      "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Teórico:
      "bg-amber-50 text-amber-700 border border-amber-200",
    "NISQ-friendly":
      "bg-sky-50 text-sky-700 border border-sky-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${styles[value]}`}
    >
      {value}
    </span>
  );
}

function ComplexityPill({ value }: { value: string }) {
  return (
    <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
      {value}
    </span>
  );
}

function AlgoCard({
  algo,
  isComparing,
  onToggleCompare,
}: {
  algo: Algorithm;
  isComparing: boolean;
  onToggleCompare: (id: string) => void;
}) {
  const [showWhy, setShowWhy] = useState(false);

  return (
    <div
      className={`group relative bg-white rounded-2xl border transition-all duration-200 overflow-hidden
        ${isComparing
          ? "border-indigo-400 shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
          : "border-slate-200 hover:border-slate-300 hover:shadow-md"
        }`}
    >
      {isComparing && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400" />
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 text-[15px] leading-snug truncate">
              {algo.name}
            </h3>
            <p className="text-[12px] text-slate-500 mt-0.5 truncate">
              {algo.subtitle}
            </p>
          </div>
          <ComplexityPill value={algo.complexity} />
        </div>

        <p className="text-[13px] text-slate-600 leading-relaxed mb-3">
          {algo.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {algo.maturity.map((m) => (
            <MaturityBadge key={m} value={m} />
          ))}
          {algo.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200"
            >
              {t}
            </span>
          ))}
        </div>

        {showWhy && (
          <div className="mb-4 p-3 rounded-xl bg-indigo-50 border border-indigo-100">
            <p className="text-[12px] text-indigo-800 leading-relaxed">
              <span className="font-semibold block mb-1">Por que usar?</span>
              {algo.whyUse}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            onClick={() => setShowWhy((v) => !v)}
            className="text-[12px] text-indigo-600 hover:text-indigo-800 font-medium transition-colors flex items-center gap-1"
          >
            {showWhy ? "▲ Ocultar" : "▼ Por que usar?"}
          </button>
          <button
            onClick={() => onToggleCompare(algo.id)}
            className={`text-[12px] px-3 py-1.5 rounded-lg font-medium transition-all duration-150
              ${isComparing
                ? "bg-indigo-600 text-white"
                : "border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
              }`}
          >
            {isComparing ? "✓ Comparando" : "+ Comparar"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ComparePanel({
  algorithms,
  onRemove,
  onClear,
}: {
  algorithms: Algorithm[];
  onRemove: (id: string) => void;
  onClear: () => void;
}) {
  if (algorithms.length === 0) return null;

  const fields: { label: string; render: (a: Algorithm) => React.ReactNode }[] = [
    { label: "Categoria", render: (a) => a.category },
    { label: "Complexidade", render: (a) => <ComplexityPill value={a.complexity} /> },
    {
      label: "Maturidade",
      render: (a) => (
        <div className="flex flex-wrap gap-1">
          {a.maturity.map((m) => <MaturityBadge key={m} value={m} />)}
        </div>
      ),
    },
    { label: "Por que usar?", render: (a) => <span className="text-[12px] text-slate-600 leading-relaxed">{a.whyUse}</span> },
    {
      label: "Tags",
      render: (a) => (
        <div className="flex flex-wrap gap-1">
          {a.tags.map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">{t}</span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="mt-8 bg-white rounded-2xl border border-indigo-200 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-indigo-50">
        <h2 className="font-semibold text-slate-800 text-[15px]">
          Comparação lado a lado
        </h2>
        <button
          onClick={onClear}
          className="text-[12px] text-slate-500 hover:text-red-500 transition-colors"
        >
          Limpar comparação
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-6 py-3 text-slate-400 font-medium w-32 text-[11px] uppercase tracking-wide">
                Campo
              </th>
              {algorithms.map((a) => (
                <th key={a.id} className="px-6 py-3 text-left">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-slate-800 text-[13px]">{a.name}</span>
                    <button
                      onClick={() => onRemove(a.id)}
                      className="text-slate-300 hover:text-red-400 transition-colors text-lg leading-none"
                    >
                      ×
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map((f) => (
              <tr key={f.label} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="px-6 py-3 text-slate-400 text-[11px] uppercase tracking-wide font-medium align-top">
                  {f.label}
                </td>
                {algorithms.map((a) => (
                  <td key={a.id} className="px-6 py-3 align-top text-slate-700">
                    {f.render(a)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end px-6 py-4 border-t border-slate-100">
        <button
          className="text-[12px] px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center gap-2"
          onClick={() => {
            const text = algorithms
              .map(
                (a) =>
                  `${a.name}\n  Complexidade: ${a.complexity}\n  Categoria: ${a.category}\n  Por que usar: ${a.whyUse}`
              )
              .join("\n\n");
            navigator.clipboard?.writeText(text);
          }}
        >
          ↗ Copiar para apresentação
        </button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function QuantumLibrary() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(new Set());
  const [selectedMaturities, setSelectedMaturities] = useState<Set<Maturity>>(new Set());
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const hasFilters =
    selectedCategories.size > 0 ||
    selectedMaturities.size > 0 ||
    selectedTags.size > 0 ||
    search.length > 0;

  function toggleSet<T>(set: Set<T>, value: T): Set<T> {
    const next = new Set(set);
    next.has(value) ? next.delete(value) : next.add(value);
    return next;
  }

  function clearFilters() {
    setSearch("");
    setSelectedCategories(new Set());
    setSelectedMaturities(new Set());
    setSelectedTags(new Set());
  }

  function toggleCompare(id: string) {
    setCompareIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  }

  const filtered = useMemo(() => {
    return ALGORITHMS.filter((a) => {
      if (
        search &&
        !a.name.toLowerCase().includes(search.toLowerCase()) &&
        !a.description.toLowerCase().includes(search.toLowerCase()) &&
        !a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      )
        return false;
      if (selectedCategories.size > 0 && !selectedCategories.has(a.category))
        return false;
      if (
        selectedMaturities.size > 0 &&
        !a.maturity.some((m) => selectedMaturities.has(m))
      )
        return false;
      if (
        selectedTags.size > 0 &&
        !a.tags.some((t) => selectedTags.has(t))
      )
        return false;
      return true;
    });
  }, [search, selectedCategories, selectedMaturities, selectedTags]);

  const compareAlgos = ALGORITHMS.filter((a) => compareIds.includes(a.id));

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-[18px] font-bold text-slate-900 tracking-tight">
              ⚛ Biblioteca Quântica
            </h1>
            <p className="text-[12px] text-slate-400 mt-0.5">
              {ALGORITHMS.length} algoritmos catalogados · mai/2026
            </p>
          </div>
          <div className="flex items-center gap-3">
            {compareIds.length > 0 && (
              <span className="text-[12px] text-indigo-600 font-medium">
                {compareIds.length} selecionados para comparação
              </span>
            )}
            <button
              onClick={() => {
                const text = filtered
                  .map((a) => `${a.name} — ${a.subtitle} [${a.complexity}]`)
                  .join("\n");
                navigator.clipboard?.writeText(text);
              }}
              className="text-[12px] px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center gap-1.5"
            >
              ↗ Exportar lista
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="w-52 flex-shrink-0">
          <div className="sticky top-24 space-y-6">

            {/* Search */}
            <div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar..."
                className="w-full text-[13px] px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-indigo-300 placeholder-slate-400"
              />
            </div>

            {/* Categories */}
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Categoria
              </p>
              <div className="space-y-2">
                {CATEGORIES.map((c) => (
                  <label key={c} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.has(c)}
                      onChange={() =>
                        setSelectedCategories(toggleSet(selectedCategories, c))
                      }
                      className="accent-indigo-500 w-3.5 h-3.5"
                    />
                    <span className="text-[13px] text-slate-600 group-hover:text-slate-900 transition-colors">
                      {c}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Maturity */}
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Maturidade
              </p>
              <div className="space-y-2">
                {MATURITIES.map((m) => (
                  <label key={m} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedMaturities.has(m)}
                      onChange={() =>
                        setSelectedMaturities(toggleSet(selectedMaturities, m))
                      }
                      className="accent-indigo-500 w-3.5 h-3.5"
                    />
                    <span className="text-[13px] text-slate-600 group-hover:text-slate-900 transition-colors">
                      {m}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Tags
              </p>
              <div className="flex flex-wrap gap-1.5">
                {ALL_TAGS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTags(toggleSet(selectedTags, t))}
                    className={`text-[10px] px-2 py-1 rounded-full border transition-all duration-150
                      ${selectedTags.has(t)
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="w-full text-[12px] py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-all"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <p className="text-[13px] text-slate-500">
              {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
              {hasFilters ? " encontrados" : ""}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <p className="text-4xl mb-3">🔭</p>
              <p className="text-[14px]">Nenhum algoritmo encontrado para os filtros selecionados.</p>
              <button onClick={clearFilters} className="mt-4 text-[13px] text-indigo-500 underline">
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((algo) => (
                <AlgoCard
                  key={algo.id}
                  algo={algo}
                  isComparing={compareIds.includes(algo.id)}
                  onToggleCompare={toggleCompare}
                />
              ))}
            </div>
          )}

          <ComparePanel
            algorithms={compareAlgos}
            onRemove={(id) => setCompareIds((prev) => prev.filter((x) => x !== id))}
            onClear={() => setCompareIds([])}
          />
        </main>
      </div>
    </div>
  );
}
