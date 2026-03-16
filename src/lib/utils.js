import slugify from "slugify";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { NextResponse } from "next/server";

export function makeSlug(title) {
  return (
    slugify(title, { lower: true, strict: true }) +
    "-" +
    Date.now().toString(36)
  );
}

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  return { session };
}

export async function requireSuperAdmin() {
  const { session, error } = await requireAuth();
  if (error) return { error };
  if (!session.user.isSuperAdmin)
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  return { session };
}
