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
        {/* Books Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <span className="purple-text">Library</span>
            <h2 className="section-title mt-2">Books</h2>
          </div>

          {/* Apokalupsis */}
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <i className="fas fa-book text-[#1a237e]" /> Apokalupsis
            </h3>
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <img src="/img/apokalopsis.png" alt="Apokalupsis" className="rounded-xl max-w-[200px] mx-auto mb-4" />
              <p className="text-gray-500 text-sm mb-4">Our celestial harbinger — devotional publications from AOCMI Zion City</p>
              <a href="/devotionals" className="btn-blue text-sm inline-block">
                View Apokalupsis →
              </a>
            </div>
          </div>

          {/* Dr Prince Buma Books */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <i className="fas fa-book-open text-[#1a237e]" /> Dr. Prince Buma&apos;s Books
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "The Man God Uses" },
                { title: "God's Generals" },
              ].map((book) => (
                <div key={book.title} className="bg-white rounded-xl shadow-sm p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#1a237e]/10 flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-book text-[#1a237e] text-xl" />
                  </div>
                  <h4 className="font-bold text-sm">{book.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Materials Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <span className="purple-text">Ministries</span>
            <h2 className="section-title mt-2">Ministries Materials</h2>
            <p className="text-gray-500 text-sm mt-2">Shirts, caps, crests and more</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                    Get Item →
                  </a>
                </div>
              </div>
            ))}
          </div>
          {stores.length === 0 && (
            <p className="text-center text-gray-400 mt-4">No materials available yet. Check back soon!</p>
          )}
        </section>
      </div>
    </>
  );
}
