import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function MusicPage({ searchParams }) {
  const search = searchParams?.search || "";
  const page = parseInt(searchParams?.page || "1");
  const perPage = 12;
  const where = search
    ? { OR: [{ title: { contains: search } }, { desc: { contains: search } }] }
    : {};
  const [musics, total] = await Promise.all([
    prisma.music.findMany({ where, orderBy: { id: "desc" }, skip: (page - 1) * perPage, take: perPage }),
    prisma.music.count({ where }),
  ]);
  const pages = Math.ceil(total / perPage);

  return (
    <>
      <div
        className="pt-32 pb-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a1128 0%, #1a237e 100%)" }}
      >
        <span className="text-white/60 uppercase tracking-[0.2em] text-sm">Worship</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">Our Music</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <form className="max-w-lg mx-auto mb-10 flex gap-2">
          <input
            name="search"
            defaultValue={search}
            placeholder="Search music..."
            className="flex-1 border border-gray-200 p-3.5 rounded-full text-sm focus:ring-2 focus:ring-[#1a237e] outline-none"
          />
          <button className="btn-blue text-sm">Search</button>
        </form>

        <div className="grid md:grid-cols-4 gap-6">
          {musics.map((m) => (
            <Link key={m.id} href={`/our-music/${m.slug}`} className="messages-link group">
              <div className="card-hover bg-white">
                <div className="overflow-hidden relative">
                  <img
                    src={`/uploads/music-cover-arts/${m.img}`}
                    alt={m.title}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <i className="fas fa-play text-[#1a237e] ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-sm mb-1">{m.title}</h3>
                  <p className="text-xs text-gray-400">
                    {m.desc.length > 50 ? m.desc.slice(0, 50) + "..." : m.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {musics.length === 0 && (
          <p className="text-center text-gray-400 mt-8">No music found.</p>
        )}

        {pages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: pages }, (_, i) => (
              <Link
                key={i}
                href={`/our-music?page=${i + 1}${search ? `&search=${search}` : ""}`}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition ${
                  page === i + 1 ? "bg-[#1a237e] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
