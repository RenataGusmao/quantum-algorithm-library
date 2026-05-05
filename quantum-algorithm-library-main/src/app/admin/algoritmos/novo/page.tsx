"use client";
import { useRouter } from "next/navigation";
import { useAlgorithms } from "@/lib/useAlgorithms";
import { AlgorithmForm } from "@/components/admin/AlgorithmForm";

export default function NewAlgorithmPage() {
  const router = useRouter();
  const { addAlgorithm } = useAlgorithms();

  return (
    <div>
      <div className="admin-page-header">
        <h1>Novo Algoritmo</h1>
      </div>

      <AlgorithmForm
        submitLabel="Cadastrar Algoritmo"
        onCancel={() => router.push("/admin/algoritmos")}
        onSubmit={(data) => {
          addAlgorithm(data);
          router.push("/admin/algoritmos");
        }}
      />
    </div>
  );
}
