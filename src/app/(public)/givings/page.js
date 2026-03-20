export default function GivingsPage() {
  return (
    <>
      <div
        className="pt-32 pb-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a1128 0%, #1a237e 100%)" }}
      >
        <span className="text-white/60 uppercase tracking-[0.2em] text-sm">Partner With Us</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">Givings</h1>
      </div>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-lg leading-relaxed mb-10">
            There&apos;s no telling what impact you will make as you join us in
            partnership with God to take the gospel to the ends of the earth.
            Your giving supports our mission, outreach programs, and community development.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              { icon: "fa-church", title: "Tithes & Offerings", desc: "Support the work of the ministry" },
              { icon: "fa-hand-holding-heart", title: "Special Seeds", desc: "Sow into specific projects and missions" },
            ].map((g) => (
              <div key={g.title} className="bg-gray-50 p-8 rounded-2xl text-center">
                <div className="w-14 h-14 rounded-full bg-[#1a237e]/10 flex items-center justify-center mx-auto mb-4">
                  <i className={`fas ${g.icon} text-[#1a237e] text-xl`} />
                </div>
                <h3 className="font-bold text-lg mb-2">{g.title}</h3>
                <p className="text-gray-500 text-sm">{g.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#1a237e] text-white p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-3">How to Give</h3>
            <p className="text-white/80 mb-6">
              Scan the barcode below or use the bank details to send your givings:
            </p>
            <div className="flex justify-center mb-6">
              <img src="/img/bar-code.png" alt="Payment Barcode" className="rounded-xl max-w-[250px] w-full" />
            </div>
            <p className="text-white/70 text-sm">For enquiries, contact:</p>
            <p className="text-lg font-bold">+234 902 729 3178</p>
            <p className="text-white/70">hello@aocmi.com</p>
          </div>
        </div>
      </section>
    </>
  );
}
