import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ShowEvent({ params }) {
  const event = await prisma.event.findUnique({ where: { slug: params.slug } });
  if (!event) notFound();

  return (
    <>
      <div
        className="pt-32 pb-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a1128 0%, #1a237e 100%)" }}
      >
        <span className="text-white/60 uppercase tracking-[0.2em] text-sm">Event</span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 max-w-3xl mx-auto px-4">{event.title}</h1>
        <p className="text-white/50 text-sm mt-3">
          <i className="fas fa-calendar mr-2" />{event.dateOfEvent}
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <img src={`/uploads/events/${event.image}`} alt={event.title} className="w-full rounded-2xl shadow-xl mb-8" />
        <p className="text-gray-600 leading-relaxed">{event.description}</p>
        <div className="mt-8">
          <Link href="/events" className="text-[#1a237e] font-semibold text-sm hover:underline">
            ← Back to Events
          </Link>
        </div>
      </div>
    </>
  );
}
