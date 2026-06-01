import { redirect } from "next/navigation";

<<<<<<< HEAD
export default function HomePage() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="hero">
          <h1>Explore Algoritmos Quânticos</h1>
          <p>
            Encontre, compare e compreenda o algoritmo quântico mais adequado
            para o seu problema por meio de uma experiência estruturada e
            intuitiva.
          </p>
        </div>
        <div className="grid">
          {algorithms.map((algorithm) => (
            <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
          ))}
        </div>
      </div>
    </section>
  );
=======
export default function RootPage() {
  redirect("/pt");
>>>>>>> 3b728318e6386ea0de4cb7b31ccb8c9f3c8a909f
}