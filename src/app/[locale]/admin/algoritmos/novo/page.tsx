"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useAlgorithms } from "@/lib/useAlgorithms";
import { AlgorithmForm } from "@/components/admin/AlgorithmForm";

export default function NewAlgorithmPage() {
  const t = useTranslations("AdminEdit");
  const router = useRouter();
  const { addAlgorithm } = useAlgorithms();

  return (
    <div>
      <div className="admin-page-header">
        <h1>{t("newTitle")}</h1>
      </div>

        <AlgorithmForm
          submitLabel={t("createSubmit")}
          onCancel={() => router.push("/admin/algoritmos")}
          onSubmit={async (data) => {
            await addAlgorithm(data);
            router.push("/admin/algoritmos");
         }}
        />
    </div>
  );
}