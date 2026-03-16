import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/utils";
import { saveFile } from "@/lib/upload";
import { NextResponse } from "next/server";

export async function GET() {
  const photos = await prisma.galleryPhoto.findMany({ orderBy: { id: "desc" } });
  return NextResponse.json({ photos });
}

export async function POST(req) {
  const { error } = await requireAuth();
  if (error) return error;
  const form = await req.formData();
  const title = form.get("title");
  const category = form.get("category") || "general";
  const img = form.get("img");
  if (!title || !img)
    return NextResponse.json({ error: "Title and image required" }, { status: 400 });
  const imgName = await saveFile(img, "gallery");
  const photo = await prisma.galleryPhoto.create({
    data: { title, img: imgName, category },
  });
  return NextResponse.json(photo, { status: 201 });
}
