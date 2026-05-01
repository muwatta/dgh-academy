import { NextResponse } from "next/server";
import { clearAdminAuthCookie } from "@/lib/admin-auth.server";

export async function POST() {
  const response = NextResponse.json({ loggedOut: true });
  clearAdminAuthCookie(response);
  return response;
}
