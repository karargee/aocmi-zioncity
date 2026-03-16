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
    ? {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
        ],
      }
    : {};
  const [messages, total] = await Promise.all([
    prisma.message.findMany({
      where,
      orderBy: { id: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.message.count({ where }),
  ]);
  return NextResponse.json({ messages, total, pages: Math.ceil(total / perPage) });
}

export async function POST(req) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const form = await req.formData();
  const title = form.get("title");
  const desc = form.get("desc");
  const link = form.get("link");
  const img = form.get("img");
  const seriesId = form.get("seriesId");
  const seriesOrder = form.get("seriesOrder");
  if (!title || !desc || !link || !img)
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  const image = await saveFile(img, "messages");
  const message = await prisma.message.create({
    data: {
      userId: session.user.id,
      title,
      image,
      description: desc,
      link,
      slug: makeSlug(title),
      seriesId: seriesId ? parseInt(seriesId) : null,
      seriesOrder: seriesOrder ? parseInt(seriesOrder) : null,
    },
  });
  return NextResponse.json(message, { status: 201 });
}
