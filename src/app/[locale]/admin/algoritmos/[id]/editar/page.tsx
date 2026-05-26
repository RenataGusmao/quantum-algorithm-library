"use client";

import { use } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useAlgorithms } from "@/lib/useAlgorithms";
import { AlgorithmForm } from "@/components/admin/AlgorithmForm";

interface EditAlgorithmPageProps {
  params: Promise<{ id: string }>;
}

export default function EditAlgorithmPage({ params }: EditAlgorithmPageProps) {
  const t = useTranslations("AdminEdit");
  const { id } = use(params);
  const router = useRouter();
  const { algorithms, loaded, updateAlgorithm } = useAlgorithms();

  if (!loaded) {
    return (
      <div>
        <div className="admin-page-header">
          <h1>{t("editTitle")}</h1>
        </div>

        <p className="muted">{t("loading")}</p>
      </div>
    );
  }

  const algorithm = algorithms.find((a) => a.id === id);

  if (!algorithm) {
    return (
      <div>
        <div className="admin-page-header">
          <h1>{t("editTitle")}</h1>
        </div>

        <div className="card" style={{ padding: "40px", textAlign: "center" }}>
          <p className="muted" style={{ margin: "0 0 16px 0" }}>
            {t("notFound")}
          </p>

          <button
            className="btn btn-ghost"
            onClick={() => router.push("/admin/algoritmos")}
          >
            {t("backToList")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1>{t("editNamedTitle", { name: algorithm.name })}</h1>
      </div>

      <AlgorithmForm
        initial={algorithm}
        submitLabel={t("saveSubmit")}
        onCancel={() => router.push("/admin/algoritmos")}
        onSubmit={async (data) => {
          await updateAlgorithm(id, data);
          router.push("/admin/algoritmos");
        }}
      />
    </div>
  );
}