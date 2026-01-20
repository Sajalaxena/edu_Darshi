// src/pages/admin/AdminResearchNews.jsx
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
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
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
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
        description: item.description || "",
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

  /* ---------------- CREATE / UPDATE ---------------- */
  const submitItem = async () => {
    if (loading) return;

    if (!form.title || !form.description || !form.type || !form.publishedDate) {
      toast.error("Title, description, type and published date are required");
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

      setEditingId(null);
      setForm({
        title: "",
        description: "",
        type: "research",
        source: "",
        externalLink: "",
        publishedDate: "",
      });

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

  return (
    <section className="p-6 space-y-8">
      {/* HEADER */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-700 p-6 text-white">
        <h2 className="text-2xl font-semibold">
          {editingId ? "Edit Research / News" : "Add Research / News"}
        </h2>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-2xl border p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          disabled={loading}
          className="input"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <select
          disabled={loading}
          className="input"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="research">Research</option>
          <option value="news">News</option>
        </select>

        {/* ✅ MANUAL PUBLISHED DATE */}
        <input
          type="date"
          disabled={loading}
          className="input"
          value={form.publishedDate}
          onChange={(e) => setForm({ ...form, publishedDate: e.target.value })}
        />

        <textarea
          rows={3}
          disabled={loading}
          className="input md:col-span-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          disabled={loading}
          className="input"
          placeholder="Deadline"
          value={form.source}
          onChange={(e) => setForm({ ...form, source: e.target.value })}
        />

        <input
          disabled={loading}
          className="input"
          placeholder="External externalLink"
          value={form.externalLink}
          onChange={(e) => setForm({ ...form, externalLink: e.target.value })}
        />

        <div className="md:col-span-2 text-right">
          <button
            disabled={loading}
            onClick={submitItem}
            className="px-8 py-3 rounded-xl bg-indigo-600 text-white disabled:opacity-50"
          >
            {loading ? "Saving..." : editingId ? "Update" : "Create"}
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-indigo-50 text-sm text-slate-600">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3">Type</th>
              <th className="p-3">Published</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i._id} className="border-t">
                <td className="p-3">{i.title}</td>
                <td className="p-3 text-center capitalize">{i.type}</td>
                <td className="p-3 text-center">
                  {formatDate(i.publishedDate)}
                </td>
                <td className="p-3 text-center space-x-3">
                  <button
                    onClick={() => startEdit(i._id)}
                    className="text-indigo-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(i._id)}
                    className="text-red-600"
                  >
                    <Trash2 size={16} />
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
