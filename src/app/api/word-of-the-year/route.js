import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/utils";
import { saveFile } from "@/lib/upload";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.wordOfTheYear.findFirst();
  return NextResponse.json(data);
}

export async function POST(req) {
  const { error } = await requireAuth();
  if (error) return error;
  const form = await req.formData();
  const title = form.get("title");
  const description = form.get("description");
  const img = form.get("img");
  if (!title || !description || !img)
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  const imgName = await saveFile(img, "word-of-the-year");
  await prisma.wordOfTheYear.upsert({
    where: { id: 1 },
    update: { title, description, img: imgName },
    create: { title, description, img: imgName },
  });
  return NextResponse.json({ success: true });
}
