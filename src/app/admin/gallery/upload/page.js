"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UploadGalleryPhoto() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.target);
    const res = await fetch("/api/gallery", { method: "POST", body: fd });
    setLoading(false);
    if (res.ok) {
      toast.success("Photo uploaded!");
      router.push("/admin/gallery");
    } else {
      toast.error("Failed to upload photo");
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Upload Photo</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">
        <input name="title" placeholder="Photo Title" required className="w-full border p-3 rounded" />
        <select name="category" className="w-full border p-3 rounded">
          <option value="general">General</option>
          <option value="sunday-service">Sunday Service</option>
          <option value="events">Events</option>
          <option value="outreach">Outreach</option>
          <option value="youth">Youth</option>
          <option value="choir">Choir</option>
        </select>
        <div>
          <label className="block text-sm mb-1">Photo</label>
          <input name="img" type="file" accept="image/*" required className="w-full" />
        </div>
        <button disabled={loading} className="bg-primary text-white px-6 py-3 rounded disabled:opacity-50">
          {loading ? "Uploading..." : "Upload Photo"}
        </button>
      </form>
    </div>
  );
}
