import React, { useState } from "react";
import { CheckCircle2, Circle, Mail, Phone, BookOpen, Search } from "lucide-react";

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
  const [search, setSearch] = useState("");

  function toggle(id) {
    setRows((rs) =>
      rs.map((r) => (r.id === id ? { ...r, checked: !r.checked } : r))
    );
  }

  const filteredRows = rows.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase()) ||
    r.phone.includes(search) ||
    r.exam.toLowerCase().includes(search.toLowerCase()) ||
    r.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Client Queries</h2>
          <p className="text-slate-500 text-sm mt-1">Review and manage student inquiries</p>
        </div>
      </div>

      <div className="admin-table-card">
        <div className="flex justify-end pt-4 px-6 mb-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search queries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-input pl-9 w-64 text-sm py-1.5"
            />
          </div>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student info</th>
                <th>Contact</th>
                <th>Requirement</th>
                <th>Message</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="font-semibold text-slate-800">{r.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">ID: #{r.id}</div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                      <Mail size={14} className="text-slate-400" />
                      {r.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone size={14} className="text-slate-400" />
                      {r.phone}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="badge border border-indigo-100 bg-indigo-50 text-indigo-700">
                        {r.exam}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <BookOpen size={12} />
                        {r.subject}
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-sm text-slate-600 max-w-[200px] truncate" title={r.msg}>
                      {r.msg}
                    </p>
                  </td>
                  <td>
                    {r.checked ? (
                      <span className="badge success">Resolved</span>
                    ) : (
                      <span className="badge warning">Pending</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => toggle(r.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${r.checked
                        ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                        }`}
                    >
                      {r.checked ? (
                        <>
                          <CheckCircle2 size={16} /> Update
                        </>
                      ) : (
                        <>
                          <Circle size={16} /> Mark Done
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
