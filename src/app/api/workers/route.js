import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const { error } = await requireAuth();
  if (error) return error;
  const [workers, count] = await Promise.all([
    prisma.worker.findMany({ orderBy: { id: "desc" } }),
    prisma.worker.count(),
  ]);
  return NextResponse.json({ workers, count });
}

export async function POST(req) {
  const { error } = await requireAuth();
  if (error) return error;
  const body = await req.json();
  const { name, email, phone, address, unit } = body;
  if (!name || !email || !phone || !address || !unit)
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  const worker = await prisma.worker.create({ data: { name, email, phone, address, unit } });
  return NextResponse.json(worker, { status: 201 });
}
