"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAlgorithms } from "@/lib/useAlgorithms";
import { categories } from "@/data/categories";

export default function AdminPage() {
  const t = useTranslations("Admin");
  const { algorithms, loaded } = useAlgorithms();

  const countByCategory = categories.map((cat) => ({
    name: cat,
    count: algorithms.filter((a) => a.category === cat).length,
  }));

  return (
    <div>
      <div className="admin-page-header">
        <h1>{t("dashboard")}</h1>

        <Link href="/admin/algoritmos/novo" className="btn btn-primary">
          + {t("newAlgorithm")}
        </Link>
      </div>

      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-value">
            {loaded ? algorithms.length : "—"}
          </div>

          <div className="admin-stat-label">
            {t("registeredAlgorithms")}
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-value">{categories.length}</div>

          <div className="admin-stat-label">
            {t("availableCategories")}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: "24px" }}>
        <h2 style={{ margin: "0 0 20px 0", fontSize: "18px" }}>
          {t("algorithmsByCategory")}
        </h2>

        {loaded ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {countByCategory.map(({ name, count }) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <span style={{ fontWeight: 600, fontSize: "14px" }}>
                  {name}
                </span>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: "8px",
                      background: "var(--border)",
                      borderRadius: "999px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: algorithms.length
                          ? `${(count / algorithms.length) * 100}%`
                          : "0%",
                        background: "var(--primary)",
                        borderRadius: "999px",
                        transition: "width 0.4s ease",
                      }}
                    />
                  </div>

                  <span
                    className="muted"
                    style={{
                      fontSize: "13px",
                      minWidth: "20px",
                      textAlign: "right",
                    }}
                  >
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted">{t("loading")}</p>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: "16px",
          marginTop: "24px",
          flexWrap: "wrap",
        }}
      >
        <Link href="/admin/algoritmos" className="btn btn-ghost">
          {t("viewAll")}
        </Link>

        <Link href="/admin/algoritmos/novo" className="btn btn-primary">
          {t("createAlgorithm")}
        </Link>
      </div>
    </div>
  );
}