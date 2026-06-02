import { NextResponse } from "next/server";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

function getJwtPayload(token: string) {
  const payload = token.split(".")[1];
  return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
    perfil?: string;
  };
}

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "E-mail e senha sao obrigatorios." },
      { status: 400 }
    );
  }

  const apiResponse = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha: password }),
    cache: "no-store",
  });

  if (!apiResponse.ok) {
    return NextResponse.json(
      { message: "E-mail ou senha incorretos." },
      { status: apiResponse.status }
    );
  }

  const data = (await apiResponse.json()) as { token?: string };

  if (!data.token) {
    return NextResponse.json(
      { message: "Token nao retornado pela API." },
      { status: 502 }
    );
  }

  const payload = getJwtPayload(data.token);
  const perfil = payload.perfil ?? "admin";

  const res = NextResponse.json({ ok: true, perfil });

  res.cookies.set("admin_session", "authenticated", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  res.cookies.set("admin_token", data.token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  res.cookies.set("admin_role", perfil, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });

  res.cookies.set("admin_session", "", {
    path: "/",
    maxAge: 0,
  });

  res.cookies.set("admin_token", "", {
    path: "/",
    maxAge: 0,
  });

  res.cookies.set("admin_role", "", {
    path: "/",
    maxAge: 0,
  });

  return res;
}