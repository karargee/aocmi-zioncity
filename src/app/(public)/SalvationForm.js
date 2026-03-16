"use client";
import toast from "react-hot-toast";

export default function SalvationForm() {
  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(fd)),
    });
    if (res.ok) {
      toast.success("Thank you! Your details have been submitted.");
      e.target.reset();
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
      <input
        name="fullname"
        placeholder="Full Name"
        required
        className="w-full p-3.5 rounded-xl text-gray-800 bg-white/90 backdrop-blur-sm border-0 focus:ring-2 focus:ring-purple-400 outline-none"
      />
      <div className="grid md:grid-cols-3 gap-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="p-3.5 rounded-xl text-gray-800 bg-white/90 backdrop-blur-sm border-0 focus:ring-2 focus:ring-purple-400 outline-none"
        />
        <input
          name="phone"
          placeholder="Phone Number"
          required
          className="p-3.5 rounded-xl text-gray-800 bg-white/90 backdrop-blur-sm border-0 focus:ring-2 focus:ring-purple-400 outline-none"
        />
        <input
          name="location"
          placeholder="Location"
          required
          className="p-3.5 rounded-xl text-gray-800 bg-white/90 backdrop-blur-sm border-0 focus:ring-2 focus:ring-purple-400 outline-none"
        />
      </div>
      <button className="bg-white text-[#1a237e] font-bold px-10 py-3.5 rounded-full hover:bg-gray-100 transition shadow-lg">
        Submit
      </button>
    </form>
  );
}
