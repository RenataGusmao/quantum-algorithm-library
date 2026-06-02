"use client";

import { useLocale } from "next-intl";
import { useState } from "react";

export function AdminLogoutButton() {
  const locale = useLocale();
  const [loading, setLoading] = useState(false);

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
