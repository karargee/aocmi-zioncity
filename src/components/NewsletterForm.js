"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      toast.success("Subscribed! Thank you for joining.");
      setEmail("");
    } else {
      const data = await res.json();
      toast.error(data.error || "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 px-4 py-3 rounded-full text-gray-800 text-sm bg-white/90 focus:ring-2 focus:ring-purple-400 outline-none"
      />
      <button className="bg-white text-[#1a237e] px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-100 transition shrink-0">
        Subscribe
      </button>
    </form>
  );
}
