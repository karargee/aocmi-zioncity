import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const testimonies = await prisma.testimony.findMany({
    where: { approved: true },
    orderBy: { id: "desc" },
  });
  return NextResponse.json({ testimonies });
}

export async function POST(req) {
  try {
    const { name, email, testimony } = await req.json();
    if (!name || !email || !testimony) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    await prisma.testimony.create({ data: { name, email, testimony } });
    return NextResponse.json({ message: "Testimony submitted! It will appear after approval." });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
