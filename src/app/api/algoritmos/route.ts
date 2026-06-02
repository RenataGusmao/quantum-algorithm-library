import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

async function forward(request: Request, method: string) {
  const token = (await cookies()).get("admin_token")?.value;
  const url = new URL(request.url);
  const targetUrl = `${API_URL}/algoritmos${url.search}`;

  const response = await fetch(targetUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: method === "GET" ? undefined : await request.text(),
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

export async function GET(request: Request) {
  return forward(request, "GET");
}

export async function POST(request: Request) {
  return forward(request, "POST");
}