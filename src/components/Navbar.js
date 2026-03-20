"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SearchModal from "./SearchModal";

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About" },
  { href: "/president", label: "Our Dear Man of God" },
  { href: "/our-messages", label: "Messages" },
  { href: "/events", label: "Events" },
  { href: "/our-music", label: "Music" },
  { href: "/store", label: "Store" },
];

const moreLinks = [
  { href: "/givings", label: "Givings" },
  { href: "/healing-school", label: "Healing School" },
  { href: "/prayer-request", label: "Prayer Request" },
  { href: "/devotionals", label: "Apokalupsis" },
  { href: "/live", label: "Watch Live" },
];

const socials = [
  { href: "https://youtube.com/@aocmizioncity", icon: "fa-youtube" },
  { href: "https://instagram.com/aocmizioncity", icon: "fa-instagram" },
  { href: "https://www.facebook.com/aocmizioncity", icon: "fa-facebook" },
  { href: "https://twitter.com/aocmizioncity", icon: "fa-twitter" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setSearchOpen(true); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a1128]/95 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image src="/img/logo.png" alt="AOCMI" width={64} height={64} className="h-14 md:h-16 w-auto" />
            <div className="hidden sm:block">
              <p className="text-white font-bold text-base leading-tight">AOCMI</p>
              <p className="text-white/60 text-xs leading-tight">Zion City</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {mainLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link-item ${pathname === l.href ? "text-white after:w-full" : ""}`}
              >
                {l.label}
              </Link>
            ))}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="nav-link-item flex items-center gap-1"
              >
                More <i className={`fas fa-chevron-down text-[10px] transition-transform ${moreOpen ? "rotate-180" : ""}`} />
              </button>
              {moreOpen && (
                <>
                  <div className="fixed inset-0" onClick={() => setMoreOpen(false)} />
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl py-2 min-w-[200px] border">
                    {moreLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#1a237e]/5 hover:text-[#1a237e] transition-colors"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-white/60 hover:text-white p-1.5 transition-colors text-sm"
              title="Search (Ctrl+K)"
            >
              <i className="fas fa-search" />
            </button>
            <div className="flex gap-1">
              {socials.map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  className="text-white/60 hover:text-white p-1.5 transition-colors text-sm"
                >
                  <i className={`fab ${s.icon}`} />
                </a>
              ))}
            </div>
            <Link
              href="/live"
              className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-red-700 transition"
            >
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              LIVE
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button onClick={() => setSearchOpen(true)} className="text-white text-lg p-2">
              <i className="fas fa-search" />
            </button>
            <button className="text-white text-xl p-2" onClick={() => setOpen(!open)}>
              <i className={`fas ${open ? "fa-times" : "fa-bars"}`} />
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden bg-[#0a1128] border-t border-white/10 mt-2">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {[...mainLinks, ...moreLinks].map((l) => (
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
              <div className="flex items-center gap-3 pt-4 border-t border-white/10 mt-3">
                {socials.map((s) => (
                  <a key={s.icon} href={s.href} target="_blank" className="text-white/60 hover:text-white p-2">
                    <i className={`fab ${s.icon}`} />
                  </a>
                ))}
                <Link
                  href="/live"
                  className="ml-auto bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  LIVE
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
