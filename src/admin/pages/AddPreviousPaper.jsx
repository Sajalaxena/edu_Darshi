import React, { useEffect, useState } from "react";
import { Trash2, Edit2, FileText, Youtube, CheckCircle2, XCircle, Search } from "lucide-react";

const API = import.meta.env.VITE_API_BASE_URL;
const LIMIT = 10;

export default function AddPreviousPaper() {
  const [form, setForm] = useState({
    exam: "",
    subject: "",
    year: "",
    paperPdfLink: "",
    solutionYoutubeLink: "",
  });

  const [editId, setEditId] = useState(null);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* ================= FETCH ================= */
  async function fetchData(p = page) {
    try {
      const res = await fetch(`${API}/previous-papers?page=${p}&limit=${LIMIT}`);
      const json = await res.json();
      const data = json.data || json.papers || [];
      setRows(data);
      setTotalPages(
        json.pagination?.totalPages || Math.ceil((json.total || data.length) / LIMIT) || 1
      );
    } catch (error) {
      console.error("Failed to fetch papers", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  /* ================= SAVE / UPDATE ================= */
  async function savePaper(e) {
    e.preventDefault();

    const url = editId
      ? `${API}/previous-papers/admin/${editId}`
      : `${API}/previous-papers/admin/upload`;
    const method = editId ? "PUT" : "POST";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      resetForm();
      fetchData(editId ? page : 1);
      if (!editId) setPage(1);
    } catch (error) {
      console.error("Failed to save paper", error);
    }
  }

  function resetForm() {
    setForm({
      exam: "",
      subject: "",
      year: "",
      paperPdfLink: "",
      solutionYoutubeLink: "",
    });
    setEditId(null);
  }

  /* ================= EDIT ================= */
  function editPaper(row) {
    setEditId(row._id);
    setForm({
      exam: row.exam || "",
      subject: row.subject || "",
      year: row.year || "",
      paperPdfLink: row.paperPdfLink || "",
      solutionYoutubeLink: row.solutionYoutubeLink || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ================= DELETE ================= */
  async function remove(id) {
    if (!confirm("Delete this paper?")) return;
    try {
      await fetch(`${API}/previous-papers/admin/${id}`, {
        method: "DELETE",
      });
      fetchData(page);
    } catch (error) {
      console.error("Failed to delete", error);
    }
  }

  /* ================= UI ================= */
  const filteredRows = rows.filter((r) =>
    r.exam.toLowerCase().includes(search.toLowerCase()) ||
    (r.subject && r.subject.toLowerCase().includes(search.toLowerCase())) ||
    r.year.toString().includes(search)
  );

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            {editId ? "Edit Previous Paper" : "Previous Year Papers"}
          </h2>
          <p className="text-slate-500 text-sm mt-1">Manage PDF uploads and video solutions</p>
        </div>
      </div>

      <div className="admin-card mb-8">
        <form onSubmit={savePaper} className="form-grid">
          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label className="text-sm font-medium text-slate-700">Exam Name</label>
            <input
              className="admin-input"
              placeholder="e.g. JAM / GATE"
              value={form.exam}
              onChange={(e) => setForm({ ...form, exam: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label className="text-sm font-medium text-slate-700">Subject</label>
            <input
              className="admin-input"
              placeholder="e.g. Physics"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label className="text-sm font-medium text-slate-700">Year</label>
            <input
              className="admin-input"
              placeholder="e.g. 2024"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-3">
            <label className="text-sm font-medium text-slate-700">Paper PDF Link</label>
            <div className="relative">
              <FileText size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="admin-input pl-10"
                placeholder="Google Drive Link or Direct URL"
                value={form.paperPdfLink}
                onChange={(e) => setForm({ ...form, paperPdfLink: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-3">
            <label className="text-sm font-medium text-slate-700">Video Solution Link <span className="text-slate-400 font-normal">(Optional)</span></label>
            <div className="relative">
              <Youtube size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="admin-input pl-10"
                placeholder="YouTube Video URL"
                value={form.solutionYoutubeLink}
                onChange={(e) => setForm({ ...form, solutionYoutubeLink: e.target.value })}
              />
            </div>
          </div>

          <div className="md:col-span-3 flex items-center justify-end gap-3 mt-2 pt-4 border-t border-slate-100">
            {editId && (
              <button type="button" onClick={resetForm} className="btn-secondary !text-slate-600 !border-slate-200 hover:!bg-slate-50 flex items-center gap-2">
                <XCircle size={18} /> Cancel
              </button>
            )}
            <button type="submit" className="admin-btn">
              <CheckCircle2 size={18} /> {editId ? "Update Paper" : "Save Paper"}
            </button>
          </div>
        </form>
      </div>

      <div className="admin-table-card">
        <div className="flex justify-end pt-4 px-6 mb-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search papers..."
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
                <th>Exam & Year</th>
                <th>Subject</th>
                <th>Resources</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-slate-500">
                    <FileText size={32} className="mx-auto mb-2 text-slate-300" />
                    No papers found.
                  </td>
                </tr>
              ) : (
                filteredRows.map((r) => (
                  <tr key={r._id}>
                    <td>
                      <div className="font-semibold text-slate-800">{r.exam}</div>
                      <div className="text-xs text-slate-500">{r.year}</div>
                    </td>
                    <td>
                      <span className="badge bg-indigo-50 text-indigo-700 border-indigo-100">{r.subject || "-"}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        {r.paperPdfLink && (
                          <a href={r.paperPdfLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                            <FileText size={16} /> PDF
                          </a>
                        )}
                        {r.solutionYoutubeLink && (
                          <a href={r.solutionYoutubeLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 transition-colors">
                            <Youtube size={16} /> Video
                          </a>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => editPaper(r)} className="edit-btn" title="Edit">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => remove(r._id)} className="delete-btn" title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
          <span className="text-sm text-slate-500">
            Page <strong className="text-slate-800">{page}</strong> of <strong className="text-slate-800">{totalPages}</strong>
          </span>
          <div className="flex items-center gap-2">
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
      </div>
    </section>
  );
}
