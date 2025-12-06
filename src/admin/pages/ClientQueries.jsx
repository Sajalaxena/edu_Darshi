import React, { useState } from "react";

/*
 Hardcoded client queries. Each row has checked: boolean (green) or false (red).
 Clicking button toggles checked state (demo only).
*/

const initial = [
  {
    id: 1,
    name: "Ravi Kumar",
    email: "ravi@example.com",
    phone: "9876543210",
    exam: "NEET",
    subject: "Biology",
    msg: "Please help for NEET prep",
    checked: false,
  },
  {
    id: 2,
    name: "Anita Sharma",
    email: "anita@example.com",
    phone: "9123456780",
    exam: "JEE",
    subject: "Physics",
    msg: "Need mentor for mechanics",
    checked: true,
  },
];

export default function ClientQueries() {
  const [rows, setRows] = useState(initial);

  function toggle(id) {
    setRows((rs) =>
      rs.map((r) => (r.id === id ? { ...r, checked: !r.checked } : r))
    );
  }

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Client Queries</h2>
      <div className="overflow-auto card p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-slate-500">
              <th>#</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Exam/Subject</th>
              <th>Message</th>
              <th>Checked</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="py-3">{r.id}</td>
                <td className="py-3">
                  {r.name}
                  <div className="text-xs text-slate-400">{r.email}</div>
                </td>
                <td className="py-3">{r.phone}</td>
                <td className="py-3">
                  {r.exam} / {r.subject}
                </td>
                <td className="py-3">{r.msg}</td>
                <td className="py-3">
                  <button
                    onClick={() => toggle(r.id)}
                    className={`px-3 py-1 rounded ${
                      r.checked
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                    title={r.checked ? "Marked checked" : "Not checked"}
                  >
                    {r.checked ? "Checked" : "Not checked"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
