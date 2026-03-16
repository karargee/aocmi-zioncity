"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: "fa-tv" },
  { href: "/admin/salvation-entries", label: "All Salvation Entries", icon: "fa-envelope" },
  { href: "/admin/healing-school", label: "Healing School", icon: "fa-envelope" },
  { href: "/admin/messages", label: "Messages", icon: "fa-music" },
  { href: "/admin/sermon-series", label: "Sermon Series", icon: "fa-layer-group" },
  { href: "/admin/events", label: "Events", icon: "fa-calendar" },
  { href: "/admin/store", label: "Store", icon: "fa-book" },
  { href: "/admin/music", label: "Music", icon: "fa-music" },
  { href: "/admin/word-of-the-year", label: "Word of the Year", icon: "fa-music" },
  { href: "/admin/workers", label: "Workers", icon: "fa-user" },
  { href: "/admin/change-password", label: "Update Password", icon: "fa-lock" },
  { href: "/admin/gallery", label: "Gallery", icon: "fa-images" },
  { href: "/admin/prayer-requests", label: "Prayer Requests", icon: "fa-pray" },
  { href: "/admin/newsletter", label: "Newsletter", icon: "fa-envelope-open" },
];

const superAdminLinks = [
  { href: "/admin/users", label: "Users", icon: "fa-user" },
];

export default function AdminSidebar({ children }) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-primary text-white p-4 flex justify-between items-center md:hidden">
        <span className="font-bold">AOCMI Admin</span>
        <button onClick={() => setOpen(!open)}>
          <i className="fas fa-bars text-xl" />
        </button>
      </div>
      <div className="flex">
        <aside
          className={`${
            open ? "block" : "hidden"
          } md:block w-64 bg-white min-h-screen shadow-lg fixed md:static z-50`}
        >
          <div className="p-4 text-center border-b">
            <img src="/img/logo.png" alt="Aocmi" className="h-12 mx-auto" />
          </div>
          <nav className="p-4 space-y-1">
            {session?.user?.isSuperAdmin &&
              superAdminLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 text-sm"
                >
                  <i className={`fas ${l.icon} text-yellow-500 w-5`} />
                  {l.label}
                </Link>
              ))}
            {adminLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 text-sm"
              >
                <i className={`fas ${l.icon} text-yellow-500 w-5`} />
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 text-sm w-full text-red-500"
            >
              <i className="fas fa-power-off w-5" />
              Logout
            </button>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          {session && (
            <div className="bg-primary text-white p-4 rounded-lg mb-6">
              <h6 className="font-bold">Welcome, {session.user.name}</h6>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
