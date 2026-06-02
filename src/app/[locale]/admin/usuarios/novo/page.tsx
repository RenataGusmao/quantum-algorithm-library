"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";

export default function NovoAdminPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) ?? "pt";

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (senha !== confirmarSenha) {
      setError("As senhas nao coincidem.");
      return;
    }

    if (senha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(`/${locale}/admin`);
        router.refresh();
      } else {
        setError(data.message ?? "Erro ao cadastrar administrador.");
        setLoading(false);
      }
    } catch {
      setError("Erro ao conectar com o servidor.");
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1>Novo Administrador</h1>

        <Link href="/admin" className="btn btn-ghost">
          Voltar
        </Link>
      </div>

      <div className="card" style={{ maxWidth: "480px", padding: "32px" }}>
        {error && (
          <div
            style={{
              background: "#fff0f0",
              border: "1px solid #fca5a5",
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "13px",
              color: "#dc2626",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <div className="form-group">
            <label className="form-label">Nome</label>

            <input
              className="form-input"
              type="text"
              required
              autoFocus
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome completo"
            />
          </div>

          <div className="form-group">
            <label className="form-label">E-mail</label>

            <input
              className="form-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@exemplo.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Senha</label>

            <div style={{ position: "relative" }}>
              <input
                className="form-input"
                type={showSenha ? "text" : "password"}
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Minimo 6 caracteres"
                style={{ paddingRight: "56px" }}
              />

              <button
                type="button"
                onClick={() => setShowSenha((v) => !v)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--muted)",
                  fontSize: "13px",
                  padding: "0",
                  lineHeight: 1,
                }}
                aria-label={showSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {showSenha ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirmar senha</label>

            <input
              className="form-input"
              type={showSenha ? "text" : "password"}
              required
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Repita a senha"
            />
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ flex: 1 }}
            >
              {loading ? "Cadastrando..." : "Cadastrar administrador"}
            </button>

            <Link href="/admin" className="btn btn-ghost">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}