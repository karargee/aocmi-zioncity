export default function PresidentPage() {
  return (
    <>
      <div
        className="pt-32 pb-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a1128 0%, #1a237e 100%)" }}
      >
        <span className="text-white/60 uppercase tracking-[0.2em] text-sm">Leadership</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">The President</h1>
      </div>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-32 h-32 rounded-full bg-[#1a237e]/10 flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-user text-[#1a237e] text-5xl" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Dr. Prince Buma</h2>
            <p className="text-[#1a237e] font-semibold mt-2">Founder & President, AOCMI-ZION CITY</p>
          </div>

          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              Dr. Prince Buma is the founder and president of Ambassadors of Christ Ministries
              International (AOCMI), also known as Zion City — The Heavenly Jerusalem. A man
              called by God with a burning passion for the propagation of the gospel of
              reconciliation, he has dedicated his life to the expository preaching and
              practical teaching of God&apos;s word.
            </p>
            <p>
              Under his leadership, AOCMI-ZION CITY has grown into a vibrant community of
              believers who are grounded in the Word, empowered by the Holy Spirit, and
              committed to fulfilling the Great Commission. His ministry is marked by a deep
              commitment to raising disciples who walk in the fullness of God&apos;s purpose for
              their lives.
            </p>
            <p>
              Dr. Buma&apos;s teaching ministry is characterized by clarity, depth, and a strong
              emphasis on the practical application of scripture. He believes that spiritual
              development must be an enjoyable and practical experience to be truly fulfilling,
              and this conviction is reflected in every aspect of the ministry he leads.
            </p>
            <p>
              His vision is to see a generation of believers who are not only hearers of the
              Word but doers — men and women who carry the presence of God and impact their
              world for the kingdom. Through conferences, outreaches, and consistent teaching,
              Dr. Prince Buma continues to advance the mandate of reconciliation entrusted to
              the ministry.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="purple-text">Vision & Mission</span>
            <h2 className="section-title mt-2">The Heart of the Ministry</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#1a237e]/10 flex items-center justify-center mb-4">
                <i className="fas fa-eye text-[#1a237e] text-xl" />
              </div>
              <h3 className="font-bold text-lg mb-3">Vision</h3>
              <p className="text-gray-500 leading-relaxed">
                To raise a generation of believers who are rooted in the Word of God,
                filled with the Holy Spirit, and actively fulfilling the ministry of
                reconciliation across the nations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#1a237e]/10 flex items-center justify-center mb-4">
                <i className="fas fa-bullseye text-[#1a237e] text-xl" />
              </div>
              <h3 className="font-bold text-lg mb-3">Mission</h3>
              <p className="text-gray-500 leading-relaxed">
                To propagate the gospel of reconciliation through expository preaching,
                practical teaching, and the demonstration of God&apos;s power, building a
                community of faith that transforms lives and communities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
