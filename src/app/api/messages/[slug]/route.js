import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/utils";
import { saveFile } from "@/lib/upload";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const message = await prisma.message.findUnique({ where: { slug: params.slug } });
  if (!message) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(message);
}

export async function POST(req, { params }) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const message = await prisma.message.findUnique({ where: { slug: params.slug } });
  if (!message) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (message.userId !== session.user.id && !session.user.isSuperAdmin)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const form = await req.formData();
  const seriesId = form.get("seriesId");
  const seriesOrder = form.get("seriesOrder");
  const data = {
    title: form.get("title"),
    description: form.get("desc"),
    link: form.get("link"),
    seriesId: seriesId ? parseInt(seriesId) : null,
    seriesOrder: seriesOrder ? parseInt(seriesOrder) : null,
  };
  const img = form.get("img");
  if (img && img.size > 0) data.image = await saveFile(img, "messages");
  await prisma.message.update({ where: { slug: params.slug }, data });
  return NextResponse.json({ success: true });
}

export async function DELETE(req, { params }) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const message = await prisma.message.findUnique({ where: { slug: params.slug } });
  if (!message) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (message.userId !== session.user.id && !session.user.isSuperAdmin)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await prisma.message.delete({ where: { slug: params.slug } });
  return NextResponse.json({ success: true });
}
