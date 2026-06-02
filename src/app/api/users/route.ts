import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Não autenticado." }, { status: 401 });
  }

  const body = await request.json();
  const { nome, email, senha } = body;

  if (!nome || !email || !senha) {
    return NextResponse.json(
      { message: "Nome, e-mail e senha são obrigatórios." },
      { status: 400 }
    );
  }

  const apiResponse = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ nome, email, senha, perfil: "admin" }),
    cache: "no-store",
  });

  const data = await apiResponse.json();

  if (!apiResponse.ok) {
    return NextResponse.json(
      { message: data.message ?? "Erro ao criar usuário." },
      { status: apiResponse.status }
    );
  }

  return NextResponse.json(data, { status: 201 });
}
