"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteButton({ url }) {
  const router = useRouter();
  async function handleDelete() {
    if (!confirm("Are you sure?")) return;
    await fetch(url, { method: "DELETE" });
    toast.success("Deleted successfully");
    router.refresh();
  }
  return (
    <button onClick={handleDelete} className="text-red-600">
      Delete
    </button>
  );
}
