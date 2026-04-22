import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
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

        <nav className="topbar-nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="header-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}