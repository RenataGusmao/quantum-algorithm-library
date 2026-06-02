"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

export function AdminLogoutButton() {
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/auth/session", {
          cache: "no-store",
        });

        setIsAuthenticated(res.ok);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setChecked(true);
      }
    }

    void checkSession();
  }, []);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await fetch("/api/auth/admin", {
        method: "DELETE",
      });
    } finally {
      window.location.href = `/${locale}/admin/login`;
    }
  };

  if (!checked || !isAuthenticated) {
    return null;
  }

  return (
    <button
      type="button"
      className="admin-sidebar-link"
      onClick={handleLogout}
      disabled={loading}
      style={{
        width: "100%",
        border: 0,
        background: "transparent",
        textAlign: "left",
        cursor: loading ? "wait" : "pointer",
      }}
    >
      {loading ? "Saindo..." : "Sair"}
    </button>
  );
}