"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { algorithms } from "@/data/algorithms";
import { Algorithm } from "@/types/algorithm";

const MAX_COMPARE = 3;

export default function ComparePage() {
  return (
    <Suspense fallback={<CompareFallback />}>
      <CompareContent />
    </Suspense>
  );
}

function CompareFallback() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="card">Carregando comparação...</div>
      </div>
    </section>
  );
}

function CompareContent() {
  const searchParams = useSearchParams();

  const initialIds =
    searchParams
      .get("ids")
      ?.split(",")
      .map((id) => id.trim())
      .filter(Boolean)
      .slice(0, MAX_COMPARE) ?? [];

  const [selectedIds, setSelectedIds] = useState<string[]>(initialIds);

  const selectedAlgorithms = selectedIds
    .map((id) => algorithms.find((algorithm) => algorithm.id === id))
    .filter(Boolean) as Algorithm[];

  const handleSelect = (algorithmId: string) => {
    setSelectedIds((current) => {
      if (current.includes(algorithmId)) {
        return current.filter((id) => id !== algorithmId);
      }

      if (current.length >= MAX_COMPARE) {
        return current;
      }

      return [...current, algorithmId];
    });
  };

  return (
    <section className="page-section">
      <div className="container">
        <div className="hero">
          <h1>Comparar Algoritmos</h1>
          <p>
            Selecione até {MAX_COMPARE} algoritmos para comparar suas principais
            características lado a lado.
          </p>
        </div>

        <div className="grid" style={{ marginBottom: "32px" }}>
          {algorithms.map((algorithm) => {
            const selected = selectedIds.includes(algorithm.id);
            const disabled = !selected && selectedIds.length >= MAX_COMPARE;

            return (
              <article key={algorithm.id} className="card">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <span className="tag">{algorithm.category}</span>

                  <h2 style={{ margin: 0, fontSize: "22px" }}>
                    {algorithm.name}
                  </h2>

                  <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>
                    {algorithm.shortDescription}
                  </p>

                  <button
                    type="button"
                    className={selected ? "button-link" : "secondary-button"}
                    disabled={disabled}
                    onClick={() => handleSelect(algorithm.id)}
                  >
                    {selected ? "Selecionado" : "Selecionar"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {selectedAlgorithms.length < 2 ? (
          <div className="card">
            <p className="muted" style={{ margin: 0 }}>
              Selecione pelo menos 2 algoritmos para iniciar a comparação.
            </p>
          </div>
        ) : (
          <div className="card" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "12px" }}>
                    Critério
                  </th>
                  {selectedAlgorithms.map((algorithm) => (
                    <th
                      key={algorithm.id}
                      style={{ textAlign: "left", padding: "12px" }}
                    >
                      {algorithm.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                <CompareRow
                  label="Categoria"
                  values={selectedAlgorithms.map(
                    (algorithm) => algorithm.category
                  )}
                />

                <CompareRow
                  label="Complexidade"
                  values={selectedAlgorithms.map(
                    (algorithm) => algorithm.complexity ?? "Não informado"
                  )}
                />

                <CompareRow
                  label="Descrição"
                  values={selectedAlgorithms.map(
                    (algorithm) => algorithm.shortDescription
                  )}
                />

                <CompareListRow
                  label="Aplicações"
                  values={selectedAlgorithms.map(
                    (algorithm) => algorithm.applications
                  )}
                />

                <CompareListRow
                  label="Vantagens"
                  values={selectedAlgorithms.map(
                    (algorithm) => algorithm.advantages ?? []
                  )}
                />

                <CompareListRow
                  label="Limitações"
                  values={selectedAlgorithms.map(
                    (algorithm) => algorithm.limitations ?? []
                  )}
                />
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

interface CompareRowProps {
  label: string;
  values: string[];
}

function CompareRow({ label, values }: CompareRowProps) {
  return (
    <tr>
      <td style={{ padding: "12px", fontWeight: 700 }}>{label}</td>
      {values.map((value, index) => (
        <td key={index} style={{ padding: "12px", color: "var(--text-soft)" }}>
          {value}
        </td>
      ))}
    </tr>
  );
}

interface CompareListRowProps {
  label: string;
  values: string[][];
}

function CompareListRow({ label, values }: CompareListRowProps) {
  return (
    <tr>
      <td style={{ padding: "12px", fontWeight: 700, verticalAlign: "top" }}>
        {label}
      </td>

      {values.map((items, index) => (
        <td key={index} style={{ padding: "12px", verticalAlign: "top" }}>
          {items.length > 0 ? (
            <ul style={{ margin: 0, paddingLeft: "18px" }}>
              {items.map((item) => (
                <li key={item} className="muted">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <span className="muted">Não informado</span>
          )}
        </td>
      ))}
    </tr>
  );
}