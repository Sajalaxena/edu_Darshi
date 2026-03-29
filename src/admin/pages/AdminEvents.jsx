import React, { useEffect, useState } from "react";
import { Trash2, Edit2, Calendar, Link as LinkIcon, CheckCircle2, XCircle, Search, Tag, MapPin, FileSpreadsheet } from "lucide-react";
import toast from "react-hot-toast";
import AdminPagination from "../components/AdminPagination";
import DeleteModal from "../components/DeleteModal";
import BulkUploadModal from "../components/BulkUploadModal";

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
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const parseDate = (d) => {
    if (!d) return 0;
    let s = String(d).trim();
    s = s.replace(/([a-zA-Z]+)\s+\d+\s*-\s*(\d+)/, "$1 $2");
    
    if (s.includes("-")) {
      const p = s.split("-");
      if (p.length === 3) {
        if (p[0].length === 4) return new Date(`${p[0]}-${p[1]}-${p[2]}T23:59:59`).getTime();
        if (p[2].length === 4) return new Date(`${p[2]}-${p[1]}-${p[0]}T23:59:59`).getTime();
      }
    }
    let testT = new Date(s).getTime();
    return isNaN(testT) ? 0 : testT;
  };

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

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
    if (form.startDate && form.applicationDeadline && parseDate(form.startDate) > parseDate(form.applicationDeadline)) {
      toast.error("Start Date cannot be greater than Application Deadline");
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

  const confirmDelete = async () => {
    try {
      setLoading(true);
      if (deleteConfirmId === "BULK") {
        await Promise.all(
          Array.from(selectedIds).map(id => fetch(`${API_BASE}/events/admin/${id}`, { method: "DELETE" }))
        );
        toast.success(`Deleted ${selectedIds.size} events`);
        setSelectedIds(new Set());
      } else {
        await fetch(`${API_BASE}/events/admin/${deleteConfirmId}`, { method: "DELETE" });
        toast.success("Event deleted");
      }
      fetchItems();
    } catch { toast.error("Delete failed"); }
    finally { setLoading(false); setDeleteConfirmId(null); }
  };

  const filtered = items.filter(i =>
    i.title?.toLowerCase().includes(search.toLowerCase()) ||
    i.venue?.toLowerCase().includes(search.toLowerCase()) ||
    i.subSubject?.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const toggleAll = (e) => {
    if (e.target.checked) setSelectedIds(new Set(paginatedData.map(i => i._id)));
    else setSelectedIds(new Set());
  };

  const toggleOne = (id) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
    setSelectedIds(newSet);
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{editingId ? "Edit Event" : "Events – Workshops / Seminars / Conferences"}</h2>
          <p className="text-slate-500 text-sm mt-1">Manage academic events, workshops, and conferences</p>
        </div>
        <div className="flex gap-2">
          {selectedIds.size > 0 && (
            <button onClick={() => setDeleteConfirmId("BULK")} className="btn-secondary !text-rose-600 !bg-white hover:!bg-rose-50 border-rose-200 shadow-sm flex items-center gap-2 font-medium">
              <Trash2 size={16} /> Delete Selected ({selectedIds.size})
            </button>
          )}
          {!editingId && (
            <button onClick={() => setBulkUploadOpen(true)} className="btn-secondary !text-slate-700 !bg-white hover:!bg-slate-50 border-slate-200 shadow-sm flex items-center gap-2 font-medium">
              <FileSpreadsheet size={16} className="text-indigo-600" />
              Bulk Upload
            </button>
          )}
        </div>
      </div>

      {/* FORM */}
      <div className="admin-card mb-8">
        <form onSubmit={submitItem} className="form-grid">
          <div className="flex flex-col gap-1.5 md:col-span-3">
            <label className="text-sm font-medium text-slate-700 flex items-center">Event Title <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block ml-1"></span></label>
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
            <label className="text-sm font-medium text-slate-700 flex items-center">Start Date <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block ml-1"></span></label>
            <input type="text" placeholder="e.g. 15 March 2026" className="admin-input" value={form.startDate} onChange={e => set("startDate", e.target.value)} required disabled={loading} />
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
                <th className="w-12"><input type="checkbox" checked={paginatedData.length > 0 && selectedIds.size === paginatedData.length} onChange={toggleAll} className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /></th>
                <th>Event</th><th>Type</th><th>Level</th><th>Start Date</th><th>Deadline</th><th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr><td colSpan="7" className="text-center py-8 text-slate-500">No events found.</td></tr>
              ) : paginatedData.map(i => (
                <tr key={i._id}>
                  <td><input type="checkbox" checked={selectedIds.has(i._id)} onChange={() => toggleOne(i._id)} className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /></td>
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
                      <button onClick={() => setDeleteConfirmId(i._id)} className="delete-btn" title="Delete"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <AdminPagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        )}
      </div>

      <DeleteModal 
        isOpen={!!deleteConfirmId} 
        onClose={() => setDeleteConfirmId(null)} 
        onConfirm={confirmDelete} 
        title={deleteConfirmId === "BULK" ? "Delete Selected Events" : "Delete Event"}
        message={deleteConfirmId === "BULK" ? `Are you sure you want to delete ${selectedIds.size} events? This action cannot be undone.` : "Are you sure you want to delete this event? This action cannot be undone."}
      />

      <BulkUploadModal
        isOpen={bulkUploadOpen}
        onClose={() => setBulkUploadOpen(false)}
        endpoint={`${API_BASE}/events/admin/bulk-upload`}
        title="Bulk Upload Events"
        instructions={`Upload an Excel or CSV file.
Required columns: 'title', 'startDate'
Optional columns: 'eventType', 'subSubject', 'level', 'venue', 'applicationDeadline', 'description', 'externalLink'`}
        onUploadSuccess={fetchItems}
      />
    </section>
  );
}
