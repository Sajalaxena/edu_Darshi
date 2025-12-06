import React, { useState } from "react";

const initial = [
  { id: 1, name: "John Doe", rating: 5, text: "Great program!" },
  { id: 2, name: "Jane Smith", rating: 4, text: "Very helpful mentors." },
];

export default function AddReviews() {
  const [reviews, setReviews] = useState(initial);
  const [f, setF] = useState({ name: "", rating: 5, text: "" });

  function submit(e) {
    e.preventDefault();
    const id = Date.now();
    setReviews((r) => [{ id, ...f }, ...r]);
    setF({ name: "", rating: 5, text: "" });
  }

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Add Reviews</h2>

      <div className="card p-4 mb-6">
        <form
          onSubmit={submit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            placeholder="Name"
            value={f.name}
            onChange={(e) => setF((s) => ({ ...s, name: e.target.value }))}
            className="border p-2 rounded"
          />
          <select
            value={f.rating}
            onChange={(e) =>
              setF((s) => ({ ...s, rating: Number(e.target.value) }))
            }
            className="border p-2 rounded"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} stars
              </option>
            ))}
          </select>
          <textarea
            value={f.text}
            onChange={(e) => setF((s) => ({ ...s, text: e.target.value }))}
            placeholder="Review text"
            className="border p-2 rounded"
          ></textarea>
          <div className="md:col-span-3">
            <button className="btn-primary">Save Review</button>
          </div>
        </form>
      </div>

      <div className="card p-4">
        <table className="w-full text-left">
          <thead className="text-sm text-slate-500">
            <tr>
              <th>Name</th>
              <th>Rating</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="py-3">{r.name}</td>
                <td className="py-3">{"★".repeat(r.rating)}</td>
                <td className="py-3">{r.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
