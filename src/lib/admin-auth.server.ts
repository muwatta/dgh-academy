import { NextRequest, NextResponse } from "next/server";

export const ADMIN_AUTH_COOKIE = "dghacademy_admin_auth";
export const ADMIN_AUTH_TTL = 60 * 60 * 24;

export function isValidAdminPassword(password: unknown): password is string {
  return (
    typeof password === "string" && password === process.env.ADMIN_PASSWORD
  );
}

export function isAdminAuthenticated(req: NextRequest) {
  return req.cookies.get(ADMIN_AUTH_COOKIE)?.value === "authenticated";
}

export function setAdminAuthCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_AUTH_COOKIE,
    value: "authenticated",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_AUTH_TTL,
  });
}

export function clearAdminAuthCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_AUTH_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
}
