import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/DeleteButton";

export default async function SalvationEntries() {
  const contacts = await prisma.contact.findMany({ orderBy: { id: "desc" } });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">All Salvation Entries</h2>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.fullname}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.phone}</td>
                <td className="p-3">{c.location}</td>
                <td className="p-3">{new Date(c.createdAt).toLocaleDateString()}</td>
                <td className="p-3">
                  <DeleteButton url={`/api/contact/${c.id}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {contacts.length === 0 && <p className="p-4 text-gray-400">No entries yet.</p>}
      </div>
    </div>
  );
}
