import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/utils";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { saveFile } from "@/lib/upload";

export async function GET() {
  const series = await prisma.sermonSeries.findMany({
    orderBy: { id: "desc" },
    include: { _count: { select: { messages: true } } },
  });
  return NextResponse.json({ series });
}

export async function POST(req) {
  const auth = await requireAuth();
  if (auth) return auth;
  const fd = await req.formData();
  const title = fd.get("title");
  const description = fd.get("description") || "";
  const slug = slugify(title, { lower: true, strict: true });
  let image = "";
  const imgFile = fd.get("img");
  if (imgFile && imgFile.size > 0) {
    image = await saveFile(imgFile, "sermon-series");
  }
  const series = await prisma.sermonSeries.create({ data: { title, slug, description, image } });
  return NextResponse.json({ series });
}

export async function DELETE(req) {
  const auth = await requireAuth();
  if (auth) return auth;
  const { id } = await req.json();
  await prisma.sermonSeries.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
