"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditMessage() {
  const { slug } = useParams();
  const [msg, setMsg] = useState(null);
  const [series, setSeries] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/messages/${slug}`).then(r => r.json()).then(setMsg);
    fetch("/api/sermon-series").then(r => r.json()).then(d => setSeries(d.series || []));
  }, [slug]);

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const res = await fetch(`/api/messages/${slug}`, { method: "POST", body: fd });
    if (res.ok) router.push("/admin/messages");
    else setError((await res.json()).error || "Failed to update");
  }

  if (!msg) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Edit Message</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">
        <input name="title" defaultValue={msg.title} required className="w-full border p-3 rounded" />
        <textarea name="desc" defaultValue={msg.description} required rows={4} className="w-full border p-3 rounded" />
        <input name="link" defaultValue={msg.link} required className="w-full border p-3 rounded" />
        <div>
          <label className="block text-sm mb-1">Sermon Series (optional)</label>
          <select name="seriesId" defaultValue={msg.seriesId || ""} className="w-full border p-3 rounded">
            <option value="">— No Series —</option>
            {series.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
          </select>
        </div>
        <input name="seriesOrder" type="number" defaultValue={msg.seriesOrder || ""} placeholder="Order in series (e.g. 1, 2, 3)" className="w-full border p-3 rounded" />
        <div>
          <label className="block text-sm mb-1">Cover Image</label>
          <input name="img" type="file" accept="image/*" className="w-full" />
          <p className="text-xs text-gray-400 mt-1">Leave empty to keep current image</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded">Update Message</button>
      </form>
    </div>
  );
}
