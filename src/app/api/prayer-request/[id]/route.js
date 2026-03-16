import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { error } = await requireAuth();
  if (error) return error;
  await prisma.prayerRequest.update({
    where: { id: parseInt(params.id) },
    data: { isRead: true },
  });
  return NextResponse.json({ success: true });
}

export async function DELETE(req, { params }) {
  const { error } = await requireAuth();
  if (error) return error;
  await prisma.prayerRequest.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ success: true });
}
