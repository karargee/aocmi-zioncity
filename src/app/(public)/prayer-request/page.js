"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PrayerRequestPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.target);
    const res = await fetch("/api/prayer-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(fd)),
    });
    setLoading(false);
    if (res.ok) {
      toast.success("Your prayer request has been submitted. We are praying with you!");
      e.target.reset();
    } else toast.error("Something went wrong. Please try again.");
  }

  return (
    <>
      <div
        className="pt-32 pb-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a1128 0%, #1a237e 100%)" }}
      >
        <span className="text-white/60 uppercase tracking-[0.2em] text-sm">We&apos;re Praying With You</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">Prayer Request</h1>
        <p className="text-white/60 mt-4 max-w-xl mx-auto text-sm">
          &ldquo;The prayer of a righteous person is powerful and effective.&rdquo; — James 5:16
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <p className="text-center text-gray-500 mb-8 leading-relaxed">
          Share your prayer request with us. Our prayer team will intercede on your behalf.
          All requests are kept confidential.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-2xl shadow-md">
          <input name="fullname" placeholder="Your Full Name" required className="w-full border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
          <div className="grid md:grid-cols-2 gap-4">
            <input name="email" type="email" placeholder="Email" required className="border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
            <input name="phone" placeholder="Phone (optional)" className="border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
          </div>
          <textarea name="request" placeholder="Share your prayer request..." required rows={6} className="w-full border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
          <button disabled={loading} className="w-full btn-blue disabled:opacity-50">
            {loading ? "Submitting..." : "Submit Prayer Request"}
          </button>
        </form>
      </div>
    </>
  );
}
