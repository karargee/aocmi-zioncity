import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const d = await prisma.devotional.findUnique({ where: { slug: params.slug } });
  if (!d) return {};
  return { title: d.title, description: d.scripture || d.title };
}

export default async function DevotionalDetail({ params }) {
  const d = await prisma.devotional.findUnique({ where: { slug: params.slug } });
  if (!d) notFound();

  return (
    <>
      <div
        className="pt-32 pb-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a1128 0%, #1a237e 100%)" }}
      >
        <span className="text-white/60 uppercase tracking-[0.2em] text-sm">Devotional</span>
        <h1 className="text-3xl md:text-5xl font-bold mt-2 max-w-3xl mx-auto">{d.title}</h1>
        {d.scripture && <p className="text-white/60 mt-4 italic">{d.scripture}</p>}
        <p className="text-white/40 text-sm mt-2">
          {new Date(d.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {d.image && (
          <img src={`/uploads/devotionals/${d.image}`} alt={d.title} className="w-full rounded-2xl shadow-xl mb-8" />
        )}
        <div
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: d.content }}
        />
      </div>
    </>
  );
}
