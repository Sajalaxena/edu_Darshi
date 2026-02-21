import React, { useEffect, useState } from "react";
import { Trash2, Edit2, Video, Calendar, Clock, Monitor, Link as LinkIcon, PlusCircle, CheckCircle2, XCircle, Search } from "lucide-react";

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
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const filteredWebinars = webinars.filter((w) =>
    w.title.toLowerCase().includes(search.toLowerCase()) ||
    (w.platform && w.platform.toLowerCase().includes(search.toLowerCase()))
  );

  /* pagination */
  const [page, setPage] = useState(1);
  const limit = 5;
  const totalPages = Math.max(1, Math.ceil(filteredWebinars.length / limit));

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

  /* ================= CREATE / UPDATE ================= */
  async function submit(e) {
    e.preventDefault();
    if (saving) return;

    try {
      setSaving(true);

      const url = editingId
        ? `${API_BASE}/webinars/admin/${editingId}`
        : `${API_BASE}/webinars`;

      const method = editingId ? "PUT" : "POST";

      await fetch(url, {
        method,
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

      setEditingId(null);
      fetchWebinars();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  /* ================= START EDIT ================= */
  function startEdit(webinar) {
    setEditingId(webinar._id);
    setForm({
      title: webinar.title || "",
      date: webinar.date || "",
      time: webinar.time || "",
      platform: webinar.platform || "",
      description: webinar.description || "",
      registrationLink: webinar.registrationLink || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ================= DELETE ================= */
  async function remove(id) {
    if (!window.confirm("Delete this webinar?")) return;

    await fetch(`${API_BASE}/webinars/${id}`, {
      method: "DELETE",
    });

    fetchWebinars();
  }

  const pagedData = filteredWebinars.slice((page - 1) * limit, page * limit);

  return (
    <section>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            {editingId ? "Edit Webinar" : "Upcoming Webinars"}
          </h2>
          <p className="text-slate-500 text-sm mt-1">Schedule and manage live sessions</p>
        </div>
      </div>

      {/* ================= FORM ================= */}
      <div className="admin-card mb-8">
        <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Video size={18} className="text-indigo-500" /> Webinar Details
        </h3>
        <form onSubmit={submit} className="form-grid">
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Webinar Title</label>
            <input
              className="admin-input"
              placeholder="e.g. Masterclass on Quantum Computing"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              disabled={saving}
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label className="text-sm font-medium text-slate-700">Date</label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="admin-input pl-10"
                placeholder="e.g. 12 Feb 2026"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
                disabled={saving}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label className="text-sm font-medium text-slate-700">Time</label>
            <div className="relative">
              <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="admin-input pl-10"
                placeholder="e.g. 10:00 AM IST"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
                disabled={saving}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Platform</label>
            <div className="relative">
              <Monitor size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="admin-input pl-10"
                placeholder="e.g. Zoom / Google Meet / YouTube Live"
                value={form.platform}
                onChange={(e) => setForm({ ...form, platform: e.target.value })}
                disabled={saving}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Registration Link</label>
            <div className="relative">
              <LinkIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="admin-input pl-10"
                placeholder="https://zoom.us/webinar/..."
                value={form.registrationLink}
                onChange={(e) => setForm({ ...form, registrationLink: e.target.value })}
                disabled={saving}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-4">
            <label className="text-sm font-medium text-slate-700">Short Description</label>
            <textarea
              className="admin-input h-24 resize-y"
              placeholder="Briefly describe what this webinar will cover..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              disabled={saving}
            />
          </div>

          <div className="md:col-span-4 flex items-center justify-end gap-3 mt-2 pt-4 border-t border-slate-100">
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({
                    title: "",
                    date: "",
                    time: "",
                    platform: "",
                    description: "",
                    registrationLink: "",
                  });
                }}
                className="btn-secondary !text-slate-600 !border-slate-200 hover:!bg-slate-50 flex items-center gap-2"
              >
                <XCircle size={18} /> Cancel
              </button>
            )}
            <button
              disabled={saving}
              className="admin-btn disabled:opacity-50"
            >
              {saving ? (
                "Saving..."
              ) : editingId ? (
                <>
                  <CheckCircle2 size={18} /> Update Webinar
                </>
              ) : (
                <>
                  <PlusCircle size={18} /> Add Webinar
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ================= TABLE ================= */}
      <div className="admin-table-card">
        <div className="flex justify-end pt-4 px-6 mb-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search webinars..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="admin-input pl-9 w-64 text-sm py-1.5"
            />
          </div>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table text-sm">
            <thead>
              <tr>
                <th>Webinar Title</th>
                <th>Schedule</th>
                <th>Platform</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-slate-400">
                    Loading...
                  </td>
                </tr>
              )}

              {!loading && pagedData.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-slate-500">
                    <Video size={32} className="mx-auto mb-2 text-slate-300" />
                    No upcoming webinars found.
                  </td>
                </tr>
              )}

              {!loading &&
                pagedData.map((w) => (
                  <tr key={w._id}>
                    <td>
                      <div className="font-semibold text-slate-800 tracking-tight">{w.title}</div>
                      {w.registrationLink && (
                        <a href={w.registrationLink} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 hover:text-indigo-800 mt-1 flex items-center gap-1 w-max">
                          <LinkIcon size={12} /> Registration Link
                        </a>
                      )}
                    </td>
                    <td>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 w-max px-2 py-1 rounded-md">
                          <Calendar size={14} className="text-slate-500" /> {w.date}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-100 w-max px-2 py-1 rounded-md">
                          <Clock size={14} className="text-amber-500" /> {w.time}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Monitor size={16} className="text-slate-400" />
                        {w.platform || "-"}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => startEdit(w)}
                          className="edit-btn"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => remove(w._id)}
                          className="delete-btn"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
          <span className="text-sm text-slate-500">
            Page <strong className="text-slate-800">{page}</strong> of <strong className="text-slate-800">{totalPages}</strong>
          </span>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              Previous
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
