import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SalvationForm from "./SalvationForm";
import PhotoLightbox from "@/components/PhotoLightbox";

export default async function HomePage() {
  const messages = await prisma.message.findMany({ orderBy: { id: "desc" }, take: 4 });
  const wordOfTheYear = await prisma.wordOfTheYear.findFirst();

  return (
    <>
      {/* Hero */}
      <div className="hero-section">
        {/* Animated orbs */}
        <div className="hero-orb hero-orb-1" style={{ zIndex: 1 }} />
        <div className="hero-orb hero-orb-2" style={{ zIndex: 1 }} />
        <div className="hero-orb hero-orb-3" style={{ zIndex: 1 }} />

        {/* Sparkle particles */}
        <div className="hero-particles" style={{ zIndex: 1 }}>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="hero-particle"
              style={{
                left: `${8 + (i * 7.5) % 85}%`,
                top: `${12 + (i * 13) % 70}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${3 + (i % 3)}s`,
              }}
            />
          ))}
        </div>

        {/* Glow */}
        <div className="hero-glow" style={{ zIndex: 1 }} />

        {/* Fade bottom */}
        <div className="hero-fade-bottom" />

        {/* Content */}
        <div className="max-w-5xl mx-auto text-center px-4 relative" style={{ zIndex: 3 }}>
          <p className="animate-fade-in-up text-white/60 uppercase tracking-[0.35em] text-xs md:text-sm mb-4 font-medium">
            Welcome to
          </p>

          {/* Animated divider line */}
          <div className="flex justify-center mb-6">
            <div className="animate-line-expand h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>

          <h1 className="animate-fade-in-scale animate-delay-1 text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-[1.1]">
            Ambassadors of Christ
          </h1>
          <h1 className="animate-fade-in-scale animate-delay-2 text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="hero-gradient-text">
              Ministries International
            </span>
          </h1>

          <p className="animate-fade-in-up animate-delay-3 text-base md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            The joy of being in God&apos;s presence is an unparalleled experience
          </p>

          <div className="animate-fade-in-up animate-delay-4 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://t.me/zioncitymessages" className="btn-blue text-base group">
              Join Telegram &nbsp;<i className="fab fa-telegram group-hover:scale-110 transition-transform" />
            </a>
            <Link href="/live" className="btn-outline text-base group">
              Watch Live &nbsp;<i className="fas fa-play text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Service Times Bar */}
      <section className="bg-white relative z-10 -mt-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 grid md:grid-cols-2 gap-6 text-center">
            {[
              { icon: "fa-sun", color: "text-yellow-500", title: "Sunday Service", time: "9:00 AM WAT" },
              { icon: "fa-pray", color: "text-purple-500", title: "Prayer Meeting", time: "Friday 5:00 PM" },
            ].map((s) => (
              <div key={s.title} className="flex items-center gap-4 justify-center md:justify-start">
                <div className={`w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center ${s.color}`}>
                  <i className={`fas ${s.icon} text-xl`} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm">{s.title}</p>
                  <p className="text-gray-400 text-xs">{s.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faith Journey */}
      <section className="py-20 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="purple-text">Our Mission</span>
          <h2 className="section-title mt-2">Join Our Faith Journey</h2>
          <p className="section-subtitle">
            A journey and experience devoted to and aimed at expository preaching
            and teaching of God&apos;s word. We believe spiritual development must be an
            enjoyable and practical experience to be truly fulfilling.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              { icon: "fa-book-bible", title: "Word-Based", desc: "Grounded in expository preaching of scripture" },
              { icon: "fa-hands-praying", title: "Spirit-Led", desc: "Guided by the Holy Spirit in all we do" },
              { icon: "fa-people-group", title: "Community", desc: "Building genuine fellowship and connection" },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-[#1a237e]/10 flex items-center justify-center mx-auto mb-4">
                  <i className={`fas ${item.icon} text-[#1a237e] text-xl`} />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Service */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="purple-text">Online</span>
            <h2 className="text-3xl md:text-4xl font-bold my-4">Join Our Service Online</h2>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Join us for powerful worship experience and practical teachings of
              God&apos;s word like never before. Whether you&apos;re at home or on the go,
              connect with us online.
            </p>
            <div className="flex gap-3">
              <Link href="/events" className="btn-blue text-sm">
                Upcoming Events
              </Link>
              <Link href="/live" className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-300 transition">
                Watch Live
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#1a237e] rounded-2xl -z-10" />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-200 rounded-2xl -z-10" />
          </div>
        </div>
      </section>

      {/* PPS Teachings */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="purple-text">Teachings</span>
            <h2 className="section-title mt-2">PPS Teachings</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <video
              src="/videos/church-highlight.mp4"
              controls
              loop
              playsInline
              className="rounded-2xl w-full shadow-xl"
            />
            <video
              src="/videos/video_2026-03-16_21-55-50.mp4"
              controls
              loop
              playsInline
              className="rounded-2xl w-full shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 md:order-1">
            <img src="/img/pastor-gmp.jpg" alt="Pastor" className="rounded-2xl w-full shadow-xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-200 rounded-2xl -z-10" />
          </div>
          <div className="order-1 md:order-2">
            <span className="purple-text">Zion City — The Heavenly Jerusalem</span>
            <h2 className="text-3xl md:text-4xl font-bold my-4">
              Ambassadors of Christ Ministries International
            </h2>
            <p className="text-gray-500 mb-6 leading-relaxed">
              The Ambassadors of Christ Ministries (Zion City) is called with the
              main objective of propagating the gospel of reconciliation. We are a
              community of believers passionate about God&apos;s word and His presence.
            </p>
            <Link href="/about-us" className="btn-blue text-sm">
              Learn More &nbsp;<i className="fas fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* Afro Gospel Sunday */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="purple-text">Events</span>
            <h2 className="section-title mt-2">Afro Gospel Sunday</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <video
              src="/videos/video_2026-03-16_21-49-23.mp4"
              controls
              loop
              playsInline
              className="rounded-2xl w-full shadow-xl"
            />
          </div>
        </div>
      </section>


      {/* Messages */}
      <section className="py-16 bg-blue-gradient text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Download & Listen to Our Latest Messages</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {messages.length > 0 ? (
              messages.map((m) => (
                <Link key={m.id} href={`/our-messages/${m.slug}`} className="messages-link group">
                  <div className="card-hover bg-white text-gray-800">
                    <div className="overflow-hidden">
                      <img
                        src={`/uploads/messages/${m.image}`}
                        alt={m.title}
                        className="w-full h-32 md:h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold mb-2 text-sm">
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
              ))
            ) : (
              <p className="col-span-4 text-center text-white/60">No messages uploaded yet</p>
            )}
          </div>
          <div className="text-center mt-10">
            <Link href="/our-messages" className="btn-outline">
              View All Messages
            </Link>
          </div>
        </div>
      </section>

      {/* Word of the Year */}
      {wordOfTheYear && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <img
                src={`/img/${wordOfTheYear.img}`}
                alt="Word of the Year"
                className="rounded-2xl w-full shadow-xl"
              />
            </div>
            <div className="md:col-span-2">
              <span className="purple-text">Prophetic Declaration</span>
              <h2 className="text-3xl md:text-4xl font-bold my-4">Word of the Year</h2>
              <h3 className="text-xl text-[#1a237e] font-bold mb-4">{wordOfTheYear.title}</h3>
              <p className="text-gray-500 leading-relaxed">{wordOfTheYear.description}</p>
            </div>
          </div>
        </section>
      )}

      {/* Photo Gallery Strip */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="purple-text">Pictorial Moments</span>
            <h2 className="section-title mt-2">Life at AOCMI-ZIONCITY</h2>
          </div>
          <PhotoLightbox images={[
            ...Array.from({length: 12}, (_, i) => `/img/church-${i+1}.jpg`),
            "/img/photo_2026-02-14_20-08-03.jpg",
            "/img/photo_2026-02-14_20-08-04.jpg",
            "/img/photo_2026-02-19_21-01-51.jpg",
            "/img/photo_2026-02-19_21-01-52.jpg",
            "/img/photo_2026-02-19_21-01-53.jpg",
            "/img/photo_2026-02-26_21-36-17.jpg",
            "/img/photo_2026-03-01_18-05-20.jpg",
            "/img/photo_2026-03-02_21-27-12.jpg",
            "/img/photo_2026-03-16_21-51-09.jpg",
            "/img/photo_2026-03-16_21-53-52.jpg",
            "/img/photo_2026-03-16_21-54-09.jpg",
            "/img/photo_2026-03-16_21-54-37.jpg",
            "/img/photo_2026-03-16_21-54-46.jpg",
            "/img/photo_2026-03-16_21-54-50.jpg",
            "/img/photo_2026-03-16_21-55-24.jpg",
            "/img/photo_2026-03-16_21-55-31.jpg",
            "/img/photo_2026-03-19_19-15-04.jpg",
            "/img/photo_2026-03-19_19-15-07.jpg",
            "/img/photo_2026-03-19_21-41-28.jpg",
            "/img/photo_2026-03-19_21-41-29.jpg",
            "/img/photo_2026-03-19_21-41-30.jpg",
          ]} />
        </div>
      </section>

      {/* Partner + Follow */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          {/* Partner */}
          <div
            className="rounded-2xl p-6 md:p-10 text-white relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #1a237e 0%, #4a148c 100%)",
            }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <span className="text-white/60 uppercase tracking-wider text-xs">Give</span>
              <h2 className="text-3xl font-bold my-3">Partner With God</h2>
              <p className="text-white/80 mb-6 leading-relaxed">
                There&apos;s no telling what impact you will make as you join us in
                partnership with God to take the gospel to the ends of the earth.
              </p>
              <Link href="/givings" className="btn-light text-sm">
                Partner Now
              </Link>
            </div>
          </div>

          {/* Follow */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md">
            <span className="purple-text">Social</span>
            <h2 className="text-2xl font-bold mt-1 mb-2">Follow Us</h2>
            <p className="text-gray-400 text-sm mb-5">Learn, engage and grow with us</p>
            {[
              ["https://youtube.com/@aocmizioncity808", "fa-youtube", "YouTube", "bg-red-50 text-red-500"],
              ["https://instagram.com/aocmizioncity", "fa-instagram", "Instagram", "bg-pink-50 text-pink-500"],
              ["https://www.facebook.com/aocmizioncity", "fa-facebook", "Facebook", "bg-blue-50 text-blue-600"],
              ["https://twitter.com/aocmizioncity", "fa-twitter", "Twitter", "bg-sky-50 text-sky-400"],
            ].map(([href, icon, label, colors]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition group"
              >
                <div className={`w-10 h-10 rounded-full ${colors} flex items-center justify-center`}>
                  <i className={`fab ${icon}`} />
                </div>
                <span className="font-semibold text-sm">{label}</span>
                <i className="fas fa-arrow-right text-gray-300 ml-auto group-hover:text-gray-500 transition text-xs" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Salvation */}
      <section
        className="py-20 text-white relative"
        style={{
          background: "linear-gradient(135deg, #0a1128 0%, #1a237e 50%, #4a148c 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[url('/img/salvation-bg.png')] bg-cover bg-center opacity-10" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <span className="text-white/60 uppercase tracking-[0.2em] text-sm">Accept Christ</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-2">Prayer for Salvation</h2>
          <h3 className="text-lg text-white/80 mb-6">Say These Words:</h3>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-10 text-white/90 leading-relaxed italic">
            &ldquo;Dear Heavenly Father, I believe in Jesus Christ your son. I believe He
            died and was raised again for me. I believe He is alive today and I
            confess with my mouth, that from today, Jesus is the Lord of my life. I
            receive eternal life into my spirit. I am a child of God. I am born
            again. Glory to God!&rdquo;
          </div>
          <p className="text-white/60 text-sm mb-6">
            If you said this prayer, we&apos;d love to hear from you. Fill in your details below:
          </p>
          <SalvationForm />
        </div>
      </section>
    </>
  );
}
