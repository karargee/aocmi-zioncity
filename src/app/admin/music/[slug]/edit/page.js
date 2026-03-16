"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditMusic() {
  const { slug } = useParams();
  const [music, setMusic] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/music/${slug}`).then((r) => r.json()).then(setMusic);
  }, [slug]);

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const res = await fetch(`/api/music/${slug}`, { method: "PATCH", body: fd });
    if (res.ok) router.push("/admin/music");
    else setError((await res.json()).error || "Failed to update");
  }

  if (!music) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Edit Music</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">
        <input name="title" defaultValue={music.title} required className="w-full border p-3 rounded" />
        <input name="desc" defaultValue={music.desc} required className="w-full border p-3 rounded" />
        <div>
          <label className="block text-sm mb-1">Cover Art</label>
          <input name="img" type="file" accept="image/*" className="w-full" />
          <p className="text-xs text-gray-400 mt-1">Leave empty to keep current</p>
        </div>
        <div>
          <label className="block text-sm mb-1">Music File (MP3)</label>
          <input name="track" type="file" accept=".mp3" className="w-full" />
          <p className="text-xs text-gray-400 mt-1">Leave empty to keep current</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded">Update Music</button>
      </form>
    </div>
  );
}
