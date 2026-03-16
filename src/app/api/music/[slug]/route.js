import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/utils";
import { saveFile } from "@/lib/upload";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const music = await prisma.music.findUnique({ where: { slug: params.slug } });
  if (!music) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(music);
}

export async function PATCH(req, { params }) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const music = await prisma.music.findUnique({ where: { slug: params.slug } });
  if (!music) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (music.userId !== session.user.id && !session.user.isSuperAdmin)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const form = await req.formData();
  const data = { title: form.get("title"), desc: form.get("desc") };
  const img = form.get("img");
  const track = form.get("track");
  if (img && img.size > 0) data.img = await saveFile(img, "music-cover-arts");
  if (track && track.size > 0) {
    if (!track.name.endsWith(".mp3"))
      return NextResponse.json({ error: "Only MP3 files allowed" }, { status: 400 });
    data.track = await saveFile(track, "songs");
  }
  await prisma.music.update({ where: { slug: params.slug }, data });
  return NextResponse.json({ success: true });
}

export async function DELETE(req, { params }) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const music = await prisma.music.findUnique({ where: { slug: params.slug } });
  if (!music) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (music.userId !== session.user.id && !session.user.isSuperAdmin)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await prisma.music.delete({ where: { slug: params.slug } });
  return NextResponse.json({ success: true });
}
