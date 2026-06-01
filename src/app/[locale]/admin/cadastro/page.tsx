"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export default function AdminCadastroPage() {
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
      setError("As senhas não coincidem.");
      return;
    }

    if (senha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, perfil: "admin" }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(`/${locale}/admin/login`);
      } else {
        setError(data.message ?? "Erro ao criar conta.");
        setLoading(false);
      }
    } catch {
      setError("Erro ao conectar com o servidor.");
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "380px",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div>
          <h1 style={{ margin: "0 0 4px 0", fontSize: "20px", fontWeight: 700 }}>
            Criar conta
          </h1>
          <p className="muted" style={{ margin: 0, fontSize: "13px" }}>
            Área administrativa
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "#fff0f0",
              border: "1px solid #fca5a5",
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "13px",
              color: "#dc2626",
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
              placeholder="Seu nome completo"
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
                placeholder="Mínimo 6 caracteres"
                style={{ paddingRight: "40px" }}
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
                  fontSize: "16px",
                  padding: "0",
                  lineHeight: 1,
                }}
                aria-label={showSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {showSenha ? "x" : "👁"}
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

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: "100%", marginTop: "4px" }}
          >
            {loading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "16px",
            textAlign: "center",
            fontSize: "13px",
            color: "var(--muted)",
          }}
        >
          Já tem uma conta?{" "}
          <Link
            href={`/${locale}/admin/login`}
            style={{
              color: "var(--primary)",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}
