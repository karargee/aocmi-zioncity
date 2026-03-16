import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const { error } = await requireAuth();
  if (error) return error;
  const subscribers = await prisma.newsletter.findMany({ orderBy: { id: "desc" } });
  return NextResponse.json({ subscribers, count: subscribers.length });
}

export async function POST(req) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });
  const exists = await prisma.newsletter.findUnique({ where: { email } });
  if (exists) return NextResponse.json({ error: "Already subscribed" }, { status: 400 });
  await prisma.newsletter.create({ data: { email } });
  return NextResponse.json({ success: true }, { status: 201 });
}
