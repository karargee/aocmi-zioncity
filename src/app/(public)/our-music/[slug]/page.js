import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ShowMusic({ params }) {
  const music = await prisma.music.findUnique({ where: { slug: params.slug } });
  if (!music) notFound();

  return (
    <>
      <div
        className="pt-32 pb-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a1128 0%, #1a237e 100%)" }}
      >
        <span className="text-white/60 uppercase tracking-[0.2em] text-sm">Now Playing</span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2">{music.title}</h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <img src={`/uploads/music-cover-arts/${music.img}`} alt={music.title} className="w-full max-h-96 object-cover" />
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-2">{music.title}</h2>
            <p className="text-gray-500 mb-6">{music.desc}</p>
            <audio controls className="w-full">
              <source src={`/uploads/songs/${music.track}`} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
        <div className="mt-8">
          <Link href="/our-music" className="text-[#1a237e] font-semibold text-sm hover:underline">
            ← Back to Music
          </Link>
        </div>
      </div>
    </>
  );
}
