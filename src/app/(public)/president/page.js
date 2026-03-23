export default function PresidentPage() {
  return (
    <>
      {/* Hero with Image */}
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/img/dr-prince-buma.jpg" alt="Dr. Prince Buma" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128]/80 via-[#1a237e]/60 to-[#0a1128]/90" />
        </div>
        <div className="relative z-10 text-center px-4 pt-24 pb-16">
          <p className="animate-fade-in-up text-white/60 uppercase tracking-[0.3em] text-xs md:text-sm mb-4">
            Our Dear Man of God
          </p>
          <h1 className="animate-fade-in-scale animate-delay-1 text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Dr. Prince Buma
          </h1>
          <div className="animate-fade-in-up animate-delay-2 flex justify-center mb-6">
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>
          <p className="animate-fade-in-up animate-delay-3 text-white/80 text-lg md:text-xl font-light">
            Founder & President, AOCMI-ZION CITY
          </p>
          <div className="animate-fade-in-up animate-delay-4 flex justify-center gap-3 mt-6">
            <a href="https://instagram.com/drprincebuma" target="_blank" className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition text-white">
              <i className="fab fa-instagram text-lg" />
            </a>
          </div>
        </div>
      </div>


      {/* Bio */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <div>
                <span className="purple-text">About</span>
                <h2 className="text-2xl md:text-3xl font-bold mt-1 mb-4 text-gray-900">A Man Called by God</h2>
              </div>
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
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: "fa-book-bible", label: "Expository Teaching", value: "Word-Based" },
              { icon: "fa-fire", label: "Ministry Focus", value: "Spirit-Led" },
              { icon: "fa-globe-africa", label: "Mandate", value: "Reconciliation" },
              { icon: "fa-people-group", label: "Community", value: "Zion City" },
            ].map((s) => (
              <div key={s.label} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#1a237e]/10 flex items-center justify-center mx-auto mb-3">
                  <i className={`fas ${s.icon} text-[#1a237e] text-lg`} />
                </div>
                <p className="font-bold text-[#1a237e]">{s.value}</p>
                <p className="text-gray-400 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="purple-text">Vision & Mission</span>
            <h2 className="section-title mt-2">The Heart of the Ministry</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
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
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
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

      {/* Connect CTA */}
      <section
        className="py-16 text-white text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a1128 0%, #1a237e 50%, #4a148c 100%)" }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect with Dr. Prince Buma</h2>
          <p className="text-white/70 mb-8">Follow for teachings, updates, and inspiration</p>
          <a
            href="https://instagram.com/drprincebuma"
            target="_blank"
            className="bg-white text-[#1a237e] px-8 py-3.5 rounded-full inline-flex items-center gap-2 font-bold hover:bg-gray-100 transition shadow-md"
          >
            <i className="fab fa-instagram text-xl" />
            Follow on Instagram
          </a>
        </div>
      </section>
    </>
  );
}
