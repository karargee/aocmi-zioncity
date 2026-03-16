"use client";
import { useState, useEffect } from "react";

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/newsletter")
      .then((r) => r.json())
      .then((d) => {
        setSubscribers(d.subscribers || []);
        setCount(d.count || 0);
      });
  }, []);

  function exportCSV() {
    const csv = "Email,Date\n" + subscribers.map((s) =>
      `${s.email},${new Date(s.createdAt).toLocaleDateString()}`
    ).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter-subscribers.csv";
    a.click();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Newsletter Subscribers ({count})</h2>
        {count > 0 && (
          <button onClick={exportCSV} className="bg-green-600 text-white px-4 py-2 rounded text-sm">
            <i className="fas fa-download mr-2" />Export CSV
          </button>
        )}
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Subscribed On</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s, i) => (
              <tr key={s.id} className="border-t">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{s.email}</td>
                <td className="p-3">{new Date(s.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {count === 0 && <p className="p-4 text-gray-400">No subscribers yet.</p>}
      </div>
    </div>
  );
}
