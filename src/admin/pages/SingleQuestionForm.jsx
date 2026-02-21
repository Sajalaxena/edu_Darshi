import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CheckCircle2, RotateCcw, Link as LinkIcon, FileText, Lightbulb, Link2 } from "lucide-react";

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
    <div className="admin-card">
      <h3 className="text-base font-semibold text-slate-800 mb-6 flex items-center gap-2">
        {editData ? <><FileText size={18} className="text-indigo-500" /> Edit Question</> : <><FileText size={18} className="text-indigo-500" /> Add New Question</>}
      </h3>

      <div className="form-grid">
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Question Content <span className="text-slate-400 font-normal">(KaTeX allowed)</span></label>
          <textarea
            className={`admin-input min-h-[100px] resize-y ${errors.question ? "border-red-500 bg-red-50" : ""}`}
            placeholder="Enter the main question text here..."
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-sm font-medium text-slate-700 mb-1">Options</label>
          <div className="grid grid-cols-2 gap-3">
            {form.options.map((opt, i) => (
              <div className="relative" key={i}>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-md text-xs font-bold">
                  {String.fromCharCode(65 + i)}
                </span>
                <input
                  className="admin-input pl-11"
                  placeholder={`Option Details`}
                  value={opt}
                  onChange={(e) => updateOption(i, e.target.value)}
                />
              </div>
            ))}
          </div>
          {errors.options && <p className="text-red-500 text-xs mt-1">{errors.options}</p>}
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-1">
          <label className="text-sm font-medium text-slate-700">Correct Answer</label>
          <input
            className={`admin-input ${errors.correctAnswer ? "border-red-500 bg-red-50" : ""}`}
            placeholder="Must exactly match an option"
            value={form.correctAnswer}
            onChange={(e) =>
              setForm({ ...form, correctAnswer: e.target.value })
            }
          />
          {errors.correctAnswer && <p className="text-red-500 text-xs mt-0.5">{errors.correctAnswer}</p>}
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-1">
          <label className="text-sm font-medium text-slate-700">Scheduled Date</label>
          <input
            type="date"
            className={`admin-input ${errors.scheduledDate ? "border-red-500 bg-red-50" : ""}`}
            value={form.scheduledDate}
            onChange={(e) => {
              setForm({ ...form, scheduledDate: e.target.value });
              setErrors((prev) => ({ ...prev, scheduledDate: "" }));
            }}
          />
          {errors.scheduledDate && <p className="text-red-500 text-xs mt-0.5">{errors.scheduledDate}</p>}
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
            <Lightbulb size={16} className="text-amber-500" /> Explanation <span className="text-slate-400 font-normal">(KaTeX allowed)</span>
          </label>
          <textarea
            className="admin-input min-h-[80px] resize-y"
            placeholder="Explain why the answer is correct..."
            value={form.explanation}
            onChange={(e) =>
              setForm({ ...form, explanation: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
            <Link2 size={16} className="text-blue-500" /> Solution Video URL <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <LinkIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="url"
              className="admin-input pl-10"
              placeholder="https://youtube.com/..."
              value={form.solutionVideoUrl}
              onChange={(e) =>
                setForm({ ...form, solutionVideoUrl: e.target.value })
              }
            />
          </div>
        </div>

        <div className="md:col-span-2 flex items-center justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
          <button
            onClick={resetForm}
            type="button"
            className="btn-secondary !text-slate-600 !border-slate-200 hover:!bg-slate-50 flex items-center gap-2"
          >
            <RotateCcw size={16} /> Reset
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="admin-btn disabled:opacity-50"
          >
            {loading ? "Saving..." : editData ? (
              <>
                <CheckCircle2 size={18} /> Update Question
              </>
            ) : (
              <>
                <CheckCircle2 size={18} /> Save Question
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
