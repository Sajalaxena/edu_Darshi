// src/pages/QuizSetup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EXAMS = ["NEET", "JEE", "GATE", "JAM", "Other"];

export default function QuizSetup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    exam: "NEET",
    subject: "",
    quantity: 10,
    name: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({
      ...s,
      [name]:
        name === "quantity"
          ? Math.max(1, Math.min(100, Number(value || 0)))
          : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // basic validation
    if (!form.name.trim()) {
      alert("Enter your name");
      return;
    }
    navigate("/quiz", { state: form });
  }

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="max-w-xl mx-auto card p-6">
        <h2 className="text-2xl font-semibold mb-4">Create a Mock Test</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <div className="text-sm font-medium">Your Name</div>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="Student name"
            />
          </label>

          <label>
            <div className="text-sm font-medium">Select Exam</div>
            <select
              name="exam"
              value={form.exam}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            >
              {EXAMS.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </label>

          <label>
            <div className="text-sm font-medium">Subject (optional)</div>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="e.g., Physics"
            />
          </label>

          <label>
            <div className="text-sm font-medium">Number of Questions</div>
            <input
              name="quantity"
              type="number"
              min="1"
              max="100"
              value={form.quantity}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </label>

          <div className="flex gap-3 justify-end">
            <button type="submit" className="btn-primary">
              Start Test
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() =>
                setForm({ exam: "NEET", subject: "", quantity: 10, name: "" })
              }
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
