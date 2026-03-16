import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/utils";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { saveFile } from "@/lib/upload";

export async function GET() {
  const devotionals = await prisma.devotional.findMany({ orderBy: { id: "desc" } });
  return NextResponse.json({ devotionals });
}

export async function POST(req) {
  const auth = await requireAuth();
  if (auth) return auth;
  const fd = await req.formData();
  const title = fd.get("title");
  const content = fd.get("content");
  const scripture = fd.get("scripture") || "";
  const slug = slugify(title, { lower: true, strict: true }) + "-" + Date.now();
  let image = "";
  const imgFile = fd.get("img");
  if (imgFile && imgFile.size > 0) {
    image = await saveFile(imgFile, "devotionals");
  }
  const devotional = await prisma.devotional.create({
    data: { title, slug, content, scripture, image },
  });
  return NextResponse.json({ devotional });
}

export async function DELETE(req) {
  const auth = await requireAuth();
  if (auth) return auth;
  const { id } = await req.json();
  await prisma.devotional.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
