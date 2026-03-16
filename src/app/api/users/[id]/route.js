import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { error } = await requireSuperAdmin();
  if (error) return error;
  const { action } = await req.json();
  const id = parseInt(params.id);
  if (action === "suspend") await prisma.user.update({ where: { id }, data: { suspended: true } });
  else if (action === "unsuspend") await prisma.user.update({ where: { id }, data: { suspended: false } });
  return NextResponse.json({ success: true });
}

export async function DELETE(req, { params }) {
  const { error } = await requireSuperAdmin();
  if (error) return error;
  await prisma.user.update({ where: { id: parseInt(params.id) }, data: { deleted: true } });
  return NextResponse.json({ success: true });
}
