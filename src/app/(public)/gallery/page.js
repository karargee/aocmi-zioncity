"use client";
import { useState, useEffect } from "react";

export default function GalleryPage() {
  const [photos, setPhotos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("/api/gallery").then((r) => r.json()).then((d) => setPhotos(d.photos || []));
  }, []);

  const categories = ["all", ...new Set(photos.map((p) => p.category))];
  const filtered = filter === "all" ? photos : photos.filter((p) => p.category === filter);

  return (
    <>
      <div
        className="pt-32 pb-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a1128 0%, #1a237e 100%)" }}
      >
        <span className="text-white/60 uppercase tracking-[0.2em] text-sm">Memories</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">Photo Gallery</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-5 py-2 rounded-full text-sm capitalize font-medium transition ${
                filter === c
                  ? "bg-[#1a237e] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition group"
              onClick={() => setSelected(p)}
            >
              <img
                src={`/uploads/gallery/${p.img}`}
                alt={p.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <p className="p-3 text-sm font-medium text-center bg-white">{p.title}</p>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 mt-8">No photos yet.</p>
        )}

        {selected && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-white text-3xl hover:opacity-80 z-10"
            >
              <i className="fas fa-times" />
            </button>
            <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <img
                src={`/uploads/gallery/${selected.img}`}
                alt={selected.title}
                className="w-full rounded-xl"
              />
              <p className="text-white text-center mt-4 text-lg font-medium">{selected.title}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
