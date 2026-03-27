import React, { useEffect, useState } from "react";
import { Trash2, Edit2, Calendar, Link as LinkIcon, CheckCircle2, XCircle, Search, MapPin } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const POSITION_TYPES = ["masters", "phd", "postdoc", "project"];

const POSITION_LABELS = {
  masters: "Masters (MBA/MTech/MSc)",
  phd: "PhD",
  postdoc: "Post-Doctoral",
  project: "Project Position"
};

const emptyForm = {
  positionType: "phd", courseName: "", institution: "", location: "",
  areaOfResearch: "", startDate: "", lastDate: "", description: "", externalLink: ""
};

export default function AdminAcademicPositions() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/academic-positions`);
      const json = await res.json();
      setItems(json.data || []);
    } catch { toast.error("Failed to fetch positions"); }
  };

  useEffect(() => { fetchItems(); }, []);

  const startEdit = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/academic-positions/${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error();
      const item = json.data;
      setEditingId(item._id);
      setForm({
        positionType: item.positionType || "phd",
        courseName: item.courseName || "", institution: item.institution || "",
        location: item.location || "", areaOfResearch: item.areaOfResearch || "",
        startDate: item.startDate || "", lastDate: item.lastDate || "", description: item.description || "",
        externalLink: item.externalLink || ""
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch { toast.error("Failed to load position"); }
    finally { setLoading(false); }
  };

  const cancelEdit = () => { setEditingId(null); setForm(emptyForm); };

  const submitItem = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!form.positionType || !form.lastDate) {
      toast.error("Position Type and Last Date are required");
      return;
    }
    try {
      setLoading(true);
      const url = editingId ? `${API_BASE}/academic-positions/admin/${editingId}` : `${API_BASE}/academic-positions/admin/upload`;
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      toast.success(editingId ? "Position updated" : "Position created");
      cancelEdit();
      fetchItems();
    } catch { toast.error("Save failed"); }
    finally { setLoading(false); }
  };

  const deleteItem = async (id) => {
    if (!confirm("Delete this position?")) return;
    try {
      setLoading(true);
      await fetch(`${API_BASE}/academic-positions/admin/${id}`, { method: "DELETE" });
      toast.success("Position deleted");
      fetchItems();
    } catch { toast.error("Delete failed"); }
    finally { setLoading(false); }
  };

  const filtered = items.filter(i =>
    (i.institution || "").toLowerCase().includes(search.toLowerCase()) ||
    (i.areaOfResearch || "").toLowerCase().includes(search.toLowerCase()) ||
    (i.courseName || "").toLowerCase().includes(search.toLowerCase()) ||
    (i.location || "").toLowerCase().includes(search.toLowerCase())
  );

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{editingId ? "Edit Academic Position" : "Academic Positions"}</h2>
          <p className="text-slate-500 text-sm mt-1">Masters, PhD, Post-Doctoral & Project positions</p>
        </div>
      </div>

      {/* FORM */}
      <div className="admin-card mb-8">
        <form onSubmit={submitItem} className="form-grid">
          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label className="text-sm font-medium text-slate-700">Position Type *</label>
            <select className="admin-input" value={form.positionType} onChange={e => set("positionType", e.target.value)} disabled={loading}>
              {POSITION_TYPES.map(t => <option key={t} value={t}>{POSITION_LABELS[t]}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Course / Program Name</label>
            <input className="admin-input" placeholder="e.g. PhD in Mathematics, MTech in CS" value={form.courseName} onChange={e => set("courseName", e.target.value)} disabled={loading} />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Institution</label>
            <input className="admin-input" placeholder="e.g. IIT Delhi, IIM Mumbai" value={form.institution} onChange={e => set("institution", e.target.value)} disabled={loading} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Location</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className="admin-input pl-9" placeholder="e.g. New Delhi, India" value={form.location} onChange={e => set("location", e.target.value)} disabled={loading} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Area of Research (Broad Area)</label>
            <input className="admin-input" placeholder="e.g. Applied Mathematics, Coding Theory" value={form.areaOfResearch} onChange={e => set("areaOfResearch", e.target.value)} disabled={loading} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Start Date</label>
            <input type="date" className="admin-input" value={form.startDate} onChange={e => set("startDate", e.target.value)} disabled={loading} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Last Date / Deadline *</label>
            <input type="date" className="admin-input" value={form.lastDate} onChange={e => set("lastDate", e.target.value)} required disabled={loading} />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">External Link</label>
            <div className="relative">
              <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className="admin-input pl-9" placeholder="https://..." value={form.externalLink} onChange={e => set("externalLink", e.target.value)} disabled={loading} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-3">
            <label className="text-sm font-medium text-slate-700">Description</label>
            <textarea rows={3} className="admin-input resize-y" placeholder="Details about the position..." value={form.description} onChange={e => set("description", e.target.value)} disabled={loading} />
          </div>

          <div className="md:col-span-3 flex items-center justify-end gap-3 mt-2 pt-4 border-t border-slate-100">
            {editingId && (
              <button type="button" onClick={cancelEdit} disabled={loading} className="btn-secondary !text-slate-600 !border-slate-200 hover:!bg-slate-50 flex items-center gap-2">
                <XCircle size={18} /> Cancel
              </button>
            )}
            <button type="submit" disabled={loading} className="admin-btn disabled:opacity-50">
              <CheckCircle2 size={18} /> {loading ? "Saving..." : editingId ? "Update Position" : "Add Position"}
            </button>
          </div>
        </form>
      </div>

      {/* TABLE */}
      <div className="admin-table-card">
        <div className="flex justify-end pt-4 px-6 mb-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search positions..." value={search} onChange={e => setSearch(e.target.value)} className="admin-input pl-9 w-64 text-sm py-1.5" />
          </div>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr><th>Position</th><th>Type</th><th>Location</th><th>Start Date</th><th>Last Date</th><th className="text-right">Actions</th></tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-8 text-slate-500">No positions found.</td></tr>
              ) : filtered.map(i => (
                <tr key={i._id}>
                  <td>
                    <div className="font-semibold text-slate-800 line-clamp-1">{i.courseName || "—"}</div>
                    {i.institution && <div className="text-xs text-slate-500 mt-0.5">{i.institution}</div>}
                    {i.areaOfResearch && <div className="text-xs text-indigo-600 mt-0.5">{i.areaOfResearch}</div>}
                  </td>
                  <td><span className="badge capitalize">{POSITION_LABELS[i.positionType] || i.positionType}</span></td>
                  <td className="text-sm text-slate-600">{i.location || "—"}</td>
                  <td className="text-sm text-emerald-600 font-medium">{i.startDate || "—"}</td>
                  <td className="text-sm text-rose-600 font-medium">{i.lastDate || "—"}</td>
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
