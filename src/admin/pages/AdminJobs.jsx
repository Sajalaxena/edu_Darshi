import React, { useEffect, useState } from "react";
import { Trash2, Edit2, Calendar, Link as LinkIcon, CheckCircle2, XCircle, Search, MapPin, Briefcase } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const emptyForm = {
  title: "", institution: "", designation: "", area: "",
  location: "", postedDate: "", deadline: "", description: "", externalLink: ""
};

export default function AdminJobs() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/jobs`);
      const json = await res.json();
      setItems(json.data || []);
    } catch { toast.error("Failed to fetch jobs"); }
  };

  useEffect(() => { fetchItems(); }, []);

  const startEdit = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/jobs/${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error();
      const item = json.data;
      setEditingId(item._id);
      setForm({
        title: item.title || "", institution: item.institution || "",
        designation: item.designation || "", area: item.area || "",
        location: item.location || "", postedDate: item.postedDate || "",
        deadline: item.deadline || "", description: item.description || "",
        externalLink: item.externalLink || ""
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch { toast.error("Failed to load job"); }
    finally { setLoading(false); }
  };

  const cancelEdit = () => { setEditingId(null); setForm(emptyForm); };

  const submitItem = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!form.title || !form.deadline) {
      toast.error("Title and Deadline are required");
      return;
    }
    try {
      setLoading(true);
      const url = editingId ? `${API_BASE}/jobs/admin/${editingId}` : `${API_BASE}/jobs/admin/upload`;
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      toast.success(editingId ? "Job updated" : "Job created");
      cancelEdit();
      fetchItems();
    } catch { toast.error("Save failed"); }
    finally { setLoading(false); }
  };

  const deleteItem = async (id) => {
    if (!confirm("Delete this job?")) return;
    try {
      setLoading(true);
      await fetch(`${API_BASE}/jobs/admin/${id}`, { method: "DELETE" });
      toast.success("Job deleted");
      fetchItems();
    } catch { toast.error("Delete failed"); }
    finally { setLoading(false); }
  };

  const filtered = items.filter(i =>
    (i.title || "").toLowerCase().includes(search.toLowerCase()) ||
    (i.institution || "").toLowerCase().includes(search.toLowerCase()) ||
    (i.designation || "").toLowerCase().includes(search.toLowerCase()) ||
    (i.area || "").toLowerCase().includes(search.toLowerCase())
  );

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{editingId ? "Edit Job" : "Jobs"}</h2>
          <p className="text-slate-500 text-sm mt-1">Manage faculty and academic job listings</p>
        </div>
      </div>

      {/* FORM */}
      <div className="admin-card mb-8">
        <form onSubmit={submitItem} className="form-grid">
          <div className="flex flex-col gap-1.5 md:col-span-3">
            <label className="text-sm font-medium text-slate-700">Job Title *</label>
            <input className="admin-input" placeholder="e.g. Faculty Recruitment 2026 at IIM Mumbai" value={form.title} onChange={e => set("title", e.target.value)} required disabled={loading} />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Institution</label>
            <input className="admin-input" placeholder="e.g. IIM Mumbai" value={form.institution} onChange={e => set("institution", e.target.value)} disabled={loading} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Designation</label>
            <div className="relative">
              <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className="admin-input pl-9" placeholder="e.g. Associate Professor, Professor" value={form.designation} onChange={e => set("designation", e.target.value)} disabled={loading} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Area</label>
            <input className="admin-input" placeholder="e.g. Business Economics, Public Policy" value={form.area} onChange={e => set("area", e.target.value)} disabled={loading} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Location</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className="admin-input pl-9" placeholder="e.g. Mumbai, India" value={form.location} onChange={e => set("location", e.target.value)} disabled={loading} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Posted Date</label>
            <input type="date" className="admin-input" value={form.postedDate} onChange={e => set("postedDate", e.target.value)} disabled={loading} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Deadline *</label>
            <input type="date" className="admin-input" value={form.deadline} onChange={e => set("deadline", e.target.value)} required disabled={loading} />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-3">
            <label className="text-sm font-medium text-slate-700">External Link</label>
            <div className="relative">
              <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className="admin-input pl-9" placeholder="https://..." value={form.externalLink} onChange={e => set("externalLink", e.target.value)} disabled={loading} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-3">
            <label className="text-sm font-medium text-slate-700">Description</label>
            <textarea rows={3} className="admin-input resize-y" placeholder="Details about the job..." value={form.description} onChange={e => set("description", e.target.value)} disabled={loading} />
          </div>

          <div className="md:col-span-3 flex items-center justify-end gap-3 mt-2 pt-4 border-t border-slate-100">
            {editingId && (
              <button type="button" onClick={cancelEdit} disabled={loading} className="btn-secondary !text-slate-600 !border-slate-200 hover:!bg-slate-50 flex items-center gap-2">
                <XCircle size={18} /> Cancel
              </button>
            )}
            <button type="submit" disabled={loading} className="admin-btn disabled:opacity-50">
              <CheckCircle2 size={18} /> {loading ? "Saving..." : editingId ? "Update Job" : "Add Job"}
            </button>
          </div>
        </form>
      </div>

      {/* TABLE */}
      <div className="admin-table-card">
        <div className="flex justify-end pt-4 px-6 mb-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search jobs..." value={search} onChange={e => setSearch(e.target.value)} className="admin-input pl-9 w-64 text-sm py-1.5" />
          </div>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr><th>Job</th><th>Designation</th><th>Location</th><th>Posted</th><th>Deadline</th><th className="text-right">Actions</th></tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-8 text-slate-500">No jobs found.</td></tr>
              ) : filtered.map(i => (
                <tr key={i._id}>
                  <td>
                    <div className="font-semibold text-slate-800 line-clamp-1">{i.title}</div>
                    {i.institution && <div className="text-xs text-slate-500 mt-0.5">{i.institution}</div>}
                    {i.area && <div className="text-xs text-indigo-600 mt-0.5">{i.area}</div>}
                  </td>
                  <td className="text-sm text-slate-600">{i.designation || "—"}</td>
                  <td className="text-sm text-slate-600">{i.location || "—"}</td>
                  <td className="text-sm text-slate-500">{i.postedDate || "—"}</td>
                  <td className="text-sm text-rose-600 font-medium">{i.deadline || "—"}</td>
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
