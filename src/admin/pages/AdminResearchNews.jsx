import React, { useEffect, useState } from "react";
import { Trash } from "phosphor-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function AdminResearchNews() {
  const [form, setForm] = useState({
    title: "",
    type: "News", // News | Webinar
    source: "",
    date: "",
    summary: "",
    link: "",
  });

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* pagination */
  const [page, setPage] = useState(1);
  const limit = 5;
  const totalPages = Math.max(1, Math.ceil(items.length / limit));

  /* ---------------- FETCH ---------------- */
  async function fetchItems() {
    try {
      const res = await fetch(`${API_BASE}/research-news`);
      const data = await res.json();
      setItems(data.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  /* ---------------- CREATE ---------------- */
  async function submit(e) {
    e.preventDefault();
    await fetch(`${API_BASE}/admin/research-news`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({
      title: "",
      type: "News",
      source: "",
      date: "",
      summary: "",
      link: "",
    });
    fetchItems();
  }

  /* ---------------- DELETE ---------------- */
  async function remove(id) {
    if (!window.confirm("Delete this item?")) return;
    await fetch(`${API_BASE}/admin/research-news/${id}`, { method: "DELETE" });
    fetchItems();
  }

  const pagedData = items.slice((page - 1) * limit, page * limit);

  return (
    <div className="space-y-8">
      {/* ================= FORM ================= */}
      <form
        onSubmit={submit}
        className="bg-white rounded-2xl border shadow-sm p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            placeholder="Title"
            className="input"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <select
            className="input"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option>News</option>
            <option>Webinar</option>
          </select>

          <input
            placeholder="Source (Nature, Zoom, YouTube...)"
            className="input"
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
          />

          <input
            placeholder="Published Date"
            className="input"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <textarea
            placeholder="Short summary"
            className="input h-24 md:col-span-2 resize-none"
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
          />

          <div className="flex flex-col gap-4">
            <input
              placeholder="External link (optional)"
              className="input"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
            />

            <button className="btn-primary w-full h-11">
              Add Item
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
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Date</th>
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
              pagedData.map((i, idx) => (
                <tr
                  key={i._id}
                  className={idx % 2 ? "bg-blue-50/40" : ""}
                >
                  <td className="px-4 py-3 font-medium">{i.title}</td>
                  <td className="px-4 py-3 text-center">{i.type}</td>
                  <td className="px-4 py-3 text-center">{i.source}</td>
                  <td className="px-4 py-3 text-center">{i.date}</td>
                  <td className="px-4 py-3 text-center">
                    {i.link ? "Link" : "-"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => remove(i._id)}
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
