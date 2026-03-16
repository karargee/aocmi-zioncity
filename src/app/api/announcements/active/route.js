import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const announcement = await prisma.announcement.findFirst({
    where: { active: true },
    orderBy: { id: "desc" },
  });
  return NextResponse.json({ announcement });
}
