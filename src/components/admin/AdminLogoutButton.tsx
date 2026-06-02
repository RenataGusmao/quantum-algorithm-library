"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const navItems = [
  { href: "/", key: "home" },
  { href: "/algoritmos", key: "algorithms" },
  { href: "/comparar", key: "compare" },
  { href: "/busca-guiada", key: "guidedSearch" },
  { href: "/sobre", key: "about" },
] as const;

export function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();

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
            width={132}
            height={34}
            priority
            className="header-logo"
          />
          <span className="header-product-name">
            Quantum Algorithm Library
          </span>
        </Link>

        <div className="topbar-actions">
          <nav className="topbar-nav" aria-label={t("navLabel")}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="header-link">
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="language-switch" aria-label={t("languageLabel")}>
            <Link
              href={pathname}
              locale="pt"
              className={locale === "pt" ? "language-active" : undefined}
            >
              PT
            </Link>
            <span>|</span>
            <Link
              href={pathname}
              locale="en"
              className={locale === "en" ? "language-active" : undefined}
            >
              EN
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}