"use client";
import Link from "next/link";
import { useAlgorithms } from "@/lib/useAlgorithms";

export default function AdminAlgorithmsPage() {
  const { algorithms, loaded, deleteAlgorithm } = useAlgorithms();

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Deseja excluir o algoritmo "${name}"? Esta ação não pode ser desfeita.`)) {
      deleteAlgorithm(id);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Algoritmos</h1>
        <Link href="/admin/algoritmos/novo" className="btn btn-primary">
          + Novo Algoritmo
        </Link>
      </div>

      {!loaded ? (
        <p className="muted">Carregando...</p>
      ) : algorithms.length === 0 ? (
        <div className="card" style={{ padding: "40px", textAlign: "center" }}>
          <p className="muted" style={{ margin: "0 0 16px 0" }}>
            Nenhum algoritmo cadastrado ainda.
          </p>
          <Link href="/admin/algoritmos/novo" className="btn btn-primary">
            Cadastrar primeiro algoritmo
          </Link>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Complexidade</th>
              <th>Tags</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {algorithms.map((algorithm) => (
              <tr key={algorithm.id}>
                <td style={{ fontWeight: 600 }}>{algorithm.name}</td>
                <td>
                  <span className="tag" style={{ fontSize: "11px" }}>
                    {algorithm.category}
                  </span>
                </td>
                <td className="muted" style={{ fontSize: "13px" }}>
                  {algorithm.complexity ?? "—"}
                </td>
                <td>
                  <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                    {algorithm.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "11px",
                          padding: "3px 8px",
                          borderRadius: "999px",
                          background: "#f1f5f9",
                          color: "#334155",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    {(algorithm.tags?.length ?? 0) > 2 && (
                      <span className="muted" style={{ fontSize: "11px" }}>
                        +{(algorithm.tags?.length ?? 0) - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Link
                      href={`/admin/algoritmos/${algorithm.id}/editar`}
                      className="btn btn-ghost btn-sm"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(algorithm.id, algorithm.name)}
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
