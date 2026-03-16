import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { error } = await requireAuth();
  if (error) return error;
  await prisma.galleryPhoto.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ success: true });
}
