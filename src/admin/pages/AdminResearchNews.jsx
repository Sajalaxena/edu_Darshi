import React, { useEffect, useState } from "react";
import { Trash2, Edit2, Newspaper, Link as LinkIcon, Calendar, CheckCircle2, FileText, XCircle, Search } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function AdminResearchNews() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    summary: "",
    type: "research",
    source: "",
    externalLink: "",
    publishedDate: "",
  });

  /* ---------------- FETCH LIST ---------------- */
  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/research-news`);
      const json = await res.json();
      setItems(json.data || []);
    } catch {
      toast.error("Failed to fetch research/news");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  /* ---------------- START EDIT ---------------- */
  const startEdit = async (id) => {
    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/research-news/${id}`);
      const json = await res.json();

      if (!res.ok) throw new Error();

      const item = json.data;

      setEditingId(item._id);
      setForm({
        title: item.title || "",
        summary: item.summary || "",
        type: item.type || "research",
        source: item.source || "",
        externalLink: item.externalLink || "",
        publishedDate: item.publishedDate
          ? item.publishedDate.split("T")[0]
          : "",
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast.error("Failed to load item");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- CANCEL EDIT ---------------- */
  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      title: "",
      summary: "",
      type: "research",
      source: "",
      externalLink: "",
      publishedDate: "",
    });
  };

  /* ---------------- CREATE / UPDATE ---------------- */
  const submitItem = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!form.title || !form.summary || !form.type || !form.publishedDate) {
      toast.error("Title, summary, type and published date are required");
      return;
    }

    try {
      setLoading(true);

      const url = editingId
        ? `${API_BASE}/research-news/admin/${editingId}`
        : `${API_BASE}/research-news/admin/upload`;

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      toast.success(
        editingId ? "Item updated successfully" : "Item created successfully"
      );

      cancelEdit();
      fetchItems();
    } catch {
      toast.error("Save failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE ---------------- */
  const deleteItem = async (id) => {
    if (loading) return;
    if (!confirm("Delete this item?")) return;

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/research-news/admin/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      toast.success("Item deleted");
      fetchItems();
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    (i.source && i.source.toLowerCase().includes(search.toLowerCase())) ||
    (i.type && i.type.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            {editingId ? "Edit Publication" : "Research & News"}
          </h2>
          <p className="text-slate-500 text-sm mt-1">Publish news, research updates, and articles</p>
        </div>
      </div>

      {/* FORM */}
      <div className="admin-card mb-8">
        <form onSubmit={submitItem} className="form-grid">
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Article Title</label>
            <input
              disabled={loading}
              className="admin-input"
              placeholder="e.g. New Discovery in Quantum Mechanics"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label className="text-sm font-medium text-slate-700">Content Type</label>
            <select
              disabled={loading}
              className="admin-input capitalize"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="research">Research Paper</option>
              <option value="news">News Article</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label className="text-sm font-medium text-slate-700">Publish Date</label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                disabled={loading}
                className="admin-input pl-10"
                value={form.publishedDate}
                onChange={(e) => setForm({ ...form, publishedDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Source / Authors</label>
            <div className="relative">
              <FileText size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                disabled={loading}
                className="admin-input pl-10"
                placeholder="e.g. Science Daily, IIT Delhi"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-3">
            <label className="text-sm font-medium text-slate-700">External Details Link</label>
            <div className="relative">
              <LinkIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                disabled={loading}
                className="admin-input pl-10"
                placeholder="https://example.com/article"
                value={form.externalLink}
                onChange={(e) => setForm({ ...form, externalLink: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-3">
            <label className="text-sm font-medium text-slate-700">Summary</label>
            <textarea
              rows={3}
              disabled={loading}
              className="admin-input resize-y"
              placeholder="Brief summary of the research or news..."
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              required
            />
          </div>

          <div className="md:col-span-3 flex items-center justify-end gap-3 mt-2 pt-4 border-t border-slate-100">
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                disabled={loading}
                className="btn-secondary !text-slate-600 !border-slate-200 hover:!bg-slate-50 flex items-center gap-2"
              >
                <XCircle size={18} /> Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="admin-btn disabled:opacity-50"
            >
              <CheckCircle2 size={18} /> {loading ? "Saving..." : editingId ? "Update Article" : "Publish Article"}
            </button>
          </div>
        </form>
      </div>

      {/* TABLE */}
      <div className="admin-table-card">
        <div className="flex justify-end pt-4 px-6 mb-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search publications..."
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
                <th>Article</th>
                <th>Type</th>
                <th>Published</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-slate-500">
                    <Newspaper size={32} className="mx-auto mb-2 text-slate-300" />
                    No research or news articles found.
                  </td>
                </tr>
              ) : filteredItems.map((i) => (
                <tr key={i._id}>
                  <td>
                    <div className="font-semibold text-slate-800 line-clamp-1">{i.title}</div>
                    {i.source && <div className="text-xs text-slate-500 mt-0.5">{i.source}</div>}
                  </td>
                  <td>
                    <span className={`badge capitalize ${i.type === 'news' ? 'news' : 'research'}`}>
                      {i.type}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar size={14} className="text-slate-400" />
                      {formatDate(i.publishedDate)}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => startEdit(i._id)}
                        className="edit-btn"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteItem(i._id)}
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
      </div>
    </section>
  );
}
