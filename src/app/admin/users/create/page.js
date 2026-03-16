"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAdmin() {
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMsg("");
    const fd = new FormData(e.target);
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: fd.get("name"), email: fd.get("email") }),
    });
    if (res.ok) {
      setMsg("Admin created successfully!");
      e.target.reset();
    } else {
      setError((await res.json()).error || "Failed to create admin");
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Create Admin</h2>
      {msg && <p className="text-green-600 font-bold mb-4">{msg}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-md">
        <input name="name" placeholder="Name" required className="w-full border p-3 rounded" />
        <input name="email" type="email" placeholder="Email" required className="w-full border p-3 rounded" />
        <p className="text-xs text-gray-400">The admin will be created with the default password.</p>
        <button className="bg-primary text-white px-6 py-3 rounded">Create Admin</button>
      </form>
    </div>
  );
}
