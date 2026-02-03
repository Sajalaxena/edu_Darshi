import React, { useEffect, useState } from "react";
import { Trash, PencilSimple } from "phosphor-react";

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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* ================= FETCH ================= */
  async function fetchData(p = page) {
    const res = await fetch(`${API}/previous-papers?page=${p}&limit=${LIMIT}`);
    const json = await res.json();

    const data = json.data || json.papers || [];
    setRows(data);

    setTotalPages(
      json.pagination?.totalPages ||
        Math.ceil((json.total || data.length) / LIMIT) ||
        1,
    );
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

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    resetForm();
    fetchData(editId ? page : 1);
    if (!editId) setPage(1);
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
    await fetch(`${API}/previous-papers/admin/${id}`, {
      method: "DELETE",
    });
    fetchData(page);
  }

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="admin-header">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="EduDarshi" className="h-10" />
          <h1>{editId ? "Edit Previous Paper" : "Add Previous Papers"}</h1>
        </div>
      </div>

      {/* FORM */}
      <form className="admin-card grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          className="admin-input"
          placeholder="Exam (JAM / GATE / NET)"
          value={form.exam}
          onChange={(e) => setForm({ ...form, exam: e.target.value })}
        />

        <input
          className="admin-input"
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />

        <input
          className="admin-input"
          placeholder="Year"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
        />

        <input
          className="admin-input md:col-span-2"
          placeholder="Paper PDF (Google Drive)"
          value={form.paperPdfLink}
          onChange={(e) => setForm({ ...form, paperPdfLink: e.target.value })}
        />

        <input
          className="admin-input md:col-span-2"
          placeholder="Solution YouTube link (optional)"
          value={form.solutionYoutubeLink}
          onChange={(e) =>
            setForm({
              ...form,
              solutionYoutubeLink: e.target.value,
            })
          }
        />

        <div className="flex gap-3">
          <button onClick={savePaper} className="admin-btn">
            {editId ? "Update Paper" : "Save Paper"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="admin-btn-outline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* TABLE */}
      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Exam</th>
              <th>Subject</th>
              <th>Year</th>
              <th>Paper</th>
              <th>Solution</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-slate-500">
                  No papers found
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r._id}>
                  <td>{r.exam}</td>
                  <td>{r.subject || "-"}</td>
                  <td>{r.year}</td>
                  <td>
                    <a href={r.paperPdfLink} target="_blank" rel="noreferrer">
                      PDF
                    </a>
                  </td>
                  <td>
                    {r.solutionYoutubeLink ? (
                      <a
                        href={r.solutionYoutubeLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Video
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="flex gap-3">
                    <PencilSimple
                      size={18}
                      className="admin-edit"
                      onClick={() => editPaper(r)}
                    />
                    <Trash
                      size={18}
                      className="admin-delete"
                      onClick={() => remove(r._id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="admin-pagination">
          <span>
            Page {page} of {totalPages}
          </span>
          <div>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Prev
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
