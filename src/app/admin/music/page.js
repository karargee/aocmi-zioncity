import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DeleteButton from "@/components/DeleteButton";

export default async function AdminMusic() {
  const session = await getServerSession(authOptions);
  const musics = await prisma.music.findMany({
    where: { userId: session.user.id },
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Music</h2>
        <Link href="/admin/music/create" className="bg-primary text-white px-4 py-2 rounded">
          Add Music
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {musics.map((m) => (
              <tr key={m.id} className="border-t">
                <td className="p-3">{m.title}</td>
                <td className="p-3">{m.desc.length > 40 ? m.desc.slice(0, 40) + "..." : m.desc}</td>
                <td className="p-3 flex gap-2">
                  <Link href={`/admin/music/${m.slug}/edit`} className="text-blue-600">Edit</Link>
                  <DeleteButton url={`/api/music/${m.slug}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {musics.length === 0 && <p className="p-4 text-gray-400">No music yet.</p>}
      </div>
    </div>
  );
}
