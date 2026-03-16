"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditEvent() {
  const { slug } = useParams();
  const [evt, setEvt] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/events/${slug}`).then((r) => r.json()).then(setEvt);
  }, [slug]);

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const res = await fetch(`/api/events/${slug}`, { method: "POST", body: fd });
    if (res.ok) router.push("/admin/events");
    else setError((await res.json()).error || "Failed to update");
  }

  if (!evt) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Edit Event</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">
        <input name="title" defaultValue={evt.title} required className="w-full border p-3 rounded" />
        <textarea name="desc" defaultValue={evt.description} required rows={4} className="w-full border p-3 rounded" />
        <input name="date_of_event" type="date" defaultValue={evt.dateOfEvent} required className="w-full border p-3 rounded" />
        <div>
          <label className="block text-sm mb-1">Event Image</label>
          <input name="img" type="file" accept="image/*" className="w-full" />
          <p className="text-xs text-gray-400 mt-1">Leave empty to keep current image</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded">Update Event</button>
      </form>
    </div>
  );
}
