import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const { error } = await requireAuth();
  if (error) return error;
  const contacts = await prisma.contact.findMany({ orderBy: { id: "desc" } });
  return NextResponse.json({ contacts });
}

export async function POST(req) {
  const body = await req.json();
  const { fullname, email, phone, location } = body;
  if (!fullname || !email || !phone || !location)
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  await prisma.contact.create({ data: { fullname, email, phone, location } });
  return NextResponse.json({ success: true }, { status: 201 });
}
