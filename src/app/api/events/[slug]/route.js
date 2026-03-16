import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/utils";
import { saveFile } from "@/lib/upload";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const event = await prisma.event.findUnique({ where: { slug: params.slug } });
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(event);
}

export async function POST(req, { params }) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const event = await prisma.event.findUnique({ where: { slug: params.slug } });
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (event.userId !== session.user.id && !session.user.isSuperAdmin)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const form = await req.formData();
  const data = { title: form.get("title"), description: form.get("desc"), dateOfEvent: form.get("date_of_event") };
  const img = form.get("img");
  if (img && img.size > 0) data.image = await saveFile(img, "events");
  await prisma.event.update({ where: { slug: params.slug }, data });
  return NextResponse.json({ success: true });
}

export async function DELETE(req, { params }) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const event = await prisma.event.findUnique({ where: { slug: params.slug } });
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (event.userId !== session.user.id && !session.user.isSuperAdmin)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await prisma.event.delete({ where: { slug: params.slug } });
  return NextResponse.json({ success: true });
}
