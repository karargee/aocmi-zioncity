import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ShowMessage({ params }) {
  const message = await prisma.message.findUnique({ where: { slug: params.slug } });
  if (!message) notFound();
  const wordOfTheYear = await prisma.wordOfTheYear.findFirst();

  return (
    <>
      <div
        className="pt-32 pb-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a1128 0%, #1a237e 100%)" }}
      >
        <span className="text-white/60 uppercase tracking-[0.2em] text-sm">Message</span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 max-w-3xl mx-auto px-4">{message.title}</h1>
        <p className="text-white/50 text-sm mt-3">
          {new Date(message.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <img src={`/uploads/messages/${message.image}`} alt={message.title} className="w-full rounded-2xl shadow-xl mb-8" />
        <p className="text-gray-600 leading-relaxed mb-8">{message.description}</p>
        {message.link && (
          <a href={message.link} target="_blank" className="btn-blue inline-block">
            <i className="fas fa-download mr-2" /> Download / Listen
          </a>
        )}
        <div className="mt-8">
          <Link href="/our-messages" className="text-[#1a237e] font-semibold text-sm hover:underline">
            ← Back to Messages
          </Link>
        </div>
      </div>
    </>
  );
}
