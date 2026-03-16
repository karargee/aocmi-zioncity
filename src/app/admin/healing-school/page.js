import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/DeleteButton";

export default async function HealingSchoolEntries() {
  const entries = await prisma.healingSchoolEntry.findMany({ orderBy: { id: "desc" } });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Healing School Entries</h2>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">State</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Problem</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className="border-t">
                <td className="p-3">{e.fullname}</td>
                <td className="p-3">{e.email}</td>
                <td className="p-3">{e.phone}</td>
                <td className="p-3">{e.state}</td>
                <td className="p-3">{e.city}</td>
                <td className="p-3">{e.problem}</td>
                <td className="p-3">
                  <DeleteButton url={`/api/healing-school/${e.id}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {entries.length === 0 && <p className="p-4 text-gray-400">No entries yet.</p>}
      </div>
    </div>
  );
}
