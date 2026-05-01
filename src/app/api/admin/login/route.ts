import { NextRequest, NextResponse } from "next/server";
import {
  isValidAdminPassword,
  setAdminAuthCookie,
} from "@/lib/admin-auth.server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const password = body?.password;

  if (!isValidAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true });
  setAdminAuthCookie(response);
  return response;
}
