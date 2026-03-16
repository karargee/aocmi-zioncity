"use client";
import { useState } from "react";

export default function ChangePasswordPage() {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setError("");
    const fd = new FormData(e.target);
    if (fd.get("password") !== fd.get("password_confirmation")) {
      setError("Passwords do not match.");
      return;
    }
    const res = await fetch("/api/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        old_password: fd.get("old_password"),
        password: fd.get("password"),
      }),
    });
    if (res.ok) {
      setMsg("Password updated successfully!");
      e.target.reset();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to update password.");
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      {msg && <p className="text-green-600 font-bold mb-4">{msg}</p>}
      {error && <p className="text-red-500 font-bold mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-md">
        <input name="old_password" type="password" placeholder="Old Password" required className="w-full border p-3 rounded" />
        <input name="password" type="password" placeholder="New Password (min 8 chars)" required minLength={8} className="w-full border p-3 rounded" />
        <input name="password_confirmation" type="password" placeholder="Confirm New Password" required className="w-full border p-3 rounded" />
        <button className="bg-primary text-white px-6 py-3 rounded">Update Password</button>
      </form>
    </div>
  );
}
