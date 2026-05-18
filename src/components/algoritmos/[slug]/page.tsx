import { AlgorithmDetail } from "@/components/algoritmos/AlgorithmDetail";

interface AlgorithmDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AlgorithmDetailPage({
  params,
}: AlgorithmDetailPageProps) {
  const { slug } = await params;

  return <AlgorithmDetail slug={slug} />;
}