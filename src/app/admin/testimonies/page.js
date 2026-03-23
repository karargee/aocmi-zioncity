"use client";
import { useState, useEffect } from "react";

export default function AdminTestimoniesPage() {
  const [testimonies, setTestimonies] = useState([]);
  const [filter, setFilter] = useState("pending");

  const load = () => {
    fetch("/api/admin/testimonies").then((r) => r.json()).then((d) => setTestimonies(d.testimonies || []));
  };

  useEffect(load, []);

  const toggle = async (id, approved) => {
    await fetch("/api/admin/testimonies", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approved }),
    });
    load();
  };

  const remove = async (id) => {
    if (!confirm("Delete this testimony?")) return;
    await fetch("/api/admin/testimonies", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const filtered = testimonies.filter((t) =>
    filter === "pending" ? !t.approved : t.approved
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Testimonies</h1>

      <div className="flex gap-2 mb-6">
        {["pending", "approved"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm capitalize font-medium transition ${
              filter === f ? "bg-[#1a237e] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f} ({testimonies.filter((t) => (f === "pending" ? !t.approved : t.approved)).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-400 text-center py-8">No {filter} testimonies</p>
      )}

      <div className="space-y-4">
        {filtered.map((t) => (
          <div key={t.id} className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-bold">{t.name}</p>
                <p className="text-gray-400 text-xs">{t.email} · {new Date(t.createdAt).toLocaleDateString()}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${t.approved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                {t.approved ? "Approved" : "Pending"}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">{t.testimony}</p>
            <div className="flex gap-2">
              {!t.approved ? (
                <button onClick={() => toggle(t.id, true)} className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-green-700">
                  Approve
                </button>
              ) : (
                <button onClick={() => toggle(t.id, false)} className="bg-yellow-500 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-yellow-600">
                  Unapprove
                </button>
              )}
              <button onClick={() => remove(t.id)} className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
