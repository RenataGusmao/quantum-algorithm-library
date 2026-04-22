import Link from "next/link";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/algoritmos", label: "Algoritmos" },
  { href: "/comparar", label: "Comparar" },
  { href: "/busca-guiada", label: "Busca Guiada" },
  { href: "/sobre", label: "Sobre" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link href="/" className="header-brand">
          Quantum Algorithm Library
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <nav className="topbar-nav">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="header-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              border: "1px solid var(--border)",
              borderRadius: "999px",
              background: "var(--surface)",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            <span>PT</span>
            <span className="muted">|</span>
            <span className="muted">EN</span>
          </div>
        </div>
      </div>
    </header>
  );
}