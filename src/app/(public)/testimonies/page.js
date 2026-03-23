"use client";
import { useState, useEffect } from "react";

export default function TestimoniesPage() {
  const [testimonies, setTestimonies] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", testimony: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/testimonies").then((r) => r.json()).then((d) => setTestimonies(d.testimonies || []));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    const res = await fetch("/api/testimonies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setMsg(data.message);
      setForm({ name: "", email: "", testimony: "" });
    } else {
      setMsg(data.error || "Something went wrong");
    }
  };

  return (
    <>
      <div
        className="pt-32 pb-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a1128 0%, #1a237e 100%)" }}
      >
        <span className="text-white/60 uppercase tracking-[0.2em] text-sm">Praise Reports</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">Testimonies</h1>
        <p className="text-white/60 mt-3 max-w-xl mx-auto">
          See what God is doing in the lives of His people
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Submit Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold mb-1">Share Your Testimony</h2>
            <p className="text-gray-400 text-sm mb-6">Tell us what God has done for you</p>
            {msg && (
              <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm mb-4">{msg}</div>
            )}
            <form onSubmit={submit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#1a237e] outline-none"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#1a237e] outline-none"
                required
              />
              <textarea
                placeholder="Your Testimony..."
                value={form.testimony}
                onChange={(e) => setForm({ ...form, testimony: e.target.value })}
                rows={5}
                className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#1a237e] outline-none resize-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-blue text-sm w-full disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Testimony"}
              </button>
            </form>
          </div>
        </div>

        {/* Approved Testimonies */}
        {testimonies.length > 0 && (
          <>
            <div className="text-center mb-10">
              <span className="purple-text">What God Has Done</span>
              <h2 className="section-title mt-2">Approved Testimonies</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonies.map((t) => (
                <div key={t.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#1a237e]/10 flex items-center justify-center">
                      <i className="fas fa-user text-[#1a237e]" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{t.name}</p>
                      <p className="text-gray-400 text-xs">
                        {new Date(t.createdAt).toLocaleDateString("en-US", {
                          year: "numeric", month: "short", day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{t.testimony}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {testimonies.length === 0 && (
          <p className="text-center text-gray-400">No testimonies yet. Be the first to share!</p>
        )}
      </div>
    </>
  );
}
