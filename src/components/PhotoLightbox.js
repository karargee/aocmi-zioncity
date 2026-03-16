"use client";
import { useState, useEffect } from "react";

export default function PhotoLightbox({ images }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && setActive(null);
    if (active !== null) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [active]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {images.map((src, i) => (
          <div key={i} className="overflow-hidden rounded-xl group cursor-pointer" onClick={() => setActive(i)}>
            <img
              src={src}
              alt={`Church moment ${i + 1}`}
              className="w-full h-36 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      {active !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setActive(null)}>
          <button className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300" onClick={() => setActive(null)}>&times;</button>
          <button className="absolute left-4 text-white text-3xl hover:text-gray-300 px-2" onClick={(e) => { e.stopPropagation(); setActive((active - 1 + images.length) % images.length); }}>&lsaquo;</button>
          <img
            src={images[active]}
            alt={`Church moment ${active + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="absolute right-4 text-white text-3xl hover:text-gray-300 px-2" onClick={(e) => { e.stopPropagation(); setActive((active + 1) % images.length); }}>&rsaquo;</button>
        </div>
      )}
    </>
  );
}
