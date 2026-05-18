"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("Compare");

  return (
    <section className="page-section">
      <div className="container">
        <div className="card">{t("loading")}</div>
      </div>
    </section>
  );
}

function CompareContent() {
  const t = useTranslations("Compare");
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
          <h1>{t("title")}</h1>
          <p>{t("description", { max: MAX_COMPARE })}</p>
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
                    {selected ? t("selected") : t("select")}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {selectedAlgorithms.length < 2 ? (
          <div className="card">
            <p className="muted" style={{ margin: 0 }}>
              {t("empty")}
            </p>
          </div>
        ) : (
          <div className="card" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "12px" }}>
                    {t("criterion")}
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
                  label={t("category")}
                  values={selectedAlgorithms.map(
                    (algorithm) => algorithm.category
                  )}
                />

                <CompareRow
                  label={t("complexity")}
                  values={selectedAlgorithms.map(
                    (algorithm) => algorithm.complexity ?? t("notInformed")
                  )}
                />

                <CompareRow
                  label={t("descriptionLabel")}
                  values={selectedAlgorithms.map(
                    (algorithm) => algorithm.shortDescription
                  )}
                />

                <CompareListRow
                  label={t("applications")}
                  values={selectedAlgorithms.map(
                    (algorithm) => algorithm.applications
                  )}
                  emptyText={t("notInformed")}
                />

                <CompareListRow
                  label={t("advantages")}
                  values={selectedAlgorithms.map(
                    (algorithm) => algorithm.advantages ?? []
                  )}
                  emptyText={t("notInformed")}
                />

                <CompareListRow
                  label={t("limitations")}
                  values={selectedAlgorithms.map(
                    (algorithm) => algorithm.limitations ?? []
                  )}
                  emptyText={t("notInformed")}
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
  emptyText: string;
}

function CompareListRow({ label, values, emptyText }: CompareListRowProps) {
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
            <span className="muted">{emptyText}</span>
          )}
        </td>
      ))}
    </tr>
  );
}