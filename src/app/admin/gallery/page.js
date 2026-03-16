"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminGallery() {
  const [photos, setPhotos] = useState([]);

  function load() {
    fetch("/api/gallery").then((r) => r.json()).then((d) => setPhotos(d.photos || []));
  }

  useEffect(load, []);

  async function handleDelete(id) {
    if (!confirm("Delete this photo?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    toast.success("Photo deleted");
    load();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gallery ({photos.length})</h2>
        <Link href="/admin/gallery/upload" className="bg-primary text-white px-4 py-2 rounded">
          Upload Photos
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((p) => (
          <div key={p.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img src={`/uploads/gallery/${p.img}`} alt={p.title} className="w-full h-32 object-cover" />
            <div className="p-2">
              <p className="text-sm font-medium truncate">{p.title}</p>
              <p className="text-xs text-gray-400">{p.category}</p>
              <button onClick={() => handleDelete(p.id)} className="text-red-500 text-xs mt-1">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {photos.length === 0 && <p className="text-gray-400 mt-4">No photos uploaded yet.</p>}
    </div>
  );
}
