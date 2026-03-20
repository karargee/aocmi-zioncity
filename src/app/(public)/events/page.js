import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function EventsPage({ searchParams }) {
  const search = searchParams?.search || "";
  const page = parseInt(searchParams?.page || "1");
  const perPage = 12;
  const where = search
    ? { OR: [{ title: { contains: search } }, { description: { contains: search } }, { dateOfEvent: { contains: search } }] }
    : {};
  const [events, total] = await Promise.all([
    prisma.event.findMany({ where, orderBy: { id: "desc" }, skip: (page - 1) * perPage, take: perPage }),
    prisma.event.count({ where }),
  ]);
  const pages = Math.ceil(total / perPage);

  return (
    <>
      <div
        className="pt-32 pb-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a1128 0%, #1a237e 100%)" }}
      >
        <span className="text-white/60 uppercase tracking-[0.2em] text-sm">Upcoming & Past</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">Events</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Event Videos */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <span className="purple-text">Watch</span>
            <h2 className="section-title mt-2">Event Highlights</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div>
              <video src="/videos/video_2026-03-16_21-49-23.mp4" controls loop playsInline className="rounded-2xl w-full shadow-xl" />
              <p className="text-center text-sm font-semibold mt-3">Afro Gospel Sunday</p>
            </div>
            <div>
              <video src="/videos/video_2026-03-16_21-55-50.mp4" controls loop playsInline className="rounded-2xl w-full shadow-xl" />
              <p className="text-center text-sm font-semibold mt-3">PPS Teachings</p>
            </div>
          </div>
        </div>

        <form className="max-w-lg mx-auto mb-10 flex gap-2">
          <input
            name="search"
            defaultValue={search}
            placeholder="Search events..."
            className="flex-1 border border-gray-200 p-3.5 rounded-full text-sm focus:ring-2 focus:ring-[#1a237e] outline-none"
          />
          <button className="btn-blue text-sm">Search</button>
        </form>

        <div className="grid md:grid-cols-3 gap-6">
          {events.map((e) => (
            <Link key={e.id} href={`/events/${e.slug}`} className="messages-link group">
              <div className="card-hover bg-white">
                <div className="overflow-hidden relative">
                  <img
                    src={`/uploads/events/${e.image}`}
                    alt={e.title}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#1a237e]">
                    {e.dateOfEvent}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold mb-2">{e.title}</h3>
                  <span className="text-[#1a237e] text-xs font-semibold group-hover:underline">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {events.length === 0 && (
          <p className="text-center text-gray-400 mt-8">No events found.</p>
        )}

        {pages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: pages }, (_, i) => (
              <Link
                key={i}
                href={`/events?page=${i + 1}${search ? `&search=${search}` : ""}`}
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
