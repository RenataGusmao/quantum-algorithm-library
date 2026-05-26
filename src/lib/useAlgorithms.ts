"use client";

import { useCallback, useEffect, useState } from "react";
import { algorithms as seedAlgorithms } from "@/data/algorithms";
import { Algorithm } from "@/types/algorithm";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

interface ApiAlgorithm {
  id: string;
  nome: string;
  slug: string;
  categoria?: string | null;
  descricaoCurta: string;
  descricaoCompleta?: string | null;
  complexidade?: string | null;
  aplicacoes?: string[];
  caracteristicas?: string[];
  vantagens?: string[];
  limitacoes?: string[];
  tags?: string[];
}

function fromApi(data: ApiAlgorithm): Algorithm {
  return {
    id: data.id,
    name: data.nome,
    slug: data.slug,
    category: data.categoria ?? "Search",
    shortDescription: data.descricaoCurta,
    fullDescription: data.descricaoCompleta ?? data.descricaoCurta,
    complexity: data.complexidade ?? undefined,
    applications: data.aplicacoes ?? [],
    characteristics: data.caracteristicas ?? [],
    advantages: data.vantagens ?? [],
    limitations: data.limitacoes ?? [],
    tags: data.tags ?? [],
  };
}

function toApi(data: Omit<Algorithm, "id"> | Partial<Algorithm>) {
  return {
    nome: data.name,
    slug: data.slug,
    categoria: data.category,
    descricaoCurta: data.shortDescription,
    descricaoCompleta: data.fullDescription,
    complexidade: data.complexity,
    aplicacoes: data.applications,
    caracteristicas: data.characteristics,
    vantagens: data.advantages,
    limitacoes: data.limitations,
    tags: data.tags,
  };
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function useAlgorithms() {
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
  const [loaded, setLoaded] = useState(false);

  const loadAlgorithms = useCallback(async () => {
    try {
      const data = await request<ApiAlgorithm[]>("/algoritmos");
      setAlgorithms(data.map(fromApi));
    } catch (error) {
      console.error(error);
      setAlgorithms(seedAlgorithms);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    void loadAlgorithms();
  }, [loadAlgorithms]);

  const addAlgorithm = async (algorithm: Omit<Algorithm, "id">) => {
    const created = await request<ApiAlgorithm>("/algoritmos", {
      method: "POST",
      body: JSON.stringify(toApi(algorithm)),
    });

    const mapped = fromApi(created);
    setAlgorithms((current) => [...current, mapped]);
    return mapped;
  };

  const updateAlgorithm = async (id: string, data: Partial<Algorithm>) => {
    const updated = await request<ApiAlgorithm>(`/algoritmos/${id}`, {
      method: "PUT",
      body: JSON.stringify(toApi(data)),
    });

    const mapped = fromApi(updated);
    setAlgorithms((current) =>
      current.map((algorithm) => (algorithm.id === id ? mapped : algorithm))
    );
    return mapped;
  };

  const deleteAlgorithm = async (id: string) => {
    const response = await fetch(`${API_URL}/algoritmos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    setAlgorithms((current) =>
      current.filter((algorithm) => algorithm.id !== id)
    );
  };

  return {
    algorithms,
    loaded,
    addAlgorithm,
    updateAlgorithm,
    deleteAlgorithm,
    reloadAlgorithms: loadAlgorithms,
  };
}