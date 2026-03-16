import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "@/lib/utils";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  const { error } = await requireSuperAdmin();
  if (error) return error;
  const admins = await prisma.user.findMany({
    where: { isSuperAdmin: false, deleted: false },
    orderBy: { id: "desc" },
    select: { id: true, name: true, email: true, suspended: true, createdAt: true },
  });
  return NextResponse.json({ admins, count: admins.length });
}

export async function POST(req) {
  const { error } = await requireSuperAdmin();
  if (error) return error;
  const { name, email } = await req.json();
  if (!name || !email)
    return NextResponse.json({ error: "Name and email required" }, { status: 400 });
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return NextResponse.json({ error: "Email already exists" }, { status: 400 });
  const password = await bcrypt.hash(process.env.ADMIN_DEFAULT_PASSWORD || "password", 10);
  const admin = await prisma.user.create({ data: { name, email, password } });
  return NextResponse.json({ id: admin.id, name: admin.name }, { status: 201 });
}
