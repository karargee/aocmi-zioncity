import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const announcements = await prisma.announcement.findMany({ orderBy: { id: "desc" } });
  return NextResponse.json({ announcements });
}

export async function POST(req) {
  const auth = await requireAuth();
  if (auth) return auth;
  const { text, link } = await req.json();
  const announcement = await prisma.announcement.create({ data: { text, link: link || "" } });
  return NextResponse.json({ announcement });
}

export async function PUT(req) {
  const auth = await requireAuth();
  if (auth) return auth;
  const { id, text, link, active } = await req.json();
  const announcement = await prisma.announcement.update({
    where: { id },
    data: { text, link: link || "", active: active ?? true },
  });
  return NextResponse.json({ announcement });
}

export async function DELETE(req) {
  const auth = await requireAuth();
  if (auth) return auth;
  const { id } = await req.json();
  await prisma.announcement.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
