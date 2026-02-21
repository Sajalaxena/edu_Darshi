import React, { useState } from "react";
import { UploadCloud, PlusCircle, Trash2, Award, Search } from "lucide-react";
import m1 from "../../assets/mentor1.jpg";
import m2 from "../../assets/mentor2.jpg";

/*
 Demo: we store mentors in local state. Image upload uses URL.createObjectURL for preview only.
 On submit we append to list. Later replace with backend POST.
*/

const initial = [
  {
    id: 1,
    name: "Dr. Gyan",
    qualification: "M.Sc, BHU; Ph.D (Mathematics) - IIT Delhi",
    img: m1,
  },
  {
    id: 2,
    name: "Sajal Saxena",
    qualification: "MCA, NIT Patna; GEN AI, IIT Mandi",
    img: m2,
  },
];

export default function AddMentors() {
  const [mentors, setMentors] = useState(initial);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    qualification: "",
    imageFile: null,
    preview: null,
  });

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return setForm((s) => ({ ...s, imageFile: null, preview: null }));
    const url = URL.createObjectURL(f);
    setForm((s) => ({ ...s, imageFile: f, preview: url }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.qualification) return;
    const id = Date.now();
    const newMentor = {
      id,
      name: form.name,
      qualification: form.qualification,
      img: form.preview || "",
    };
    setMentors((ms) => [newMentor, ...ms]);
    setForm({ name: "", qualification: "", imageFile: null, preview: null });
  };

  const deleteMentor = (id) => {
    setMentors(mentors.filter(m => m.id !== id));
  };

  const filteredMentors = mentors.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.qualification.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Manage Mentors</h2>
          <p className="text-slate-500 text-sm mt-1">Add new mentors and view the existing board</p>
        </div>
      </div>

      <div className="admin-card mb-8">
        <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <PlusCircle size={18} className="text-indigo-500" /> Add New Mentor
        </h3>
        <form onSubmit={submit} className="form-grid">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <input
              type="text"
              placeholder="e.g. Dr. Jane Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="admin-input"
            />
          </div>
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">
              Qualifications <span className="text-slate-400 font-normal">(comma separated)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. M.Sc, PhD - Harvard"
              value={form.qualification}
              onChange={(e) => setForm({ ...form, qualification: e.target.value })}
              className="admin-input"
            />
          </div>

          <div className="md:col-span-3">
            <label className="text-sm font-medium text-slate-700 block mb-2">Profile Image</label>
            <div className="flex items-center gap-6">
              <div className="relative group cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50 flex flex-col items-center justify-center text-indigo-500 group-hover:bg-indigo-100 group-hover:border-indigo-300 transition-colors overflow-hidden">
                  {form.preview ? (
                    <img src={form.preview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <UploadCloud size={24} className="mb-1" />
                      <span className="text-xs font-semibold">Upload</span>
                    </>
                  )}
                </div>
              </div>
              <div className="text-sm text-slate-500 flex-1">
                <p className="font-medium text-slate-700">Upload high-res photo</p>
                <p className="mt-1">Recommended size: 400x400px. Formats: JPG, PNG, WebP.</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 flex justify-end mt-2 pt-4 border-t border-slate-100">
            <button type="submit" className="admin-btn">
              <PlusCircle size={18} /> Save Mentor
            </button>
          </div>
        </form>
      </div>

      <div className="admin-table-card">
        <div className="flex justify-between items-center mb-4 px-6 pt-2">
          <h3 className="text-base font-semibold text-slate-800">Current Mentors</h3>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search mentors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-input pl-9 w-48 text-sm py-1.5"
            />
          </div>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="w-20">Photo</th>
                <th>Mentor Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMentors.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-8 text-slate-500">No mentors found.</td>
                </tr>
              ) : filteredMentors.map((m) => (
                <tr key={m.id}>
                  <td>
                    {m.img ? (
                      <img
                        src={m.img}
                        alt={m.name}
                        className="w-12 h-12 rounded-xl object-cover shadow-sm border border-slate-200"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                        <User size={20} />
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="font-semibold text-slate-800 text-base">{m.name}</div>
                    <div className="flex items-start gap-1.5 mt-1 text-sm text-slate-600 max-w-md">
                      <Award size={14} className="text-indigo-400 mt-0.5 shrink-0" />
                      <span className="break-words leading-tight">{m.qualification}</span>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteMentor(m.id)}
                      className="admin-delete"
                      title="Remove Mentor"
                    >
                      <Trash2 size={18} />
                    </button>
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
