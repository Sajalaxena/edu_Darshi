import React, { useState } from "react";
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
  const [form, setForm] = useState({
    name: "",
    qualification: "",
    imageFile: null,
    preview: null,
  });

  function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return setForm((s) => ({ ...s, imageFile: null, preview: null }));
    const url = URL.createObjectURL(f);
    setForm((s) => ({ ...s, imageFile: f, preview: url }));
  }

  function submit(e) {
    e.preventDefault();
    const id = Date.now();
    const newMentor = {
      id,
      name: form.name,
      qualification: form.qualification,
      img: form.preview || "",
    };
    setMentors((ms) => [newMentor, ...ms]);
    setForm({ name: "", qualification: "", imageFile: null, preview: null });
  }

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Add Mentor</h2>

      <div className="card p-4 mb-6">
        <form
          onSubmit={submit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
        >
          <div>
            <label className="block text-sm">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm">
              Qualification (comma separated)
            </label>
            <input
              value={form.qualification}
              onChange={(e) =>
                setForm({ ...form, qualification: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Image</label>
            <input type="file" accept="image/*" onChange={handleFile} />
            {form.preview && (
              <img
                src={form.preview}
                alt="preview"
                className="w-20 h-20 object-cover rounded mt-2"
              />
            )}
          </div>

          <div className="md:col-span-3">
            <button className="btn-primary">Save Mentor</button>
          </div>
        </form>
      </div>

      <h3 className="font-semibold mb-2">Mentors</h3>
      <div className="card p-4 overflow-auto">
        <table className="w-full text-left">
          <thead className="text-sm text-slate-500">
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Qualification</th>
            </tr>
          </thead>
          <tbody>
            {mentors.map((m) => (
              <tr key={m.id} className="border-t">
                <td className="py-3">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="py-3">{m.name}</td>
                <td className="py-3 text-sm text-slate-600 break-words">
                  {m.qualification}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
