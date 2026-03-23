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
    <section ref={ref} className="py-12 text-center px-4 overflow-hidden">
      <div className="max-w-2xl mx-auto">
        <span
          className={`purple-text text-xs transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          Our Mission
        </span>
        <h2
          className={`text-xl md:text-2xl font-bold mt-1 mb-3 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          Join Our Faith Journey
        </h2>
        <p
          className={`text-gray-500 text-sm leading-relaxed max-w-lg mx-auto transition-all duration-700 delay-[400ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          A journey and experience devoted to and aimed at expository preaching
          and teaching of God&apos;s word. We believe spiritual development must be an
          enjoyable and practical experience to be truly fulfilling.
        </p>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`p-4 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-700 cursor-default ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90"}`}
              style={{ transitionDelay: visible ? `${600 + i * 200}ms` : "0ms" }}
            >
              <div
                className={`w-10 h-10 rounded-full bg-[#1a237e]/10 flex items-center justify-center mx-auto mb-3 transition-all duration-500 ${visible ? "rotate-0 scale-100" : "rotate-45 scale-0"}`}
                style={{ transitionDelay: visible ? `${800 + i * 200}ms` : "0ms" }}
              >
                <i className={`fas ${item.icon} text-[#1a237e] text-sm`} />
              </div>
              <h3 className="font-bold text-sm mb-1">{item.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
