import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/img/church-1.jpg" alt="AOCMI" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128]/80 via-[#1a237e]/60 to-[#0a1128]/90" />
        </div>
        <div className="relative z-10 text-center px-4 pt-24 pb-12">
          <span className="text-white/60 uppercase tracking-[0.2em] text-xs">Who We Are</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2">About Us</h1>
          <p className="text-white/60 text-sm mt-3 max-w-md mx-auto">Zion City — The Heavenly Jerusalem</p>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="purple-text">Our Story</span>
            <h2 className="text-2xl md:text-3xl font-bold my-3">
              Ambassadors of Christ Ministries International
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              The Ambassadors of Christ Ministries (Zion City) is called with the main
              objective of propagating the gospel of reconciliation. We are devoted
              to and aimed at expository preaching and teaching of God&apos;s word.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Our community is built on the foundation of love, faith, and the
              uncompromising truth of scripture. We believe in raising a generation
              of believers who are grounded in the Word and empowered by the Spirit.
            </p>
          </div>
          <div className="relative">
            <img src="/img/pastor-gmp.jpg" alt="AOCMI" className="rounded-2xl w-full shadow-xl" />
            <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-[#1a237e]/20 rounded-2xl -z-10" />
            <div className="absolute -top-3 -left-3 w-16 h-16 bg-yellow-200 rounded-2xl -z-10" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="purple-text">What Drives Us</span>
            <h2 className="section-title mt-2">Our Mission & Vision</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-full bg-[#1a237e]/10 flex items-center justify-center mb-4">
                <i className="fas fa-bullseye text-[#1a237e] text-xl" />
              </div>
              <h3 className="font-bold text-lg mb-3">Our Mission</h3>
              <ul className="text-gray-500 text-sm space-y-2 leading-relaxed">
                <li className="flex gap-2"><i className="fas fa-check text-[#1a237e] text-xs mt-1 shrink-0" /> Raising believers who are ambassadors of reconciliation — of God and of men.</li>
                <li className="flex gap-2"><i className="fas fa-check text-[#1a237e] text-xs mt-1 shrink-0" /> Teaching Christians to embrace the fullness of Christ. For it is by the Holy Spirit we fulfil the ministry of reconciliation.</li>
                <li className="flex gap-2"><i className="fas fa-check text-[#1a237e] text-xs mt-1 shrink-0" /> Training a healthy congregation upon a solid word-based ministry.</li>
                <li className="flex gap-2"><i className="fas fa-check text-[#1a237e] text-xs mt-1 shrink-0" /> Raising a godly standard for this academics through academic excellence.</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-full bg-[#1a237e]/10 flex items-center justify-center mb-4">
                <i className="fas fa-eye text-[#1a237e] text-xl" />
              </div>
              <h3 className="font-bold text-lg mb-3">Our Vision</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                To fill the earth with the knowledge of the Glory of the Lord as the
                waters cover the sea. To raise a generation of believers who are rooted
                in the Word of God, filled with the Holy Spirit, and actively fulfilling
                the ministry of reconciliation across the nations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="purple-text">What We Stand For</span>
            <h2 className="section-title mt-2">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: "fa-book-bible", title: "The Word", desc: "Committed to expository teaching of God's word" },
              { icon: "fa-fire", title: "The Spirit", desc: "Led and empowered by the Holy Spirit" },
              { icon: "fa-heart", title: "Love", desc: "Demonstrating the love of Christ" },
              { icon: "fa-globe-africa", title: "Mission", desc: "Taking the gospel to the nations" },
            ].map((v) => (
              <div key={v.title} className="bg-gray-50 p-5 rounded-xl hover:bg-white hover:shadow-md transition text-center">
                <div className="w-12 h-12 rounded-full bg-[#1a237e]/10 flex items-center justify-center mx-auto mb-3">
                  <i className={`fas ${v.icon} text-[#1a237e] text-lg`} />
                </div>
                <h3 className="font-bold text-sm mb-1">{v.title}</h3>
                <p className="text-gray-400 text-xs">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Senior Pastor */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="purple-text">Leadership</span>
            <h2 className="section-title mt-2">Our Senior Pastor</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-md overflow-hidden md:flex">
            <div className="md:w-1/3">
              <img src="/img/dr-prince-buma.jpg" alt="Dr. Prince Buma" className="w-full h-64 md:h-full object-cover" />
            </div>
            <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
              <span className="text-[#7c3aed] text-xs font-semibold uppercase tracking-wider">Founder & President</span>
              <h3 className="text-2xl md:text-3xl font-bold mt-1 mb-3">Dr. Prince Buma</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Dr. Prince Buma is the founder and president of Ambassadors of Christ Ministries
                International (AOCMI). A man called by God with a burning passion for the propagation
                of the gospel of reconciliation, he has dedicated his life to the expository preaching
                and practical teaching of God&apos;s word.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/president" className="btn-blue text-xs">
                  Read More &nbsp;<i className="fas fa-arrow-right text-[10px]" />
                </Link>
                <div className="flex gap-2">
                  <a href="https://instagram.com/drprincebuma" target="_blank" className="w-8 h-8 rounded-full bg-[#1a237e]/10 flex items-center justify-center hover:bg-[#1a237e]/20 transition">
                    <i className="fab fa-instagram text-[#1a237e] text-xs" />
                  </a>
                  <a href="https://youtube.com/@drprincebuma" target="_blank" className="w-8 h-8 rounded-full bg-[#1a237e]/10 flex items-center justify-center hover:bg-[#1a237e]/20 transition">
                    <i className="fab fa-youtube text-[#1a237e] text-xs" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Collage */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="purple-text">Our Community</span>
            <h2 className="section-title mt-2">Glimpses of Zion City</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[9, 10, 11, 12, 3, 6].map((n) => (
              <div key={n} className="overflow-hidden rounded-xl group">
                <img
                  src={`/img/church-${n}.jpg`}
                  alt={`Church life ${n}`}
                  className="w-full h-44 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-7">
            <Link href="/gallery" className="btn-blue text-xs">
              View Full Gallery &nbsp;<i className="fas fa-arrow-right text-[10px]" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
