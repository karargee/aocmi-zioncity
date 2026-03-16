import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const { error } = await requireAuth();
  if (error) return error;
  const requests = await prisma.prayerRequest.findMany({ orderBy: { id: "desc" } });
  const unreadCount = await prisma.prayerRequest.count({ where: { isRead: false } });
  return NextResponse.json({ requests, unreadCount });
}

export async function POST(req) {
  const body = await req.json();
  const { fullname, email, phone, request } = body;
  if (!fullname || !email || !request)
    return NextResponse.json({ error: "Name, email and request are required" }, { status: 400 });
  await prisma.prayerRequest.create({
    data: { fullname, email, phone: phone || null, request },
  });
  return NextResponse.json({ success: true }, { status: 201 });
}
