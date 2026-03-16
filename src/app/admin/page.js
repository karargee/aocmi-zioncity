import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [healingCount, salvationCount, prayerCount, newsletterCount, messages, events] =
    await Promise.all([
      prisma.healingSchoolEntry.count(),
      prisma.contact.count(),
      prisma.prayerRequest.count({ where: { isRead: false } }),
      prisma.newsletter.count(),
      prisma.message.findMany({ orderBy: { id: "desc" }, take: 5 }),
      prisma.event.findMany({ orderBy: { id: "desc" }, take: 5 }),
    ]);

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Healing School</h3>
          <p className="text-3xl font-bold">{healingCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Salvation Entries</h3>
          <p className="text-3xl font-bold">{salvationCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">
            Prayer Requests
            {prayerCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {prayerCount} new
              </span>
            )}
          </h3>
          <p className="text-3xl font-bold">{prayerCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Newsletter Subscribers</h3>
          <p className="text-3xl font-bold">{newsletterCount}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold mb-4">Recent Messages</h3>
          {messages.map((m) => (
            <div key={m.id} className="border-b py-2 text-sm">
              {m.title} — {new Date(m.createdAt).toLocaleDateString()}
            </div>
          ))}
          {messages.length === 0 && <p className="text-gray-400">No messages yet.</p>}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold mb-4">Recent Events</h3>
          {events.map((e) => (
            <div key={e.id} className="border-b py-2 text-sm">
              {e.title} — {e.dateOfEvent}
            </div>
          ))}
          {events.length === 0 && <p className="text-gray-400">No events yet.</p>}
        </div>
      </div>
    </div>
  );
}
