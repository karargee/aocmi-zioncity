"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState([]);
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetch("/api/announcements/active")
      .then((r) => r.json())
      .then((d) => {
        if (d.announcement) setAnnouncements([d.announcement]);
        if (d.announcements) setAnnouncements(d.announcements);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (announcements.length <= 1) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % announcements.length), 4000);
    return () => clearInterval(t);
  }, [announcements]);

  if (!announcements.length || dismissed) return null;

  const a = announcements[current];

  return (
    <div className="bg-gradient-to-r from-[#1a237e] to-[#4a148c] text-white text-center text-xs py-2 px-4 relative z-[60]">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 overflow-hidden">
        <i className="fas fa-bullhorn text-[10px] animate-pulse" />
        <div className="relative h-5 flex items-center overflow-hidden">
          <span
            key={current}
            className="animate-slide-in-up whitespace-nowrap"
          >
            {a.text}
            {a.link && (
              <Link href={a.link} className="underline font-semibold hover:text-white/80 ml-2">
                Learn More →
              </Link>
            )}
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
        >
          <i className="fas fa-times text-[10px]" />
        </button>
      </div>
    </div>
  );
}
