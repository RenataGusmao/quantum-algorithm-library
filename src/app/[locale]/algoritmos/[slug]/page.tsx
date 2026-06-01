import { setRequestLocale } from "next-intl/server";
import { AlgorithmDetail } from "@/components/algoritmos/AlgorithmDetail";
import { algorithms } from "@/data/algorithms";
import { Locale, routing } from "@/i18n/routing";

interface AlgorithmDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    algorithms.map((algorithm) => ({
      locale,
      slug: algorithm.slug,
    }))
  );
}

export default async function AlgorithmDetailPage({
  params,
}: AlgorithmDetailPageProps) {
  const { locale, slug } = await params;

  setRequestLocale(locale as Locale);

  return <AlgorithmDetail slug={slug} />;
}
