import React, { useEffect, useState } from "react";
import { Trash } from "phosphor-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function AdminUpcomingWebinars() {
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    platform: "",
    description: "",
    registrationLink: "",
  });

  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);

  /* pagination */
  const [page, setPage] = useState(1);
  const limit = 5;
  const totalPages = Math.max(1, Math.ceil(webinars.length / limit));

  /* ================= FETCH ================= */
  async function fetchWebinars() {
    try {
      const res = await fetch(`${API_BASE}/webinars`);
      const data = await res.json();
      setWebinars(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWebinars();
  }, []);

  /* ================= CREATE ================= */
  async function submit(e) {
    e.preventDefault();
    await fetch(`${API_BASE}/webinars`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({
      title: "",
      date: "",
      time: "",
      platform: "",
      description: "",
      registrationLink: "",
    });
    fetchWebinars();
  }

  /* ================= DELETE ================= */
  async function remove(id) {
    if (!window.confirm("Delete this webinar?")) return;
    await fetch(`${API_BASE}/webinars/${id}`, { method: "DELETE" });
    fetchWebinars();
  }

  const pagedData = webinars.slice((page - 1) * limit, page * limit);

  return (
    <div className="space-y-8">
      {/* ================= FORM ================= */}
      <form
        onSubmit={submit}
        className="bg-white rounded-2xl border shadow-sm p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            className="input"
            placeholder="Webinar Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <input
            className="input"
            placeholder="Date (12 Feb 2026)"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />

          <input
            className="input"
            placeholder="Time (7:00 PM IST)"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            required
          />

          <input
            className="input"
            placeholder="Platform (Zoom / YouTube)"
            value={form.platform}
            onChange={(e) => setForm({ ...form, platform: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <textarea
            className="input h-24 resize-none md:col-span-2"
            placeholder="Short description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <div className="flex flex-col gap-4">
            <input
              className="input"
              placeholder="Registration link"
              value={form.registrationLink}
              onChange={(e) =>
                setForm({ ...form, registrationLink: e.target.value })
              }
            />

            <button className="btn-primary w-full h-11">
              Add Webinar
            </button>
          </div>
        </div>
      </form>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-blue-50 text-slate-700">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Platform</th>
              <th className="px-4 py-3 text-center">Link</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="6" className="py-10 text-center text-slate-400">
                  Loading...
                </td>
              </tr>
            )}

            {!loading &&
              pagedData.map((w, idx) => (
                <tr
                  key={w._id}
                  className={idx % 2 ? "bg-blue-50/40" : ""}
                >
                  <td className="px-4 py-3 font-medium">{w.title}</td>
                  <td className="px-4 py-3 text-center">{w.date}</td>
                  <td className="px-4 py-3 text-center">{w.time}</td>
                  <td className="px-4 py-3 text-center">{w.platform}</td>
                  <td className="px-4 py-3 text-center">
                    {w.registrationLink ? "Link" : "-"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => remove(w._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* ================= PAGINATION ================= */}
        <div className="flex items-center justify-between px-4 py-4">
          <span className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </span>

          <div className="flex gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="btn-secondary px-5 disabled:opacity-40"
            >
              Prev
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="btn-primary px-5 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
