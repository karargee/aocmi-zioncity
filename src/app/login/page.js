"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.target);
    const res = await signIn("credentials", {
      email: fd.get("email"),
      password: fd.get("password"),
      redirect: false,
    });
    setLoading(false);
    if (res?.error) setError("Invalid credentials or account suspended.");
    else router.push("/admin");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #0a1128 0%, #1a237e 100%)" }}
    >
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/img/logo.png" alt="Aocmi" className="h-20 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to your dashboard</p>
        </div>
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none"
          />
          <button
            disabled={loading}
            className="w-full bg-[#1a237e] text-white py-3.5 rounded-full font-bold hover:bg-[#283593] transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
