"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useAlgorithms } from "@/lib/useAlgorithms";
import { AlgorithmForm } from "@/components/admin/AlgorithmForm";

interface EditAlgorithmPageProps {
  params: Promise<{ id: string }>;
}

export default function EditAlgorithmPage({ params }: EditAlgorithmPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { algorithms, loaded, updateAlgorithm } = useAlgorithms();

  if (!loaded) {
    return (
      <div>
        <div className="admin-page-header">
          <h1>Editar Algoritmo</h1>
        </div>
        <p className="muted">Carregando...</p>
      </div>
    );
  }

  const algorithm = algorithms.find((a) => a.id === id);

  if (!algorithm) {
    return (
      <div>
        <div className="admin-page-header">
          <h1>Editar Algoritmo</h1>
        </div>
        <div className="card" style={{ padding: "40px", textAlign: "center" }}>
          <p className="muted" style={{ margin: "0 0 16px 0" }}>
            Algoritmo não encontrado.
          </p>
          <button
            className="btn btn-ghost"
            onClick={() => router.push("/admin/algoritmos")}
          >
            Voltar para a lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1>Editar: {algorithm.name}</h1>
      </div>

      <AlgorithmForm
        initial={algorithm}
        submitLabel="Salvar alterações"
        onCancel={() => router.push("/admin/algoritmos")}
        onSubmit={(data) => {
          updateAlgorithm(id, data);
          router.push("/admin/algoritmos");
        }}
      />
    </div>
  );
}
