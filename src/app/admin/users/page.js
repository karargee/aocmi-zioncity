"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState([]);
  const [count, setCount] = useState(0);

  function load() {
    fetch("/api/users").then((r) => r.json()).then((d) => {
      setAdmins(d.admins || []);
      setCount(d.count || 0);
    });
  }

  useEffect(load, []);

  async function handleAction(id, action) {
    if (action === "delete" && !confirm("Are you sure?")) return;
    if (action === "delete") {
      await fetch(`/api/users/${id}`, { method: "DELETE" });
    } else {
      await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
    }
    load();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admins ({count})</h2>
        <Link href="/admin/users/create" className="bg-primary text-white px-4 py-2 rounded">
          Add Admin
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-3">{a.name}</td>
                <td className="p-3">{a.email}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${a.suspended ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                    {a.suspended ? "Suspended" : "Active"}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  {a.suspended ? (
                    <button onClick={() => handleAction(a.id, "unsuspend")} className="text-green-600 text-xs">Unsuspend</button>
                  ) : (
                    <button onClick={() => handleAction(a.id, "suspend")} className="text-yellow-600 text-xs">Suspend</button>
                  )}
                  <button onClick={() => handleAction(a.id, "delete")} className="text-red-600 text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {admins.length === 0 && <p className="p-4 text-gray-400">No admins yet.</p>}
      </div>
    </div>
  );
}
