import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/utils";
import { saveFile } from "@/lib/upload";
import { NextResponse } from "next/server";

export async function GET() {
  const stores = await prisma.store.findMany({ orderBy: { id: "desc" } });
  return NextResponse.json({ stores });
}

export async function POST(req) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const form = await req.formData();
  const title = form.get("title");
  const link = form.get("link");
  const img = form.get("img");
  if (!title || !link || !img)
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  const imgName = await saveFile(img, "store");
  const store = await prisma.store.create({
    data: { userId: session.user.id, title, img: imgName, linkToResource: link },
  });
  return NextResponse.json(store, { status: 201 });
}
