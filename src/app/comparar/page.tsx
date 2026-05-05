"use client";

import { useState } from "react";
import { algorithms } from "@/data/algorithms";
import { Algorithm } from "@/types/algorithm";

// ─── Utilitários ───────────────────────────────────────────────────────────────

function highlightDiff(values: (string | undefined)[]): boolean[] {
  const defined = values.filter(Boolean);
  if (defined.length <= 1) return values.map(() => false);
  const allEqual = defined.every((v) => v === defined[0]);
  return values.map((v) => !allEqual && !!v);
}

// ─── Componente de Seleção ─────────────────────────────────────────────────────

interface AlgorithmSelectorProps {
  index: number;
  selected: Algorithm | null;
  onSelect: (index: number, algorithm: Algorithm | null) => void;
  disabledIds: string[];
}

function AlgorithmSelector({
  index,
  selected,
  onSelect,
  disabledIds,
}: AlgorithmSelectorProps) {
  const [open, setOpen] = useState(false);

  const available = algorithms.filter(
    (a) => !disabledIds.includes(a.id) || a.id === selected?.id
  );

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          padding: "14px 18px",
          borderRadius: "12px",
          border: selected
            ? "2px solid var(--primary)"
            : "2px dashed var(--border)",
          background: selected ? "var(--surface-soft)" : "var(--surface)",
          color: selected ? "var(--text)" : "var(--text-soft)",
          fontSize: "15px",
          fontWeight: selected ? 700 : 400,
          cursor: "pointer",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          transition: "border-color 0.2s ease, background 0.2s ease",
        }}
      >
        <span>
          {selected ? selected.name : `Selecionar algoritmo ${index + 1}`}
        </span>
        <span style={{ fontSize: "12px", opacity: 0.6 }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            boxShadow: "0 12px 32px rgba(15,23,42,0.12)",
            zIndex: 50,
            overflow: "hidden",
          }}
        >
          {selected && (
            <button
              onClick={() => {
                onSelect(index, null);
                setOpen(false);
              }}
              style={{
                width: "100%",
                padding: "12px 18px",
                background: "#fff5f5",
                border: "none",
                borderBottom: "1px solid var(--border)",
                color: "#dc2626",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              ✕ Remover seleção
            </button>
          )}
          {available.map((algo) => (
            <button
              key={algo.id}
              onClick={() => {
                onSelect(index, algo);
                setOpen(false);
              }}
              style={{
                width: "100%",
                padding: "12px 18px",
                background:
                  selected?.id === algo.id ? "var(--surface-soft)" : "transparent",
                border: "none",
                borderBottom: "1px solid var(--border)",
                color: "var(--text)",
                fontSize: "14px",
                fontWeight: selected?.id === algo.id ? 700 : 400,
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <span>{algo.name}</span>
              <span style={{ fontSize: "12px", color: "var(--text-soft)" }}>
                {algo.category} • {algo.complexity ?? "—"}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Linha de Comparação ───────────────────────────────────────────────────────

interface CompareRowProps {
  label: string;
  values: (string | undefined)[];
  highlight?: boolean[];
}

function CompareRow({ label, values, highlight }: CompareRowProps) {
  return (
    <tr>
      <td
        style={{
          padding: "14px 16px",
          fontSize: "13px",
          fontWeight: 700,
          color: "var(--text-soft)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          background: "#f8fafc",
          borderRight: "1px solid var(--border)",
          whiteSpace: "nowrap",
          width: "140px",
        }}
      >
        {label}
      </td>
      {values.map((val, i) => (
        <td
          key={i}
          style={{
            padding: "14px 16px",
            fontSize: "14px",
            color: val ? "var(--text)" : "var(--text-soft)",
            background:
              highlight?.[i] ? "rgba(37,99,235,0.06)" : "var(--surface)",
            borderRight:
              i < values.length - 1 ? "1px solid var(--border)" : undefined,
            transition: "background 0.2s ease",
          }}
        >
          {highlight?.[i] && val && (
            <span
              style={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--primary)",
                marginRight: "6px",
                verticalAlign: "middle",
              }}
            />
          )}
          {val ?? <span style={{ opacity: 0.4 }}>—</span>}
        </td>
      ))}
    </tr>
  );
}

// ─── Seção de Lista (vantagens / limitações / aplicações) ──────────────────────

interface CompareListRowProps {
  label: string;
  lists: (string[] | undefined)[];
}

function CompareListRow({ label, lists }: CompareListRowProps) {
  return (
    <tr>
      <td
        style={{
          padding: "14px 16px",
          fontSize: "13px",
          fontWeight: 700,
          color: "var(--text-soft)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          background: "#f8fafc",
          borderRight: "1px solid var(--border)",
          verticalAlign: "top",
          width: "140px",
        }}
      >
        {label}
      </td>
      {lists.map((list, i) => (
        <td
          key={i}
          style={{
            padding: "14px 16px",
            fontSize: "14px",
            color: "var(--text)",
            background: "var(--surface)",
            borderRight:
              i < lists.length - 1 ? "1px solid var(--border)" : undefined,
            verticalAlign: "top",
          }}
        >
          {list && list.length > 0 ? (
            <ul style={{ margin: 0, paddingLeft: "18px", lineHeight: 1.7 }}>
              {list.map((item, j) => (
                <li key={j} style={{ color: "var(--text-soft)" }}>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <span style={{ opacity: 0.4 }}>—</span>
          )}
        </td>
      ))}
    </tr>
  );
}

// ─── Página Principal ──────────────────────────────────────────────────────────

const MAX_COMPARE = 3;

export default function ComparePage() {
  const [selected, setSelected] = useState<(Algorithm | null)[]>([
    null,
    null,
    null,
  ]);

  const handleSelect = (index: number, algo: Algorithm | null) => {
    setSelected((prev) => {
      const next = [...prev];
      next[index] = algo;
      return next;
    });
  };

  const handleClear = () => setSelected([null, null, null]);

  // IDs já escolhidos (para impedir duplicatas)
  const selectedIds = selected.filter(Boolean).map((a) => a!.id);

  // Algoritmos ativos na comparação
  const active = selected.filter(Boolean) as Algorithm[];
  const hasEnough = active.length >= 2;

  // Valores para cada campo comparável
  const complexities = selected.map((a) => a?.complexity);
  const categories = selected.map((a) => a?.category);
  const complexityDiff = highlightDiff(complexities);
  const categoryDiff = highlightDiff(categories);

  const columnWidth = `${Math.floor(100 / MAX_COMPARE)}%`;

  return (
    <section className="page-section">
      <div className="container">

        {/* Hero */}
        <div className="hero">
          <h1>Comparar Algoritmos</h1>
          <p>
            Selecione até {MAX_COMPARE} algoritmos para comparar suas
            características lado a lado e facilitar sua tomada de decisão.
          </p>
        </div>

        {/* Seletores */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${MAX_COMPARE}, 1fr)`,
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          {Array.from({ length: MAX_COMPARE }).map((_, i) => (
            <AlgorithmSelector
              key={i}
              index={i}
              selected={selected[i]}
              onSelect={handleSelect}
              disabledIds={selectedIds.filter((id) => id !== selected[i]?.id)}
            />
          ))}
        </div>

        {/* Botão limpar */}
        {selectedIds.length > 0 && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
            <button
              onClick={handleClear}
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text-soft)",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "border-color 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#dc2626";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#dc2626";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--text-soft)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
              }}
            >
              ✕ Limpar comparação
            </button>
          </div>
        )}

        {/* Estado vazio */}
        {!hasEnough && (
          <div
            style={{
              border: "2px dashed var(--border)",
              borderRadius: "var(--radius)",
              padding: "60px 24px",
              textAlign: "center",
              color: "var(--text-soft)",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>⚖️</div>
            <p style={{ margin: 0, fontSize: "16px" }}>
              Selecione pelo menos <strong style={{ color: "var(--text)" }}>2 algoritmos</strong> acima para iniciar a comparação.
            </p>
          </div>
        )}

        {/* Tabela de comparação */}
        {hasEnough && (
          <div
            style={{
              overflowX: "auto",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow)",
              background: "var(--surface)",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                tableLayout: "fixed",
              }}
            >
              {/* Cabeçalho com nomes e categorias */}
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "16px",
                      background: "var(--primary)",
                      borderRight: "1px solid rgba(255,255,255,0.15)",
                      width: "140px",
                    }}
                  />
                  {selected.map((algo, i) => (
                    <th
                      key={i}
                      style={{
                        padding: "20px 16px",
                        background: algo
                          ? "var(--primary)"
                          : "var(--surface-soft)",
                        borderRight:
                          i < MAX_COMPARE - 1
                            ? `1px solid ${algo ? "rgba(255,255,255,0.15)" : "var(--border)"}`
                            : undefined,
                        textAlign: "left",
                        width: columnWidth,
                      }}
                    >
                      {algo ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              color: "rgba(255,255,255,0.7)",
                            }}
                          >
                            {algo.category}
                          </span>
                          <span
                            style={{
                              fontSize: "16px",
                              fontWeight: 800,
                              color: "#ffffff",
                              lineHeight: 1.2,
                            }}
                          >
                            {algo.name}
                          </span>
                        </div>
                      ) : (
                        <span
                          style={{
                            fontSize: "13px",
                            color: "var(--text-soft)",
                            fontStyle: "italic",
                          }}
                        >
                          Não selecionado
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Separador de seção */}
                <tr>
                  <td
                    colSpan={MAX_COMPARE + 1}
                    style={{
                      padding: "8px 16px",
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--primary)",
                      background: "var(--surface-soft)",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    Visão Geral
                  </td>
                </tr>

                <CompareRow
                  label="Categoria"
                  values={categories}
                  highlight={categoryDiff}
                />
                <CompareRow
                  label="Complexidade"
                  values={complexities}
                  highlight={complexityDiff}
                />

                {/* Descrições */}
                <tr>
                  <td
                    style={{
                      padding: "14px 16px",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--text-soft)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      background: "#f8fafc",
                      borderRight: "1px solid var(--border)",
                      verticalAlign: "top",
                      width: "140px",
                    }}
                  >
                    Descrição
                  </td>
                  {selected.map((algo, i) => (
                    <td
                      key={i}
                      style={{
                        padding: "14px 16px",
                        fontSize: "14px",
                        lineHeight: 1.6,
                        color: "var(--text-soft)",
                        background: "var(--surface)",
                        borderRight:
                          i < MAX_COMPARE - 1 ? "1px solid var(--border)" : undefined,
                        verticalAlign: "top",
                      }}
                    >
                      {algo?.shortDescription ?? (
                        <span style={{ opacity: 0.4 }}>—</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Tags */}
                <tr>
                  <td
                    style={{
                      padding: "14px 16px",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--text-soft)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      background: "#f8fafc",
                      borderRight: "1px solid var(--border)",
                      verticalAlign: "top",
                      width: "140px",
                    }}
                  >
                    Tags
                  </td>
                  {selected.map((algo, i) => (
                    <td
                      key={i}
                      style={{
                        padding: "14px 16px",
                        background: "var(--surface)",
                        borderRight:
                          i < MAX_COMPARE - 1 ? "1px solid var(--border)" : undefined,
                        verticalAlign: "top",
                      }}
                    >
                      {algo?.tags && algo.tags.length > 0 ? (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {algo.tags.map((tag) => (
                            <span key={tag} className="tag" style={{ fontSize: "11px" }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span style={{ opacity: 0.4, fontSize: "14px" }}>—</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Separador */}
                <tr>
                  <td
                    colSpan={MAX_COMPARE + 1}
                    style={{
                      padding: "8px 16px",
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--primary)",
                      background: "var(--surface-soft)",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    Aplicações e Características
                  </td>
                </tr>

                <CompareListRow
                  label="Aplicações"
                  lists={selected.map((a) => a?.applications)}
                />
                <CompareListRow
                  label="Características"
                  lists={selected.map((a) => a?.characteristics)}
                />

                {/* Separador */}
                <tr>
                  <td
                    colSpan={MAX_COMPARE + 1}
                    style={{
                      padding: "8px 16px",
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--primary)",
                      background: "var(--surface-soft)",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    Vantagens e Limitações
                  </td>
                </tr>

                <CompareListRow
                  label="Vantagens"
                  lists={selected.map((a) => a?.advantages)}
                />
                <CompareListRow
                  label="Limitações"
                  lists={selected.map((a) => a?.limitations)}
                />
              </tbody>
            </table>
          </div>
        )}

        {/* Destaque de diferenças */}
        {hasEnough && (
          <p
            style={{
              marginTop: "16px",
              fontSize: "13px",
              color: "var(--text-soft)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--primary)",
              }}
            />
            Campos com destaque azul indicam diferenças entre os algoritmos selecionados.
          </p>
        )}
      </div>
    </section>
  );
}
