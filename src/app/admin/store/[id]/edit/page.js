"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditStoreItem() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/store`).then((r) => r.json()).then((data) => {
      setItem(data.stores.find((s) => s.id === parseInt(id)));
    });
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const res = await fetch(`/api/store/${id}`, { method: "POST", body: fd });
    if (res.ok) router.push("/admin/store");
    else setError((await res.json()).error || "Failed to update");
  }

  if (!item) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Edit Store Item</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">
        <input name="title" defaultValue={item.title} required className="w-full border p-3 rounded" />
        <input name="link" defaultValue={item.linkToResource} required className="w-full border p-3 rounded" />
        <div>
          <label className="block text-sm mb-1">Image</label>
          <input name="img" type="file" accept="image/*" className="w-full" />
          <p className="text-xs text-gray-400 mt-1">Leave empty to keep current</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded">Update Item</button>
      </form>
    </div>
  );
}
