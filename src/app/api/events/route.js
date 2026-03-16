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
          { dateOfEvent: { contains: search } },
        ],
      }
    : {};
  const [events, total] = await Promise.all([
    prisma.event.findMany({ where, orderBy: { id: "desc" }, skip: (page - 1) * perPage, take: perPage }),
    prisma.event.count({ where }),
  ]);
  return NextResponse.json({ events, total, pages: Math.ceil(total / perPage) });
}

export async function POST(req) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const form = await req.formData();
  const title = form.get("title");
  const desc = form.get("desc");
  const dateOfEvent = form.get("date_of_event");
  const img = form.get("img");
  if (!title || !desc || !dateOfEvent || !img)
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  const image = await saveFile(img, "events");
  const event = await prisma.event.create({
    data: { userId: session.user.id, title, image, description: desc, dateOfEvent, slug: makeSlug(title) },
  });
  return NextResponse.json(event, { status: 201 });
}
