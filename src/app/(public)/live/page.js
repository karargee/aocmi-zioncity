export default function LivePage() {
  return (
    <>
      <div
        className="pt-32 pb-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a1128 0%, #1a237e 100%)" }}
      >
        <div className="inline-flex items-center gap-2 bg-red-600 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          LIVE
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">Watch Us Live</h1>
        <p className="text-white/60 mt-4">Join our services live on YouTube every Sunday</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="aspect-video rounded-2xl overflow-hidden shadow-xl mb-10">
          <iframe
            src="https://www.youtube.com/embed/live_stream?channel=UCaocmizioncity"
            title="AOCMI Zion City Live"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            { icon: "fa-sun", color: "text-yellow-500 bg-yellow-50", title: "Sunday Service", time: "9:00 AM WAT" },
            { icon: "fa-pray", color: "text-purple-500 bg-purple-50", title: "Prayer Meeting", time: "Friday 5:00 PM" },
          ].map((s) => (
            <div key={s.title} className="bg-white p-6 rounded-2xl shadow-md text-center">
              <div className={`w-14 h-14 rounded-full ${s.color} flex items-center justify-center mx-auto mb-3`}>
                <i className={`fas ${s.icon} text-xl`} />
              </div>
              <h3 className="font-bold">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.time}</p>
            </div>
          ))}
        </div>

        <div className="text-center bg-gray-50 p-10 rounded-2xl">
          <h2 className="text-2xl font-bold mb-3">Watch Past Services</h2>
          <p className="text-gray-500 mb-6">
            Missed a service? Catch up on all our past messages and events on YouTube.
          </p>
          <a
            href="https://youtube.com/@aocmizioncity"
            target="_blank"
            className="bg-red-600 text-white px-8 py-3.5 rounded-full inline-flex items-center gap-2 font-bold hover:bg-red-700 transition shadow-md"
          >
            <i className="fab fa-youtube text-xl" />
            Subscribe on YouTube
          </a>
        </div>
      </div>
    </>
  );
}
