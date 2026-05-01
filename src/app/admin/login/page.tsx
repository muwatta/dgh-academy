"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, GraduationCap, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        const response = await fetch("/api/admin/session");
        if (mounted && response.ok) {
          router.replace("/admin");
        }
      } catch {
        // Ignore network errors during initial session check.
      }
    }

    checkSession();
    return () => {
      mounted = false;
    };
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.replace("/admin");
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch {
      setError("Unable to sign in. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, #2A0F06 0%, #4A1A08 60%, #6B3A2A 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C4955A' fill-rule='evenodd'%3E%3Cpath d='M30 0L37.5 15H52.5L41.25 24.375L45.75 39.375L30 30L14.25 39.375L18.75 24.375L7.5 15H22.5L30 0z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative w-full max-w-sm">
        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
          <div
            className="px-8 py-8 text-center"
            style={{ background: "#6B3A2A" }}
          >
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4">
              <GraduationCap size={32} className="text-white" />
            </div>
            <h1 className="font-amiri text-2xl font-bold text-white">
              DGH Academy
            </h1>
            <p className="text-white/55 text-sm mt-1">Admin Dashboard</p>
          </div>

          <div className="px-8 py-8 bg-white">
            <h2 className="font-bold text-gray-800 text-lg mb-1">
              Welcome back
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Enter the admin password to continue.
            </p>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-5">
                <AlertCircle size={15} className="shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                    autoFocus
                    className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#6B3A2A] transition-colors"
                    style={{ background: "white", color: "#1A0E08" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    tabIndex={-1}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-bold text-sm text-white transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "#6B3A2A" }}
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-white/20 text-xs mt-5">
          © {new Date().getFullYear()} Dr. Gambo Hamza Islamic Academy
        </p>
      </div>
    </div>
  );
}
