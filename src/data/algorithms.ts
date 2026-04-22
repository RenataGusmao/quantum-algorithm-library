import { Algorithm } from "@/types/algorithm";

export const algorithms: Algorithm[] = [
  {
    id: "1",
    name: "Grover's Algorithm",
    slug: "grovers-algorithm",
    category: "Search",
    shortDescription: "Searches unsorted databases with quadratic speedup.",
    fullDescription:
      "Grover's Algorithm is a quantum search algorithm that improves the search of unsorted datasets, providing quadratic speedup compared to classical approaches.",
    applications: ["Database search", "Cryptography", "Optimization support"],
    characteristics: [
      "Quadratic speedup",
      "Probabilistic result",
      "Useful for unstructured search"
    ],
    complexity: "O(√N)",
    advantages: [
      "Faster than classical brute force search",
      "Widely referenced in quantum computing literature"
    ],
    limitations: [
      "Requires quantum hardware",
      "Not ideal for every type of problem"
    ],
    tags: ["search", "quantum speedup", "database"]
  },
  {
    id: "2",
    name: "Shor's Algorithm",
    slug: "shors-algorithm",
    category: "Cryptography",
    shortDescription: "Efficient factorization of large integers.",
    fullDescription:
      "Shor's Algorithm is one of the most famous quantum algorithms, mainly known for solving integer factorization exponentially faster than known classical methods in specific contexts.",
    applications: ["Integer factorization", "Cryptanalysis", "Number theory"],
    characteristics: [
      "Exponential speedup in factorization",
      "High theoretical relevance",
      "Strong impact on cryptography"
    ],
    complexity: "Polynomial time",
    advantages: [
      "Breakthrough for quantum cryptanalysis",
      "High academic and practical relevance"
    ],
    limitations: [
      "Hard to run on current quantum hardware at large scale",
      "Very specialized use case"
    ],
    tags: ["cryptography", "factorization", "security"]
  },
  {
    id: "3",
    name: "Quantum Approximate Optimization Algorithm",
    slug: "qaoa",
    category: "Optimization",
    shortDescription: "Approximate optimization for combinatorial problems.",
    fullDescription:
      "QAOA is a hybrid quantum-classical algorithm designed to solve optimization problems approximately, especially useful in combinatorial optimization scenarios.",
    applications: [
      "Combinatorial optimization",
      "Scheduling",
      "Resource allocation"
    ],
    characteristics: [
      "Hybrid approach",
      "Parameterized circuit",
      "Near-term quantum applicability"
    ],
    complexity: "Depends on depth and problem",
    advantages: [
      "Relevant for NISQ era",
      "Good fit for practical optimization studies"
    ],
    limitations: [
      "Quality depends on parameter tuning",
      "May not outperform classical methods in all cases"
    ],
    tags: ["optimization", "hybrid", "nisq"]
  },
  {
    id: "4",
    name: "Variational Quantum Eigensolver",
    slug: "vqe",
    category: "Simulation",
    shortDescription: "Hybrid algorithm for estimating ground state energies.",
    fullDescription:
      "VQE is a hybrid quantum-classical algorithm often used in quantum chemistry and material science to estimate eigenvalues, especially ground state energies.",
    applications: [
      "Quantum chemistry",
      "Molecular simulation",
      "Material science"
    ],
    characteristics: [
      "Hybrid quantum-classical loop",
      "Useful for chemistry",
      "Suitable for near-term devices"
    ],
    complexity: "Problem dependent",
    advantages: [
      "Strong applicability in chemistry",
      "Popular in near-term quantum research"
    ],
    limitations: [
      "Sensitive to noise",
      "Requires optimization tuning"
    ],
    tags: ["simulation", "chemistry", "hybrid"]
  }
];