import { useState } from "react";
import SingleQuestionForm from "./SingleQuestionForm";
import BulkQuestionUpload from "./BulkQuestionUpload";
import QuestionsTable from "./QuestionsTable";
import { ListPlus, UploadCloud } from "lucide-react";

export default function AdminQOTD() {
  const [tab, setTab] = useState("single");
  const [editData, setEditData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <section>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Question of the Day
          </h2>
          <p className="text-slate-500 text-sm mt-1">Manage daily interactive questions and solutions</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-8 bg-slate-100 p-1.5 rounded-xl w-max">
        <button
          onClick={() => setTab("single")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${tab === "single"
              ? "bg-white text-indigo-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
            }`}
        >
          <ListPlus size={16} /> Add / Edit Question
        </button>

        <button
          onClick={() => setTab("bulk")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${tab === "bulk"
              ? "bg-white text-indigo-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
            }`}
        >
          <UploadCloud size={16} /> Bulk Upload
        </button>
      </div>

      {/* SINGLE QUESTION + TABLE */}
      {tab === "single" && (
        <div className="animate-in fade-in duration-300">
          <SingleQuestionForm
            editData={editData}
            onSaved={() => {
              setEditData(null);
              setRefreshKey((k) => k + 1);
            }}
          />

          <div className="mt-8">
            <QuestionsTable
              key={refreshKey}
              onEdit={(q) => {
                setEditData(q);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </div>
      )}

      {tab === "bulk" && (
        <div className="animate-in fade-in duration-300">
          <BulkQuestionUpload />
        </div>
      )}
    </section>
  );
}
