import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_BASE_URL;

// ---- date normalizer (SAFE) ----
const normalizeDate = (d) => {
  if (!d) return "";
  return d.split("T")[0];
};

export default function SingleQuestionForm({ editData, onSaved }) {
  const emptyForm = {
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    explanation: "",
    scheduledDate: "",
    solutionVideoUrl: "", // ✅ NEW
  };

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ===== Populate form on Edit ===== */
  useEffect(() => {
    if (editData) {
      setForm({
        question: editData.question,
        options: [...editData.options, "", "", ""].slice(0, 4),
        correctAnswer: editData.correctAnswer,
        explanation: editData.explanation || "",
        scheduledDate: normalizeDate(editData.scheduledDate),
        solutionVideoUrl: editData.solutionVideoUrl || "", // ✅ NEW
      });
    }
  }, [editData]);

  const updateOption = (i, value) => {
    const updated = [...form.options];
    updated[i] = value;
    setForm({ ...form, options: updated });
  };

  /* ===== Validation ===== */
  const validate = () => {
    const e = {};
    const validOptions = form.options.filter((o) => o.trim());

    if (!form.question.trim()) e.question = "Question is required";
    if (validOptions.length < 2) e.options = "Minimum 2 options required";
    if (!validOptions.includes(form.correctAnswer))
      e.correctAnswer = "Correct answer must match an option";
    if (!form.scheduledDate) e.scheduledDate = "Date is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ===== Date Conflict Check ===== */
  const checkDateConflict = async () => {
    try {
      if (
        editData &&
        normalizeDate(editData.scheduledDate) ===
          normalizeDate(form.scheduledDate)
      ) {
        return false;
      }

      const res = await fetch(`${API}/question/admin/all`);
      const data = await res.json();

      const selectedDate = normalizeDate(form.scheduledDate);

      const conflict = data.find((q) => {
        if (editData && q._id === editData._id) return false;
        return normalizeDate(q.scheduledDate) === selectedDate;
      });

      if (conflict) {
        setErrors((e) => ({
          ...e,
          scheduledDate: "Question already exists for this date",
        }));
        return true;
      }

      return false;
    } catch {
      toast.error("Failed to validate date");
      return true;
    }
  };

  /* ===== Submit ===== */
  const submit = async () => {
    if (!validate()) {
      toast.error("Fix validation errors");
      return;
    }

    const hasConflict = await checkDateConflict();
    if (hasConflict) {
      toast.error("Question already exists for this date");
      return;
    }

    setLoading(true);

    const payload = {
      question: form.question,
      options: form.options.filter(Boolean),
      correctAnswer: form.correctAnswer,
      explanation: form.explanation,
      scheduledDate: form.scheduledDate,
      solutionVideoUrl: form.solutionVideoUrl || null, // ✅ NEW
    };

    try {
      const res = await fetch(
        editData
          ? `${API}/question/admin/${editData._id}`
          : `${API}/question/admin`,
        {
          method: editData ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed");
      }

      toast.success(editData ? "Question updated" : "Question added");
      onSaved?.();
      setForm(emptyForm);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ===== Reset ===== */
  const resetForm = () => {
    setForm(emptyForm);
    setErrors({});
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-4">
      <h2 className="text-xl font-bold">
        {editData ? "Edit Question" : "Add Question"}
      </h2>

      <textarea
        className={`input ${errors.question && "border-red-500"}`}
        placeholder="Question (KaTeX allowed)"
        value={form.question}
        onChange={(e) => setForm({ ...form, question: e.target.value })}
      />

      <div className="grid grid-cols-2 gap-3">
        {form.options.map((opt, i) => (
          <input
            key={i}
            className="input"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => updateOption(i, e.target.value)}
          />
        ))}
      </div>

      <input
        className={`input ${errors.correctAnswer && "border-red-500"}`}
        placeholder="Correct Answer"
        value={form.correctAnswer}
        onChange={(e) =>
          setForm({ ...form, correctAnswer: e.target.value })
        }
      />

      <textarea
        className="input"
        placeholder="Explanation (KaTeX allowed)"
        value={form.explanation}
        onChange={(e) =>
          setForm({ ...form, explanation: e.target.value })
        }
      />

      {/* ✅ SOLUTION URL INPUT */}
      <input
        type="url"
        className="input"
        placeholder="Solution URL (PDF / YouTube / Drive)"
        value={form.solutionVideoUrl}
        onChange={(e) =>
          setForm({ ...form, solutionVideoUrl: e.target.value })
        }
      />

      <input
        type="date"
        className={`input ${errors.scheduledDate && "border-red-500"}`}
        value={form.scheduledDate}
        onChange={(e) => {
          setForm({ ...form, scheduledDate: e.target.value });
          setErrors((prev) => ({ ...prev, scheduledDate: "" }));
        }}
      />

      {errors.scheduledDate && (
        <p className="text-sm text-red-600">{errors.scheduledDate}</p>
      )}

      <div className="flex gap-3">
        <button
          onClick={submit}
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading
            ? "Saving..."
            : editData
            ? "Update Question"
            : "Save Question"}
        </button>

        <button
          onClick={resetForm}
          type="button"
          className="px-4 py-2 rounded-lg bg-slate-200"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
