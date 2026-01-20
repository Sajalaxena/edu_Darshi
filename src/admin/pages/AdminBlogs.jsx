// src/pages/admin/AdminBlogs.jsx
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    summary: "",
    author: "",
    content: "",
    image: null,
    imagePreview: null,
  });

  /* ---------------- FETCH BLOGS ---------------- */
  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/blogs`);
      const json = await res.json();
      setBlogs(json.data || []);
    } catch {
      toast.error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* ---------------- START EDIT ---------------- */
  const startEdit = async (blog) => {
    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/blogs/${blog._id}`);
      const json = await res.json();

      if (!res.ok) throw new Error();

      const fullBlog = json.data;

      setEditingId(fullBlog._id);
      setForm({
        title: fullBlog.title || "",
        category: fullBlog.category || "",
        summary: fullBlog.summary || "",
        author: fullBlog.author || "",
        content: fullBlog.content || "", // ✅ NOW AVAILABLE
        image: null,
        imagePreview: fullBlog.imageUrl || null,
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast.error("Failed to load blog for editing");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- SUBMIT (CREATE / UPDATE) ---------------- */
  const submitBlog = async () => {
    if (loading) return; // HARD BLOCK (double submit)

    if (!form.title || !form.summary || !form.content) {
      toast.error("Title, summary and content are required");
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("summary", form.summary);
      fd.append("content", form.content);
      fd.append("author", form.author);
      fd.append("category", form.category);

      if (form.image) {
        fd.append("image", form.image);
      }

      const url = editingId
        ? `${API_BASE}/blogs/admin/${editingId}`
        : `${API_BASE}/blogs/admin/upload`;

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, { method, body: fd });

      if (!res.ok) throw new Error("Request failed");

      toast.success(
        editingId ? "Blog updated successfully" : "Blog published successfully"
      );

      setEditingId(null);
      setForm({
        title: "",
        category: "",
        summary: "",
        author: "",
        content: "",
        image: null,
        imagePreview: null,
      });

      fetchBlogs();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE BLOG ---------------- */
  const deleteBlog = async (id) => {
    if (loading) return;

    if (!confirm("Delete this blog?")) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/blogs/admin/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();
      toast.success("Blog deleted");
      fetchBlogs();
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- PAGINATION ---------------- */
  const PAGE_SIZE = 5;
  const start = (page - 1) * PAGE_SIZE;
  const paginatedBlogs = blogs.slice(start, start + PAGE_SIZE);
  const totalPages = Math.ceil(blogs.length / PAGE_SIZE);

  return (
    <section className="p-6 space-y-8">
      {/* ---------- HEADER ---------- */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
        <h2 className="text-2xl font-semibold">
          {editingId ? "Edit Blog" : "Add Blog"}
        </h2>
        <p className="text-sm opacity-90">
          {editingId ? "Update existing blog" : "Create & manage blogs"}
        </p>
      </div>

      {/* ---------- FORM ---------- */}
      <div className="bg-white rounded-2xl border p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          className="input"
          placeholder="Blog title"
          disabled={loading}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="input"
          placeholder="Category"
          disabled={loading}
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          className="input"
          placeholder="Author"
          disabled={loading}
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />

        <input
          type="file"
          accept="image/*"
          disabled={loading}
          className="input md:col-span-2"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            setForm({
              ...form,
              image: file,
              imagePreview: URL.createObjectURL(file),
            });
          }}
        />

        <textarea
          rows={2}
          disabled={loading}
          className="input md:col-span-3"
          placeholder="Summary"
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
        />

        <textarea
          rows={5}
          disabled={loading}
          className="input md:col-span-3"
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        {form.imagePreview && (
          <img
            src={form.imagePreview}
            className="md:col-span-3 h-48 object-cover rounded-lg border"
          />
        )}

        <div className="md:col-span-3 text-right space-x-3">
          <button
            disabled={loading}
            onClick={submitBlog}
            className={`px-8 py-3 rounded-xl text-white font-medium shadow
              ${editingId ? "bg-green-600" : "bg-blue-600"}
              disabled:opacity-50`}
          >
            {loading ? "Saving..." : editingId ? "Update Blog" : "Publish Blog"}
          </button>

          {editingId && (
            <button
              disabled={loading}
              onClick={() => {
                setEditingId(null);
                setForm({
                  title: "",
                  category: "",
                  summary: "",
                  author: "",
                  content: "",
                  image: null,
                  imagePreview: null,
                });
              }}
              className="px-6 py-3 rounded-xl border"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* ---------- TABLE ---------- */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-50 text-sm text-slate-600">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Author</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBlogs.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="p-3">{b.title}</td>
                <td className="p-3 text-center">{b.category || "-"}</td>
                <td className="p-3 text-center">{b.author || "-"}</td>
                <td className="p-3 text-center space-x-3">
                  <button
                    disabled={loading}
                    onClick={() => startEdit(b)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => deleteBlog(b._id)}
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
