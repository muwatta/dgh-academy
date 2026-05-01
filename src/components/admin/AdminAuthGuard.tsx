"use client";
import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function AdminAuthGuard({ children }: { children: ReactNode }) {
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function verifySession() {
      try {
        const response = await fetch("/api/admin/session");

        if (!response.ok) {
          router.replace("/admin/login");
          return;
        }

        setChecked(true);
      } catch {
        router.replace("/admin/login");
      }
    }

    verifySession();
  }, [router]);

  if (!checked)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--school-cream)]">
        <div
          className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "#6B3A2A", borderTopColor: "transparent" }}
        />
      </div>
    );

  return <>{children}</>;
}
