import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function auth() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  return session;
}

export async function GET() {
  if (!(await auth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const testimonies = await prisma.testimony.findMany({ orderBy: { id: "desc" } });
  return NextResponse.json({ testimonies });
}

export async function PUT(req) {
  if (!(await auth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, approved } = await req.json();
  await prisma.testimony.update({ where: { id }, data: { approved } });
  return NextResponse.json({ message: "Updated" });
}

export async function DELETE(req) {
  if (!(await auth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  await prisma.testimony.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}
