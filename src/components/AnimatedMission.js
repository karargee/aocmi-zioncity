"use client";
import { useEffect, useRef, useState } from "react";

const items = [
  { icon: "fa-book-bible", title: "Word-Based", desc: "Grounded in expository preaching of scripture" },
  { icon: "fa-hands-praying", title: "Spirit-Led", desc: "Guided by the Holy Spirit in all we do" },
  { icon: "fa-people-group", title: "Community", desc: "Building genuine fellowship and connection" },
];

export default function AnimatedMission() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 text-center px-4">
      <div className="max-w-3xl mx-auto">
        <span className={`purple-text transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          Our Mission
        </span>
        <h2 className={`section-title mt-2 transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          Join Our Faith Journey
        </h2>
        <p className={`section-subtitle transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          A journey and experience devoted to and aimed at expository preaching
          and teaching of God&apos;s word. We believe spiritual development must be an
          enjoyable and practical experience to be truly fulfilling.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-700 ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}
              style={{ transitionDelay: visible ? `${450 + i * 150}ms` : "0ms" }}
            >
              <div className={`w-14 h-14 rounded-full bg-[#1a237e]/10 flex items-center justify-center mx-auto mb-4 transition-transform duration-500 ${visible ? "rotate-0" : "rotate-12"}`}
                style={{ transitionDelay: visible ? `${600 + i * 150}ms` : "0ms" }}
              >
                <i className={`fas ${item.icon} text-[#1a237e] text-xl`} />
              </div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
