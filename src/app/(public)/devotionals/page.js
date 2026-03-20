import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Devotionals",
  description: "Daily and weekly devotionals from AOCMI Zion City. Be encouraged by the Word of God.",
};

export default async function DevotionalsPage() {
  const devotionals = await prisma.devotional.findMany({
    where: { published: true },
    orderBy: { id: "desc" },
  });

  return (
    <>
      <div
        className="pt-32 pb-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a1128 0%, #1a237e 100%)" }}
      >
        <span className="text-white/60 uppercase tracking-[0.2em] text-sm">Our Celestial Harbinger</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">APOKALUPSIS</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
          <img src="/img/apokalopsis.png" alt="Apokalupsis" className="rounded-2xl w-full shadow-xl" />
          <img src="/img/apokalupsis-account.jpg" alt="Apokalupsis Account" className="rounded-2xl w-full shadow-xl" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {devotionals.map((d) => (
            <Link key={d.id} href={`/devotionals/${d.slug}`} className="messages-link group">
              <div className="card-hover bg-white dark:bg-gray-900">
                {d.image && (
                  <div className="overflow-hidden">
                    <img
                      src={`/uploads/devotionals/${d.image}`}
                      alt={d.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-5">
                  {d.scripture && (
                    <p className="text-xs text-[#7c3aed] font-semibold mb-2">{d.scripture}</p>
                  )}
                  <h3 className="font-bold mb-2">{d.title}</h3>
                  <p className="text-xs text-gray-400">
                    {new Date(d.createdAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {devotionals.length === 0 && (
          <p className="text-center text-gray-400 mt-8">No devotionals yet. Check back soon!</p>
        )}
      </div>
    </>
  );
}
