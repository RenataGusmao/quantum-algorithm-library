import { setRequestLocale } from "next-intl/server";
import { AlgorithmDetail } from "@/components/algoritmos/AlgorithmDetail";
import { Locale, routing } from "@/i18n/routing";

interface AlgorithmDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// generateStaticParams removed: slug list must come from the API at build time.
// If you need static generation, fetch /api/algoritmos in this function instead.
// export async function generateStaticParams() { ... }

export default async function AlgorithmDetailPage({
  params,
}: AlgorithmDetailPageProps) {
  const { locale, slug } = await params;

  setRequestLocale(locale as Locale);

  return <AlgorithmDetail slug={slug} />;
}
