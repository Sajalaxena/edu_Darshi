import React, { useEffect, useState } from "react";
import { Trash2, Edit2, Calendar, Link as LinkIcon, CheckCircle2, XCircle, Search, Tag, MapPin } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const SUB_SUBJECTS = [
  "Foundations & Logic", "Algebra", "Geometry & Topology", "Analysis",
  "Functional Analysis & Harmonic Analysis", "Probability & Statistics",
  "Applied Mathematics", "Mathematical Physics", "Discrete Mathematics & Combinatorics",
  "Interdisciplinary Mathematics", "Other"
];

const LEVELS = ["All", "UG", "PG", "School", "Teaching Enrichment"];
const EVENT_TYPES = ["conference", "seminar", "workshop"];

const emptyForm = {
  title: "", eventType: "conference", subSubject: "", level: "All",
  venue: "", startDate: "", applicationDeadline: "", description: "", externalLink: ""
};

export default function AdminEvents() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/events`);
      const json = await res.json();
      setItems(json.data || []);
    } catch { toast.error("Failed to fetch events"); }
  };

  useEffect(() => { fetchItems(); }, []);

  const startEdit = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/events/${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error();
      const item = json.data;
      setEditingId(item._id);
      setForm({
        title: item.title || "", eventType: item.eventType || "conference",
        subSubject: item.subSubject || "", level: item.level || "All",
        venue: item.venue || "", startDate: item.startDate || "",
        applicationDeadline: item.applicationDeadline || "",
        description: item.description || "", externalLink: item.externalLink || ""
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch { toast.error("Failed to load event"); }
    finally { setLoading(false); }
  };

  const cancelEdit = () => { setEditingId(null); setForm(emptyForm); };

  const submitItem = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!form.title || !form.startDate) {
      toast.error("Title and Start Date are required");
      return;
    }
    try {
      setLoading(true);
      const url = editingId ? `${API_BASE}/events/admin/${editingId}` : `${API_BASE}/events/admin/upload`;
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      toast.success(editingId ? "Event updated" : "Event created");
      cancelEdit();
      fetchItems();
    } catch { toast.error("Save failed"); }
    finally { setLoading(false); }
  };

  const deleteItem = async (id) => {
    if (!confirm("Delete this event?")) return;
    try {
      setLoading(true);
      await fetch(`${API_BASE}/events/admin/${id}`, { method: "DELETE" });
      toast.success("Event deleted");
      fetchItems();
    } catch { toast.error("Delete failed"); }
    finally { setLoading(false); }
  };

  const filtered = items.filter(i =>
    i.title?.toLowerCase().includes(search.toLowerCase()) ||
    i.venue?.toLowerCase().includes(search.toLowerCase()) ||
    i.subSubject?.toLowerCase().includes(search.toLowerCase())
  );

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{editingId ? "Edit Event" : "Events – Workshops / Seminars / Conferences"}</h2>
          <p className="text-slate-500 text-sm mt-1">Manage academic events, workshops, and conferences</p>
        </div>
      </div>

      {/* FORM */}
      <div className="admin-card mb-8">
        <form onSubmit={submitItem} className="form-grid">
          <div className="flex flex-col gap-1.5 md:col-span-3">
            <label className="text-sm font-medium text-slate-700">Event Title *</label>
            <input className="admin-input" placeholder="e.g. ENCODE Workshop 2026: Coding Theory" value={form.title} onChange={e => set("title", e.target.value)} required disabled={loading} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Event Type</label>
            <select className="admin-input capitalize" value={form.eventType} onChange={e => set("eventType", e.target.value)} disabled={loading}>
              {EVENT_TYPES.map(t => <option key={t} value={t} className="capitalize">{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Level</label>
            <select className="admin-input" value={form.level} onChange={e => set("level", e.target.value)} disabled={loading}>
              {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Sub-Subject</label>
            <select className="admin-input" value={form.subSubject} onChange={e => set("subSubject", e.target.value)} disabled={loading}>
              <option value="">-- Select Sub-Subject --</option>
              {SUB_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Venue / Platform</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className="admin-input pl-9" placeholder="e.g. IIT Delhi / Online (Zoom)" value={form.venue} onChange={e => set("venue", e.target.value)} disabled={loading} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Start Date *</label>
            <input type="date" className="admin-input" value={form.startDate} onChange={e => set("startDate", e.target.value)} required disabled={loading} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Application Deadline</label>
            <input type="date" className="admin-input" value={form.applicationDeadline} onChange={e => set("applicationDeadline", e.target.value)} disabled={loading} />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">External Link</label>
            <div className="relative">
              <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className="admin-input pl-9" placeholder="https://event.example.com" value={form.externalLink} onChange={e => set("externalLink", e.target.value)} disabled={loading} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-3">
            <label className="text-sm font-medium text-slate-700">Description</label>
            <textarea rows={3} className="admin-input resize-y" placeholder="Brief description of the event..." value={form.description} onChange={e => set("description", e.target.value)} disabled={loading} />
          </div>

          <div className="md:col-span-3 flex items-center justify-end gap-3 mt-2 pt-4 border-t border-slate-100">
            {editingId && (
              <button type="button" onClick={cancelEdit} disabled={loading} className="btn-secondary !text-slate-600 !border-slate-200 hover:!bg-slate-50 flex items-center gap-2">
                <XCircle size={18} /> Cancel
              </button>
            )}
            <button type="submit" disabled={loading} className="admin-btn disabled:opacity-50">
              <CheckCircle2 size={18} /> {loading ? "Saving..." : editingId ? "Update Event" : "Add Event"}
            </button>
          </div>
        </form>
      </div>

      {/* TABLE */}
      <div className="admin-table-card">
        <div className="flex justify-end pt-4 px-6 mb-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)} className="admin-input pl-9 w-64 text-sm py-1.5" />
          </div>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Event</th><th>Type</th><th>Level</th><th>Start Date</th><th>Deadline</th><th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-8 text-slate-500">No events found.</td></tr>
              ) : filtered.map(i => (
                <tr key={i._id}>
                  <td>
                    <div className="font-semibold text-slate-800 line-clamp-1">{i.title}</div>
                    {i.venue && <div className="text-xs text-slate-500 mt-0.5">📍 {i.venue}</div>}
                    {i.subSubject && <div className="text-xs text-indigo-600 mt-0.5">{i.subSubject}</div>}
                  </td>
                  <td><span className="badge capitalize">{i.eventType}</span></td>
                  <td><span className="badge">{i.level}</span></td>
                  <td className="text-sm text-slate-600">{i.startDate || "—"}</td>
                  <td className="text-sm text-rose-600">{i.applicationDeadline || "—"}</td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => startEdit(i._id)} className="edit-btn" title="Edit"><Edit2 size={18} /></button>
                      <button onClick={() => deleteItem(i._id)} className="delete-btn" title="Delete"><Trash2 size={18} /></button>
                    </div>
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
