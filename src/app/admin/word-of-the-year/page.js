"use client";
import { useState, useEffect } from "react";

export default function WordOfTheYearPage() {
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/word-of-the-year").then((r) => r.json()).then(setData);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const res = await fetch("/api/word-of-the-year", { method: "POST", body: fd });
    if (res.ok) setMsg("Word of the year updated!");
    else setMsg("Failed to update.");
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Word of the Year</h2>
      {msg && <p className="text-green-600 font-bold mb-4">{msg}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">
        <input name="title" defaultValue={data?.title || ""} placeholder="Title" required className="w-full border p-3 rounded" />
        <textarea name="description" defaultValue={data?.description || ""} placeholder="Description" required rows={4} className="w-full border p-3 rounded" />
        <div>
          <label className="block text-sm mb-1">Image</label>
          <input name="img" type="file" accept="image/*" required className="w-full" />
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded">Update</button>
      </form>
    </div>
  );
}
