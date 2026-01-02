// src/pages/admin/AdminBlogs.jsx
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);

  const [form, setForm] = useState({
    title: "",
    category: "",
    summary: "",
    imageUrl: "",
    author: "",
    content: "",
  });

  /* ---------------- FETCH BLOGS ---------------- */
  const fetchBlogs = async () => {
    const res = await fetch(`${API_BASE}/blogs`);
    const json = await res.json();
    setBlogs(json.data || []);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* ---------------- CREATE BLOG ---------------- */
  const createBlog = async () => {
    if (!form.title || !form.summary || !form.content) {
      alert("Title, summary and content are required");
      return;
    }

    await fetch(`${API_BASE}/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      title: "",
      category: "",
      summary: "",
      imageUrl: "",
      author: "",
      content: "",
    });

    fetchBlogs();
  };

  /* ---------------- DELETE BLOG ---------------- */
  const deleteBlog = async (id) => {
    if (!confirm("Delete this blog?")) return;
    await fetch(`${API_BASE}/blogs/${id}`, { method: "DELETE" });
    fetchBlogs();
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
        <h2 className="text-2xl font-semibold">Add Blogs</h2>
        <p className="text-sm opacity-90">Create & manage website blogs</p>
      </div>

      {/* ---------- FORM ---------- */}
      <div className="bg-white rounded-2xl border p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          placeholder="Blog title"
          className="input"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Category (AI, ML, Physics...)"
          className="input"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          placeholder="Author name"
          className="input"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />

        <input
          placeholder="Image URL (Cloudinary / Drive / GitHub)"
          className="input md:col-span-2"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />

        <textarea
          placeholder="Short summary"
          rows={2}
          className="input md:col-span-3"
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
        />

        <textarea
          placeholder="Full blog content (Markdown or HTML)"
          rows={5}
          className="input md:col-span-3"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        {/* Image preview */}
        {form.imageUrl && (
          <div className="md:col-span-3">
            <p className="text-sm text-slate-500 mb-1">Image Preview</p>
            <img
              src={form.imageUrl}
              alt="preview"
              className="h-48 rounded-lg object-cover border"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        )}

        <div className="md:col-span-3 text-right">
          <button
            onClick={createBlog}
            className="px-8 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 shadow"
          >
            Publish Blog
          </button>
        </div>
      </div>

      {/* ---------- TABLE ---------- */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-50 text-slate-600 text-sm">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Author</th>
              <th className="p-3">Image</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBlogs.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="p-3 font-medium">{b.title}</td>
                <td className="p-3 text-center">{b.category || "-"}</td>
                <td className="p-3 text-center">{b.author || "-"}</td>
                <td className="p-3 text-center">
                  {b.imageUrl ? (
                    <img
                      src={b.imageUrl}
                      className="w-16 h-10 object-cover rounded"
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => deleteBlog(b._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ---------- PAGINATION ---------- */}
        <div className="flex justify-between items-center p-4">
          <span className="text-sm text-slate-500">
            Page {page} of {totalPages || 1}
          </span>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 rounded-lg border disabled:opacity-40"
            >
              Prev
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
