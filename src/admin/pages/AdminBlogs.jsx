import React, { useEffect, useState } from "react";
import { Trash2, Edit2, LayoutDashboard, Image as ImageIcon, User, AlignLeft, Send, CheckCircle2, XCircle, Search } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
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
        content: fullBlog.content || "",
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
  const submitBlog = async (e) => {
    e.preventDefault();
    if (loading) return;

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

  /* ---------------- PAGINATION & SEARCH ---------------- */
  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    (b.category && b.category.toLowerCase().includes(search.toLowerCase())) ||
    (b.author && b.author.toLowerCase().includes(search.toLowerCase()))
  );

  const PAGE_SIZE = 5;
  const start = (page - 1) * PAGE_SIZE;
  const paginatedBlogs = filteredBlogs.slice(start, start + PAGE_SIZE);
  const totalPages = Math.ceil(filteredBlogs.length / PAGE_SIZE) || 1;

  return (
    <section>
      {/* ---------- HEADER ---------- */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            {editingId ? "Edit Blog Post" : "Manage Blogs"}
          </h2>
          <p className="text-slate-500 text-sm mt-1">Create engaging articles and manage existing ones</p>
        </div>
      </div>

      {/* ---------- FORM ---------- */}
      <div className="admin-card mb-8">
        <form onSubmit={submitBlog} className="form-grid">
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Blog Title</label>
            <input
              className="admin-input font-medium"
              placeholder="e.g. Master Your JEE Preparation in 3 Months"
              disabled={loading}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label className="text-sm font-medium text-slate-700">Category / Tags</label>
            <input
              className="admin-input"
              placeholder="e.g. Tips, Strategy, Exam"
              disabled={loading}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label className="text-sm font-medium text-slate-700">Author Name</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="admin-input pl-10"
                placeholder="e.g. Dr. Pankaj"
                disabled={loading}
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Cover Image</label>
            <div className="flex items-center gap-4">
              <div className="relative group cursor-pointer flex-1">
                <input
                  type="file"
                  accept="image/*"
                  disabled={loading}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setForm({
                      ...form,
                      image: file,
                      imagePreview: URL.createObjectURL(file),
                    });
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="h-12 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-slate-100 group-hover:border-indigo-300 transition-colors">
                  <ImageIcon size={18} className="mr-2" />
                  <span className="text-sm font-semibold">Upload Cover Photo</span>
                </div>
              </div>
              {form.imagePreview && (
                <div className="w-16 h-12 rounded-lg border border-slate-200 overflow-hidden shadow-sm shrink-0">
                  <img src={form.imagePreview} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-3">
            <label className="text-sm font-medium text-slate-700">Short Summary</label>
            <textarea
              rows={2}
              disabled={loading}
              className="admin-input resize-y"
              placeholder="Write a 1-2 sentence hook for the preview card..."
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-3">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
              <AlignLeft size={16} /> Full Content <span className="text-slate-400 font-normal ml-1">(Supports Markdown)</span>
            </label>
            <textarea
              rows={10}
              disabled={loading}
              className="admin-input resize-y font-mono text-sm"
              placeholder="Write the full body of the blog post..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />
          </div>

          <div className="md:col-span-3 flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
            {editingId && (
              <button
                type="button"
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
              {loading ? "Publishing..." : editingId ? (
                <>
                  <CheckCircle2 size={18} /> Update Blog
                </>
              ) : (
                <>
                  <Send size={18} /> Publish Blog
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ---------- TABLE ---------- */}
      <div className="admin-table-card">
        <div className="flex justify-end pt-4 px-6 mb-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="admin-input pl-9 w-64 text-sm py-1.5"
            />
          </div>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Blog Post</th>
                <th>Category</th>
                <th>Author</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-slate-500">
                    <LayoutDashboard size={32} className="mx-auto mb-2 text-slate-300" />
                    No blogs found. Start writing your first post!
                  </td>
                </tr>
              ) : paginatedBlogs.map((b) => (
                <tr key={b._id}>
                  <td>
                    <div className="font-semibold text-slate-800 line-clamp-1">{b.title}</div>
                    <div className="text-sm text-slate-500 line-clamp-1 mt-0.5">{b.summary}</div>
                  </td>
                  <td>
                    {b.category ? (
                      <span className="badge bg-slate-100 text-slate-600 border border-slate-200">
                        {b.category}
                      </span>
                    ) : "-"}
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                      {b.author || "-"}
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button
                        disabled={loading}
                        onClick={() => startEdit(b)}
                        className="edit-btn"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        disabled={loading}
                        onClick={() => deleteBlog(b._id)}
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
        {filteredBlogs.length > PAGE_SIZE && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
            <span className="text-sm text-slate-500">
              Page <strong className="text-slate-800">{page}</strong> of <strong className="text-slate-800">{totalPages}</strong>
            </span>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                Previous
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
