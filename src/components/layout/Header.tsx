import Link from "next/link";

export function Header() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 24px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div>
        <h2 style={{ margin: 0 }}>Quantum Algorithm Library</h2>
      </div>

      <nav style={{ display: "flex", gap: "16px" }}>
        <Link href="/">Home</Link>
        <Link href="/algoritmos">Algoritmos</Link>
        <Link href="/comparar">Comparar</Link>
        <Link href="/busca-guiada">Busca Guiada</Link>
        <Link href="/sobre">Sobre</Link>
        <Link href="/admin">Admin</Link>
      </nav>
    </header>
  );
}