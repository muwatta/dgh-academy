export const ADMIN_AUTH_COOKIE = "dghacademy_admin_auth";

export function clearAdminSession() {
  return fetch("/api/admin/logout", { method: "POST" });
}
