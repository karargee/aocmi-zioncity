"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateWorker() {
  const [error, setError] = useState("");
  const [units, setUnits] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/church-units").then((r) => r.ok ? r.json() : { units: [] }).then((d) => setUnits(d.units || [])).catch(() => {});
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const res = await fetch("/api/workers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(fd)),
    });
    if (res.ok) router.push("/admin/workers");
    else setError((await res.json()).error || "Failed to create worker");
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Add Worker</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">
        <input name="name" placeholder="Name" required className="w-full border p-3 rounded" />
        <input name="email" type="email" placeholder="Email" required className="w-full border p-3 rounded" />
        <input name="phone" placeholder="Phone" required className="w-full border p-3 rounded" />
        <input name="address" placeholder="Address" required className="w-full border p-3 rounded" />
        {units.length > 0 ? (
          <select name="unit" required className="w-full border p-3 rounded">
            <option value="">Select Unit</option>
            {units.map((u) => <option key={u.id} value={u.name}>{u.name}</option>)}
          </select>
        ) : (
          <input name="unit" placeholder="Unit" required className="w-full border p-3 rounded" />
        )}
        <button className="bg-primary text-white px-6 py-3 rounded">Save Worker</button>
      </form>
    </div>
  );
}
