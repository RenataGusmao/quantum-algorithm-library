import fs from "node:fs";

const API_URL = "https://quantum-algorithm-library-api.onrender.com";

const file = fs.readFileSync("src/data/algorithms.ts", "utf8");

const start = file.indexOf("export const algorithms");
const arrayStart = file.indexOf("[", start);
const arrayEnd = file.lastIndexOf("];");

const rawArray = file.slice(arrayStart, arrayEnd + 1);
const algorithms = Function(`return ${rawArray}`)();

function toApi(algorithm) {
  return {
    nome: algorithm.name,
    slug: algorithm.slug,
    categoria: algorithm.category,
    descricaoCurta: algorithm.shortDescription,
    descricaoCompleta: algorithm.fullDescription,
    complexidade: algorithm.complexity,
    aplicacoes: algorithm.applications ?? [],
    caracteristicas: algorithm.characteristics ?? [],
    vantagens: algorithm.advantages ?? [],
    limitacoes: algorithm.limitations ?? [],
    tags: algorithm.tags ?? [],
  };
}

for (const algorithm of algorithms) {
  const response = await fetch(`${API_URL}/algoritmos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toApi(algorithm)),
  });

  if (response.ok) {
    console.log(`Criado: ${algorithm.name}`);
  } else {
    const text = await response.text();
    console.log(`Erro em ${algorithm.name}: ${response.status} ${text}`);
  }
}