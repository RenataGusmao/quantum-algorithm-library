import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function SobrePage() {
  const t = await getTranslations("About");

  return (
    <section className="page-section">
      <div className="container about-page">
        <div className="about-hero">
          <span className="tag">{t("eyebrow")}</span>

          <h1>{t("title")}</h1>

          <p>{t("description")}</p>

          <div className="about-actions">
            <Link href="/algoritmos" className="button-link">
              {t("primaryAction")}
            </Link>

            <Link href="/busca-guiada" className="secondary-link">
              {t("secondaryAction")}
            </Link>
          </div>
        </div>

        <div className="about-grid">
          <article className="card about-card-large">
            <h2>{t("objectiveTitle")}</h2>
            <p>{t("objectiveParagraph1")}</p>
            <p>{t("objectiveParagraph2")}</p>
          </article>

          <article className="card about-card">
            <h2>{t("audienceTitle")}</h2>
            <p>{t("audienceText")}</p>
          </article>

          <article className="card about-card">
            <h2>{t("howTitle")}</h2>
            <p>{t("howText")}</p>
          </article>
        </div>

        <div className="about-section">
          <h2>{t("featuresTitle")}</h2>

          <div className="feature-grid">
            <div className="feature-item">
              <strong>{t("featureLibraryTitle")}</strong>
              <span>{t("featureLibraryText")}</span>
            </div>

            <div className="feature-item">
              <strong>{t("featureCompareTitle")}</strong>
              <span>{t("featureCompareText")}</span>
            </div>

            <div className="feature-item">
              <strong>{t("featureGuidedTitle")}</strong>
              <span>{t("featureGuidedText")}</span>
            </div>

            <div className="feature-item">
              <strong>{t("featureAdminTitle")}</strong>
              <span>{t("featureAdminText")}</span>
            </div>
          </div>
        </div>

        <div className="about-highlight">
          <div>
            <span className="tag">{t("futureEyebrow")}</span>
            <h2>{t("futureTitle")}</h2>
            <p>{t("futureText")}</p>
          </div>

          <Link href="/comparar" className="button-link">
            {t("compareAction")}
          </Link>
        </div>
      </div>
    </section>
  );
}