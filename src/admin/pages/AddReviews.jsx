import React, { useState } from "react";
import { Star, MessageSquareQuote, Trash2, PlusCircle, Search } from "lucide-react";

const initial = [
  { id: 1, name: "John Doe", rating: 5, text: "Great program! Highly recommended." },
  { id: 2, name: "Jane Smith", rating: 4, text: "Very helpful mentors, learned a lot." },
];

export default function AddReviews() {
  const [reviews, setReviews] = useState(initial);
  const [search, setSearch] = useState("");
  const [f, setF] = useState({ name: "", rating: 5, text: "" });

  const submit = (e) => {
    e.preventDefault();
    if (!f.name || !f.text) return;
    const id = Date.now();
    setReviews((r) => [{ id, ...f }, ...r]);
    setF({ name: "", rating: 5, text: "" });
  };

  const deleteReview = (id) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  const filteredReviews = reviews.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Student Reviews</h2>
          <p className="text-slate-500 text-sm mt-1">Manage testimonials and feedback displayed on the site</p>
        </div>
      </div>

      <div className="admin-card mb-8">
        <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <MessageSquareQuote size={18} className="text-indigo-500" /> Add New Review
        </h3>
        <form onSubmit={submit} className="form-grid">
          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label className="text-sm font-medium text-slate-700">Student Name</label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={f.name}
              onChange={(e) => setF((s) => ({ ...s, name: e.target.value }))}
              className="admin-input"
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label className="text-sm font-medium text-slate-700">Star Rating</label>
            <div className="flex items-center gap-1 bg-slate-50 border-1.5 border-slate-200 rounded-xl px-4 py-2 bg-white">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setF(s => ({ ...s, rating: star }))}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    size={22}
                    className={star <= f.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm font-semibold text-slate-600">{f.rating}.0</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Review Content</label>
            <textarea
              value={f.text}
              onChange={(e) => setF((s) => ({ ...s, text: e.target.value }))}
              placeholder="Write the testimonial here..."
              className="admin-input min-h-[100px] resize-y"
            ></textarea>
          </div>

          <div className="md:col-span-2 flex justify-end mt-2 pt-4 border-t border-slate-100">
            <button type="submit" className="admin-btn">
              <PlusCircle size={18} /> Publish Review
            </button>
          </div>
        </form>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-slate-800">Current Testimonials</h3>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input pl-9 w-64 text-sm py-1.5"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.length === 0 ? (
          <div className="md:col-span-2 lg:col-span-3 admin-empty">
            <MessageSquareQuote size={32} className="text-slate-300 mx-auto mb-2" />
            <p>No reviews found.</p>
          </div>
        ) : filteredReviews.map((r) => (
          <div key={r.id} className="admin-glass-card flex flex-col relative group">
            <button
              onClick={() => deleteReview(r.id)}
              className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 bg-white shadow-sm rounded-lg p-1.5"
              title="Delete Review"
            >
              <Trash2 size={16} />
            </button>

            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < r.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}
                />
              ))}
            </div>

            <p className="text-slate-600 text-sm italic flex-1 mb-4 leading-relaxed">
              "{r.text}"
            </p>

            <div className="mt-auto flex items-center gap-3 pt-4 border-t border-slate-100">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                {r.name.charAt(0)}
              </div>
              <div className="font-semibold text-slate-800 text-sm">{r.name}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
