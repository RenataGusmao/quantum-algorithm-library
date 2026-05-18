import Image from "next/image";
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
        <Link
          href="/"
          className="header-brand"
          aria-label="Accenture Quantum Algorithm Library"
        >
          <Image
            src="/brand/accenture_logo.png"
            alt="Accenture"
            width={162}
            height={42}
            priority
            className="header-logo"
          />

          <span>Quantum Algorithm Library</span>
        </Link>

        <div className="topbar-actions">
          <nav className="topbar-nav" aria-label="Navegação principal">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="header-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="language-switch" aria-label="Idioma atual">
            <span>PT</span>
            <span>|</span>
            <span>EN</span>
          </div>
        </div>
      </div>
    </header>
  );
}