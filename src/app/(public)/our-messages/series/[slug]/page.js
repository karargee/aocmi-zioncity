import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function SeriesPage({ params }) {
  const series = await prisma.sermonSeries.findUnique({
    where: { slug: params.slug },
    include: { messages: { orderBy: { seriesOrder: "asc" } } },
  });
  if (!series) notFound();

  return (
    <>
      <div
        className="pt-32 pb-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a1128 0%, #1a237e 100%)" }}
      >
        <span className="text-white/60 uppercase tracking-[0.2em] text-sm">Sermon Series</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">{series.title}</h1>
        {series.description && <p className="text-white/70 mt-4 max-w-2xl mx-auto">{series.description}</p>}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link href="/our-messages" className="text-[#1a237e] text-sm font-semibold mb-8 inline-block">
          ← Back to All Messages
        </Link>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {series.messages.map((m, i) => (
            <Link key={m.id} href={`/our-messages/${m.slug}`} className="messages-link group">
              <div className="card-hover bg-white">
                <div className="overflow-hidden relative">
                  <img
                    src={`/uploads/messages/${m.image}`}
                    alt={m.title}
                    className="w-full h-32 md:h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-[#1a237e] text-white text-xs px-2 py-1 rounded-full">
                    Part {m.seriesOrder || i + 1}
                  </span>
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

        {series.messages.length === 0 && (
          <p className="text-center text-gray-400 mt-8">No messages in this series yet.</p>
        )}
      </div>
    </>
  );
}
