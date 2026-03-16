import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DeleteButton from "@/components/DeleteButton";

export default async function AdminStore() {
  const session = await getServerSession(authOptions);
  const stores = await prisma.store.findMany({
    where: { userId: session.user.id },
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Store</h2>
        <Link href="/admin/store/create" className="bg-primary text-white px-4 py-2 rounded">
          Add Item
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Link</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-3">{s.title}</td>
                <td className="p-3">
                  <a href={s.linkToResource} target="_blank" className="text-blue-600 underline">View</a>
                </td>
                <td className="p-3 flex gap-2">
                  <Link href={`/admin/store/${s.id}/edit`} className="text-blue-600">Edit</Link>
                  <DeleteButton url={`/api/store/${s.id}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {stores.length === 0 && <p className="p-4 text-gray-400">No store items yet.</p>}
      </div>
    </div>
  );
}
