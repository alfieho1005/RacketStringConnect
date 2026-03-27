import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const SESSION_COOKIE = "rsc_admin";
const MAX_AGE = 60 * 60 * 8; // 8 hours

export async function POST(req: Request) {
  const { username, password } = await req.json() as { username?: string; password?: string };

  const validUser = process.env.ADMIN_USERNAME ?? "admin";
  const validPass = process.env.ADMIN_PASSWORD ?? "Pw1234";
  const secret    = process.env.ADMIN_SESSION_SECRET ?? "rsc-admin-s3cr3t-2026";

  if (username !== validUser || password !== validPass) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Simple token: base64(username:timestamp:secret) — not cryptographic but sufficient
  const token = Buffer.from(`${username}:${Date.now()}:${secret}`).toString("base64");

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
