"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AlgorithmCard } from "@/components/algoritmos/AlgorithmCard";
import { useAlgorithms } from "@/lib/useAlgorithms";

export default function HomePage() {
  const t = useTranslations("Home");
  const { algorithms, loaded } = useAlgorithms();

  const featuredAlgorithms = algorithms.slice(0, 3);

  return (
    <>
      <section className="brand-hero">
        <div className="container brand-hero-inner">
          <div className="brand-hero-copy">
            <span className="eyebrow">{t("eyebrow")}</span>

            <h1>{t("title")}</h1>

            <p>{t("description")}</p>

            <div className="hero-actions">
              <Link href="/algoritmos" className="button-link">
                {t("primaryAction")}
              </Link>

              <Link href="/busca-guiada" className="secondary-button">
                {t("secondaryAction")}
              </Link>
            </div>
          </div>

          <div className="hero-panel" aria-label={t("panelKicker")}>
            <span className="panel-kicker">{t("panelKicker")}</span>
            <strong>{loaded ? algorithms.length : "..."}</strong>
            <span>{t("panelDescription")}</span>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container section-stack">
          <div className="section-heading">
            <span className="eyebrow">{t("featuredEyebrow")}</span>
            <h2>{t("featuredTitle")}</h2>
            <p>{t("featuredDescription")}</p>
          </div>

          <div className="grid">
            {featuredAlgorithms.map((algorithm) => (
              <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> main
