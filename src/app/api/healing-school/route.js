import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const { error } = await requireAuth();
  if (error) return error;
  const entries = await prisma.healingSchoolEntry.findMany({ orderBy: { id: "desc" } });
  return NextResponse.json({ entries });
}

export async function POST(req) {
  const body = await req.json();
  const { fullname, email, phone, state, city, problem, narration } = body;
  if (!fullname || !email || !phone || !state || !city || !problem || !narration)
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  await prisma.healingSchoolEntry.create({ data: { fullname, email, phone, state, city, problem, narration } });
  return NextResponse.json({ success: true }, { status: 201 });
}
