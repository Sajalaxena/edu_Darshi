import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Search } from "lucide-react";

const API = import.meta.env.VITE_API_BASE_URL;

export default function QuestionTable({ onEdit }) {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await fetch(`${API}/question/admin/all`);
      const data = await res.json();
      setQuestions(data);
    } catch {
      toast.error("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const deleteQuestion = async (id) => {
    if (!confirm("Delete this question?")) return;

    try {
      const res = await fetch(`${API}/question/admin/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      toast.success("Question deleted");
      setQuestions((prev) => prev.filter((q) => q._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  const filteredQuestions = questions.filter((q) =>
    q.question.toLowerCase().includes(search.toLowerCase()) ||
    (q.scheduledDate && new Date(q.scheduledDate).toDateString().toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-lg font-semibold text-slate-800">All Questions</h3>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search dates or questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input pl-9 w-64 text-sm py-1.5"
          />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Question</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((q) => (
              <tr key={q._id} className="border-t">
                <td className="p-3">
                  {new Date(q.scheduledDate).toDateString()}
                </td>
                <td className="p-3 line-clamp-2">{q.question}</td>
                <td className="p-3 flex gap-2 justify-center">
                  <button
                    onClick={() => onEdit(q)}
                    className="px-3 py-1 rounded bg-indigo-600 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteQuestion(q._id)}
                    className="px-3 py-1 rounded bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredQuestions.length === 0 && (
              <tr>
                <td colSpan="3" className="p-4 text-center text-slate-500">
                  No questions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
