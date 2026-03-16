import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/utils";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const { old_password, password } = await req.json();
  if (!old_password || !password)
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  if (password.length < 8)
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!(await bcrypt.compare(old_password, user.password)))
    return NextResponse.json({ error: "Old password is incorrect" }, { status: 400 });
  if (await bcrypt.compare(password, user.password))
    return NextResponse.json({ error: "Please enter a new unique password" }, { status: 400 });
  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: await bcrypt.hash(password, 10), passwordUpdatedAt: new Date() },
  });
  return NextResponse.json({ success: true });
}
