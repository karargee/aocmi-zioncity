"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/our-messages", label: "Messages" },
  { href: "/givings", label: "Givings" },
  { href: "/events", label: "Events" },
  { href: "/healing-school", label: "Healing School" },
  { href: "/store", label: "Store" },
  { href: "/about-us", label: "About Us" },
];

const socials = [
  { href: "https://youtube.com/@aocmizioncity", icon: "fa-youtube" },
  { href: "https://www.facebook.com/aocmizioncity", icon: "fa-facebook" },
  { href: "https://instagram.com/aocmizioncity", icon: "fa-instagram" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a1128]/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <Image src="/img/logo.png" alt="AOCMI" width={48} height={48} className="h-10 md:h-12 w-auto" />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[11px] uppercase tracking-wider font-medium transition-colors hover:text-white ${
                pathname === l.href ? "text-white" : "text-white/70"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.icon}
              href={s.href}
              target="_blank"
              className="text-white/60 hover:text-white transition-colors text-sm"
            >
              <i className={`fab ${s.icon}`} />
            </a>
          ))}
        </div>

        <button className="lg:hidden text-white text-xl p-2" onClick={() => setOpen(!open)}>
          <i className={`fas ${open ? "fa-times" : "fa-bars"}`} />
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#0a1128] border-t border-white/10 mt-2">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`block py-2.5 px-3 rounded-lg text-sm transition-colors ${
                  pathname === l.href
                    ? "bg-white/10 text-white font-semibold"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-3">
              {socials.map((s) => (
                <a key={s.icon} href={s.href} target="_blank" className="text-white/60 hover:text-white p-2">
                  <i className={`fab ${s.icon}`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
