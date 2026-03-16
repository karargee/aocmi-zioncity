import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function saveFile(file, folder) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = path.extname(file.name);
  const name = `${Date.now()}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), buffer);
  return name;
}
