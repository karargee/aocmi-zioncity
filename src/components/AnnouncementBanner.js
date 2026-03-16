"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetch("/api/announcements/active")
      .then((r) => r.json())
      .then((d) => { if (d.announcement) setAnnouncement(d.announcement); })
      .catch(() => {});
  }, []);

  if (!announcement || dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-[#1a237e] to-[#4a148c] text-white text-center text-sm py-2.5 px-4 relative z-[60]">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <i className="fas fa-bullhorn text-xs" />
        <span>{announcement.text}</span>
        {announcement.link && (
          <Link href={announcement.link} className="underline font-semibold hover:text-white/80">
            Learn More
          </Link>
        )}
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
        >
          <i className="fas fa-times text-xs" />
        </button>
      </div>
    </div>
  );
}
