import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

interface RouteContext {
  params: Promise<{ id: string }>;
}

async function forward(request: Request, method: string, id: string) {
  const token = (await cookies()).get("admin_token")?.value;

  const response = await fetch(`${API_URL}/algoritmos/${id}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body:
      method === "GET" || method === "DELETE"
        ? undefined
        : await request.text(),
    cache: "no-store",
  });

  const text = await response.text();

  return new NextResponse(text || null, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") ?? "application/json",
    },
  });
}

export async function GET(request: Request, { params }: RouteContext) {
  const { id } = await params;
  return forward(request, "GET", id);
}

export async function PUT(request: Request, { params }: RouteContext) {
  const { id } = await params;
  return forward(request, "PUT", id);
}

export async function DELETE(request: Request, { params }: RouteContext) {
  const { id } = await params;
  return forward(request, "DELETE", id);
}