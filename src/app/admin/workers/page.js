import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/DeleteButton";

export default async function AdminWorkers() {
  const workers = await prisma.worker.findMany({ orderBy: { id: "desc" } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Workers ({workers.length})</h2>
        <Link href="/admin/workers/create" className="bg-primary text-white px-4 py-2 rounded">
          Add Worker
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Unit</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((w) => (
              <tr key={w.id} className="border-t">
                <td className="p-3">{w.name}</td>
                <td className="p-3">{w.email}</td>
                <td className="p-3">{w.phone}</td>
                <td className="p-3">{w.unit}</td>
                <td className="p-3">
                  <DeleteButton url={`/api/workers/${w.id}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {workers.length === 0 && <p className="p-4 text-gray-400">No workers yet.</p>}
      </div>
    </div>
  );
}
