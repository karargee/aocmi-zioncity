"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateMusic() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const res = await fetch("/api/music", { method: "POST", body: fd });
    if (res.ok) router.push("/admin/music");
    else setError((await res.json()).error || "Failed to upload music");
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Upload Music</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">
        <input name="title" placeholder="Title" required className="w-full border p-3 rounded" />
        <input name="desc" placeholder="Description" required className="w-full border p-3 rounded" />
        <div>
          <label className="block text-sm mb-1">Cover Art</label>
          <input name="img" type="file" accept="image/*" required className="w-full" />
        </div>
        <div>
          <label className="block text-sm mb-1">Music File (MP3 only)</label>
          <input name="track" type="file" accept=".mp3" required className="w-full" />
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded">Upload Music</button>
      </form>
    </div>
  );
}
