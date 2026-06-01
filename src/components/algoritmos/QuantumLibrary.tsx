"use client";
import { useState } from "react";

type Maturity = "Implementado" | "Teórico" | "NISQ-friendly";
type Category = "Otimização" | "Criptografia" | "Simulação" | "Machine Learning" | "Busca";

interface Algorithm {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  maturity: Maturity[];
  complexity: string;
  description: string;
  whyUse: string;
  tags: string[];
}

const ALGORITHMS: Algorithm[] = [
  { id: "grover", name: "Algoritmo de Grover", subtitle: "Busca em banco de dados não estruturado", category: "Busca", maturity: ["Implementado", "NISQ-friendly"], complexity: "O(√N)", description: "Fornece speedup quadrático para busca em espaços não ordenados. Aplicado em otimização combinatória e criptoanálise.", whyUse: "Ideal quando você precisa buscar em grandes espaços de solução sem estrutura. Reduz o tempo de busca de O(N) para O(√N) — eficaz já com hardware atual.", tags: ["speedup quadrático", "busca", "oráculo", "NISQ-friendly"] },
  { id: "shor", name: "Algoritmo de Shor", subtitle: "Fatoração de inteiros em tempo polinomial", category: "Criptografia", maturity: ["Teórico"], complexity: "O((log N)³)", description: "Fatora inteiros exponencialmente mais rápido que qualquer algoritmo clássico conhecido. Ameaça direta à criptografia RSA.", whyUse: "Relevante para análise de vulnerabilidades em sistemas criptográficos clássicos e planejamento de migração para criptografia pós-quântica.", tags: ["speedup exponencial", "fatoração", "RSA", "criptografia"] },
  { id: "qaoa", name: "QAOA", subtitle: "Quantum Approximate Optimization Algorithm", category: "Otimização", maturity: ["Implementado", "NISQ-friendly"], complexity: "O(p · |E|)", description: "Algoritmo variacional híbrido para problemas de otimização combinatória. Indicado para hardware NISQ atual.", whyUse: "Melhor escolha para problemas de otimização em hardware quântico atual. Funciona com circuitos rasos e pode ser combinado com otimizadores clássicos.", tags: ["variacional", "otimização", "NISQ-friendly", "híbrido"] },
  { id: "vqe", name: "VQE", subtitle: "Variational Quantum Eigensolver", category: "Simulação", maturity: ["Implementado", "NISQ-friendly"], complexity: "O(N⁴)", description: "Calcula o estado de menor energia de moléculas. Essencial para simulações em química computacional e novos materiais.", whyUse: "Primeira escolha para simulação molecular em hardware NISQ. Amplamente validado em moléculas pequenas — base para descoberta de novos materiais e fármacos.", tags: ["simulação molecular", "variacional", "química quântica", "NISQ-friendly"] },
  { id: "qsvm", name: "QSVM", subtitle: "Quantum Support Vector Machine", category: "Machine Learning", maturity: ["Teórico", "NISQ-friendly"], complexity: "O(log N)", description: "Versão quântica do SVM clássico com potencial de speedup exponencial em problemas de classificação de alta dimensão.", whyUse: "Promissor para classificação em espaços de features de altíssima dimensão, onde kernels quânticos podem superar métodos clássicos.", tags: ["classificação", "kernel quântico", "ML", "speedup exponencial"] },
  { id: "hhl", name: "Algoritmo HHL", subtitle: "Resolução de sistemas lineares", category: "Otimização", maturity: ["Teórico"], complexity: "O(log N)", description: "Resolve sistemas de equações lineares com speedup exponencial sobre algoritmos clássicos, dado acesso quântico aos dados.", whyUse: "Relevante para otimização em larga escala e aprendizado de máquina quando os dados podem ser carregados eficientemente em memória quântica.", tags: ["sistemas lineares", "speedup exponencial", "álgebra linear"] },
  { id: "qft", name: "Transformada Quântica de Fourier", subtitle: "Componente central de múltiplos algoritmos", category: "Simulação", maturity: ["Implementado"], complexity: "O(n²)", description: "Versão quântica da DFT, exponencialmente mais rápida. Bloco fundamental do algoritmo de Shor e estimativa de fase.", whyUse: "Não é usado sozinho, mas é o coração de vários algoritmos de alto impacto. Essencial entender para trabalhar com Shor, QPE e simulação quântica.", tags: ["transformada", "base", "fase", "speedup exponencial"] },
  { id: "qpe", name: "Estimativa de Fase Quântica", subtitle: "Estimação de autovalores de operadores unitários", category: "Simulação", maturity: ["Implementado"], complexity: "O(1/ε)", description: "Estima a fase de um autovetor de um operador unitário. Subrotina crítica em algoritmos de simulação quântica e HHL.", whyUse: "Fundamental para simulação de sistemas físicos e químicos com precisão controlada. Base do VQE e do algoritmo de Shor.", tags: ["autovalores", "fase", "simulação", "base"] },
];

const maturityStyles: Record<Maturity, string> = {
  Implementado: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Teórico: "bg-amber-50 text-amber-700 border border-amber-200",
  "NISQ-friendly": "bg-sky-50 text-sky-700 border border-sky-200",
};

export default function QuantumLibrary() {
  const [selectedId, setSelectedId] = useState<string>("");
  const algo = ALGORITHMS.find((a) => a.id === selectedId) || null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <h1 className="text-[18px] font-bold text-slate-900 tracking-tight">⚛ Biblioteca Quântica</h1>
          <p className="text-[12px] text-slate-400 mt-0.5">{ALGORITHMS.length} algoritmos catalogados · mai/2026</p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full text-[14px] px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-indigo-300 text-slate-700"
        >
          <option value="">Selecione um algoritmo...</option>
          {ALGORITHMS.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>

        {algo && (
          <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h2 className="text-[18px] font-bold text-slate-900">{algo.name}</h2>
                <p className="text-[13px] text-slate-500 mt-0.5">{algo.subtitle}</p>
              </div>
              <span className="font-mono text-[12px] text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">{algo.complexity}</span>
            </div>

            <p className="text-[14px] text-slate-600 leading-relaxed mb-4">{algo.description}</p>

            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 mb-4">
              <p className="text-[12px] font-semibold text-indigo-800 mb-1">Por que usar?</p>
              <p className="text-[13px] text-indigo-700 leading-relaxed">{algo.whyUse}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {algo.maturity.map((m) => (
                <span key={m} className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${maturityStyles[m]}`}>{m}</span>
              ))}
              {algo.tags.map((t) => (
                <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200">{t}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}