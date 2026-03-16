"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function HealingSchoolPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.target);
    const res = await fetch("/api/healing-school", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(fd)),
    });
    setLoading(false);
    if (res.ok) {
      toast.success("Your form has been submitted successfully!");
      e.target.reset();
    } else toast.error("Something went wrong. Please try again.");
  }

  return (
    <>
      <div
        className="pt-32 pb-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a1128 0%, #1a237e 100%)" }}
      >
        <span className="text-white/60 uppercase tracking-[0.2em] text-sm">Divine Healing</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">Healing School</h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <p className="text-center text-gray-500 mb-8 leading-relaxed">
          Jesus Christ is the same yesterday, today, and forever. Share your need
          with us and believe God for your miracle. All submissions are kept confidential.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-2xl shadow-md">
          <input name="fullname" placeholder="Full Name" required className="w-full border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
          <div className="grid md:grid-cols-2 gap-4">
            <input name="email" type="email" placeholder="Email" required className="border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
            <input name="phone" placeholder="Phone" required className="border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input name="state" placeholder="State" required className="border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
            <input name="city" placeholder="City" required className="border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
          </div>
          <input name="problem" placeholder="Problem" required className="w-full border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
          <textarea name="narration" placeholder="Narration" required rows={4} className="w-full border border-gray-200 p-3.5 rounded-xl text-sm focus:ring-2 focus:ring-[#1a237e] outline-none" />
          <button disabled={loading} className="w-full btn-blue disabled:opacity-50">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}
