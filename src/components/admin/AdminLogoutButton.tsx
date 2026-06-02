"use client";

import { useLocale } from "next-intl";
import { useState, useEffect } from "react";

export function AdminLogoutButton() {
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    
    const hasToken = document.cookie.split(";").some((item) => item.trim().startsWith("admin_token="));
    setIsLoggedIn(hasToken);
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

  
  if (!isLoggedIn) {
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