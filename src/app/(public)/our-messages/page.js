import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function MessagesPage({ searchParams }) {
  const search = searchParams?.search || "";
  const page = parseInt(searchParams?.page || "1");
  const perPage = 12;
  const where = search
    ? { OR: [{ title: { contains: search } }, { description: { contains: search } }] }
    : {};
  const [messages, total] = await Promise.all([
    prisma.message.findMany({ where, orderBy: { id: "desc" }, skip: (page - 1) * perPage, take: perPage }),
    prisma.message.count({ where }),
  ]);
  const pages = Math.ceil(total / perPage);

  return (
    <>
      <div
        className="pt-32 pb-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a1128 0%, #1a237e 100%)" }}
      >
        <span className="text-white/60 uppercase tracking-[0.2em] text-sm">Listen & Learn</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">Our Messages</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <form className="max-w-lg mx-auto mb-10 flex gap-2">
          <input
            name="search"
            defaultValue={search}
            placeholder="Search messages..."
            className="flex-1 border border-gray-200 p-3.5 rounded-full text-sm focus:ring-2 focus:ring-[#1a237e] outline-none"
          />
          <button className="btn-blue text-sm">Search</button>
        </form>

        <div className="grid md:grid-cols-4 gap-6">
          {messages.map((m) => (
            <Link key={m.id} href={`/our-messages/${m.slug}`} className="messages-link group">
              <div className="card-hover bg-white">
                <div className="overflow-hidden">
                  <img
                    src={`/uploads/messages/${m.image}`}
                    alt={m.title}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-sm mb-2">
                    {m.title.length > 30 ? m.title.slice(0, 30) + "..." : m.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-3">
                    {new Date(m.createdAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "short", day: "numeric",
                    })}
                  </p>
                  <span className="text-[#1a237e] text-xs font-semibold group-hover:underline">
                    Listen Now →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {messages.length === 0 && (
          <p className="text-center text-gray-400 mt-8">No messages found.</p>
        )}

        {pages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: pages }, (_, i) => (
              <Link
                key={i}
                href={`/our-messages?page=${i + 1}${search ? `&search=${search}` : ""}`}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition ${
                  page === i + 1
                    ? "bg-[#1a237e] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
