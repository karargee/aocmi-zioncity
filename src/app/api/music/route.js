import { prisma } from "@/lib/prisma";
import { requireAuth, makeSlug } from "@/lib/utils";
import { saveFile } from "@/lib/upload";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const perPage = 12;
  const where = search
    ? { OR: [{ title: { contains: search } }, { desc: { contains: search } }] }
    : {};
  const [musics, total] = await Promise.all([
    prisma.music.findMany({ where, orderBy: { id: "desc" }, skip: (page - 1) * perPage, take: perPage }),
    prisma.music.count({ where }),
  ]);
  return NextResponse.json({ musics, total, pages: Math.ceil(total / perPage) });
}

export async function POST(req) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const form = await req.formData();
  const title = form.get("title");
  const desc = form.get("desc");
  const img = form.get("img");
  const track = form.get("track");
  if (!title || !desc || !img || !track)
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  if (!track.name.endsWith(".mp3"))
    return NextResponse.json({ error: "Only MP3 files allowed" }, { status: 400 });
  const imgName = await saveFile(img, "music-cover-arts");
  const trackName = await saveFile(track, "songs");
  const music = await prisma.music.create({
    data: { title, userId: session.user.id, img: imgName, desc, track: trackName, slug: makeSlug(title) },
  });
  return NextResponse.json(music, { status: 201 });
}
