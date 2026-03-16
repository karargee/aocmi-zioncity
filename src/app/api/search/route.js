import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const q = req.nextUrl.searchParams.get("q") || "";
  if (!q.trim()) return NextResponse.json({ results: [] });

  const [messages, events, music, devotionals] = await Promise.all([
    prisma.message.findMany({
      where: { OR: [{ title: { contains: q } }, { description: { contains: q } }] },
      take: 5,
      orderBy: { id: "desc" },
    }),
    prisma.event.findMany({
      where: { OR: [{ title: { contains: q } }, { description: { contains: q } }] },
      take: 5,
      orderBy: { id: "desc" },
    }),
    prisma.music.findMany({
      where: { OR: [{ title: { contains: q } }, { desc: { contains: q } }] },
      take: 5,
      orderBy: { id: "desc" },
    }),
    prisma.devotional.findMany({
      where: { OR: [{ title: { contains: q } }, { content: { contains: q } }], published: true },
      take: 5,
      orderBy: { id: "desc" },
    }),
  ]);

  const results = [
    ...messages.map((m) => ({ type: "message", title: m.title, href: `/our-messages/${m.slug}`, date: m.createdAt })),
    ...events.map((e) => ({ type: "event", title: e.title, href: `/events/${e.slug}`, date: e.createdAt })),
    ...music.map((m) => ({ type: "music", title: m.title, href: `/our-music/${m.slug}`, date: m.createdAt })),
    ...devotionals.map((d) => ({ type: "devotional", title: d.title, href: `/devotionals/${d.slug}`, date: d.createdAt })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  return NextResponse.json({ results });
}
