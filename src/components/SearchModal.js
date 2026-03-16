"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const typeIcons = {
  message: "fa-book-bible",
  event: "fa-calendar",
  music: "fa-music",
  devotional: "fa-feather",
};

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const t = setTimeout(async () => {
      setLoading(true);
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 p-4 border-b dark:border-gray-700">
          <i className="fas fa-search text-gray-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search messages, events, music..."
            className="flex-1 outline-none text-sm bg-transparent dark:text-white"
          />
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xs">
            ESC
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {loading && <p className="p-4 text-center text-gray-400 text-sm">Searching...</p>}
          {!loading && query && results.length === 0 && (
            <p className="p-4 text-center text-gray-400 text-sm">No results found</p>
          )}
          {results.map((r, i) => (
            <Link
              key={i}
              href={r.href}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <div className="w-8 h-8 rounded-full bg-[#1a237e]/10 flex items-center justify-center shrink-0">
                <i className={`fas ${typeIcons[r.type]} text-[#1a237e] text-xs`} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate dark:text-white">{r.title}</p>
                <p className="text-xs text-gray-400 capitalize">{r.type}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
