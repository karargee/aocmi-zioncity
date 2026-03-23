"use client";
import { useState, useEffect } from "react";

function getNextSunday9AM() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const wat = new Date(utc + 3600000); // WAT = UTC+1
  const target = new Date(wat);
  target.setHours(9, 0, 0, 0);
  const day = wat.getDay();
  const daysUntilSunday = day === 0 && wat < target ? 0 : (7 - day) % 7 || 7;
  if (day === 0 && wat < target) {
    // today is Sunday and before 9AM
  } else {
    target.setDate(target.getDate() + daysUntilSunday);
  }
  // Convert back to local
  const targetUTC = target.getTime() - 3600000;
  const targetLocal = new Date(targetUTC - now.getTimezoneOffset() * 60000);
  return targetLocal;
}

export default function LiveCountdown() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, getNextSunday9AM() - new Date());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  const units = [
    { label: "Days", value: time.d },
    { label: "Hours", value: time.h },
    { label: "Minutes", value: time.m },
    { label: "Seconds", value: time.s },
  ];

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <span className="purple-text text-xs">Next Sunday Service</span>
        <h3 className="text-lg font-bold mt-1 mb-5">Service Starts In</h3>
        <div className="flex justify-center gap-3 md:gap-5">
          {units.map((u) => (
            <div key={u.label} className="bg-white rounded-xl shadow-sm p-3 md:p-4 min-w-[70px]">
              <p className="text-2xl md:text-3xl font-bold text-[#1a237e] tabular-nums">
                {String(u.value).padStart(2, "0")}
              </p>
              <p className="text-gray-400 text-[10px] uppercase tracking-wider mt-1">{u.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
