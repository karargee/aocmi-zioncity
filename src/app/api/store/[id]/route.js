import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/utils";
import { saveFile } from "@/lib/upload";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const id = parseInt(params.id);
  const store = await prisma.store.findUnique({ where: { id } });
  if (!store) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (store.userId !== session.user.id && !session.user.isSuperAdmin)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const form = await req.formData();
  const data = { title: form.get("title"), linkToResource: form.get("link") };
  const img = form.get("img");
  if (img && img.size > 0) data.img = await saveFile(img, "store");
  await prisma.store.update({ where: { id }, data });
  return NextResponse.json({ success: true });
}

export async function DELETE(req, { params }) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const id = parseInt(params.id);
  const store = await prisma.store.findUnique({ where: { id } });
  if (!store) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (store.userId !== session.user.id && !session.user.isSuperAdmin)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await prisma.store.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
