export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div
        className="pt-32 pb-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a1128 0%, #1a237e 100%)" }}
      >
        <span className="text-white/60 uppercase tracking-[0.2em] text-sm">Who We Are</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">About Us</h1>
      </div>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <img src="/img/pastor-gmp.jpg" alt="Pastor" className="rounded-2xl w-full shadow-xl" />
          <div>
            <span className="purple-text">Zion City — The Heavenly Jerusalem</span>
            <h2 className="text-3xl font-bold my-4">
              Ambassadors of Christ Ministry International
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              The Ambassadors of Christ Ministry (Zion City) is called with the main
              objective of propagating the gospel of reconciliation. We are devoted
              to and aimed at expository preaching and teaching of God&apos;s word.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Our community is built on the foundation of love, faith, and the
              uncompromising truth of scripture. We believe in raising a generation
              of believers who are grounded in the Word and empowered by the Spirit.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Collage */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="purple-text">Our Community</span>
            <h2 className="section-title mt-2">Glimpses of Zion City</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[9,10,11,12,3,6].map((n) => (
              <div key={n} className="overflow-hidden rounded-xl group">
                <img
                  src={`/img/church-${n}.jpg`}
                  alt={`Church life ${n}`}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="purple-text">What We Stand For</span>
            <h2 className="section-title mt-2">Our Core Values</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: "fa-book-bible", title: "The Word", desc: "We are committed to the expository teaching of God's word" },
              { icon: "fa-fire", title: "The Spirit", desc: "We are led and empowered by the Holy Spirit in all things" },
              { icon: "fa-heart", title: "Love", desc: "We demonstrate the love of Christ in our community and beyond" },
              { icon: "fa-globe-africa", title: "Mission", desc: "We are called to take the gospel to the ends of the earth" },
            ].map((v) => (
              <div key={v.title} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
                <div className="w-14 h-14 rounded-full bg-[#1a237e]/10 flex items-center justify-center mx-auto mb-4">
                  <i className={`fas ${v.icon} text-[#1a237e] text-xl`} />
                </div>
                <h3 className="font-bold mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
