"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateMessage() {
  const [error, setError] = useState("");
  const [series, setSeries] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/sermon-series").then(r => r.json()).then(d => setSeries(d.series || []));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const res = await fetch("/api/messages", { method: "POST", body: fd });
    if (res.ok) router.push("/admin/messages");
    else setError((await res.json()).error || "Failed to create message");
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Create Message</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">
        <input name="title" placeholder="Title" required className="w-full border p-3 rounded" />
        <textarea name="desc" placeholder="Description" required rows={4} className="w-full border p-3 rounded" />
        <input name="link" placeholder="Link (e.g. download URL)" required className="w-full border p-3 rounded" />
        <div>
          <label className="block text-sm mb-1">Sermon Series (optional)</label>
          <select name="seriesId" className="w-full border p-3 rounded">
            <option value="">— No Series —</option>
            {series.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
          </select>
        </div>
        <input name="seriesOrder" type="number" placeholder="Order in series (e.g. 1, 2, 3)" className="w-full border p-3 rounded" />
        <div>
          <label className="block text-sm mb-1">Cover Image</label>
          <input name="img" type="file" accept="image/*" required className="w-full" />
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded">Save Message</button>
      </form>
    </div>
  );
}
