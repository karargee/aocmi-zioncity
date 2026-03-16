import { prisma } from "@/lib/prisma";

export default async function StorePage() {
  const stores = await prisma.store.findMany({ orderBy: { id: "desc" } });

  return (
    <>
      <div
        className="pt-32 pb-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a1128 0%, #1a237e 100%)" }}
      >
        <span className="text-white/60 uppercase tracking-[0.2em] text-sm">Resources</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">Store</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-6">
          {stores.map((s) => (
            <div key={s.id} className="card-hover bg-white group">
              <div className="overflow-hidden">
                <img
                  src={`/uploads/store/${s.img}`}
                  alt={s.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-sm mb-3">{s.title}</h3>
                <a
                  href={s.linkToResource}
                  target="_blank"
                  className="text-[#1a237e] text-xs font-semibold hover:underline"
                >
                  Get Resource →
                </a>
              </div>
            </div>
          ))}
        </div>
        {stores.length === 0 && (
          <p className="text-center text-gray-400 mt-8">No items in store yet.</p>
        )}
      </div>
    </>
  );
}
