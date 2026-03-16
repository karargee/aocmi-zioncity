"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminSermonSeries() {
  const [series, setSeries] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);

  const load = () => fetch("/api/sermon-series").then(r => r.json()).then(d => setSeries(d.series || []));
  useEffect(() => { load(); }, []);

  async function handleCreate(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    if (img) fd.append("img", img);
    const res = await fetch("/api/sermon-series", { method: "POST", body: fd });
    if (res.ok) { toast.success("Series created"); setTitle(""); setDescription(""); setImg(null); load(); }
    else toast.error("Failed to create series");
  }

  async function handleDelete(id) {
    if (!confirm("Delete this series?")) return;
    const res = await fetch("/api/sermon-series", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    if (res.ok) { toast.success("Deleted"); load(); }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Sermon Series</h2>
      <form onSubmit={handleCreate} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl mb-8">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Series Title" required className="w-full border p-3 rounded" />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (optional)" rows={3} className="w-full border p-3 rounded" />
        <input type="file" accept="image/*" onChange={e => setImg(e.target.files[0])} className="w-full" />
        <button className="bg-primary text-white px-6 py-3 rounded">Create Series</button>
      </form>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Messages</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {series.map(s => (
              <tr key={s.id} className="border-t">
                <td className="p-3">{s.title}</td>
                <td className="p-3">{s._count?.messages || 0}</td>
                <td className="p-3">
                  <button onClick={() => handleDelete(s.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {series.length === 0 && <p className="p-4 text-gray-400">No series yet.</p>}
      </div>
    </div>
  );
}
