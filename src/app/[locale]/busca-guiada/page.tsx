import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { algorithms } from "@/data/algorithms";

export default async function GuidedSearchPage() {
  const t = await getTranslations("GuidedSearch");
  const categories = Array.from(
    new Set(algorithms.map((algorithm) => algorithm.category))
  );

  return (
    <section className="page-section">
      <div className="container guided-page">
        <div className="page-hero">
          <span className="eyebrow">{t("eyebrow")}</span>

          <h1>{t("title")}</h1>

          <p>{t("description")}</p>
        </div>

        <div className="guided-layout">
          <aside className="guided-aside">
            <span className="panel-kicker">{t("howToKicker")}</span>

            <h2>{t("howToTitle")}</h2>

            <p>{t("howToDescription")}</p>

            <Link href="/algoritmos" className="button-link">
              {t("viewLibrary")}
            </Link>
          </aside>

          <div className="guided-grid">
            {categories.map((category, index) => {
              const relatedAlgorithms = algorithms.filter(
                (algorithm) => algorithm.category === category
              );

              return (
                <article key={category} className="guided-card">
                  <div className="guided-card-index">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <span className="tag">{category}</span>

                    <h2>{category}</h2>

                    <p>{t("available", { count: relatedAlgorithms.length })}</p>
                  </div>

                  <ul>
                    {relatedAlgorithms.slice(0, 3).map((algorithm) => (
                      <li key={algorithm.id}>{algorithm.name}</li>
                    ))}
                  </ul>

                  <Link href="/algoritmos" className="secondary-button">
                    {t("exploreTrack")}
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}