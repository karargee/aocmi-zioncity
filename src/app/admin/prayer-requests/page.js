"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminPrayerRequests() {
  const [requests, setRequests] = useState([]);
  const [unread, setUnread] = useState(0);

  function load() {
    fetch("/api/prayer-request")
      .then((r) => r.json())
      .then((d) => {
        setRequests(d.requests || []);
        setUnread(d.unreadCount || 0);
      });
  }

  useEffect(load, []);

  async function markRead(id) {
    await fetch(`/api/prayer-request/${id}`, { method: "PATCH" });
    toast.success("Marked as read");
    load();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this prayer request?")) return;
    await fetch(`/api/prayer-request/${id}`, { method: "DELETE" });
    toast.success("Deleted");
    load();
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold">Prayer Requests</h2>
        {unread > 0 && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {unread} new
          </span>
        )}
      </div>
      <div className="space-y-4">
        {requests.map((r) => (
          <div
            key={r.id}
            className={`bg-white p-4 rounded-lg shadow ${!r.isRead ? "border-l-4 border-primary" : ""}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{r.fullname}</h3>
                <p className="text-sm text-gray-500">{r.email} {r.phone && `• ${r.phone}`}</p>
                <p className="text-sm text-gray-400">{new Date(r.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                {!r.isRead && (
                  <button onClick={() => markRead(r.id)} className="text-blue-600 text-xs">
                    Mark Read
                  </button>
                )}
                <button onClick={() => handleDelete(r.id)} className="text-red-500 text-xs">
                  Delete
                </button>
              </div>
            </div>
            <p className="mt-3 text-gray-700 bg-gray-50 p-3 rounded">{r.request}</p>
          </div>
        ))}
      </div>
      {requests.length === 0 && <p className="text-gray-400 mt-4">No prayer requests yet.</p>}
    </div>
  );
}
