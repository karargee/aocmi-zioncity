import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DeleteButton from "@/components/DeleteButton";

export default async function AdminEvents() {
  const session = await getServerSession(authOptions);
  const events = await prisma.event.findMany({
    where: { userId: session.user.id },
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Events</h2>
        <Link href="/admin/events/create" className="bg-primary text-white px-4 py-2 rounded">
          Add Event
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id} className="border-t">
                <td className="p-3">{e.title}</td>
                <td className="p-3">{e.dateOfEvent}</td>
                <td className="p-3 flex gap-2">
                  <Link href={`/admin/events/${e.slug}/edit`} className="text-blue-600">Edit</Link>
                  <DeleteButton url={`/api/events/${e.slug}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {events.length === 0 && <p className="p-4 text-gray-400">No events yet.</p>}
      </div>
    </div>
  );
}
